import type { ApiSuccessResponse } from './common.js';
import type { DeveloperReply, Pagination } from './playstore.js';

/**
 * Options for fetching App Store reviews
 */
export interface AppStoreReviewsOptions {
  /** Language code (e.g., 'en', 'tr') */
  lang?: string;
  /** Request timeout in milliseconds (default: 30000) */
  timeout?: number;
}

/**
 * Parameters for the App Store reviews endpoint
 */
export interface AppStoreReviewsParams {
  /** App ID (numeric ID from App Store URL) */
  appId: string;
  /** Pagination cursor from previous response */
  cursor?: string | null;
  /** Options */
  options?: AppStoreReviewsOptions;
}

/**
 * App Store review
 */
export interface AppStoreReview {
  id: string;
  username: string;
  userAvatar: string | null;
  rating: number;
  title: string;
  text: string;
  date: number | null;
  isEdited: boolean;
  thumbsUp: number;
  developerReply: DeveloperReply | null;
  appVersion: string | null;
}

/**
 * Data returned from the App Store reviews endpoint
 */
export interface AppStoreReviewsData {
  appId: string;
  reviews: AppStoreReview[];
  pagination: Pagination;
  timing: { total: number };
  creditsUsed: number;
  creditsRemaining: number;
}

/**
 * Response from the App Store reviews endpoint
 */
export type AppStoreReviewsResponse = ApiSuccessResponse<AppStoreReviewsData>;
