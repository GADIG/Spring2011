
function Update () {
	if (Input.GetButtonDown("Fire1")){
		//Get the ray for raycasting
		var selectionRay : Ray = Camera.main.ScreenPointToRay (Input.mousePosition);
		//~ var hit : RaycastHit;
		
		//Raycast and get all objects which collide with that ray.
		var hits : RaycastHit[] = Physics.RaycastAll(selectionRay);
		
		//~ if(){
			 //~ Debug.DrawLine (ray.origin, hit.point);
		//~ }
		
		for(hit in hits){
			//Set collision booleans if the raycast hits them
			
			//Get the transforms, and then get the scripts from the transforms
				//ex)	transform.Find("Hand").GetComponent(OtherScript).foo = 2;
				
			var trans : Transform = hit.transform;
			//Set a particular boolean based on the name of the game object.
			
			var script;
			switch(trans.ToString()){
				case "Name of Object":	script = trans.GetComponent("ScriptName");
										break;
										
				case "Name of Object":	
										break;
				default:
					print("Encountered unknown game object.");
			}
			
			script.rayHit = true;
		}
	}
}
