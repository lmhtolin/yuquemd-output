function click() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    getPageVariable(tabs[0].id);
  });
}
document.querySelector("#button-output").addEventListener("click", click);
function getPageVariable(tabId) {
  chrome.scripting.executeScript({
    target: { tabId: tabId },
    function: () => {
      // 这里是window环境了
      const preHref = `https://www.yuque.com/${appData.group.login}/${appData.group.slug}`;
      appData.book.toc.forEach((item) => {
        if (item.type === "DOC") {
          const url = `${preHref}/${item.url}`;
        }
      });
    },
    world: "MAIN",
  });
}
