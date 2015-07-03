var controller = {

	// handles when monster attacks player by input being the command the player uses
	attackDeecider(input) {
		if (monster["fightStatus"]) {
			if (input === "DEFEND") {
				monster["attack"]("DEFENDED");
			} else if (input === "DODGE") {
				monster["attack"]("DODGED");
			} else if ( (this.whenToAttack).indexOf(input) > -1 && (monster["fightStatus"]) ) {
				monster["attack"]();
			}
		}
	},

	// array containing commands inputted from player that'll trigger monster to attack.
	whenToAttack: ["ATTACK"]
};