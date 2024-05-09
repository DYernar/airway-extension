krisha_url = "https://krisha.kz/a/show/"
kolesa_url = "https://kolesa.kz/a/show/"


chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    getTabInfo(tabId);
});

function getTabInfo(tabId) {
  chrome.tabs.get(tabId, function(tab) {
    url = tab.url;
    if (url && url.includes(krisha_url)) {
      console.log("Adding air quality to krisha.kz page", url);
      chrome.tabs.sendMessage(tabId, {
        event: "new_url_krisha",
        url: url
      });
    }
    if (url && url.includes(kolesa_url)) {
      console.log("Adding air quality to kolesa.kz page", url);
      chrome.tabs.sendMessage(tabId, {
        event: "new_url_kolesa",
        url: url
      });
    }
  });
}

