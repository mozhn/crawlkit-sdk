import { BaseResource } from './base.js';
import type {
  InstagramProfileParams,
  InstagramProfileData,
  InstagramContentParams,
  InstagramContentData,
} from '../types/index.js';

/**
 * Instagram scraping operations
 * Provides profile and content (posts/reels) scraping
 */
export class InstagramResource extends BaseResource {
  /**
   * Scrape an Instagram profile
   *
   * @param params - Profile parameters (username or URL)
   * @returns Profile data including bio, follower count, and recent posts
   * @throws {CrawlKitError} On API errors
   *
   * @example
   * ```typescript
   * const result = await crawlkit.instagram.profile({
   *   username: 'instagram'
   * });
   * console.log(result.profile.full_name);
   * console.log(result.profile.follower_count);
   * console.log(result.profile.posts.length);
   * ```
   *
   * @costs 1 credit
   */
  async profile(params: InstagramProfileParams): Promise<InstagramProfileData> {
    return this.post<InstagramProfileData>('/v1/crawl/instagram/profile', params);
  }

  /**
   * Scrape Instagram content (post, reel, or video)
   *
   * @param params - Content parameters (shortcode or full URL)
   * @returns Content data including media URLs, likes, comments, and owner info
   * @throws {CrawlKitError} On API errors
   *
   * @example
   * ```typescript
   * // Using shortcode
   * const result = await crawlkit.instagram.content({
   *   shortcode: 'CxIIgCCq8mg'
   * });
   *
   * // Using full URL
   * const result = await crawlkit.instagram.content({
   *   shortcode: 'https://www.instagram.com/p/CxIIgCCq8mg/'
   * });
   *
   * console.log(result.post.like_count);
   * console.log(result.post.video_url);
   * ```
   *
   * @costs 1 credit
   */
  async content(params: InstagramContentParams): Promise<InstagramContentData> {
    return this.post<InstagramContentData>('/v1/crawl/instagram/content', params);
  }
}
