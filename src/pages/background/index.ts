const GOOGLE_ORIGIN = 'https://www.google.com';

console.log('Background script loaded', chrome.sidePanel);
console.log('chrome.tabs:', chrome.tabs);

chrome.runtime.onStartup.addListener(async () => {
    console.log(`onStartup()`);
});

chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));