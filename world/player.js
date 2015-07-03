// Storage of stats of the actual player.

var player1 = {
	health: 50,
	"max health": 50,
	level: 1,
	exp: 0,
	gold: 0,
	ATTACK(dmg) {
		// if dmg is empty, then it'll be a regular attack
		if (dmg) {
			monster["health"] -= dmg;
			return dmg;
		} else {
			var damage = Math.ceil(Math.random() * 3 * player1["level"]);
			monster["health"] -= damage;
			return damage;
		}
	},
	levelUp() {
		if (this.exp >= this.level * this.level * 5) {
			this.level++;
			this.health = this["max health"] = this.level * 35;
			this.exp = 0;
			display("Congratulations! You leveled up to " + this.level + ".");
		}
	}
};