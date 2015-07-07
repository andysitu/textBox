var player1 = {
	health: 50,
	"max health": 50,
	level: 1,
	exp: 0,
	gold: 0,
	ATTACK() {
		// if dmg is empty, then it'll be a regular attack
		if (this.equipped[0]) {
			const weap = this.equipped[0];
			var damage =  Math.ceil(((Math.random() * items[weap]["damage"] * player1["level"] * 50) + (items[weap]["damage"] * player1["level"] * 50)) / 100);
			 monster["health"] -= damage;
			return damage;
		} else {
			var damage = Math.ceil(((Math.random() * items[weap]["damage"] * player1["level"] * 20) + (items[weap]["damage"] * player1["level"] * 80)) / 100);
			monster["health"] -= damage;
			return damage;
		}
	},
	levelUp() {
		this.level++;
		this.health = this["max health"] = this.level * 35;
		this.exp = 0;
		display("Congratulations! You leveled up to " + this.level + ".\n");
	},
	equip(itemName) {
		const item = itemName.toLowerCase();
		if ( this.inventory.indexOf(item) >= 0 ) {
			this.equipped[items[item]["slot"]] = item;
			display("You've equipped " + item + ". \n");
		} else {
			display("You don't have " + item + ".\n");
		}
	},
	unequip(itemName) {
		const item = itemName.toLowerCase();
		if ( this.equipped.indexOf(item) >= 0 ) {
			this.equipped.splice(this.equipped.indexOf(item), 1);
			display("You've unequipped " + item + ". \n");
		} else {
			display("You don't have " + item + ".\n");
		}
	},
	del(itemName) {
		const item = itemName.toLowerCase();
		if ( this.inventory.indexOf(item) >= 0 ) {
			this.inventory.splice(this.inventory.indexOf(item), 1);

			// also removes item from equipped if it's there.
			if ( this.equipped.indexOf(item) >= 0 ) {
				this.equipped.splice([items[item]["slot"]], 1);
			}

			display("You've removed " + item + ". \n");
		} else {
			display("You don't have " + item + ".\n");
		}
	},

	equipped: [], // 0: weapons;
	inventory: [],
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

	genMonMsg() { 	display("You've encounted a monster! Level " + this["level"] + " and HP " + this["health"] + ". Type \"attack\" to attack, \"defend\" to defend, \"dodge\" to dodge., \"status\" to check status, \"equip\" to equip an item.\n") },

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
			if (status === "DODGED") {
				if (Math.ceil(Math.random() * 3) <= 1) {
					display("You evaded the attack.");
					damage= 0;
				} else {
					display("Dodge has failed leaving you even more vulnerable.");
					damage = Math.ceil(damage * 1.15)
				}
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
				player1["inventory"].push(itemName);
				display("You've bought a " + itemName + "\n");
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
		desc: "A dependable sword.",
		cost: 150,
		slot: 0,
		damage: 10,
	},
	"super sword": {
		desc: "A super amazing sword.",
		cost: 1500,
		slot: 0,
		damage: 50,
	},
};


const displayScreens = {
	startMenu: "Type \"menu\" for the menu, \"status\" to see status of player, \"fight\" to fight a monster, \"store\" to enter a store. \"del\" to delete an item, \"equip\" to equip, \"unequip\" to unequip.\n",
	noCombat: "You're not in combat. Type \"fight\" to do so.\n",
};

// obj storing functions for response by input of player. 
const responseStor = {

	checkResponse(input) {
		var result = /(\w*)\s*([\w\s]*)/.exec(input);

		if (monster["fightStatus"]) {
			if (this["battle"][result[1]]) {
				this["battle"][result[1]](result[2]);
			} else {
				display("You're currently fighting. Please enter another command.\n");
			}
		} else if (store["status"]) {
			if (this["shopping"][result[1]]) {
				this["shopping"][result[1]](result[2]);
			} else {
				display("The command " + result[1] + " doesn't exist while shopping. Please try again. Type \"exit\" to exit.\n");
			}
		} else {
			if (this["normal"][result[1]]) {
				this["normal"][result[1]](result[2]);
			} else {
				display("The command " + input + " doesn't exist. Please try again.\n");
			}
		}
	},

	normal: {
		STATUS(){
			displayStr("Current Status:", player1, function(value, key, str) {
				if (typeof value !== "function") {
					if ( key == "equipped" || key == "inventory") {
						return "\n " + key + ": " + value + " ";
					} else {
						return " " + value + " " + key + ",";
					}
				} else {
					return "";
				}
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
		ATTACK() {
		 	display(displayScreens["noCombat"]);
		 },
		DEFEND() {
		 	display(displayScreens["noCombat"]);
		 },
		DODGE() {
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
		 EQUIP(itemName) {
		 	player1.equip(itemName);
		 },
		 UNEQUIP(itemName) {
		 	player1.unequip(itemName);
		 },
		 DEL(itemName) {
		 	player1["del"](itemName);
		 },

		 HELP() {
			display(displayScreens["startMenu"]);
		 },
	},

	battle: {
		STATUS() { 
			responseStor["normal"]["STATUS"]() 
		},
		ATTACK() {
		 	// ATTACK calculates player damge & returns the damage into rewarder method 
		 	// which checks if monster is dead and rewards the player if it is.
		 	monster["rewarder"](player1["ATTACK"]());
		 	monster["attack"]();
		 },
		DEFEND() {
	 		display("You have defended.");
	 		monster["attack"]("DEFENDED");
		 },
		DODGE() {
		 	// 1/3 chance of monster's attack missing.
	 		monster["attack"]("DODGED");
		 },	
 		EQUIP(itemName) {
		 	player1.equip(itemName);
		 	monster["attack"]();
		 },

	},
	shopping: {
		EXIT() {
			display("You've now exited the item shop.\n");
			store["changeStatus"](false);
		},
		BUY(itemName) {
			store["buyItem"](itemName);
		},
	}
};