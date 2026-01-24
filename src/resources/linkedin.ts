import { BaseResource } from './base.js';
import type {
  LinkedInCompanyParams,
  LinkedInCompanyData,
  LinkedInPersonParams,
  LinkedInPersonData,
} from '../types/index.js';

/**
 * LinkedIn scraping operations
 * Provides company and person profile scraping
 */
export class LinkedInResource extends BaseResource {
  /**
   * Scrape a LinkedIn company profile
   *
   * @param params - Company profile parameters
   * @returns Company profile data including description, employees, jobs, posts
   * @throws {CrawlKitError} On API errors
   *
   * @example
   * ```typescript
   * const result = await crawlkit.linkedin.company({
   *   url: 'https://www.linkedin.com/company/openai',
   *   options: { includeJobs: true }
   * });
   * console.log(result.company.name);
   * console.log(result.company.followers);
   * console.log(result.company.jobs);
   * ```
   *
   * @costs 1 credit
   */
  async company(params: LinkedInCompanyParams): Promise<LinkedInCompanyData> {
    return this.post<LinkedInCompanyData>('/v1/crawl/linkedin/company', params);
  }

  /**
   * Scrape LinkedIn person profile(s)
   *
   * @param params - Person profile parameters (single URL or array of URLs, max 10)
   * @returns Person profile data for each URL
   * @throws {CrawlKitError} On API errors
   *
   * @example
   * ```typescript
   * // Single profile
   * const result = await crawlkit.linkedin.person({
   *   url: 'https://www.linkedin.com/in/username'
   * });
   *
   * // Multiple profiles (batch)
   * const batchResult = await crawlkit.linkedin.person({
   *   url: [
   *     'https://www.linkedin.com/in/user1',
   *     'https://www.linkedin.com/in/user2'
   *   ]
   * });
   * console.log(`Success: ${batchResult.successCount}, Failed: ${batchResult.failedCount}`);
   * ```
   *
   * @costs 3 credits per URL
   */
  async person(params: LinkedInPersonParams): Promise<LinkedInPersonData> {
    return this.post<LinkedInPersonData>('/v1/crawl/linkedin/person', params);
  }
}
