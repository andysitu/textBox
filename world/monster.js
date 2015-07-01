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

	genMonMsg() { display("You've encounted a monster! Level " + this["level"] + " and HP " + this["health"] + "."); },

	rewarder(dmg) {
		if (this.fightStatus == true) {
			if (this.health <= 0)	{
				const exp = this["level"] * player1["level"];
				player1["exp"] += exp;
				const gold = this["level"] * player1["level"] * Math.ceil(Math.random() * 5);
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

}