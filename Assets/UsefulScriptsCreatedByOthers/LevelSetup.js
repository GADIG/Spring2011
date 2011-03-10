
/* 
*  This file is part of the Unity networking tutorial by M2H (http://www.M2H.nl)
*  The original author of this code is Mike Hergaarden, even though some small parts 
*  are copied from the Unity tutorials/manuals.
*  Feel free to use this code for your own projects, drop us a line if you made something exciting! 
*/
#pragma strict
#pragma implicit
#pragma downcast

var playerPref : Transform;
var gameName : String = "Spell Slinger";
var chatScript : FPSChat;
var playerName : String = "";
var gameTime = 0.0;

//Server-only playerlist
public var playerList = new ArrayList();

public var playerColors : Color[];
public var newPlayerColorNum = 0;

class FPSPlayerNode 
{
	var playerName : String;
	var networkPlayer : NetworkPlayer;
}

function Update()
{
	gameTime += (1 * Time.deltaTime);
}


function Awake() 
{	
	//playerColors = new Array(Color.red, Color.green, Color.blue, Color.yellow, Color.cyan, Color.magenta, Color.black, Color.white);
	
	playerName = PlayerPrefs.GetString("playerName");
	
	chatScript = GetComponent(FPSChat);
	Network.isMessageQueueRunning = true;
	Screen.lockCursor=true;	
	
	if(Network.isServer)
	{
		
	
		chatScript.ShowChatWindow();
		
		networkView.RPC ("TellOurName", RPCMode.AllBuffered, playerName);
		
		for (var go : GameObject in FindObjectsOfType(GameObject))
		{
			go.SendMessage("OnNetworkLoadedLevel", SendMessageOptions.DontRequireReceiver);	
		}		
		MasterServer.RegisterHost(gameName, PlayerPrefs.GetString("playerName")+"'s game");
			
	}
	else if(Network.isClient)
	{
		
		networkView.RPC ("TellOurName", RPCMode.AllBuffered, playerName);
		chatScript.ShowChatWindow();
		
		for (var go : GameObject in FindObjectsOfType(GameObject))
		{
			go.SendMessage("OnNetworkLoadedLevel", SendMessageOptions.DontRequireReceiver);	
		}		
	}
	else
	{
		//How did we even get here without connection?
		Screen.lockCursor=false;	
		Application.LoadLevel((Application.loadedLevel-1));		
	}
	
	
}


//Server function
function OnPlayerDisconnected(player: NetworkPlayer) {
	Network.RemoveRPCs(player, 0);
	Network.DestroyPlayerObjects(player);
	
	//Remove player from the server list
	for(var entry : FPSPlayerNode in  playerList){
		if(entry.networkPlayer==player){
			chatScript.addGameChatMessage(entry.playerName+" disconnected from: " + player.ipAddress+":" + player.port);
			playerList.Remove(entry);
			break;
		}
	}
}

//Server function
function OnPlayerConnected(player: NetworkPlayer) {
	chatScript.addGameChatMessage("Player connected from: " + player.ipAddress +":" + player.port);
}

@RPC
//Sent by newly connected clients, recieved by server
function TellOurName(name : String, info : NetworkMessageInfo){
	var netPlayer : NetworkPlayer = info.sender;
	if(netPlayer+""=="-1"){
		//This hack is required to fix the local players networkplayer when the RPC is sent to itself.
		netPlayer=Network.player;
	}
	
	var newEntry : FPSPlayerNode = new FPSPlayerNode();
	newEntry.playerName=name;
	newEntry.networkPlayer=netPlayer;
	playerList.Add(newEntry);
	
	if(Network.isServer){
		chatScript.addGameChatMessage(name+" joined the game");
	}
}

//Called via Awake()
function OnNetworkLoadedLevel()
{
	// Randomize starting location
	var spawnpoints : GameObject[] = GameObject.FindGameObjectsWithTag ("SpawnPoint");
	Debug.Log("spawns: "+spawnpoints.length);
	
	var spawnpoint : Transform = spawnpoints[Random.Range(0, spawnpoints.length)].transform;
	var newTrans : Transform = Network.Instantiate(playerPref,spawnpoint.position, spawnpoint.rotation, 0);
}


function OnDisconnectedFromServer () {
	//Load main menu
	Screen.lockCursor=false;
	Application.LoadLevel(0);
}

function OnGUI ()
{
/* 	if (GUILayout.Button ("Disconnect"))
 * 	{
 * 		Network.Disconnect();
 * 		if (Network.isServer)
 * 			MasterServer.UnregisterHost();
 * 	}
 */
	
}