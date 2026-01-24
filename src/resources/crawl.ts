import { BaseResource } from './base.js';
import type {
  ScrapeParams,
  ScrapeData,
  ExtractParams,
  ExtractData,
  SearchParams,
  SearchData,
  ScreenshotParams,
  ScreenshotData,
} from '../types/index.js';

/**
 * Core crawl operations resource
 * Provides scrape, extract, search, and screenshot functionality
 */
export class CrawlResource extends BaseResource {
  /**
   * Scrape a URL and return markdown, HTML, metadata, and links
   *
   * @param params - Scrape parameters
   * @returns Scraped page data including markdown, HTML, metadata, and links
   * @throws {CrawlKitError} On API errors
   *
   * @example
   * ```typescript
   * const result = await crawlkit.scrape({
   *   url: 'https://example.com',
   *   options: {
   *     onlyMainContent: true,
   *     waitFor: '#content'
   *   }
   * });
   * console.log(result.markdown);
   * ```
   *
   * @costs 1 credit
   */
  async scrape(params: ScrapeParams): Promise<ScrapeData> {
    return this.post<ScrapeData>('/v1/crawl/scrape', params);
  }

  /**
   * Extract structured data from a URL using AI
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
   * }
   *
   * const result = await crawlkit.extract<Product>({
   *   url: 'https://example.com/product',
   *   schema: {
   *     type: 'object',
   *     properties: {
   *       name: { type: 'string' },
   *       price: { type: 'number' }
   *     }
   *   }
   * });
   * console.log(result.json.name, result.json.price);
   * ```
   *
   * @costs 5 credits
   */
  async extract<T = unknown>(params: ExtractParams): Promise<ExtractData<T>> {
    return this.post<ExtractData<T>>('/v1/crawl/extract', params);
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
   *   query: 'typescript best practices',
   *   options: {
   *     maxResults: 10,
   *     timeRange: 'w' // Past week
   *   }
   * });
   * result.results.forEach(r => console.log(r.title, r.url));
   * ```
   *
   * @costs 1 credit per page (~10 results)
   */
  async search(params: SearchParams): Promise<SearchData> {
    return this.post<SearchData>('/v1/crawl/search', params);
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
   *     waitForSelector: '#content'
   *   }
   * });
   * console.log('Screenshot URL:', result.url);
   * ```
   *
   * @costs 1 credit
   */
  async screenshot(params: ScreenshotParams): Promise<ScreenshotData> {
    return this.post<ScreenshotData>('/v1/crawl/screenshot', params);
  }
}
