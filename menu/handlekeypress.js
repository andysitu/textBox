window.onload = function() {
	var subBut = document.getElementById("submitButton");
	var textBox = document.getElementById("textBox");

	display(displayScreens["startMenu"]);

// Functions not inputted for if text is submitted
	subBut.onclick = clicky;

// if enter key is pressed, then it simulates as if submit button is clicked.
	textBox.onkeypress = pressKey;

}

function clicky() {
	var textBox = document.getElementById("textBox");

	var input = textBox.value.toUpperCase().toString();
	responseStor.response(input);
	controller.attackDeecider(input);
	textBox.value = "";
}

function pressKey(e) {
	var subBut = document.getElementById("submitButton");

	if (e.keyCode  === 13) {
		subBut.click();
		return false;
	}
}