
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
	here.scrollTop = here.scrollHeight; // scrolls to bottom
}

function displayStr(startMSG, list, func) {
	var str = startMSG || "";

	if (list instanceof Array) {
		for (var i = 0; i < list.length; i++)
			str = str + func(list[i], i, str);
	} else {
		for (var key in list)
			str = str + func(list[key], key, str);
	}

	display(str.slice(0, -1) + "\n");
}