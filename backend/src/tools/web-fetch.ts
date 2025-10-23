import { tavily } from '@tavily/core';
import { tool } from 'ai';
import { z } from 'zod';

const tavilyClient = tavily({
  apiKey: process.env.TAVILY_API_KEY || '',
});

export const webFetchTool = tool({
  description: 'Fetch and extract content from specific URLs. Use this when the user provides a URL or wants to read content from a specific webpage.',
  inputSchema: z.object({
    urls: z.array(z.url()).describe('One or more URLs to fetch and extract content from'),
  }),
  execute: async ({ urls }) => {
    try {
      const response = await tavilyClient.extract(urls, {
        extractDepth: 'basic',
        format: 'markdown',
        includeImages: false,
      });

      return {
        results: response.results.map((result) => ({
          url: result.url,
          content: result.rawContent,
        })),
        failedResults: response.failedResults?.map((failed) => ({
          url: failed.url,
          error: failed.error,
        })) || [],
      };
    } catch (error) {
      console.error('Web fetch error:', error);
      return {
        error: 'Failed to fetch web content',
        message: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  },
});
