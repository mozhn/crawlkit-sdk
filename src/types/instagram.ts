import type { ApiSuccessResponse } from './common.js';

/**
 * Options for scraping an Instagram profile
 */
export interface InstagramProfileOptions {
  /** Page load timeout in milliseconds (default: 30000) */
  timeout?: number;
}

/**
 * Parameters for the Instagram profile endpoint
 */
export interface InstagramProfileParams {
  /** Instagram username (without @) or profile URL */
  username: string;
  /** Options */
  options?: InstagramProfileOptions;
}

/**
 * Instagram bio link
 */
export interface InstagramBioLink {
  title: string;
  url: string;
  link_type: string;
}

/**
 * Instagram post dimensions
 */
export interface InstagramDimensions {
  height: number;
  width: number;
}

/**
 * Instagram post from profile
 */
export interface InstagramPost {
  id: string;
  shortcode: string;
  display_url: string;
  thumbnail_src: string;
  is_video: boolean;
  video_url: string | null;
  caption: string | null;
  like_count: number;
  comment_count: number;
  taken_at_timestamp: number;
  dimensions: InstagramDimensions;
  video_view_count: number | null;
}

/**
 * Instagram profile data
 */
export interface InstagramProfile {
  id: string;
  username: string;
  full_name: string;
  biography: string | null;
  bio_links: InstagramBioLink[];
  follower_count: number;
  following_count: number;
  media_count: number;
  profile_pic_url: string;
  profile_pic_url_hd: string | null;
  is_verified: boolean;
  is_private: boolean;
  is_business_account: boolean;
  is_professional_account: boolean;
  business_category_name: string | null;
  business_email: string | null;
  business_phone_number: string | null;
  external_url: string | null;
  highlight_reel_count: number;
  posts: InstagramPost[];
}

/**
 * Data returned from the Instagram profile endpoint
 */
export interface InstagramProfileData {
  profile: InstagramProfile;
  timing: { total: number };
  creditsUsed: number;
  creditsRemaining: number;
}

/**
 * Response from the Instagram profile endpoint
 */
export type InstagramProfileResponse = ApiSuccessResponse<InstagramProfileData>;

/**
 * Options for scraping Instagram content
 */
export interface InstagramContentOptions {
  /** Page load timeout in milliseconds (default: 30000) */
  timeout?: number;
}

/**
 * Parameters for the Instagram content endpoint
 */
export interface InstagramContentParams {
  /** Post shortcode or full URL */
  shortcode: string;
  /** Options */
  options?: InstagramContentOptions;
}

/**
 * Instagram content owner information
 */
export interface InstagramContentOwner {
  id: string;
  username: string;
  full_name: string;
  profile_pic_url: string;
  is_verified: boolean;
}

/**
 * Instagram audio information (for reels)
 */
export interface InstagramAudioInfo {
  title: string | null;
  artist_username: string | null;
  is_original: boolean;
}

/**
 * Instagram carousel media item
 */
export interface InstagramCarouselItem {
  id: string;
  media_type: string;
  display_url: string;
  video_url: string | null;
}

/**
 * Instagram post/reel/video content data
 */
export interface InstagramContent {
  id: string;
  shortcode: string;
  taken_at: number;
  media_type: string;
  product_type: string;
  width: number;
  height: number;
  like_count: number;
  comment_count: number;
  caption: string | null;
  has_audio: boolean;
  display_url: string;
  video_url: string | null;
  thumbnail_url: string;
  owner: InstagramContentOwner;
  audio_info: InstagramAudioInfo | null;
  carousel_media: InstagramCarouselItem[] | null;
}

/**
 * Data returned from the Instagram content endpoint
 */
export interface InstagramContentData {
  post: InstagramContent;
  timing: { total: number };
  creditsUsed: number;
  creditsRemaining: number;
}

/**
 * Response from the Instagram content endpoint
 */
export type InstagramContentResponse = ApiSuccessResponse<InstagramContentData>;
