chrome.tabs.onHighlighted.addListener((res) => {
  chrome.tabs.get(res.tabIds[0], function (tab) {
    if (tab.url && tab.url.includes("https://www.yuque.com/")) {
      chrome.action.setIcon({
        tabId: tab.id,
        path: "./final1.png",
      });
      chrome.action.enable(tab.id);
    } else {
      chrome.action.disable(tab.id);
    }
  });
});
