private var turnSpeed = 5f;
private var speed = 50f;
var cam : Camera;
var score : float;
var maxVelocity = 10f;

//Testing Github

// Update is called once per frame
function Update () 
{
	if (networkView.isMine)
	{
		
		cam.enabled = true;
		//cam.gameObject.transform.parent = null;
		
		if (Input.GetButton("W"))// && rigidbody.velocity.magnitude <= maxVelocity)
		{
			rigidbody.AddForce(transform.forward * speed);
		}
		if (Input.GetButton("S"))// && rigidbody.velocity.magnitude <= maxVelocity)
		{
			rigidbody.AddForce(transform.forward * (-1*speed));
		}
		if (Input.GetButton("D"))// && rigidbody.angularVelocity.magnitude <= maxVelocity)
		{
			//rigidbody.AddTorque(Vector3.up * turnSpeed);
			transform.Rotate(Vector3.up * (turnSpeed));
		}
		if (Input.GetButton("A"))// && rigidbody.angularVelocity.magnitude <= maxVelocity)
		{
			//rigidbody.AddTorque(Vector3.up * (-1*turnSpeed));
			transform.Rotate(Vector3.up * (-1*turnSpeed));
		}
/*
if(Input.GetButtonDown("left"))
		{    
			animation.CrossFade ("left");
		}

		if(Input.GetButtonDown("right"))
		{    
			animation.CrossFade ("right");
		}
		*/
	}
	
}
