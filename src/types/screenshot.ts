import type { ApiSuccessResponse } from './common.js';

/**
 * Options for taking a screenshot
 */
export interface ScreenshotOptions {
  /** Viewport width in pixels (320-3840, default: 1920) */
  width?: number;
  /** Viewport height in pixels (240-2160, default: 1080) */
  height?: number;
  /** Page load timeout in milliseconds (1000-60000, default: 30000) */
  timeout?: number;
  /** CSS selector to wait for before taking screenshot */
  waitForSelector?: string;
}

/**
 * Parameters for the screenshot endpoint
 */
export interface ScreenshotParams {
  /** URL to screenshot */
  url: string;
  /** Screenshot options */
  options?: ScreenshotOptions;
}

/**
 * Data returned from the screenshot endpoint
 */
export interface ScreenshotData {
  /** Public URL of the screenshot */
  url: string;
  /** Viewport width used */
  width: number;
  /** Viewport height used */
  height: number;
  /** Timing information */
  timing: { total: number };
  /** Credits charged for this operation */
  creditsUsed: number;
  /** Remaining credits after operation */
  creditsRemaining: number;
}

/**
 * Response from the screenshot endpoint
 */
export type ScreenshotResponse = ApiSuccessResponse<ScreenshotData>;
