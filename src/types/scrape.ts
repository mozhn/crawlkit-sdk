import type { ApiSuccessResponse } from './common.js';

/**
 * Browser action: wait for specified milliseconds
 */
export interface WaitAction {
  type: 'wait';
  /** Milliseconds to wait (100-30000) */
  milliseconds: number;
}

/**
 * Browser action: click an element
 */
export interface ClickAction {
  type: 'click';
  /** CSS selector of element to click */
  selector: string;
}

/**
 * Browser action: type text into an input
 */
export interface TypeAction {
  type: 'type';
  /** CSS selector of input element */
  selector: string;
  /** Text to type into the element */
  text: string;
}

/**
 * Browser action: press a key
 */
export interface PressAction {
  type: 'press';
  /** Key to press (Enter, Tab, Escape, ArrowDown, etc.) */
  key: string;
}

/**
 * Browser action: scroll the page
 */
export interface ScrollAction {
  type: 'scroll';
  /** Scroll direction */
  direction: 'up' | 'down';
}

/**
 * Browser action: execute JavaScript
 */
export interface EvaluateAction {
  type: 'evaluate';
  /** JavaScript code to execute in browser context */
  script: string;
}

/**
 * Union type for all browser actions
 */
export type BrowserAction =
  | WaitAction
  | ClickAction
  | TypeAction
  | PressAction
  | ScrollAction
  | EvaluateAction;

/**
 * Options for scraping a URL
 */
export interface ScrapeOptions {
  /** Request timeout in milliseconds (1000-300000, default: 30000) */
  timeout?: number;
  /** Additional HTTP headers */
  headers?: Record<string, string>;
  /** CSS selector or milliseconds to wait before extracting content. Forces browser rendering. */
  waitFor?: string | number;
  /** Browser actions to execute in order. Forces browser rendering. Max 50 actions. */
  actions?: BrowserAction[];
  /** Extract only main content - removes boilerplate, navigation, etc. (default: true) */
  onlyMainContent?: boolean;
  /** Custom CSS selector to extract specific content */
  contentSelector?: string;
}

/**
 * Parameters for the scrape endpoint
 */
export interface ScrapeParams {
  /** URL to scrape */
  url: string;
  /** Scrape options */
  options?: ScrapeOptions;
}

/**
 * Page metadata extracted from the scraped page
 */
export interface PageMetadata {
  title: string | null;
  description: string | null;
  language: string | null;
  ogImage: string | null;
  ogTitle: string | null;
  ogDescription: string | null;
  siteName: string | null;
  favicon: string | null;
  author: string | null;
  publishedTime: string | null;
  modifiedTime: string | null;
  keywords: string[];
  canonical: string | null;
  robots: string | null;
}

/**
 * Links found on the scraped page
 */
export interface PageLinks {
  internal: string[];
  external: string[];
}

/**
 * Processing time statistics
 */
export interface CrawlStats {
  fetchTime: number;
  cleaningTime: number;
  extractionTime: number;
  conversionTime: number;
  llmTime: number | null;
  totalTime: number;
}

/**
 * Result of a browser action execution
 */
export interface ActionResult {
  type: string;
  success: boolean;
  duration: number;
  value?: unknown;
  error?: string;
}

/**
 * Data returned from the scrape endpoint
 */
export interface ScrapeData {
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
  /** LLM-extracted data (null for scrape, populated for extract) */
  json: Record<string, unknown> | null;
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
 * Response from the scrape endpoint
 */
export type ScrapeResponse = ApiSuccessResponse<ScrapeData>;
