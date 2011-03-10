/* 
*  This file is part of the Unity networking tutorial by M2H (http://www.M2H.nl)
*  The original author of this code Mike Hergaarden, even though some small parts 
*  are copied from the Unity tutorials/manuals.
*  Feel free to use this code for your own projects, drop me a line if you made something exciting! 
*/
//#pragma strict
//#pragma implicit
//#pragma downcast

public var owner : NetworkPlayer;

//Last input value, we're saving this to save network messages/bandwidth.
private var lastClientHInput : float=0;
private var lastClientVInput : float=0;

//The input values the server will execute on this object
private var serverCurrentHInput : float = 0;
private var serverCurrentVInput : float = 0;

//Last input value, we're saving this to save network messages/bandwidth.
private var lastClientFire1 : boolean = false;

//The input values the server will execute on this object
private var serverCurrentFire1 : boolean = false;



//#pragma strict
var isSelected : boolean = false;
var speed : float = 3.0;
var rotateSpeed : float = 3.0;
@script RequireComponent(Rigidbody)


function Awake(){
	// We are probably not the owner of this object: disable this script.
	// RPC's and OnSerializeNetworkView will STILL get trough!
	// The server ALWAYS run this script though
	if(Network.isClient){
		enabled=false;	 // disable this script (this enables Update());	
	}	
}


@RPC
function SetPlayer(player : NetworkPlayer)
{
	owner = player;
	if(player==Network.player)
	{
		//Hey thats us! We can control this player: enable this script (this enables Update());
		enabled=true;
	}
}
/* 
 * function selectAndMove () 
 * {
 * 
 * 	
 * }
 */

//function Update(){

/*
	//Client code
	if(owner!=null && Network.player==owner)
	{
		//Only the client that owns this object executes this code
		Debug.Log("here1");
		
		var HInput : float = Input.GetAxis("Horizontal");
		var VInput : float = Input.GetAxis("Vertical");
		
		//Is our input different? Do we need to update the server?
		var Fire1 : boolean = Input.GetButtonDown("Fire1");
		
		if (lastClientFire1 != Fire1)
		{
		
			lastClientFire1 = Fire1;
			
			
			if(Network.isServer)
			{
				SendFireInput(Fire1);
			}
			else if(Network.isClient)
			{
				networkView.RPC("SendFireInput", RPCMode.Server, Fire1);
			}
		
			
		}
		}
	

	if (isSelected == true)
		{
			
			transform.Rotate(0, Input.GetAxis ("Horizontal") * rotateSpeed, 0);
			var forward : Vector3 = transform.TransformDirection(Vector3.forward);
			transform.Translate(forward);
		}
		
		
		if(Network.isServer)
		{
	
	var ray : Ray = Camera.main.ScreenPointToRay (Input.mousePosition);
			var hit : RaycastHit;
			print (ray.direction);
		
			if (collider.Raycast (ray, hit, 100.0))
			{
				print ("IT WORKS!");
				//isSelected = true;
				
				transform.Rotate(0, Input.GetAxis ("Horizontal") * rotateSpeed, 0);
				var forward : Vector3 = transform.TransformDirection(Vector3.forward);
				transform.Translate(forward);
			}
	
	}
		


/*
if(lastClientHInput!=HInput || lastClientVInput!=VInput )
		{
		Debug.Log("here2");
			lastClientHInput = HInput;
			lastClientVInput = VInput;			
			
			if(Network.isServer)
			{
			Debug.Log("here3");
				//Too bad a server can't send an rpc to itself using "RPCMode.Server"!...bugged :[
				SendMovementInput(HInput, VInput);
			}
			else if(Network.isClient)
			{
			Debug.Log("here4");
				//SendMovementInput(HInput, VInput); //Use this (and line 64) for simple "prediction"
				networkView.RPC("SendMovementInput", RPCMode.Server, HInput, VInput);
			}
			
		}
		
	}
	
	//Server movement code
	if(Network.isServer)
	{//Also enable this on the client itself: "|| Network.player==owner){|"
		//Actually move the player using his/her input
		Debug.Log("here5");
		var moveDirection : Vector3 = new Vector3(serverCurrentHInput, 0, serverCurrentVInput);
		var speed : float = 5;
		transform.Translate(speed * moveDirection * Time.deltaTime);
	}
*/
//}


@RPC
function SendFireInput(Fire1: boolean)
{
	serverCurrentFire1 = Fire1;
}


@RPC
function SendMovementInput(HInput : float, VInput : float)
{	
	//Called on the server
	serverCurrentHInput = HInput;
	serverCurrentVInput = VInput;
}

function OnSerializeNetworkView(stream : BitStream, info : NetworkMessageInfo)
{
	if (stream.isWriting){
		//This is executed on the owner of the networkview
		//The owner sends it's position over the network
		
		var pos : Vector3 = transform.position;		
		stream.Serialize(pos);//"Encode" it, and send it
				
	}else{
		//Executed on all non-owners
		//This client receive a position and set the object to it
		
		var posReceive : Vector3 = Vector3.zero;
		stream.Serialize(posReceive); //"Decode" it and receive it
		
		//We've just recieved the current servers position of this object in 'posReceive'.
		
		transform.position = posReceive;		
		//To reduce laggy movement a bit you could comment the line above and use position lerping below instead:	
		//transform.position = Vector3.Lerp(transform.position, posReceive, 0.9); //"lerp" to the posReceive by 90%
		
	}
}


function selectAndMove () 
{

	if (Input.GetButtonDown("Fire1"))
	{
		var ray : Ray = Camera.main.ScreenPointToRay (Input.mousePosition);
		var hit : RaycastHit;
		print (ray.direction);
		/*
		if (isSelected == true)
		{
			
			transform.Rotate(0, Input.GetAxis ("Horizontal") * rotateSpeed, 0);
			var forward : Vector3 = transform.TransformDirection(Vector3.forward);
			transform.Translate(forward);
			//var curSpeed : float = speed * Input.GetAxis ("Vertical");
			//rigidbody.MovePosition(rigidbody.position+ray.direction);
			//rigidbody.MovePosition(rigidbody.position + forward * speed);
			//gameObject.GetComponent(CharacterController).SimpleMove(forward * curSpeed);
		}
		*/
		if (collider.Raycast (ray, hit, 100.0))
		{
			print ("IT WORKS!");
			isSelected = true;
		}
	}
	if (isSelected == true)
		{
			
			transform.Rotate(0, Input.GetAxis ("Horizontal") * rotateSpeed, 0);
			var forward : Vector3 = transform.TransformDirection(Vector3.forward);
			transform.Translate(forward);
			//var curSpeed : float = speed * Input.GetAxis ("Vertical");
			//rigidbody.MovePosition(rigidbody.position+ray.direction);
			//rigidbody.MovePosition(rigidbody.position + forward * speed);
			//gameObject.GetComponent(CharacterController).SimpleMove(forward * curSpeed);
		}
}

function Update () 
{
	if(owner==Network.player)
	{
		selectAndMove();
	}
}
