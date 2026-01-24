/**
 * Base API success response wrapper
 */
export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
}

/**
 * API error response
 */
export interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
  };
  creditsRefunded?: number;
  creditsRemaining?: number;
}

/**
 * Union type for all API responses
 */
export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

/**
 * Credit information included in successful responses
 */
export interface CreditInfo {
  creditsUsed: number;
  creditsRemaining: number;
}

/**
 * Timing information
 */
export interface Timing {
  total: number;
}

/**
 * API error codes
 */
export type ErrorCode =
  | 'VALIDATION_ERROR'
  | 'INSUFFICIENT_CREDITS'
  | 'TIMEOUT'
  | 'DNS_FAILED'
  | 'CONNECTION_REFUSED'
  | 'SSL_ERROR'
  | 'TOO_MANY_REDIRECTS'
  | 'INVALID_URL'
  | 'PROXY_ERROR'
  | 'PARSE_ERROR'
  | 'RATE_LIMITED'
  | 'NOT_FOUND'
  | 'BLOCKED'
  | 'INSTAGRAM_BLOCKED'
  | 'INSTAGRAM_ERROR'
  | 'UNKNOWN';
