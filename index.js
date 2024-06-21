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
      const preHref = `/${appData.group.login}/${appData.book.slug}`;
      appData.book.toc.slice(0, 30).forEach((item) => {
        if (item.type === "DOC") {
          const url = `${preHref}/${item.url}/markdown?attachment=true&latexcode=true&anchor=true&linebreak=true`;
          const a = document.createElement("a");
          a.href = url;
          a.download = `${item.title}.md`;
          a.innerText = item.title;
          document.body.appendChild(a);
          a.click();
        }
      });
    },
    world: "MAIN",
  });
}
