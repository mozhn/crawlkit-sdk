import type { ApiSuccessResponse } from './common.js';

/**
 * Options for scraping a LinkedIn company profile
 */
export interface LinkedInCompanyOptions {
  /** Page load timeout in milliseconds (5000-60000, default: 30000) */
  timeout?: number;
  /** Whether to fetch job listings (default: true) */
  includeJobs?: boolean;
}

/**
 * Parameters for the LinkedIn company endpoint
 */
export interface LinkedInCompanyParams {
  /** LinkedIn company URL (e.g., https://www.linkedin.com/company/openai/) */
  url: string;
  /** Options */
  options?: LinkedInCompanyOptions;
}

/**
 * LinkedIn employee information
 */
export interface LinkedInEmployee {
  name: string;
  photoUrl: string | null;
  linkedinUrl: string;
}

/**
 * LinkedIn job listing
 */
export interface LinkedInJob {
  title: string;
  jobUrl: string;
  jobId: string | null;
  location: string | null;
  postedTime: string | null;
}

/**
 * Similar company information
 */
export interface LinkedInSimilarCompany {
  name: string;
  industry: string | null;
  location: string | null;
  logoUrl: string | null;
  linkedinUrl: string;
}

/**
 * LinkedIn company post
 */
export interface LinkedInPost {
  content: string | null;
  postUrl: string;
  timeAgo: string | null;
  reactions: number;
  comments: number;
  imageUrls: string[];
}

/**
 * LinkedIn company profile data
 */
export interface LinkedInCompany {
  name: string;
  industry: string | null;
  location: string | null;
  followers: number | null;
  slogan: string | null;
  logoUrl: string | null;
  coverImageUrl: string | null;
  description: string | null;
  website: string | null;
  companySize: string | null;
  headquarters: string | null;
  companyType: string | null;
  foundedYear: number | null;
  specialties: string[];
  employees: LinkedInEmployee[];
  locations: string[];
  similarCompanies: LinkedInSimilarCompany[];
  recentPosts: LinkedInPost[];
  jobs: LinkedInJob[];
  linkedinUrl: string;
  scrapedAt: string;
}

/**
 * Data returned from the LinkedIn company endpoint
 */
export interface LinkedInCompanyData {
  company: LinkedInCompany;
  timing: { total: number };
  creditsUsed: number;
  creditsRemaining: number;
}

/**
 * Response from the LinkedIn company endpoint
 */
export type LinkedInCompanyResponse = ApiSuccessResponse<LinkedInCompanyData>;

/**
 * Parameters for the LinkedIn person endpoint
 */
export interface LinkedInPersonParams {
  /** Single LinkedIn profile URL or array of URLs (max 10) */
  url: string | string[];
}

/**
 * LinkedIn person profile result
 */
export interface LinkedInPersonResult {
  url: string;
  person: Record<string, unknown>;
}

/**
 * Data returned from the LinkedIn person endpoint
 */
export interface LinkedInPersonData {
  persons: LinkedInPersonResult[];
  failed?: string[];
  totalUrls: number;
  successCount: number;
  failedCount: number;
  timing: { total: number };
  creditsUsed: number;
  creditsRemaining: number;
}

/**
 * Response from the LinkedIn person endpoint
 */
export type LinkedInPersonResponse = ApiSuccessResponse<LinkedInPersonData>;
