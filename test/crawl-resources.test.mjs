import assert from 'node:assert/strict';
import test from 'node:test';

import { CrawlKit } from '../dist/index.js';

function jsonResponse(data) {
  return new Response(
    JSON.stringify({
      success: true,
      data,
    }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }
  );
}

test('tiktok.profile sends request to the correct endpoint', async () => {
  let requestUrl = '';
  let requestInit;

  const client = new CrawlKit({
    apiKey: 'ck_test_key',
    baseUrl: 'https://api.example.com',
    fetch: async (url, init) => {
      requestUrl = String(url);
      requestInit = init;
      return jsonResponse({
        profile: { id: '123', username: 'nike' },
        timing: { total: 10 },
        creditsUsed: 1,
        creditsRemaining: 99,
      });
    },
  });

  const result = await client.tiktok.profile({
    username: 'nike',
    options: { timeout: 10000 },
  });

  assert.equal(requestUrl, 'https://api.example.com/v1/crawl/tiktok/profile');
  assert.equal(requestInit?.method, 'POST');
  assert.deepEqual(JSON.parse(requestInit?.body ?? '{}'), {
    username: 'nike',
    options: { timeout: 10000 },
  });
  assert.equal(result.profile.username, 'nike');
});

test('tiktok.content sends request to the correct endpoint', async () => {
  let requestUrl = '';
  let requestInit;

  const client = new CrawlKit({
    apiKey: 'ck_test_key',
    baseUrl: 'https://api.example.com',
    fetch: async (url, init) => {
      requestUrl = String(url);
      requestInit = init;
      return jsonResponse({
        post: { id: '987', mediaType: 'video' },
        timing: { total: 22 },
        creditsUsed: 1,
        creditsRemaining: 98,
      });
    },
  });

  const result = await client.tiktok.content({
    url: 'https://www.tiktok.com/@nike/video/987',
  });

  assert.equal(requestUrl, 'https://api.example.com/v1/crawl/tiktok/post');
  assert.equal(requestInit?.method, 'POST');
  assert.deepEqual(JSON.parse(requestInit?.body ?? '{}'), {
    url: 'https://www.tiktok.com/@nike/video/987',
  });
  assert.equal(result.post.id, '987');
});

test('tiktok.posts sends cursor and secUid correctly', async () => {
  let requestUrl = '';
  let requestInit;

  const client = new CrawlKit({
    apiKey: 'ck_test_key',
    baseUrl: 'https://api.example.com',
    fetch: async (url, init) => {
      requestUrl = String(url);
      requestInit = init;
      return jsonResponse({
        posts: [{ id: 'post1' }],
        pagination: { cursor: '15', hasMore: true, total: 1, secUid: 'sec-1' },
        timing: { total: 40 },
        creditsUsed: 1,
        creditsRemaining: 97,
      });
    },
  });

  const result = await client.tiktok.posts({
    username: 'nike',
    cursor: 15,
    secUid: 'sec-1',
  });

  assert.equal(requestUrl, 'https://api.example.com/v1/crawl/tiktok/posts');
  assert.equal(requestInit?.method, 'POST');
  assert.deepEqual(JSON.parse(requestInit?.body ?? '{}'), {
    username: 'nike',
    cursor: 15,
    secUid: 'sec-1',
  });
  assert.equal(result.posts.length, 1);
});

test('appstore.appstoreDetail sends request to detail endpoint', async () => {
  let requestUrl = '';
  let requestInit;

  const client = new CrawlKit({
    apiKey: 'ck_test_key',
    baseUrl: 'https://api.example.com',
    fetch: async (url, init) => {
      requestUrl = String(url);
      requestInit = init;
      return jsonResponse({
        appId: '1492793493',
        appName: 'Example App',
        rating: 4.7,
      });
    },
  });

  const result = await client.appstore.appstoreDetail({
    appId: '1492793493',
    options: { lang: 'en' },
  });

  assert.equal(requestUrl, 'https://api.example.com/v1/crawl/appstore/detail');
  assert.equal(requestInit?.method, 'POST');
  assert.deepEqual(JSON.parse(requestInit?.body ?? '{}'), {
    appId: '1492793493',
    options: { lang: 'en' },
  });
  assert.equal(result.appName, 'Example App');
});
