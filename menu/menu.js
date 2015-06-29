// Function to display any message given to it to the textbox
function display(msg) {
	var here = document.getElementById("area");
	here.value = here.value +  msg + "\n";
};

const displayScreens = {
	startMenu: "Hello, type \"hp\" to see health of player. ",
	playerStatus: player1["health"],
};

const responseStor = {
	HP(){
		display("You have " + player1["health"] + "/" + player1["maxHealth"] + " HP");
	},
	STATUS(){
		var str = ""

		player1.each(function(value, key){
			str = str + value
		});
	},

	response(value) {
		if (this[value])
			this[value]();
		else
			display("The command " + value + " doesn't exist. Please try again.")
	},
}
