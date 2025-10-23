export interface PageContext {
  url: string;
  title: string;
  content: string;
}

export function getSystemPrompt(pageContext?: PageContext): string {
  const basePrompt = `You are a helpful AI assistant integrated into a Chrome browser extension called "Page Chat". Your purpose is to help users with research, answer questions, and provide assistance while they browse the web. You can analyze web pages, summarize content, answer questions about what they're viewing, and help with general knowledge queries.

Be concise, accurate, and helpful in your responses.`;

  if (!pageContext) {
    return basePrompt;
  }

  return `${basePrompt}

Currently, the user is viewing a web page. Here is the context:

URL: ${pageContext.url}
Title: ${pageContext.title}

Page Content:
${pageContext.content}

Use this page context to provide relevant and helpful responses about what the user is viewing.`;
}

