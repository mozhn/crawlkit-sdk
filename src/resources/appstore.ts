import { BaseResource } from './base.js';
import type {
  PlayStoreReviewsParams,
  PlayStoreReviewsData,
  PlayStoreDetailParams,
  PlayStoreDetailData,
  AppStoreDetailParams,
  AppStoreDetailData,
  AppStoreReviewsParams,
  AppStoreReviewsData,
} from '../types/index.js';

/**
 * App store operations
 * Provides Google Play Store and Apple App Store data scraping
 */
export class AppStoreResource extends BaseResource {
  /**
   * Fetch Google Play Store reviews for an app
   *
   * @param params - Reviews parameters including app ID and optional pagination cursor
   * @returns Reviews with pagination information
   * @throws {CrawlKitError} On API errors
   *
   * @example
   * ```typescript
   * // First page
   * const result = await crawlkit.appstore.playstoreReviews({
   *   appId: 'com.example.app',
   *   options: { lang: 'en' }
   * });
   *
   * // Next page
   * if (result.pagination.hasMore) {
   *   const nextPage = await crawlkit.appstore.playstoreReviews({
   *     appId: 'com.example.app',
   *     cursor: result.pagination.nextCursor
   *   });
   * }
   * ```
   *
   * @costs 1 credit per page
   */
  async playstoreReviews(params: PlayStoreReviewsParams): Promise<PlayStoreReviewsData> {
    return this.post<PlayStoreReviewsData>('/v1/crawl/playstore/reviews', params);
  }

  /**
   * Fetch Google Play Store app details
   *
   * @param params - App detail parameters
   * @returns Comprehensive app information including ratings, screenshots, permissions
   * @throws {CrawlKitError} On API errors
   *
   * @example
   * ```typescript
   * const result = await crawlkit.appstore.playstoreDetail({
   *   appId: 'com.example.app',
   *   options: { lang: 'en' }
   * });
   * console.log(result.appName);
   * console.log(result.rating);
   * console.log(result.installs);
   * ```
   *
   * @costs 1 credit
   */
  async playstoreDetail(params: PlayStoreDetailParams): Promise<PlayStoreDetailData> {
    return this.post<PlayStoreDetailData>('/v1/crawl/playstore/detail', params);
  }

  /**
   * Fetch Apple App Store app details
   *
   * @param params - App detail parameters
   * @returns App information including metadata, ratings, and media
   * @throws {CrawlKitError} On API errors
   *
   * @example
   * ```typescript
   * const result = await crawlkit.appstore.appstoreDetail({
   *   appId: '1492793493',
   *   options: { lang: 'en' }
   * });
   * console.log(result.appName);
   * console.log(result.rating);
   * ```
   *
   * @costs 1 credit
   */
  async appstoreDetail(params: AppStoreDetailParams): Promise<AppStoreDetailData> {
    return this.post<AppStoreDetailData>('/v1/crawl/appstore/detail', params);
  }

  /**
   * Fetch Apple App Store reviews for an app
   *
   * @param params - Reviews parameters including app ID and optional pagination cursor
   * @returns Reviews with pagination information
   * @throws {CrawlKitError} On API errors
   *
   * @example
   * ```typescript
   * // First page
   * const result = await crawlkit.appstore.appstoreReviews({
   *   appId: '123456789',
   *   options: { lang: 'en' }
   * });
   *
   * // Paginate through all reviews
   * let cursor = result.pagination.nextCursor;
   * while (cursor) {
   *   const nextPage = await crawlkit.appstore.appstoreReviews({
   *     appId: '123456789',
   *     cursor
   *   });
   *   cursor = nextPage.pagination.nextCursor;
   * }
   * ```
   *
   * @costs 1 credit per page
   */
  async appstoreReviews(params: AppStoreReviewsParams): Promise<AppStoreReviewsData> {
    return this.post<AppStoreReviewsData>('/v1/crawl/appstore/reviews', params);
  }
}
