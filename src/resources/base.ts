import { createErrorFromResponse, CrawlKitError } from '../errors/index.js';
import type { ApiResponse, ApiErrorResponse } from '../types/common.js';

/**
 * Configuration for resource instances
 */
export interface ResourceConfig {
  /** API key for authentication */
  apiKey: string;
  /** Base URL for the API */
  baseUrl: string;
  /** Default timeout in milliseconds */
  timeout: number;
  /** Fetch implementation */
  fetch: typeof globalThis.fetch;
}

/**
 * Base class for API resources
 * Provides common HTTP functionality for all resource classes
 */
export abstract class BaseResource {
  protected readonly config: ResourceConfig;

  constructor(config: ResourceConfig) {
    this.config = config;
  }

  /**
   * Make a POST request to the API
   * @param endpoint - API endpoint path (e.g., '/v1/crawl/scrape')
   * @param body - Request body object
   * @returns Parsed response data
   * @throws {CrawlKitError} On API errors
   */
  protected async post<T, B extends object = object>(
    endpoint: string,
    body: B
  ): Promise<T> {
    const url = `${this.config.baseUrl}${endpoint}`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

    try {
      const response = await this.config.fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `ApiKey ${this.config.apiKey}`,
          'User-Agent': '@crawlkit/sdk',
        },
        body: JSON.stringify(body),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      let json: ApiResponse<T>;
      try {
        json = await response.json() as ApiResponse<T>;
      } catch {
        throw new CrawlKitError(
          'PARSE_ERROR',
          'Failed to parse API response',
          response.status
        );
      }

      if (!json.success) {
        const errorResponse = json as ApiErrorResponse;
        throw createErrorFromResponse(
          errorResponse.error.code,
          errorResponse.error.message,
          response.status,
          errorResponse.creditsRefunded,
          errorResponse.creditsRemaining
        );
      }

      return json.data;
    } catch (error) {
      clearTimeout(timeoutId);

      // Re-throw CrawlKitError instances
      if (error instanceof CrawlKitError) {
        throw error;
      }

      // Handle abort/timeout
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new CrawlKitError(
            'TIMEOUT',
            `Request timed out after ${this.config.timeout}ms`,
            408
          );
        }

        // Handle network errors
        throw new CrawlKitError(
          'UNKNOWN',
          error.message || 'An unknown error occurred',
          500
        );
      }

      throw new CrawlKitError('UNKNOWN', 'An unknown error occurred', 500);
    }
  }

  /**
   * Make a GET request to the API
   * @param endpoint - API endpoint path
   * @param params - Query parameters
   * @returns Parsed response data
   * @throws {CrawlKitError} On API errors
   */
  protected async get<T>(
    endpoint: string,
    params?: Record<string, string | number | boolean | undefined>
  ): Promise<T> {
    let url = `${this.config.baseUrl}${endpoint}`;

    // Add query parameters
    if (params) {
      const searchParams = new URLSearchParams();
      for (const [key, value] of Object.entries(params)) {
        if (value !== undefined) {
          searchParams.append(key, String(value));
        }
      }
      const queryString = searchParams.toString();
      if (queryString) {
        url += `?${queryString}`;
      }
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

    try {
      const response = await this.config.fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `ApiKey ${this.config.apiKey}`,
          'User-Agent': '@crawlkit/sdk',
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      let json: ApiResponse<T>;
      try {
        json = await response.json() as ApiResponse<T>;
      } catch {
        throw new CrawlKitError(
          'PARSE_ERROR',
          'Failed to parse API response',
          response.status
        );
      }

      if (!json.success) {
        const errorResponse = json as ApiErrorResponse;
        throw createErrorFromResponse(
          errorResponse.error.code,
          errorResponse.error.message,
          response.status,
          errorResponse.creditsRefunded,
          errorResponse.creditsRemaining
        );
      }

      return json.data;
    } catch (error) {
      clearTimeout(timeoutId);

      if (error instanceof CrawlKitError) {
        throw error;
      }

      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new CrawlKitError(
            'TIMEOUT',
            `Request timed out after ${this.config.timeout}ms`,
            408
          );
        }

        throw new CrawlKitError(
          'UNKNOWN',
          error.message || 'An unknown error occurred',
          500
        );
      }

      throw new CrawlKitError('UNKNOWN', 'An unknown error occurred', 500);
    }
  }
}
