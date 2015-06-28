window.onload = function() {
	var subBut = document.getElementById("submitButton");
	var textBox = document.getElementById("textBox");

	display("Hello");

// Functions not inputted for if text is submitted
	subBut.onclick = clicky;

// if enter key is pressed, then it simulates as if submit button is clicked.
	textBox.onkeypress = pressKey;

}

function clicky() {
	var textBox = document.getElementById("textBox");

	var input = textBox.value.toUpperCase().toString();
	display(input);
	textBox.value = "";
}

function pressKey(e) {
	var subBut = document.getElementById("submitButton");

	if (e.keycode === 13) {
		subBut.click();
		return false;
	}
};