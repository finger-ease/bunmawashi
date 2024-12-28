import { reverseAllTextInPage } from "./services/reverseAllTextInPage";

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "reverseAllTextInPage",
    title: "全てぶんまわす",
    contexts: ["all"],
  });

  chrome.contextMenus.create({
    id: "reverseSelectedText",
    title: "選択したテキストをぶんまわす",
    contexts: ["selection"],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "reverseAllTextInPage" && tab?.id) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: reverseAllTextInPage,
    });
  }

  if (info.menuItemId === "reverseSelectedText") {
    const selection = info.selectionText;

    selection && chrome.windows.create({
      url: `popup.html?message=${encodeURIComponent(selection)}`,
      type: "popup",
      width: 400,
      height: 400,
    });
  }
});
