var player1 = {
	health: 50,
	"max health": 50,
	level: 1,
	exp: 0,
	gold: 0,
	ATTACK(dmg) {
		// if dmg is empty, then it'll be a regular attack
		if (dmg) {
			monster["health"] -=  Math.ceil(Math.random() * dmg * player1["level"]);
			return dmg;
		} else {
			var damage = Math.ceil(Math.random() * 3 * player1["level"]);
			monster["health"] -= damage;
			return damage;
		}
	},
	levelUp() {
		this.level++;
		this.health = this["max health"] = this.level * 35;
		this.exp = 0;
		display("Congratulations! You leveled up to " + this.level + ".");
	},
};


// Generates monster based on level of the player

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

	genMonMsg() { 	display("You've encounted a monster! Level " + this["level"] + " and HP " + this["health"] + ". Type \"attack\" to attack, \"defend\" to defend, \"dodge\" to dodge.\n") },

	// Shows damage player has done and rewards player if monster has died.
	rewarder(dmg) {
		if (this.health <= 0)	{
			const exp = this["level"] * player1["level"];
			player1["exp"] += exp;
			const gold = exp * Math.ceil(Math.random() * 5);
			player1["gold"] += gold;
			display("After doing " + dmg + " damage, you killed the monster. You have gained " + exp + " exp and " + gold + " gold\n");
			this.fightStatus = false;
			if (player1.exp >= player1.level * player1.level * 5)
				player1["levelUp"]();
		} else {
			display("You've done " + dmg + " damage. The Monster has " + monster["health"] + " health.");
		}

	},

	attack(status) {
		// if player has defender then monster damage is cut by 75% and rounds it up.
		if (this["health"] > 0) {
			var damage = Math.ceil((Math.random() * this["level"] * player1["level"] * 25 +
								this["level"] * player1["level"] + 75) / 80);
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
			display("The monster did " + damage + " damage.\n");
		}
	},

}


var store = {
	status: false,
	changeStatus(input) {
		if (input) {
			this.status = true;
		} else {
			this.status = false;
		}
	},
	displayItems() {displayStr("Welcome! What would you like to buy?\n", items, 
		function(value, key, str){
			if (value["cost"]) {
				return " " + key + ": \t" + value["desc"] + " " + value["cost"] + " gold\n";
			} else {
				return "";
			}
		})
	},
	buyItem(item) {
		var itemName = item.toLowerCase();

		if (items[itemName]) {
			if (player1["gold"] >= items[itemName]["cost"]) {
				player1["gold"] -= items[itemName]["cost"];
				console.log(itemName);
			} else {
				display("You don't have enough gold.");
			}
		} else {
			display("This item doesn't exist.");
		}

	},
};

var items = {
	"sword": {
		desc: "A dependable sword. First-rate.",
		cost: 15,
		slot: 0,
		attack() {
			return 10;
		}
	},
	"Super Sword": {
		desc: "A super amazing sword.",
		cost: 1500,
		slot: 0,
		attack() {
			return 50;
		}
	},
};


const displayScreens = {
	startMenu: "Type \"menu\" for the menu, \"hp\" to see health of player, \"status\" to see status of player, \"fight\" to fight a monster, \"store\" to enter a store.\n",
	noCombat: "You're not in combat. Type \"fight\" to do so.\n",
};

// obj storing functions for response by input of player. 
const responseStor = {

	checkResponse(input) {
		if (monster["fightStatus"]) {
			if (this["battle"][input]) {
				this["battle"][input]();
			} else {
				display("You're currently fighting. Please enter another command.\n");
			}
		} else if (store["status"]) {
			var result = /(\w*)\s*(\w*)/.exec(input);
			if (this["shopping"][result[1]]) {
				this["shopping"][result[1]](result[2]);
			} else {
				display("The command " + result[1] + " doesn't exist while shopping. Please try again.\n");
			}
		} else {
			if (this["normal"][input]) {
				this["normal"][input]();
			} else {
				display("The command " + input + " doesn't exist. Please try again.\n");
			}
		}
	},

	normal: {
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
		 	display(displayScreens["noCombat"]);
		 },
		DEFEND(input) {
		 	display(displayScreens["noCombat"]);
		 },
		DODGE(input) {
	 		display(displayScreens["noCombat"]);
		 },		 
		STORE() {
		 	if (monster["fightStatus"]) {
				display("You're in combat. Come here when it's over!\n");
			} else {
				store["displayItems"]();
				display("To buy something, type \"buy [item name]\". Type \"exit\" to exit the store.\n")
				store["changeStatus"](true);
			}
		 },

		 HELP() {
			display(displayScreens["startMenu"]);
		 },
	},

	battle: {
		HP(){
			display("You have " + player1["health"] + "/" + player1["max health"] + " HP");
		 },
		STATUS() { responseStor["normal"]["STATUS"]() },
		ATTACK(input) {
		 	// ATTACK calculates player damge & returns the damage into rewarder method 
		 	// which checks if monster is dead and rewards the player if it is.
		 	monster["rewarder"](player1["ATTACK"]());
		 	monster["attack"]();
		 },
		DEFEND(input) {
	 		display("You have defended.");
	 		monster["attack"]("DEFENDED");
		 },
		DODGE(input) {
		 	// 1/3 chance of monster's attack missing.
	 		monster["attack"]("DODGED");
		 },		 		 		 
	},
	shopping: {
		EXIT() {
			display("You've now exited the item shop.");
			store["changeStatus"](false);
		},
		BUY(itemName) {
			store["buyItem"](itemName);
		},
	}
};