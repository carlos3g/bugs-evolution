var scoreNumber: int;
var AmountOfEvolutedBug: int;
var scoreText: GameObject;

function Start() {
  scoreText = GameObject.Find("Score");
	scoreNumber = 1;
	AmountOfEvolutedBug = 0;
}

function Update() {
	if (AmountOfEvolutedBug >= 20) {
		gameOver();
	};
	if (Input.GetKey("escape")) {
    Application.LoadLevel("Menu");
  };
	scoreText.GetComponent(UI.Text).text = scoreNumber.ToString();
}

function gameOver() {
	Application.LoadLevel("GameOver");
}