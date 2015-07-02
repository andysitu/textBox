// Storage of stats of the actual player.

var player1 = {
	health: 50,
	"max health": 50,
	level: 1,
	exp: 0,
	gold: 0,
	ATTACK() {
		var damage = Math.ceil(Math.random() * 3 * player1["level"]);
		monster["health"] -= damage;
		return damage;
	},
	levelUp() {
		if (this.exp >= this.level * this.level * 5) {
			this.health = this["max health"] = this.level * 35;
			this.level++;
			this.exp = 0;
			display("Congraultions! You're now level " + this.level);
		}
	},
};