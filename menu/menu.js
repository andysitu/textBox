

const displayScreens = {
	startMenu: "Hello, type \"hp\" to see health of player, \"status\" to see status of player, \"fight\" to fight a monster",
	playerStatus: player1["health"],
};

// obj storing functions for response by input of player. 
const responseStor = {
	HP(){
		display("You have " + player1["health"] + "/" + player1["maxHealth"] + " HP");
	 },
	STATUS(){
		var str = "Current status:"

		each(player1, function(value, key) {
			str = str + " " + value + " " + key;
		});

		display(str);
	 },
	FIGHT() {
		monster["fightStatus"] = true;
		monster["generateMonster"]();
		monster["genMonMsg"]();
	 },
	 ATTACK() {
	 	player1["ATTACK"]();
	 },

// response runs the functions on responseStor directly by having the values be the name of the methods.
	response(value) {
		if (this[value])
			this[value]();
		else
			display("The command " + value + " doesn't exist. Please try again.")
	 },
}
