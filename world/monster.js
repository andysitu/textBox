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
}