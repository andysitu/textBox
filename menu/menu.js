// Function to display any message given to it to the textbox
function display(msg) {
	var here = document.getElementById("area");
	here.value = here.value + " \n" +  msg;
};

const displayScreens = {
	mainMenu: "Hello, type \"hp\" to see health of player. ",
	playerStatus: player1["health"],
};

const responseStor = {
	hp(){
		display(displayScreens["playerStatus"]);
	},
}

function response(value) {
	responseStor[value]();
};