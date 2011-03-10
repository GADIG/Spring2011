/*

#pragma strict
var isSelected : boolean = false;
var speed : float = 3.0;
var rotateSpeed : float = 3.0;
@script RequireComponent(Rigidbody)


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
	if(networkView.isMine)
	{
		selectAndMove();
	}
}
*/