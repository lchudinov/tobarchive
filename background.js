// background.js

chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {
    console.log(`response received request`, request);
    if (typeof request === 'object' && typeof request.url === 'string' && typeof request.filename === 'string') {
      const { url, filename } = request;
      console.log(`url ${url} filename ${filename}`);
      const saveAs = false;
      chrome.downloads.download({ url,  filename, saveAs }, (arg) => console.log(`downloading`, arg, chrome.runtime.lastError));
    } else {
      console.log(`bad request`);
    }
  }
);

const findImage = function () {
  const selector = '#MainPlaceHolder__storageViewerControl_DeepZoomImageViewer_seadragonContainer div div div img';
  const inputSelector = '#MainPlaceHolder__storageViewerControl_FilesDropDownList_I';
  const image = document.querySelector(selector);
  const input = document.querySelector(inputSelector);
  if (image && input) {
    console.log(`image found src = ${image.src}, file ${input.value}`);
    chrome.runtime.sendMessage({ url: image.src, filename: input.value.toLowerCase().replaceAll('\\', '_') })
  } else {
    console.log(`image not found`);
  }
}

chrome.action.onClicked.addListener(
  (tab) => {
    console.log(`extension icon clicked`);
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: findImage
    });
  }
);
