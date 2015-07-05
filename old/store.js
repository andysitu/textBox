var store = {
	selling: ["sword"],

	displayItems() {displayStr("Welcome! What would you like to buy?\n", items, 
		function(value, key, str){
				if ( this["selling"].indexOf(key) ) {
					return "Works";
				}
			})
	},
};