function getPageContext() {
  return {
    url: window.location.href,
    title: document.title,
    content: document.body.innerText.slice(0, 50000),
  };
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'GET_PAGE_CONTEXT') {
    sendResponse(getPageContext());
  }
  return true;
});

console.log('content script loaded');
