
const displayScreens = {
	startMenu: "Type \"hp\" to see health of player, \"status\" to see status of player, \"fight\" to fight a monster",
	playerStatus: player1["health"],
};

// obj storing functions for response by input of player. 
const responseStor = {
	HP(){
		display("You have " + player1["health"] + "/" + player1["max health"] + " HP");
	 },
	STATUS(){
		var str = "Current status:";
		each(player1, function(value, key) {
			if (typeof value !== "function")
				str = str + " " + value + " " + key + ",";
		});
		str = str.slice(0, -1);
		display(str);
	 },
	FIGHT() {
		if (!monster["fightStatus"]) {
			monster["fightStatus"] = true;
			monster["generateMonster"]();
			monster["genMonMsg"]();
		} else {
			display("You're already fight a monster.");
		}
	 },
	 ATTACK() {
	 	// ATTACK calculates player damge & returns the damage into rewarder method 
	 	// which checks if monster is dead and rewards the player if it is.
	 	monster["rewarder"](player1["ATTACK"]());
	 },

// response runs the functions on responseStor directly by having the values be the name of the methods.
	response(value) {
		if (this[value])
			this[value]();
		else
			display("The command " + value + " doesn't exist. Please try again.")
	 },
}
