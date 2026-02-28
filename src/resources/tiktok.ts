import { BaseResource } from './base.js';
import type {
  TikTokProfileParams,
  TikTokProfileData,
  TikTokPostParams,
  TikTokPostData,
  TikTokPostsParams,
  TikTokPostsData,
} from '../types/index.js';

/**
 * TikTok scraping operations
 * Provides profile, single content, and paginated content list scraping
 */
export class TikTokResource extends BaseResource {
  /**
   * Scrape a TikTok profile
   *
   * @param params - Profile parameters (username)
   * @returns Profile data including stats and metadata
   * @throws {CrawlKitError} On API errors
   *
   * @example
   * ```typescript
   * const result = await crawlkit.tiktok.profile({
   *   username: 'nike'
   * });
   * console.log(result.profile.username);
   * console.log(result.profile.stats?.followers);
   * ```
   *
   * @costs 1 credit
   */
  async profile(params: TikTokProfileParams): Promise<TikTokProfileData> {
    return this.post<TikTokProfileData>('/v1/crawl/tiktok/profile', params);
  }

  /**
   * Scrape a single TikTok content item
   *
   * @param params - Post parameters (post URL)
   * @returns Post details including author, media, stats, and hashtags
   * @throws {CrawlKitError} On API errors
   *
   * @example
   * ```typescript
   * const result = await crawlkit.tiktok.content({
   *   url: 'https://www.tiktok.com/@nike/video/1234567890'
   * });
   * console.log(result.post.id);
   * console.log(result.post.video?.url);
   * ```
   *
   * @costs 1 credit
   */
  async content(params: TikTokPostParams): Promise<TikTokPostData> {
    return this.post<TikTokPostData>('/v1/crawl/tiktok/post', params);
  }

  /**
   * List TikTok content with cursor-based pagination
   *
   * @param params - Post list parameters (username and optional cursor/secUid)
   * @returns A page of posts and pagination metadata
   * @throws {CrawlKitError} On API errors
   *
   * @example
   * ```typescript
   * const firstPage = await crawlkit.tiktok.posts({
   *   username: 'nike'
   * });
   *
   * if (firstPage.pagination.hasMore) {
   *   const nextPage = await crawlkit.tiktok.posts({
   *     username: 'nike',
   *     cursor: Number(firstPage.pagination.cursor),
   *     secUid: firstPage.pagination.secUid ?? undefined
   *   });
   *   console.log(nextPage.posts.length);
   * }
   * ```
   *
   * @costs 1 credit per page
   */
  async posts(params: TikTokPostsParams): Promise<TikTokPostsData> {
    return this.post<TikTokPostsData>('/v1/crawl/tiktok/posts', params);
  }
}
