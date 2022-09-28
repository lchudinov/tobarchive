const selector = '#MainPlaceHolder__storageViewerControl_DeepZoomImageViewer_seadragonContainer div div div img';
const inputSelector = '#MainPlaceHolder__storageViewerControl_FilesDropDownList_I';
chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {
    if (request.action === 'download') {
      const image = document.querySelector(selector);
      const input = document.querySelector(inputSelector);
      if (image && input) {
        console.log(`image found src = ${image.src}, file ${input.value}`);
        sendResponse({ url: image.src, filename: input.value.toLowerCase() });
      } else {
        console.log(`image not found`);
      }
    }
  }
);

