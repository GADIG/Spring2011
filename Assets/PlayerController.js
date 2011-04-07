#pragma strict
var isSelected : boolean = false;
var speed : float = 5.0;
var rotateSpeed : float = 3.0;
var canMove : boolean = false;
var hit : RaycastHit;
@script RequireComponent(Rigidbody)
var  xzMoveVector : Vector3;


function selectAndMove () 
{

	if (Input.GetButtonDown("Fire1"))
	{
		var playerPlane = new Plane(Vector3.up, transform.position);
		var ray : Ray = Camera.main.ScreenPointToRay (Input.mousePosition);
		//var hit : RaycastHit;
		var hitdist = 0.0;
		var targetPoint = ray.GetPoint(hitdist);  
		
		if (isSelected == true)
		{
			ray = Camera.main.ScreenPointToRay (Input.mousePosition);
			if (Physics.Raycast(ray,hit))
			{
				print (hit.point);
				transform.LookAt(hit.point);
				canMove = true;
			}
		}
		
		if (collider.Raycast (ray, hit, 100.0))
		{
			print ("IT WORKS!");
			isSelected = true;
		}
	}
}
function MoveTowards (position : Vector3)
{
	//var direction = position - transform.position;
	//direction.y = 0;
	/*if (direction.magnitude < 0.5) {
		SendMessage("SetSpeed", 0.0);
		return;
	}*/
	
	// Rotate towards the target
	//transform.rotation = Quaternion.Slerp (transform.rotation, Quaternion.LookRotation(direction), rotateSpeed * Time.deltaTime);
	//transform.eulerAngles = Vector3(0, transform.eulerAngles.y, 0);

	// Modify speed so we slow down when we are not facing the target
	//var forward = transform.TransformDirection(Vector3.forward);
	//var speedModifier = Vector3.Dot(forward, direction.normalized);
	//speedModifier = Mathf.Clamp01(speedModifier);

	// Move the character
	//direction = forward * speed;
	transform.Translate(Vector3.forward.x * speed, Vector3.forward.y, Vector3.forward.z * speed);
	
	//transform.rotation.y = 0;
	//OLD CODE:
	//transform.Translate(Vector3.forward * speed);
}

function Update () 
{
	if(networkView.isMine)
	{
		selectAndMove();
		if (canMove == true)
			MoveTowards(hit.point);
	}
}
