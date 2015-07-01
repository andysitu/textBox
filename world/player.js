// Storage of stats of the actual player.

var player1 = {
	health: 50,
	maxHealth: 50,
	level: 1,
	exp: 0,
	gold: 0,
	ATTACK() {
		var damage = Math.ceil(Math.random() * 3)
		monster["health"] -= damage;
		return damage;
	}
};