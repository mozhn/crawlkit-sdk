import { CrawlResource } from './resources/crawl.js';
import { LinkedInResource } from './resources/linkedin.js';
import { InstagramResource } from './resources/instagram.js';
import { AppStoreResource } from './resources/appstore.js';
import { TikTokResource } from './resources/tiktok.js';
import { AuthenticationError } from './errors/index.js';
import type { ResourceConfig } from './resources/base.js';
import type {
  ScrapeParams,
  ScrapeData,
  ExtractParams,
  ExtractData,
  SearchParams,
  SearchData,
  ScreenshotParams,
  ScreenshotData,
} from './types/index.js';

/**
 * Configuration options for the CrawlKit client
 */
export interface CrawlKitConfig {
  /**
   * API key for authentication
   * Must start with 'ck_' prefix
   * Get your API key at https://crawlkit.sh
   */
  apiKey: string;

  /**
   * Base URL for the API
   * @default 'https://api.crawlkit.sh'
   */
  baseUrl?: string;

  /**
   * Default timeout in milliseconds for all requests
   * @default 30000
   */
  timeout?: number;

  /**
   * Custom fetch implementation
   * Useful for testing or environments without native fetch
   */
  fetch?: typeof globalThis.fetch;
}

/**
 * CrawlKit SDK client for web scraping API
 *
 * @example
 * ```typescript
 * import { CrawlKit } from '@crawlkit/sdk';
 *
 * const crawlkit = new CrawlKit({ apiKey: 'ck_your_api_key' });
 *
 * // Scrape a webpage
 * const page = await crawlkit.scrape({ url: 'https://example.com' });
 * console.log(page.markdown);
 *
 * // Extract structured data with AI
 * const data = await crawlkit.extract({
 *   url: 'https://example.com/product',
 *   schema: {
 *     type: 'object',
 *     properties: {
 *       name: { type: 'string' },
 *       price: { type: 'number' }
 *     }
 *   }
 * });
 *
 * // Scrape social media
 * const company = await crawlkit.linkedin.company({
 *   url: 'https://linkedin.com/company/openai'
 * });
 *
 * const profile = await crawlkit.tiktok.profile({
 *   username: 'nike'
 * });
 * ```
 */
export class CrawlKit {
  private readonly config: Required<Omit<CrawlKitConfig, 'fetch'>> & { fetch: typeof globalThis.fetch };
  private readonly crawl: CrawlResource;

  /**
   * LinkedIn scraping operations
   * Provides company and person profile scraping
   */
  public readonly linkedin: LinkedInResource;

  /**
   * Instagram scraping operations
   * Provides profile and content scraping
   */
  public readonly instagram: InstagramResource;

  /**
   * App store operations
   * Provides Google Play Store and Apple App Store data
   */
  public readonly appstore: AppStoreResource;

  /**
   * TikTok scraping operations
   * Provides profile, content, and paginated posts scraping
   */
  public readonly tiktok: TikTokResource;

  /**
   * Create a new CrawlKit client
   *
   * @param config - Client configuration
   * @throws {AuthenticationError} If API key is invalid or missing
   *
   * @example
   * ```typescript
   * const crawlkit = new CrawlKit({
   *   apiKey: 'ck_your_api_key',
   *   timeout: 60000 // 60 seconds
   * });
   * ```
   */
  constructor(config: CrawlKitConfig) {
    // Validate API key
    if (!config.apiKey) {
      throw new AuthenticationError('API key is required');
    }

    if (!config.apiKey.startsWith('ck_')) {
      throw new AuthenticationError(
        'Invalid API key format. API keys must start with "ck_"'
      );
    }

    this.config = {
      apiKey: config.apiKey,
      baseUrl: config.baseUrl ?? 'https://api.crawlkit.sh',
      timeout: config.timeout ?? 30000,
      fetch: config.fetch ?? globalThis.fetch.bind(globalThis),
    };

    // Initialize resources
    const resourceConfig: ResourceConfig = {
      apiKey: this.config.apiKey,
      baseUrl: this.config.baseUrl,
      timeout: this.config.timeout,
      fetch: this.config.fetch,
    };

    this.crawl = new CrawlResource(resourceConfig);
    this.linkedin = new LinkedInResource(resourceConfig);
    this.instagram = new InstagramResource(resourceConfig);
    this.appstore = new AppStoreResource(resourceConfig);
    this.tiktok = new TikTokResource(resourceConfig);
  }

  /**
   * Scrape a URL and return markdown, HTML, metadata, and links
   *
   * @param params - Scrape parameters
   * @returns Scraped page data including markdown, HTML, metadata, and links
   * @throws {CrawlKitError} On API errors
   *
   * @example
   * ```typescript
   * // Basic scraping
   * const result = await crawlkit.scrape({
   *   url: 'https://example.com'
   * });
   * console.log(result.markdown);
   * console.log(result.metadata.title);
   *
   * // With browser automation
   * const spaResult = await crawlkit.scrape({
   *   url: 'https://example.com/spa',
   *   options: {
   *     waitFor: '#content-loaded',
   *     actions: [
   *       { type: 'click', selector: '#load-more' },
   *       { type: 'wait', milliseconds: 2000 }
   *     ]
   *   }
   * });
   * ```
   *
   * @costs 1 credit
   */
  async scrape(params: ScrapeParams): Promise<ScrapeData> {
    return this.crawl.scrape(params);
  }

  /**
   * Extract structured data from a URL using AI
   *
   * Uses LLM to extract data according to the provided JSON schema.
   *
   * @param params - Extract parameters including JSON schema
   * @returns Extracted structured data along with page content
   * @throws {CrawlKitError} On API errors
   *
   * @example
   * ```typescript
   * interface Product {
   *   name: string;
   *   price: number;
   *   description: string;
   *   inStock: boolean;
   * }
   *
   * const result = await crawlkit.extract<Product>({
   *   url: 'https://example.com/product/123',
   *   schema: {
   *     type: 'object',
   *     properties: {
   *       name: { type: 'string' },
   *       price: { type: 'number' },
   *       description: { type: 'string' },
   *       inStock: { type: 'boolean' }
   *     }
   *   },
   *   options: {
   *     prompt: 'Extract product information from this page'
   *   }
   * });
   *
   * // TypeScript knows result.json is Product
   * console.log(result.json.name);
   * console.log(result.json.price);
   * ```
   *
   * @costs 5 credits
   */
  async extract<T = unknown>(params: ExtractParams): Promise<ExtractData<T>> {
    return this.crawl.extract<T>(params);
  }

  /**
   * Perform a web search
   *
   * @param params - Search parameters
   * @returns Search results with titles, URLs, and snippets
   * @throws {CrawlKitError} On API errors
   *
   * @example
   * ```typescript
   * const result = await crawlkit.search({
   *   query: 'typescript best practices 2024',
   *   options: {
   *     maxResults: 20,
   *     timeRange: 'm', // Past month
   *     region: 'us-en'
   *   }
   * });
   *
   * for (const item of result.results) {
   *   console.log(`${item.position}. ${item.title}`);
   *   console.log(`   ${item.url}`);
   *   console.log(`   ${item.snippet}\n`);
   * }
   * ```
   *
   * @costs 1 credit per page (~10 results)
   */
  async search(params: SearchParams): Promise<SearchData> {
    return this.crawl.search(params);
  }

  /**
   * Take a full-page screenshot of a URL
   *
   * @param params - Screenshot parameters
   * @returns Public URL of the screenshot
   * @throws {CrawlKitError} On API errors
   *
   * @example
   * ```typescript
   * const result = await crawlkit.screenshot({
   *   url: 'https://example.com',
   *   options: {
   *     width: 1920,
   *     height: 1080,
   *     waitForSelector: '#main-content'
   *   }
   * });
   *
   * console.log('Screenshot URL:', result.url);
   * console.log(`Dimensions: ${result.width}x${result.height}`);
   * ```
   *
   * @costs 1 credit
   */
  async screenshot(params: ScreenshotParams): Promise<ScreenshotData> {
    return this.crawl.screenshot(params);
  }
}
