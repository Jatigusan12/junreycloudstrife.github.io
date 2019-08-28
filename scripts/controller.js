// Variables for the buttons
var btnConnect = document.getElementById('btn-connect')
var btnDisconnect = document.getElementById('btn-disconnect')
var btnPublish = document.getElementById('btn-publish')
var btnSubscribe = document.getElementById('btn-subscribe')
var btnUnsubscribe = document.getElementById('btn-unsubscribe')
document.getElementById("btn-disconnect").disabled = true;

btnConnect.addEventListener('click',function(e){
	e.preventDefault();
	document.getElementById("btn-connect").disabled = true; // to disable the Connect Button
	document.getElementById("btn-disconnect").disabled = false; // to enable the Disconnect Button
	var brokerAdd = document.getElementById('broker-input').value;
	console.log("Connecting to " + brokerAdd)
	brokerStatusMessage("Connecting..")
	client = mows.createClient(brokerAdd);
	client.on('connect',function(){
		console.log("Successfully connected to " + brokerAdd)
		brokerStatusMessage("Connected!")
	})
})

btnDisconnect.addEventListener('click',function(e){
	e.preventDefault();
	document.getElementById("btn-connect").disabled = false; // to enable the Connect Button
	document.getElementById("btn-disconnect").disabled = true; // to disable the Disconnect Button
	var brokerAdd = document.getElementById('broker-input').value;
	console.log("Disconnected to " + brokerAdd);
	// brokerStatusMessage("Disconnected to " + brokerAdd)
	brokerStatusMessage("Disconnected!")
	client.end();
})

btnPublish.addEventListener('click',function(e){
	e.preventDefault();
	var pubTopic = document.getElementById('pubTopic-in').value;
	var pubPayload = document.getElementById('pubPayload-in').value;
	client.publish(pubTopic,pubPayload)
	console.log("Published a topic: " + pubTopic + " with payload: " + pubPayload)
	publishedMessage(pubTopic,pubPayload)
})

btnSubscribe.addEventListener('click',function(e){
	e.preventDefault();
	var subTopic = document.getElementById('subTopic-in').value;
	console.log("Subscribed to topic: " + subTopic);
	client.subscribe(subTopic);
	subscribedMessage(subTopic)
	// This function will receive the incoming topic and payload
	client.on('message',function(topic,payload){
		console.log(topic+" "+payload);
		incomingMessage(topic,payload)
	})
})

btnUnsubscribe.addEventListener('click',function(e){
	e.preventDefault();
	var subTopic = document.getElementById('subTopic-in').value;
	console.log(subTopic);
	client.unsubscribe(subTopic);
})

function brokerStatusMessage(message){
	document.getElementById("broker-status-message").innerHTML = message;
}

// This will display the incoming messages
function incomingMessage(message1,message2) {
	var table = document.getElementById("incomingMessageTable").getElementsByTagName("tbody")[0];
	var row = table.insertRow(0);
	var messageTime = new Date().toString()
	row.insertCell(0).innerHTML = message1;
	row.insertCell(1).innerHTML = message2;
	row.insertCell(2).innerHTML = messageTime.substring(0,24);
}

// This will display the published messages
function publishedMessage(message1,message2) {
	var table = document.getElementById("publishedMessageTable").getElementsByTagName("tbody")[0];
	var row = table.insertRow(0);
	var messageTime = new Date().toString();
	row.insertCell(0).innerHTML = message1;
	row.insertCell(1).innerHTML = message2;
	row.insertCell(2).innerHTML = messageTime.substring(0,24);
}

// This will display the subscribed messages
function subscribedMessage(message1) {
	var table = document.getElementById("subscribedMessageTable").getElementsByTagName("tbody")[0];
	var row = table.insertRow(0);
	var messageTime = new Date().toString();
	row.insertCell(0).innerHTML = message1;
	row.insertCell(1).innerHTML = messageTime.substring(0,24);
}