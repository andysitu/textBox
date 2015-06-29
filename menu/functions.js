

// each function works for objects and array.
function each(list, callback) {
	if (Array.isArray(list)) {
		for (var i = 0; i < list.length; i++)
			callback.call(null, list[i], i, list)
	} else {
		for (var key in list) 
			callback.call(null, list[key], key, list)
	}
}


// Function to display any message given to it to the textbox
function display(msg) {
	var here = document.getElementById("area");
	here.value = here.value +  msg + "\n";
}