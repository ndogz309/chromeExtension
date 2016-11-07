// background script can not access current but has access to all chrome APIs
var apiUrl="http://localhost:3000/api/v1/links"

// Called when the user clicks on the browser action.


chrome.browserAction.onClicked.addListener(function(tab) {

  // Send a message to the active tab
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});

 chrome.tabs.getSelected(null, function(tab) {
       //var tabId = tab.id;
        tabUrl = tab.url;

        alert(tab.url);
        saveLink(tabUrl);
    });
  });
});


function saveLink(linkUrl){

alert("hi there");

 var xmlHttp = new XMLHttpRequest();


    xmlHttp.open( "POST", apiUrl, false ); // false for synchronous request
    xmlHttp.setRequestHeader("Authorization", "eVWzUzLJxwaTdzeyafQA");
    xmlHttp.setRequestHeader("Content-Type", "application/json");
  //  xmlHttp.send(link);
  xmlHttp.send(JSON.stringify({link:{url:linkUrl}}));


  
alert(xmlHttp.responseText);

    return xmlHttp.responseText;


};
