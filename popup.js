document.getElementById('log-in').onclick = login;
document.getElementById('get-token').onclick = getToken;
document.getElementById('delete-token').onclick = deleteToken;
document.getElementById('save-link').onclick = saveLink;


onload = isSignedIn;
var auth_token;

function saveLink() {

var tabUrl;

 chrome.tabs.getSelected(null, function(tab) {
       //var tabId = tab.id;
        tabUrl = tab.url;

       console.log(tab.url);


var apiUrl="http://localhost:3000/api/v1/links";

 var xmlHttp = new XMLHttpRequest();
	xmlHttp.open( "POST", apiUrl, false ); // false for synchronous request
    xmlHttp.setRequestHeader("Authorization", auth_token);
    xmlHttp.setRequestHeader("Content-Type", "application/json");
  //  xmlHttp.send(link);
  xmlHttp.send(JSON.stringify({link:{url:tabUrl}}));


console.log(xmlHttp.responseText);


if (xmlHttp.status==201){
document.getElementById('login').textContent = "link saved";



}else{

	document.getElementById('login').textContent = "something went wrong, couldnt save url";
}





      });






// chrome.storage.sync.get('token',function(item){

// console.log("heeeeeeere-------")
// console.log(item["token"]);
// token=item["token"];

//    });





    //return xmlHttp.responseText;

      }






function isSignedIn(){
chrome.storage.sync.get('token',function(item){
	if(item["token"]){
		console.log(item["token"]);
		auth_token=item["token"];
		console.log("is logged in");

	document.body.classList.add('signed-in');
     document.body.classList.remove('signed-out');
					}
	else{
		console.log(item["token"]);
		console.log("not logged in");

	document.body.classList.add('signed-out');
      document.body.classList.remove('signed-in');
		}
	});
}



function login() {
var apiUrl="http://localhost:3000/api/v1/sessions"
var email=document.getElementById('email').value;
var password=document.getElementById('password').value;


 var xmlHttp = new XMLHttpRequest();
	xmlHttp.open( "POST", apiUrl, false ); // false for synchronous request
    xmlHttp.setRequestHeader("Content-Type", "application/json");
	//xmlHttp.send(JSON.stringify({session:{email:"apis123@api.com",password:"password"}}));
	xmlHttp.send(JSON.stringify({session:{email:email,password:password}}));
	 // document.getElementById('login').textContent = xmlHttp.responseText;
 
var data=xmlHttp.responseText;
var jsonResponse = JSON.parse(data);
//console.log(jsonResponse);





// var jsonResponse = JSON.parse(xmlHttp.responseText);

// alert(JSON.stringify(jsonResponse));

// var token=jsonResponse["auth_token"];
// //alert(token);

// document.getElementById('login').textContent = token;
  


//   var arr = xmlhttp.responseText.Split(',');



// document.getElementById('login').textContent = arr[2];

if (xmlHttp.status==200){
	var user=jsonResponse["user"];
	var token=user["auth_token"];
	console.log(token);
	console.log("signed in 200");
	document.getElementById('login').textContent = "logged in";

saveToken(token);


}else{
	console.log("cant sign in");
	document.getElementById('login').textContent = "couldnt log in";
}



  
   return xmlHttp.responseText;



   
    // document.getElementById('login').textContent = "login here";
}





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

isSignedIn();

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
          isSignedIn();
         // message('Settings saved');
        });
      }