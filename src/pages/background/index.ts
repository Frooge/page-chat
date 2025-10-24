const GOOGLE_ORIGIN = 'https://www.google.com';

chrome.runtime.onStartup.addListener(async () => {
    console.log(`onStartup()`);
});

chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));