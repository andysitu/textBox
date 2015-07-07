function clicky() {
	var textBox = document.getElementById("textBox");
	var input = textBox.value.toUpperCase().toString();

	responseStor.checkResponse(input);

	textBox.value = "";
}

function pressKey(e) {
	var subBut = document.getElementById("submitButton");

	if (e.keyCode  === 13) {
		subBut.click();
		return false;
	}
}

window.onload = function() {
	var subBut = document.getElementById("submitButton");
	var textBox = document.getElementById("textBox");

	display(displayScreens["startMenu"]);

// Functions not inputted for if text is submitted
	subBut.onclick = clicky;

// if enter key is pressed, then it simulates as if submit button is clicked.
	textBox.onkeypress = pressKey;

}



// Functions used by rest of the app

// each function works for objects and array.
function each(list, callback) {
	if (Array.isArray(list)) {
		for (var i = 0; i < list.length; i++)
			callback.call(null, list[i], i, list)
	} else {
		for (var key in list) 
			callback.call(null, list[key], key, list)
	}
}


// Function to display any message given to it to the textbox
function display(msg) {
	var here = document.getElementById("area");
	here.value = here.value +  msg + "\n";
	here.scrollTop = here.scrollHeight; // scrolls to bottom
}

function displayStr(startMSG, list, func) {
	var str = startMSG || "";

	if (list instanceof Array) {
		for (var i = 0; i < list.length; i++)
			str = str + func(list[i], i, str);
	} else {
		for (var key in list)
			str = str + func(list[key], key, str);
	}

	display(str.slice(0, -1) + "\n");
}

function dead() {
	document.getElementById("area").className = "dead";
}