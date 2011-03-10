/* 
*  This file is part of the Unity networking tutorial by M2H (http://www.M2H.nl)
*  The original author of this code Mike Hergaarden, even though some small parts 
*  are copied from the Unity tutorials/manuals.
*  Feel free to use this code for your own projects, drop me a line if you made something exciting! 
*/
#pragma strict
#pragma implicit
#pragma downcast

var connectToIP : String = "127.0.0.1";
var connectPort : int = 25001;


//Obviously the GUI is for both client&servers (mixed!)
function OnGUI ()
{

	if (Network.peerType == NetworkPeerType.Disconnected){
	//We are currently disconnected: Not a client or host
		GUILayout.Label("Connection status: Disconnected");
		
		connectToIP = GUILayout.TextField(connectToIP, GUILayout.MinWidth(100));
		connectPort = parseInt(GUILayout.TextField(connectPort.ToString()));
		
		GUILayout.BeginVertical();
		if (GUILayout.Button ("Connect as client"))
		{
			//Connect to the "connectToIP" and "connectPort" as entered via the GUI
			//Ignore the NAT for now
			
			Network.Connect(connectToIP, connectPort);
		}
		
		if (GUILayout.Button ("Start Server"))
		{
			//Start a server for 32 clients using the "connectPort" given via the GUI
			//Ignore the nat for now	
			
			Network.InitializeServer(32, connectPort, true);
		}
		GUILayout.EndVertical();
		
		
	}else{
		//We've got a connection(s)!
		

		if (Network.peerType == NetworkPeerType.Connecting){
		
			GUILayout.Label("Connection status: Connecting");
			
		} else if (Network.peerType == NetworkPeerType.Client){
			
			GUILayout.Label("Connection status: Client!");
			GUILayout.Label("Ping to server: "+Network.GetAveragePing(  Network.connections[0] ) );		
			
		} else if (Network.peerType == NetworkPeerType.Server){
			
			GUILayout.Label("Connection status: Server!");
			GUILayout.Label("Connections: "+Network.connections.length);
			if(Network.connections.length>=1){
				GUILayout.Label("Ping to first player: "+Network.GetAveragePing(  Network.connections[0] ) );
			}			
		}

		if (GUILayout.Button ("Disconnect"))
		{
			Network.Disconnect(200);
		}
	}
	

}

// NONE of the functions below is of any use in this demo, the code below is only used for demonstration.
// First ensure you understand the code in the OnGUI() function above.

//Client functions called by Unity
function OnConnectedToServer() {
	//Network.Instantiate()
	Debug.Log("This CLIENT has connected to a server");	
}

function OnDisconnectedFromServer(info : NetworkDisconnection) {
	Debug.Log("This SERVER OR CLIENT has disconnected from a server");
}

function OnFailedToConnect(error: NetworkConnectionError){
	Debug.Log("Could not connect to server: "+ error);
}


//Server functions called by Unity
function OnPlayerConnected(player: NetworkPlayer) {
	Debug.Log("Player connected from: " + player.ipAddress +":" + player.port);
}

function OnServerInitialized() {
	Debug.Log("Server initialized and ready");
}

function OnPlayerDisconnected(player: NetworkPlayer) {
	Debug.Log("Player disconnected from: " + player.ipAddress+":" + player.port);
}


// OTHERS:
// To have a full overview of all network functions called by unity
// the next four have been added here too, but they can be ignored for now

function OnFailedToConnectToMasterServer(info: NetworkConnectionError){
	Debug.Log("Could not connect to master server: "+ info);
}

function OnNetworkInstantiate (info : NetworkMessageInfo) {
	Debug.Log("New object instantiated by " + info.sender);
}

function OnSerializeNetworkView(stream : BitStream, info : NetworkMessageInfo)
{
	//Custom code here (your code!)
}

/* 
 The last networking functions that unity calls are the RPC functions.
 As we've added "OnSerializeNetworkView", you can't forget the RPC functions 
 that unity calls..however; those are up to you to implement.
 
 @RPC
 function MyRPCKillMessage(){
	//Looks like I have been killed!
	//Someone send an RPC resulting in this function call
 }
*/

