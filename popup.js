
var bkg = chrome.extension.getBackgroundPage();

function login() {
console.log("hiiiii");

var apiUrl="http://localhost:3000/api/v1/sessions"
 var xmlHttp = new XMLHttpRequest();
	xmlHttp.open( "POST", apiUrl, false ); // false for synchronous request
    xmlHttp.setRequestHeader("Content-Type", "application/json");
	xmlHttp.send(JSON.stringify({session:{email:"apis123@api.com",password:"password"}}));
	 // document.getElementById('login').textContent = xmlHttp.responseText;
  

var data=xmlHttp.responseText;
var jsonResponse = JSON.parse(data);
//console.log(jsonResponse);

var user=jsonResponse["user"];
var token=user["auth_token"];
console.log(token);



// var jsonResponse = JSON.parse(xmlHttp.responseText);

// alert(JSON.stringify(jsonResponse));

// var token=jsonResponse["auth_token"];
// //alert(token);

// document.getElementById('login').textContent = token;
  




//   var arr = xmlhttp.responseText.Split(',');



// document.getElementById('login').textContent = arr[2];

saveToken(token)
  
   return xmlHttp.responseText;



   
    // document.getElementById('login').textContent = "login here";
}



document.getElementById('log-in').onclick = login;
document.getElementById('get-token').onclick = getToken;
document.getElementById('delete-token').onclick = deleteToken;

function getToken() {

   chrome.storage.sync.get('token',function(item){


console.log(item["token"]);
document.getElementById('login').textContent = item;

   });
      }


function deleteToken() {
	console.log("delete");

chrome.storage.sync.clear(function() {
    var error = chrome.runtime.lastError;
    if (error) {
        console.error(error);
    }
});
      }






function saveToken(token) {
        // Get a value saved in a form.
     
        // Check that there's some code there.
        if (!token) {
         // message('Error: No value specified');
         console.log("not saved")
          return;
        }
        // Save it using the Chrome extension storage API.
        chrome.storage.sync.set({'token': token}, function() {
          // Notify that we saved.
          console.log("token saved")
         // message('Settings saved');
        });
      }