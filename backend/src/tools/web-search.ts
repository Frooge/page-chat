import { tavily } from '@tavily/core';
import { tool } from 'ai';
import { z } from 'zod';

const tavilyClient = tavily({
  apiKey: process.env.TAVILY_API_KEY || '',
});

export const webSearchTool = tool({
  description: 'Search the web for current information, news, facts, or any information not in your knowledge base. Use this when you need up-to-date information or when the user asks about recent events.',
  inputSchema: z.object({
    query: z.string().describe('The search query to look up on the web'),
  }),
  execute: async ({ query }) => {
    try {
      const response = await tavilyClient.search(query, {
        maxResults: 5,
        searchDepth: 'basic',
        includeAnswer: true,
        includeImages: false,
        includeRawContent: false,
      });

      return {
        answer: response.answer,
        results: response.results.map((result) => ({
          title: result.title,
          url: result.url,
          content: result.content,
          score: result.score,
        })),
      };
    } catch (error) {
      console.error('Web search error:', error);
      return {
        error: 'Failed to perform web search',
        message: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  },
});
