/**
 * @crawlkit-sh/sdk - Official TypeScript/JavaScript SDK for CrawlKit
 *
 * A modern web scraping API that provides:
 * - Web scraping with markdown conversion
 * - AI-powered structured data extraction
 * - Web search
 * - Full-page screenshots
 * - Social media scraping (LinkedIn, Instagram, TikTok)
 * - App store data (Google Play, Apple App Store)
 *
 * @example
 * ```typescript
 * import { CrawlKit } from '@crawlkit-sh/sdk';
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
 *   schema: { type: 'object', properties: { name: { type: 'string' } } }
 * });
 * ```
 *
 * @packageDocumentation
 */

// Main client
export { CrawlKit } from './client.js';
export type { CrawlKitConfig } from './client.js';

// Error classes
export {
  CrawlKitError,
  AuthenticationError,
  InsufficientCreditsError,
  ValidationError,
  RateLimitError,
  TimeoutError,
  NotFoundError,
  NetworkError,
  createErrorFromResponse,
} from './errors/index.js';

// All types
export type {
  // Common
  ApiSuccessResponse,
  ApiErrorResponse,
  ApiResponse,
  CreditInfo,
  Timing,
  ErrorCode,

  // Scrape
  WaitAction,
  ClickAction,
  TypeAction,
  PressAction,
  ScrollAction,
  EvaluateAction,
  BrowserAction,
  ScrapeOptions,
  ScrapeParams,
  PageMetadata,
  PageLinks,
  CrawlStats,
  ActionResult,
  ScrapeData,
  ScrapeResponse,

  // Extract
  ExtractOptions,
  ExtractParams,
  ExtractData,
  ExtractResponse,

  // Search
  TimeRange,
  SearchOptions,
  SearchParams,
  SearchResult,
  SearchData,
  SearchResponse,

  // Screenshot
  ScreenshotOptions,
  ScreenshotParams,
  ScreenshotData,
  ScreenshotResponse,

  // LinkedIn
  LinkedInCompanyOptions,
  LinkedInCompanyParams,
  LinkedInEmployee,
  LinkedInJob,
  LinkedInSimilarCompany,
  LinkedInPost,
  LinkedInCompany,
  LinkedInCompanyData,
  LinkedInCompanyResponse,
  LinkedInPersonParams,
  LinkedInPersonResult,
  LinkedInPersonData,
  LinkedInPersonResponse,

  // Instagram
  InstagramProfileOptions,
  InstagramProfileParams,
  InstagramBioLink,
  InstagramDimensions,
  InstagramPost,
  InstagramProfile,
  InstagramProfileData,
  InstagramProfileResponse,
  InstagramContentOptions,
  InstagramContentParams,
  InstagramContentOwner,
  InstagramAudioInfo,
  InstagramCarouselItem,
  InstagramContent,
  InstagramContentData,
  InstagramContentResponse,

  // Play Store
  PlayStoreReviewsOptions,
  PlayStoreReviewsParams,
  DeveloperReply,
  PlayStoreReview,
  Pagination,
  PlayStoreReviewsData,
  PlayStoreReviewsResponse,
  PlayStoreDetailOptions,
  PlayStoreDetailParams,
  Screenshot,
  RatingDistribution,
  Developer,
  Permission,
  DataSafety,
  PlayStoreDetailData,
  PlayStoreDetailResponse,

  // App Store
  AppStoreDetailOptions,
  AppStoreDetailParams,
  AppStoreReviewsOptions,
  AppStoreReviewsParams,
  AppStoreReview,
  AppStoreDetailData,
  AppStoreDetailResponse,
  AppStoreReviewsData,
  AppStoreReviewsResponse,

  // TikTok
  TikTokOptions,
  TikTokProfileParams,
  TikTokPostParams,
  TikTokPostsParams,
  TikTokProfileStats,
  TikTokProfile,
  TikTokPostAuthor,
  TikTokPostMusic,
  TikTokPostVideo,
  TikTokPostImage,
  TikTokPostStats,
  TikTokHashtag,
  TikTokPost,
  TikTokPostsPagination,
  TikTokProfileData,
  TikTokPostData,
  TikTokPostsData,
  TikTokProfileResponse,
  TikTokPostResponse,
  TikTokPostsResponse,
} from './types/index.js';
