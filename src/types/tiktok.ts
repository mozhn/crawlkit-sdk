import type { ApiSuccessResponse } from './common.js';

/**
 * Common options for TikTok crawl endpoints
 */
export interface TikTokOptions {
  /** Request timeout in milliseconds */
  timeout?: number;
}

/**
 * Parameters for scraping a TikTok profile
 */
export interface TikTokProfileParams {
  /** TikTok username (with or without @) */
  username: string;
  /** Options */
  options?: TikTokOptions;
}

/**
 * Parameters for scraping a TikTok post
 */
export interface TikTokPostParams {
  /** TikTok post URL */
  url: string;
  /** Options */
  options?: TikTokOptions;
}

/**
 * Parameters for listing TikTok posts
 */
export interface TikTokPostsParams {
  /** TikTok username (with or without @) */
  username: string;
  /** Pagination cursor from previous response */
  cursor?: number;
  /** Optional secUid from previous response to speed up pagination */
  secUid?: string;
  /** Options */
  options?: TikTokOptions;
}

/**
 * TikTok profile stats
 */
export interface TikTokProfileStats {
  followers: number;
  following: number;
  likes: number;
  videos: number;
  friends?: number;
  digg?: number;
}

/**
 * TikTok profile data
 */
export interface TikTokProfile {
  id: string;
  secUid?: string | null;
  username: string;
  nickname?: string;
  bio?: string;
  bioLink?: string | null;
  avatar?: string;
  verified?: boolean;
  privateAccount?: boolean;
  isOrganization?: boolean;
  commerceUser?: boolean;
  category?: string | null;
  language?: string | null;
  region?: string | null;
  createdAt?: string | null;
  stats?: TikTokProfileStats;
}

/**
 * TikTok post author
 */
export interface TikTokPostAuthor {
  id?: string | null;
  username?: string | null;
  nickname?: string | null;
  avatar?: string | null;
  verified?: boolean;
}

/**
 * TikTok post music info
 */
export interface TikTokPostMusic {
  title?: string | null;
  author?: string | null;
  album?: string | null;
  duration?: number | null;
  coverUrl?: string | null;
}

/**
 * TikTok post video info
 */
export interface TikTokPostVideo {
  duration?: number | null;
  url?: string | null;
  coverUrl?: string | null;
  width?: number | null;
  height?: number | null;
}

/**
 * TikTok post image item
 */
export interface TikTokPostImage {
  index?: number;
  url: string;
  width?: number | null;
  height?: number | null;
}

/**
 * TikTok post stats
 */
export interface TikTokPostStats {
  plays?: number;
  likes?: number;
  comments?: number;
  shares?: number;
  saves?: number;
  reposts?: number;
}

/**
 * TikTok hashtag
 */
export interface TikTokHashtag {
  id: string;
  title: string;
}

/**
 * TikTok post item
 */
export interface TikTokPost {
  id: string;
  postUrl?: string | null;
  description?: string;
  createdAt?: string | null;
  mediaType?: 'video' | 'image';
  author?: TikTokPostAuthor;
  music?: TikTokPostMusic;
  video?: TikTokPostVideo;
  images?: TikTokPostImage[];
  stats?: TikTokPostStats;
  hashtags?: TikTokHashtag[];
  locationCreated?: string | null;
  isAd?: boolean;
}

/**
 * TikTok posts pagination data
 */
export interface TikTokPostsPagination {
  cursor?: string;
  hasMore?: boolean;
  total?: number;
  secUid?: string | null;
}

/**
 * Data returned from the TikTok profile endpoint
 */
export interface TikTokProfileData {
  profile: TikTokProfile;
  timing: { total: number };
  creditsUsed: number;
  creditsRemaining: number;
}

/**
 * Data returned from the TikTok post endpoint
 */
export interface TikTokPostData {
  post: TikTokPost;
  timing: { total: number };
  creditsUsed: number;
  creditsRemaining: number;
}

/**
 * Data returned from the TikTok posts endpoint
 */
export interface TikTokPostsData {
  posts: TikTokPost[];
  pagination: TikTokPostsPagination;
  timing: { total: number };
  creditsUsed: number;
  creditsRemaining: number;
}

/**
 * Response from the TikTok profile endpoint
 */
export type TikTokProfileResponse = ApiSuccessResponse<TikTokProfileData>;

/**
 * Response from the TikTok post endpoint
 */
export type TikTokPostResponse = ApiSuccessResponse<TikTokPostData>;

/**
 * Response from the TikTok posts endpoint
 */
export type TikTokPostsResponse = ApiSuccessResponse<TikTokPostsData>;
