var triggers_pulled="";
var obstriggers ="";
	const obs = new OBSWebSocket();
	
async function getAllSubs(){

	await obs.connect('ws://localhost:4455');
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString); 
	var first = urlParams.get("YouNowID"); 

if(first !=null){


}
else{
first="";

}

var urls2 = "http://localhost:8080/chat/"+first;

	
	const response = await fetch(urls2);
	const data2 = await response.json();
	singleLine(data2.comments);

	 
}
	function singleLine(sub){
		
		var x=0; 
		var out = "<div style='chat'>"; 
		var temp ='';
		if(sub !=null){
		while(x < sub.length){
		if(lastupdate !="" ){
			
			
			if(sub[x]['timestamp'] > lastupdate ){
			//console.log(sub[x].broadcasterMod);
			//console.log(sub[x]);
		var tims=timeConverter(sub[x]['timestamp']);
		var timeParts = tims.split(":"); 
	
		
			if(!(sub[x].comment.includes("Chat_bot"))){
				out = out +"\n" + "<div> <b>"+sub[x].name +"</b> " +sub[x].comment +"</div> "
				
			}
			
			}
			else{
				
				
			
			}
			if(sub[x].comment.includes("!katie")){
				obsTest("katie");
				
			}
				else if(sub[x].comment.includes("!brb")){
				obsTest("BRB");
			}
			
			else if(sub[x].comment.includes("!roxxie")){
				obsTest("roxxie");
			}
			else if(sub[x].comment.includes("!main")){
				obsTest("MAIN");
			}
				else if(sub[x].comment.includes("!shana")){
				obsTest("shana");
			}
			else if(sub[x].comment.includes("!nathan")){
				obsTest("nathan");
			}
			else
			{
				
				
			}
			
		
			// add cooldown and sort 
			// play once 
			// mods only 
			
			temp=sub[x]['timestamp'];
		}
		else{
			lastupdate = sub[x]['timestamp'];
		
		}
	

		x++;
		
		}
		}
		else{
			out= "<div>" + "Offline" + "</div>";
		} 
		
		
		if((temp >lastupdate) ||(sub ===null)){
		
		lastupdate = temp; 
		var lastc= document.getElementById("results").innerHTML
		document.getElementById("results").innerHTML = lastc+out+ "</div>"		
		}
	


	}
	
async function obsTest(sceneName){
	if(!(triggers_pulled.includes(sceneName)))
	{

	const {currentProgramSceneName} = await obs.call('GetCurrentProgramScene');
	// connect to obs-websocket running on localhost with same port
	
	console.log(currentProgramSceneName)
	if(currentProgramSceneName!=sceneName){
	//	console.log(currentProgramSceneName)
	await obs.call('SetCurrentProgramScene', {sceneName: sceneName});	
	setTimeout(function() {
 obs.call('SetCurrentProgramScene', {sceneName: 'MAIN'});	
  // console.log("Switching to main now.");
}	, 90000*2);


	}
	else{
	console.log(currentProgramSceneName)
		//await obs.call('SetCurrentProgramScene', {sceneName: 'MAIN'});		
	}
	
	
	//await obs.call('SetCurrentProgramScene', {sceneName: sceneName});
	triggers_pulled = triggers_pulled+ " " + sceneName;
	

	}
	else{
		
	console.log("Has already been called once");
	
		
	}
	}	

function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  if(sec <10 ){
	sec ="0"+sec

  }
  if(hour <10) {
	hour = "0" + hour;

  }
  if(min <10){
	min = "0" + min

  }
  var time =   hour + ':' + min ;
  return time;
}

