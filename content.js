//content script can access current page cans access chrome apis e.g. page clicks





// content.js
// var firstHref = $("a[href^='http']").eq(0).attr("href");
// console.log("teeeeeeeeeeeeeeeest")
// console.log(firstHref);


// chrome.runtime.onMessage.addListener(
//   function(request, sender, sendResponse) {
//     if( request.message === "clicked_browser_action" ) {
//       var firstHref = $("a[href^='http']").eq(0).attr("href");

   
//       console.log(firstHref);
	

//     }
//   }
// );