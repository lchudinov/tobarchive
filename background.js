// background.js

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(`background script received request`, request);
  const { url } = request;
  chrome.downloads.download({ url });
});

chrome.browserAction.onClicked.addListener(
  (tab) => {
    chrome.tabs.sendMessage(tab.id, { action: 'download' }, (response) => {
      console.log(`response received request`, response);
      const { url, filename } = response;
      chrome.downloads.download({ url, filename });
    });
  }
);
