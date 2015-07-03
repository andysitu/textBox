// Generates monster based on level of the player
//
// Might give it abilities and skills later

var monster = {
	fightStatus: false, // player can only attack monster when true
	level: 1,
	health: 1,
	mana: 1,

	generateMonster() {

		this["level"] = Math.ceil(Math.random() * 4);
		this["health"] = player1["level"] * this["level"] + player1["level"] * this["level"] * Math.ceil(Math.random() * 0.5);
		this["mana"] = player1["level"] * this["level"] + player1["level"] * this["level"] * Math.ceil(Math.random() * 0.5);
	},

	genMonMsg() { 	display("You've encounted a monster! Level " + this["level"] + " and HP " + this["health"] + ".");
					display("Type \"attack\" to attack, \"defend\" to defend, \"dodge\" to dodge.") },

	// Shows damage player has done and rewards player if monster has died.
	rewarder(dmg) {
		if (this.fightStatus == true) {
			if (this.health <= 0)	{
				const exp = this["level"] * player1["level"];
				player1["exp"] += exp;
				const gold = this["level"] * player1["level"] * Math.ceil(Math.random() * 5);
				player1["gold"] += gold;
				display("You've done " + dmg + " damage.")
				display("Monster has died. You have gained " + exp + " exp and " + gold + " gold");
				this.fightStatus = false;
				player1["levelUp"]();
				display(displayScreens["startMenu"]);
			} else {
				display("You've done " + dmg + " damage. The Monster has " + monster["health"] + " health");
			}
		} else {
			display("You're not fighting a monster!");
		}
	},

	attack(status) {
		// if player has defender then monster damage is cut by 75% and rounds it up.
		var damage = Math.ceil((Math.random() * this["level"] * player1["level"] * 25 +
							this["level"] * player1["level"] + 75) / 100);
		if (status === "DEFENDED")
			damage = Math.ceil(damage * 0.25);
		if (status === "DODGED")
			if (Math.ceil(Math.random() * 3) <= 1) {
				display("You evaded the attack.");
				damage= 0;
			} else {
				display("Dodge has failed leaving you even more vulnerable.");
				damage = Math.ceil(damage * 1.15)
			}

		player1["health"] -= damage;
		display("The monster has done " + damage + " damage.");
	},

}