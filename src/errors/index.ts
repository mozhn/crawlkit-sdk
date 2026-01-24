import type { ErrorCode } from '../types/common.js';

/**
 * Base error class for all CrawlKit errors
 */
export class CrawlKitError extends Error {
  /** Error code from API */
  public readonly code: ErrorCode;
  /** HTTP status code */
  public readonly statusCode: number;
  /** Credits refunded if operation failed */
  public readonly creditsRefunded?: number;
  /** Remaining credits after operation */
  public readonly creditsRemaining?: number;

  constructor(
    code: ErrorCode,
    message: string,
    statusCode: number,
    creditsRefunded?: number,
    creditsRemaining?: number
  ) {
    super(message);
    this.name = 'CrawlKitError';
    this.code = code;
    this.statusCode = statusCode;
    this.creditsRefunded = creditsRefunded;
    this.creditsRemaining = creditsRemaining;

    // Maintains proper stack trace for where our error was thrown
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

/**
 * Authentication error - invalid or missing API key
 */
export class AuthenticationError extends CrawlKitError {
  constructor(message: string = 'Invalid or missing API key') {
    super('VALIDATION_ERROR', message, 401);
    this.name = 'AuthenticationError';
  }
}

/**
 * Insufficient credits to perform the operation
 */
export class InsufficientCreditsError extends CrawlKitError {
  /** Credits required for the operation */
  public readonly required?: number;
  /** Credits available */
  public readonly available?: number;

  constructor(
    message: string,
    creditsRefunded?: number,
    creditsRemaining?: number
  ) {
    super('INSUFFICIENT_CREDITS', message, 402, creditsRefunded, creditsRemaining);
    this.name = 'InsufficientCreditsError';
    this.available = creditsRemaining;
  }
}

/**
 * Validation error - invalid request parameters
 */
export class ValidationError extends CrawlKitError {
  constructor(message: string) {
    super('VALIDATION_ERROR', message, 400);
    this.name = 'ValidationError';
  }
}

/**
 * Rate limit exceeded
 */
export class RateLimitError extends CrawlKitError {
  constructor(message: string = 'Rate limit exceeded') {
    super('RATE_LIMITED', message, 429);
    this.name = 'RateLimitError';
  }
}

/**
 * Request timeout
 */
export class TimeoutError extends CrawlKitError {
  constructor(
    message: string,
    creditsRefunded?: number,
    creditsRemaining?: number
  ) {
    super('TIMEOUT', message, 408, creditsRefunded, creditsRemaining);
    this.name = 'TimeoutError';
  }
}

/**
 * Resource not found (404)
 */
export class NotFoundError extends CrawlKitError {
  constructor(message: string = 'Resource not found') {
    super('NOT_FOUND', message, 404);
    this.name = 'NotFoundError';
  }
}

/**
 * Network or connection error
 */
export class NetworkError extends CrawlKitError {
  constructor(
    code: ErrorCode,
    message: string,
    creditsRefunded?: number,
    creditsRemaining?: number
  ) {
    super(code, message, 502, creditsRefunded, creditsRemaining);
    this.name = 'NetworkError';
  }
}

/**
 * Create appropriate error instance from API response
 */
export function createErrorFromResponse(
  code: string,
  message: string,
  statusCode: number,
  creditsRefunded?: number,
  creditsRemaining?: number
): CrawlKitError {
  const errorCode = code as ErrorCode;

  switch (statusCode) {
    case 401:
      return new AuthenticationError(message);
    case 402:
      return new InsufficientCreditsError(message, creditsRefunded, creditsRemaining);
    case 429:
      return new RateLimitError(message);
    case 404:
      return new NotFoundError(message);
  }

  switch (errorCode) {
    case 'VALIDATION_ERROR':
      return new ValidationError(message);
    case 'INSUFFICIENT_CREDITS':
      return new InsufficientCreditsError(message, creditsRefunded, creditsRemaining);
    case 'TIMEOUT':
      return new TimeoutError(message, creditsRefunded, creditsRemaining);
    case 'RATE_LIMITED':
      return new RateLimitError(message);
    case 'NOT_FOUND':
      return new NotFoundError(message);
    case 'DNS_FAILED':
    case 'CONNECTION_REFUSED':
    case 'SSL_ERROR':
    case 'TOO_MANY_REDIRECTS':
    case 'PROXY_ERROR':
      return new NetworkError(errorCode, message, creditsRefunded, creditsRemaining);
    default:
      return new CrawlKitError(
        errorCode,
        message,
        statusCode,
        creditsRefunded,
        creditsRemaining
      );
  }
}
