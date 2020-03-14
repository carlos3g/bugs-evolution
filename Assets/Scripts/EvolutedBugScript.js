var bug: GameObject;
var livesText: GameObject;
var walkingSpeedY: double;
var walkingSpeedX: double;
var livesNumber: int;
var GameRules: GameObject;


function Start() {

	//livesText = GameObject.Find("Lives");
	GameRules = GameObject.Find("Game-Rules");
	GameRules.GetComponent(Rules).AmountOfEvolutedBug += 1;

	walkingSpeedY = Random.Range(-0.1, 0.1);
	walkingSpeedX = Random.Range(-0.1, 0.1);
	livesNumber = 3;

	//livesText.GetComponent(UI.Text).text = "Lives: " + livesNumber;
}

function Update() {

  //* impede que as moscas saiam da tela
	var distanceZ = (transform.position - Camera.main.transform.position).z;
	var leftBorder = Camera.main.ViewportToWorldPoint(new Vector3(0, 0, distanceZ)).x;
	var rightBorder = Camera.main.ViewportToWorldPoint(new Vector3(1, 0, distanceZ)).x;
	var topBorder = Camera.main.ViewportToWorldPoint(new Vector3(0, 0, distanceZ)).y;
	var bottomBorder = Camera.main.ViewportToWorldPoint(new Vector3(0, 1, distanceZ)).y;
	transform.position = new Vector3(
		Mathf.Clamp(transform.position.x, leftBorder, rightBorder),
		Mathf.Clamp(transform.position.y, topBorder, bottomBorder),
		transform.position.z
	);

	// livesText.GetComponent(UI.Text).text = "Lives " + livesNumber;
  if ((bug.transform.position.y < (topBorder + 0.45)          // top -4.55
    || bug.transform.position.y > (bottomBorder - 0.45)       // bottom 4.55
    || bug.transform.position.x > (rightBorder - 0.45)        // 3.12
    || bug.transform.position.x < (leftBorder + 0.45))) {     // -3.12

		if (bug.transform.position.y < (topBorder + 0.45)) {
      walkingSpeedX = [-0.01, 0.01][Mathf.Floor(Random.Range(0, 2))];
      walkingSpeedY = -0.01;
    } else if (bug.transform.position.y > (bottomBorder - 0.45)) {
      walkingSpeedX = [-0.01, 0.01][Mathf.Floor(Random.Range(0, 2))];
      walkingSpeedY = 0.01;
    } else if (bug.transform.position.x > (rightBorder - 0.45)) {
      walkingSpeedX = 0.01;
      walkingSpeedY = [-0.01, 0.01][Mathf.Floor(Random.Range(0, 2))];
    } else if (bug.transform.position.x < (leftBorder + 0.45)) {
      walkingSpeedX = -0.01;
      walkingSpeedY = [-0.01, 0.01][Mathf.Floor(Random.Range(0, 2))];
    }

    walk();

	} else if (livesNumber == 0) {
		Destroy(bug);
		gameOver();
	} else {
		walk();
	}
}


function gameOver() {
	Application.LoadLevel("GameOver");
}


function generateXY() {
	var x = Random.Range(-2.54, 2.54); // x
	var y = Random.Range(-4.0, 3.8); // y
	return [x, y]; // [x, y]
}


function cornerDirection() {
  return [[0.01, 0.01], [-0.01, -0.01], [-0.01, 0.01], [0.01, -0.01]][Mathf.Floor(Random.Range(0, 4))];
}


function walk() {
  bug.transform.position.y -= walkingSpeedY;
	bug.transform.position.x -= walkingSpeedX;
}


function OnMouseDown() {
  walkingSpeedY = Random.Range(-0.1, 0.1);
	walkingSpeedX = Random.Range(-0.1, 0.1);
}