
const displayScreens = {
	startMenu: "Type \"menu\" for the menu, \"hp\" to see health of player, \"status\" to see status of player, \"fight\" to fight a monster, \"store\" to enter a store.\n",
	playerStatus: player1["health"],
};

// obj storing functions for response by input of player. 
const responseStor = {
	HP(){
		display("You have " + player1["health"] + "/" + player1["max health"] + " HP");
	 },
	STATUS(){
		displayStr("Current Status:", player1, function(value, key, str) {
			if (typeof value !== "function")
				return " " + value + " " + key + ",";
			else
				return "";
		})
	 },
	FIGHT() {
		if (!monster["fightStatus"]) {
			monster["fightStatus"] = true;
			monster["generateMonster"]();
			monster["genMonMsg"]();
		} else {
			display("You're already fighting a monster.\n");
		}
	 },
	 ATTACK(input) {
	 	// ATTACK calculates player damge & returns the damage into rewarder method 
	 	// which checks if monster is dead and rewards the player if it is.
	 	if (monster["fightStatus"]) {
		 	monster["rewarder"](player1["ATTACK"]());
		 	monster["attack"]();
		} 	else {
	 		display("You're not in combat.\n");
	 	}
	 },
	 DEFEND(input) {
	 	if (monster["fightStatus"]) {
	 		display("You have defended.");
	 		monster["attack"]("DEFENDED");
		} 	else {
	 		display("You're not in combat.\n");
	 	}
	 },
	 STORE() {
	 	if (monster["fightStatus"]) {
			display("You're in combat. Come here when it's over!\n");
		} else {
			store["displayItems"]();
		}
	 },
	 DODGE(input) {
	 	// 1/3 chance of monster's attack missing.
 		if (monster["fightStatus"]) {
	 		monster["attack"]("DODGED");
	 	} else {
	 		display("You're not in combat.\n");
	 	}
	 },

// response runs the functions on responseStor directly by having the values be the name of the methods.
	response(value) {
		if (this[value])
			this[value](value);
		else
			display("The command " + value + " doesn't exist. Please try again.")
	 },

	 HELP() {
		display(displayScreens["startMenu"]);
	 },
}
