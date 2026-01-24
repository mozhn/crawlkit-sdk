import type { ApiSuccessResponse } from './common.js';

/**
 * Time range filter for search results
 * - 'd': Past day
 * - 'w': Past week
 * - 'm': Past month
 * - 'y': Past year
 */
export type TimeRange = 'd' | 'w' | 'm' | 'y';

/**
 * Options for web search
 */
export interface SearchOptions {
  /** Language code (e.g., 'tr-TR', 'en-US') */
  language?: string;
  /** Region code (e.g., 'tr-tr', 'us-en', 'de-de') */
  region?: string;
  /** Time filter: d (day), w (week), m (month), y (year), null (any time) */
  timeRange?: TimeRange | null;
  /** Maximum number of results (1-100, default: 30) */
  maxResults?: number;
}

/**
 * Parameters for the search endpoint
 */
export interface SearchParams {
  /** Search query (1-500 characters) */
  query: string;
  /** Search options */
  options?: SearchOptions;
}

/**
 * A single search result
 */
export interface SearchResult {
  /** Result position (1-indexed) */
  position: number;
  /** Result title */
  title: string;
  /** Result URL */
  url: string;
  /** Result snippet/description */
  snippet: string;
}

/**
 * Data returned from the search endpoint
 */
export interface SearchData {
  /** Original search query */
  query: string;
  /** Total number of results returned */
  totalResults: number;
  /** Search results */
  results: SearchResult[];
  /** Timing information */
  timing: { total: number };
  /** Credits charged for this operation */
  creditsUsed: number;
  /** Remaining credits after operation */
  creditsRemaining: number;
}

/**
 * Response from the search endpoint
 */
export type SearchResponse = ApiSuccessResponse<SearchData>;
