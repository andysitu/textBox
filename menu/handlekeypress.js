window.onload = function() {
	var subBut = document.getElementById("submitButton");
	var textBox = document.getElementById("textBox");


// Functions not inputted for if text is submitted
	subBut.onclick = function() {
		textBox.value = "";
	}

// if enter key is pressed, then it simulates as if submit button is clicked.
	textBox.onkeypress = function(e) {
		if (e.keycode === 13)
			subBut.click();
	};
}