import type { ApiSuccessResponse } from './common.js';
import type { ScrapeOptions, PageMetadata, PageLinks, CrawlStats, ActionResult } from './scrape.js';

/**
 * Options for extracting structured data from a URL
 */
export interface ExtractOptions extends ScrapeOptions {
  /** Custom extraction prompt (max 2000 chars). Helps guide the LLM on what to extract. */
  prompt?: string;
}

/**
 * Parameters for the extract endpoint
 */
export interface ExtractParams {
  /** URL to scrape and extract from */
  url: string;
  /** JSON Schema defining the structure for LLM extraction */
  schema: Record<string, unknown>;
  /** Extract options */
  options?: ExtractOptions;
}

/**
 * Data returned from the extract endpoint
 * @template T - The type of the extracted JSON data based on the provided schema
 */
export interface ExtractData<T = unknown> {
  /** Original requested URL */
  url: string;
  /** Final URL after redirects */
  finalUrl: string;
  /** Cleaned, readable markdown content */
  markdown: string;
  /** Cleaned HTML (main content only) */
  html: string;
  /** Original unprocessed HTML */
  rawHtml: string;
  /** LLM-extracted structured data based on provided schema */
  json: T;
  /** Page metadata */
  metadata: PageMetadata;
  /** Internal and external links */
  links: PageLinks;
  /** Processing time statistics */
  stats: CrawlStats;
  /** Embedded data from Next.js, Nuxt.js, Notion, etc. */
  embeddedData?: Record<string, unknown> | null;
  /** Results of browser actions (if any were executed) */
  actionResults?: ActionResult[];
  /** Credits charged for this operation */
  creditsUsed: number;
  /** Remaining credits after operation */
  creditsRemaining: number;
}

/**
 * Response from the extract endpoint
 * @template T - The type of the extracted JSON data based on the provided schema
 */
export type ExtractResponse<T = unknown> = ApiSuccessResponse<ExtractData<T>>;
