// Variables for the buttons
var btnConnect = document.getElementById('btn-connect')
var btnDisconnect = document.getElementById('btn-disconnect')
var btnPublish = document.getElementById('btn-publish')
var btnSubscribe = document.getElementById('btn-subscribe')
var btnUnsubscribe = document.getElementById('btn-unsubscribe')
document.getElementById("btn-disconnect").disabled = true;

// This is Connect button event listener if clicked
// This connects the app to the broker
btnConnect.addEventListener('click',function(){
	document.getElementById("btn-connect").disabled = true; // to disable the Connect Button
	document.getElementById("btn-disconnect").disabled = false; // to enable the Disconnect Button
	var brokerAdd = document.getElementById('broker-input').value;
	console.log("Connecting to " + brokerAdd)
	brokerStatusMessage("Connecting..")

	// Creating the mqtt client then connect to the broker
	client = mqtt.connect(brokerAdd);

	// This function will be called back when CONNACK is received
	client.on('connect',function(){
		console.log("Successfully connected to " + brokerAdd)
		brokerStatusMessage("Connected!")
	})

	// This function will receive the incoming topic and payload
	client.on('message',function(topic,payload){
		console.log(topic+" "+payload);
		incomingMessage(topic,payload)
	})
})

// This is Disconnect button event listener if clicked
// This disconnects to the broker
btnDisconnect.addEventListener('click',function(){
	document.getElementById("btn-connect").disabled = false; // to enable the Connect Button
	document.getElementById("btn-disconnect").disabled = true; // to disable the Disconnect Button
	var brokerAdd = document.getElementById('broker-input').value;
	console.log("Disconnected to " + brokerAdd);
	brokerStatusMessage("Disconnected!")
	client.end();
})

// This is Publish button event listener if clicked
// This publishes on a topic with payload
btnPublish.addEventListener('click',function(){
	var pubTopic = document.getElementById('pubTopic-in').value;
	var pubPayload = document.getElementById('pubPayload-in').value;
	client.publish(pubTopic,pubPayload, 2) // publishes with qos = 2
	console.log("Published a topic: " + pubTopic + " with payload: " + pubPayload)
	publishedMessage(pubTopic,pubPayload)
})

// This is Subscribe button event listener if clicked
// This subscribes to a topic
btnSubscribe.addEventListener('click',function(){
	var subTopic = document.getElementById('subTopic-in').value;
	console.log("Subscribed to topic: " + subTopic);
	client.subscribe(subTopic, {qos: 2}); // subscribes with qos = 2
	subscribedMessage(subTopic)
})

// This is Unsubscribe button event listener if clicked
// This unsubscribes to a topic
btnUnsubscribe.addEventListener('click',function(){
	var subTopic = document.getElementById('subTopic-in').value;
	console.log(subTopic);
	client.unsubscribe(subTopic);
})

// This displays the status of connection to broker
function brokerStatusMessage(message){
	document.getElementById("broker-status-message").innerHTML = message;
}

// This displays the incoming/received messages
function incomingMessage(message1,message2) {
	var table = document.getElementById("incomingMessageTable").getElementsByTagName("tbody")[0];
	var row = table.insertRow(0);
	var messageTime = new Date().toString()
	row.insertCell(0).innerHTML = message1;
	row.insertCell(1).innerHTML = message2;
	row.insertCell(2).innerHTML = messageTime.substring(0,24);
}

// This displays the published topic and payload
function publishedMessage(message1,message2) {
	var table = document.getElementById("publishedMessageTable").getElementsByTagName("tbody")[0];
	var row = table.insertRow(0);
	var messageTime = new Date().toString();
	row.insertCell(0).innerHTML = message1;
	row.insertCell(1).innerHTML = message2;
	row.insertCell(2).innerHTML = messageTime.substring(0,24);
}

// This displays the subscribed topics
function subscribedMessage(message1) {
	var table = document.getElementById("subscribedMessageTable").getElementsByTagName("tbody")[0];
	var row = table.insertRow(0);
	var messageTime = new Date().toString();
	row.insertCell(0).innerHTML = message1;
	row.insertCell(1).innerHTML = messageTime.substring(0,24);
}