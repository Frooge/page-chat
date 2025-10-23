import { useState, useEffect } from 'react';

export interface PageContext {
  url: string;
  title: string;
  content: string;
}

export function usePageContext() {
  const [pageContext, setPageContext] = useState<PageContext | null>(null);

  const fetchPageContext = async () => {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      console.log('Active tab:', tab);
      if (!tab?.id) return;

      const response = await chrome.tabs.sendMessage(tab.id, { type: 'GET_PAGE_CONTEXT' });
      setPageContext(response);
    } catch (error) {
      console.error('Error fetching page context:', error);
    }
  };

  useEffect(() => {
    // Fetch page context on mount
    fetchPageContext();

    // Listen for tab updates (navigation)
    const handleTabUpdate = (tabId: number, changeInfo: any, tab: chrome.tabs.Tab) => {
      if (changeInfo.status === 'complete' && tab.active) {
        fetchPageContext();
      }
    };

    chrome.tabs.onUpdated.addListener(handleTabUpdate);

    // Listen for tab activation (switching tabs)
    const handleTabActivated = (activeInfo: any) => {
      fetchPageContext();
    };

    chrome.tabs.onActivated.addListener(handleTabActivated);

    return () => {
      chrome.tabs.onUpdated.removeListener(handleTabUpdate);
      chrome.tabs.onActivated.removeListener(handleTabActivated);
    };
  }, []);

  return pageContext;
}
