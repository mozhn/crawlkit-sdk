# CrawlKit SDK

[![npm version](https://img.shields.io/npm/v/@crawlkit-sh/sdk.svg)](https://www.npmjs.com/package/@crawlkit-sh/sdk)
[![npm downloads](https://img.shields.io/npm/dm/@crawlkit-sh/sdk.svg)](https://www.npmjs.com/package/@crawlkit-sh/sdk)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> Official TypeScript/JavaScript SDK for [CrawlKit](https://crawlkit.sh) - the modern web scraping API

Turn any website into structured data with a single API call. CrawlKit handles proxies, JavaScript rendering, anti-bot detection, and data extraction so you can focus on building.

## Features

- **Web Scraping** - Convert any webpage to clean Markdown, HTML, or raw content
- **AI Data Extraction** - Extract structured data using JSON Schema with LLM
- **Web Search** - Search the web programmatically
- **Screenshots** - Capture full-page screenshots
- **LinkedIn Scraping** - Scrape company profiles and person profiles
- **Instagram Scraping** - Scrape profiles and posts/reels
- **App Store Data** - Fetch reviews and details from Google Play & Apple App Store
- **Browser Automation** - Click, type, scroll, and execute JavaScript
- **TypeScript First** - Full type safety with comprehensive type definitions
- **Zero Dependencies** - Uses native fetch, works in Node.js 18+ and browsers

## Installation

```bash
npm install @crawlkit-sh/sdk
```

```bash
yarn add @crawlkit-sh/sdk
```

```bash
pnpm add @crawlkit-sh/sdk
```

## Quick Start

```typescript
import { CrawlKit } from '@crawlkit-sh/sdk';

const crawlkit = new CrawlKit({ apiKey: 'ck_your_api_key' });

// Scrape a webpage
const page = await crawlkit.scrape({ url: 'https://example.com' });
console.log(page.markdown);
console.log(page.metadata.title);
```

Get your API key at [crawlkit.sh](https://crawlkit.sh)

## Examples

### Web Scraping

Scrape any webpage and get clean, structured content:

```typescript
const result = await crawlkit.scrape({
  url: 'https://example.com/blog/article',
  options: {
    onlyMainContent: true,  // Remove navigation, footers, etc.
    waitFor: '#content',    // Wait for element before scraping
  }
});

console.log(result.markdown);           // Clean markdown content
console.log(result.html);               // Cleaned HTML
console.log(result.metadata.title);     // Page title
console.log(result.metadata.author);    // Author if available
console.log(result.links.internal);     // Internal links found
console.log(result.links.external);     // External links found
```

### AI-Powered Data Extraction

Extract structured data from any page using JSON Schema:

```typescript
interface Product {
  name: string;
  price: number;
  currency: string;
  description: string;
  inStock: boolean;
  reviews: { rating: number; count: number };
}

const result = await crawlkit.extract<Product>({
  url: 'https://example.com/product/123',
  schema: {
    type: 'object',
    properties: {
      name: { type: 'string' },
      price: { type: 'number' },
      currency: { type: 'string' },
      description: { type: 'string' },
      inStock: { type: 'boolean' },
      reviews: {
        type: 'object',
        properties: {
          rating: { type: 'number' },
          count: { type: 'number' }
        }
      }
    }
  },
  options: {
    prompt: 'Extract product information from this e-commerce page'
  }
});

// TypeScript knows result.json is Product
console.log(`${result.json.name}: $${result.json.price}`);
console.log(`In stock: ${result.json.inStock}`);
```

### Browser Automation

Handle SPAs, dynamic content, and interactive pages:

```typescript
const result = await crawlkit.scrape({
  url: 'https://example.com/spa',
  options: {
    waitFor: '.content-loaded',
    actions: [
      { type: 'click', selector: '#accept-cookies' },
      { type: 'wait', milliseconds: 1000 },
      { type: 'click', selector: '#load-more' },
      { type: 'scroll', direction: 'down' },
      { type: 'type', selector: '#search', text: 'query' },
      { type: 'press', key: 'Enter' },
      { type: 'wait', milliseconds: 2000 },
    ]
  }
});
```

### Web Search

Search the web and get structured results:

```typescript
const result = await crawlkit.search({
  query: 'typescript best practices 2024',
  options: {
    maxResults: 20,
    timeRange: 'm',  // Past month: 'd', 'w', 'm', 'y'
    region: 'us-en'
  }
});

for (const item of result.results) {
  console.log(`${item.position}. ${item.title}`);
  console.log(`   ${item.url}`);
  console.log(`   ${item.snippet}\n`);
}
```

### Screenshots

Capture full-page screenshots:

```typescript
const result = await crawlkit.screenshot({
  url: 'https://example.com',
  options: {
    width: 1920,
    height: 1080,
    waitForSelector: '#main-content'
  }
});

console.log('Screenshot URL:', result.url);
```

### LinkedIn Scraping

Scrape LinkedIn company and person profiles:

```typescript
// Company profile
const company = await crawlkit.linkedin.company({
  url: 'https://www.linkedin.com/company/openai',
  options: { includeJobs: true }
});

console.log(company.company.name);
console.log(company.company.industry);
console.log(company.company.followers);
console.log(company.company.description);
console.log(company.company.employees);
console.log(company.company.jobs);

// Person profiles (batch up to 10)
const people = await crawlkit.linkedin.person({
  url: [
    'https://www.linkedin.com/in/user1',
    'https://www.linkedin.com/in/user2'
  ]
});

console.log(`Success: ${people.successCount}, Failed: ${people.failedCount}`);
people.persons.forEach(p => console.log(p.person));
```

### Instagram Scraping

Scrape Instagram profiles and content:

```typescript
// Profile
const profile = await crawlkit.instagram.profile({
  username: 'instagram'
});

console.log(profile.profile.full_name);
console.log(profile.profile.follower_count);
console.log(profile.profile.following_count);
console.log(profile.profile.biography);
console.log(profile.profile.posts);  // Recent posts

// Post/Reel content
const post = await crawlkit.instagram.content({
  shortcode: 'CxIIgCCq8mg'  // or full URL
});

console.log(post.post.like_count);
console.log(post.post.comment_count);
console.log(post.post.video_url);
console.log(post.post.caption);
```

### App Store Data

Fetch app reviews and details:

```typescript
// Google Play Store reviews with pagination
let cursor: string | null = null;
do {
  const reviews = await crawlkit.appstore.playstoreReviews({
    appId: 'com.example.app',
    cursor,
    options: { lang: 'en' }
  });

  reviews.reviews.forEach(r => {
    console.log(`${r.rating}/5: ${r.text}`);
    if (r.developerReply) {
      console.log(`  Reply: ${r.developerReply.text}`);
    }
  });

  cursor = reviews.pagination.nextCursor;
} while (cursor);

// Google Play Store app details
const details = await crawlkit.appstore.playstoreDetail({
  appId: 'com.example.app'
});

console.log(details.appName);
console.log(details.rating);
console.log(details.installs);
console.log(details.description);

// Apple App Store reviews
const iosReviews = await crawlkit.appstore.appstoreReviews({
  appId: '123456789'
});
```

## Error Handling

The SDK provides typed error classes for different scenarios:

```typescript
import {
  CrawlKit,
  CrawlKitError,
  AuthenticationError,
  InsufficientCreditsError,
  ValidationError,
  RateLimitError,
  TimeoutError,
  NotFoundError,
  NetworkError
} from '@crawlkit-sh/sdk';

try {
  const result = await crawlkit.scrape({ url: 'https://example.com' });
} catch (error) {
  if (error instanceof AuthenticationError) {
    console.log('Invalid API key');
  } else if (error instanceof InsufficientCreditsError) {
    console.log(`Not enough credits. Available: ${error.creditsRemaining}`);
  } else if (error instanceof RateLimitError) {
    console.log('Rate limit exceeded, please slow down');
  } else if (error instanceof TimeoutError) {
    console.log('Request timed out');
  } else if (error instanceof ValidationError) {
    console.log(`Invalid request: ${error.message}`);
  } else if (error instanceof NetworkError) {
    console.log(`Network error [${error.code}]: ${error.message}`);
  } else if (error instanceof CrawlKitError) {
    console.log(`API Error [${error.code}]: ${error.message}`);
    console.log(`Status: ${error.statusCode}`);
    if (error.creditsRefunded) {
      console.log(`Credits refunded: ${error.creditsRefunded}`);
    }
  }
}
```

## Configuration

```typescript
const crawlkit = new CrawlKit({
  // Required: Your API key (get it at crawlkit.sh)
  apiKey: 'ck_your_api_key',

  // Optional: Custom base URL (default: https://api.crawlkit.sh)
  baseUrl: 'https://api.crawlkit.sh',

  // Optional: Default timeout in ms (default: 30000)
  timeout: 60000,

  // Optional: Custom fetch implementation
  fetch: customFetch
});
```

## Credit Costs

| Operation | Credits |
|-----------|---------|
| `scrape()` | 1 |
| `extract()` | 5 |
| `search()` | 1 per page (~10 results) |
| `screenshot()` | 1 |
| `linkedin.company()` | 1 |
| `linkedin.person()` | 3 per URL |
| `instagram.profile()` | 1 |
| `instagram.content()` | 1 |
| `appstore.playstoreReviews()` | 1 per page |
| `appstore.playstoreDetail()` | 1 |
| `appstore.appstoreReviews()` | 1 per page |

## TypeScript Support

This SDK is written in TypeScript and provides comprehensive type definitions for all methods and responses. Enable strict mode in your `tsconfig.json` for the best experience:

```json
{
  "compilerOptions": {
    "strict": true
  }
}
```

## Requirements

- Node.js 18.0.0 or higher (for native fetch support)
- Or any modern browser with fetch support

## Documentation

For detailed API documentation and guides, visit [docs.crawlkit.sh](https://docs.crawlkit.sh)

## Support

- [GitHub Issues](https://github.com/mozhn/crawlkit-sdk/issues)
- [Documentation](https://docs.crawlkit.sh)
- Email: support@crawlkit.sh

## License

MIT License - see [LICENSE](LICENSE) for details.

---

Built with love by [CrawlKit](https://crawlkit.sh)
