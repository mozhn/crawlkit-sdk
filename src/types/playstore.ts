import type { ApiSuccessResponse } from './common.js';

/**
 * Options for fetching Play Store reviews
 */
export interface PlayStoreReviewsOptions {
  /** Language code (e.g., 'en', 'tr') */
  lang?: string;
  /** Request timeout in milliseconds (default: 30000) */
  timeout?: number;
}

/**
 * Parameters for the Play Store reviews endpoint
 */
export interface PlayStoreReviewsParams {
  /** App ID (e.g., 'com.example.app') */
  appId: string;
  /** Pagination cursor from previous response */
  cursor?: string | null;
  /** Options */
  options?: PlayStoreReviewsOptions;
}

/**
 * Developer reply to a review
 */
export interface DeveloperReply {
  author: string;
  text: string;
  date: number | null;
}

/**
 * Play Store review
 */
export interface PlayStoreReview {
  id: string;
  username: string;
  userAvatar: string | null;
  rating: number;
  text: string;
  date: number | null;
  thumbsUp: number;
  developerReply: DeveloperReply | null;
  appVersion: string | null;
}

/**
 * Pagination information
 */
export interface Pagination {
  nextCursor: string | null;
  hasMore: boolean;
}

/**
 * Data returned from the Play Store reviews endpoint
 */
export interface PlayStoreReviewsData {
  appId: string;
  reviews: PlayStoreReview[];
  pagination: Pagination;
  timing: { total: number };
  creditsUsed: number;
  creditsRemaining: number;
}

/**
 * Response from the Play Store reviews endpoint
 */
export type PlayStoreReviewsResponse = ApiSuccessResponse<PlayStoreReviewsData>;

/**
 * Options for fetching Play Store app details
 */
export interface PlayStoreDetailOptions {
  /** Language code (e.g., 'en', 'tr') */
  lang?: string;
  /** Request timeout in milliseconds (default: 30000) */
  timeout?: number;
}

/**
 * Parameters for the Play Store detail endpoint
 */
export interface PlayStoreDetailParams {
  /** App ID (e.g., 'com.example.app') */
  appId: string;
  /** Options */
  options?: PlayStoreDetailOptions;
}

/**
 * Screenshot information
 */
export interface Screenshot {
  url: string;
  width: number | null;
  height: number | null;
}

/**
 * Rating distribution (star counts)
 */
export interface RatingDistribution {
  5: number;
  4: number;
  3: number;
  2: number;
  1: number;
}

/**
 * Developer information
 */
export interface Developer {
  name: string;
  id: string | null;
  website: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
}

/**
 * App permission
 */
export interface Permission {
  name: string;
  icon: string | null;
  details: string[];
}

/**
 * Data safety information
 */
export interface DataSafety {
  sharedData: string[] | null;
  collectedData: string[] | null;
  encrypted: boolean;
  deletable: boolean;
}

/**
 * Data returned from the Play Store detail endpoint
 */
export interface PlayStoreDetailData {
  appId: string;
  appName: string;
  icon: string | null;
  summary: string | null;
  description: string | null;
  screenshots: Screenshot[];
  category: string | null;
  categoryId: string | null;
  rating: number | null;
  ratingCount: number | null;
  reviewCount: number | null;
  ratingDistribution: RatingDistribution | null;
  installs: string | null;
  installsExact: number | null;
  free: boolean;
  price: string | null;
  currency: string | null;
  contentRating: string | null;
  contentRatingDescription: string | null;
  developer: Developer;
  releaseDate: number | null;
  lastUpdate: number | null;
  version: string | null;
  androidVersion: string | null;
  whatsNew: string | null;
  permissions: Permission[];
  dataSafety: DataSafety | null;
  privacyPolicy: string | null;
  timing: { total: number };
  creditsUsed: number;
  creditsRemaining: number;
}

/**
 * Response from the Play Store detail endpoint
 */
export type PlayStoreDetailResponse = ApiSuccessResponse<PlayStoreDetailData>;
