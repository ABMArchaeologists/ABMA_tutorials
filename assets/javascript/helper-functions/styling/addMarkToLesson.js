//function to add an Unicode Hex Character to the front of the lesson buttons
function addMarkToLesson(value, mark) {
	let button = document.querySelector('button[value='+value+']'),
		span = button.children[0]
		currentText = button.textContent,
		newText = mark+''+currentText;
	//remove any existing Unicode Hex Characters
	newText =  newText.replace(/[^\x00-\x7F]/g, "");
	
	span.innerHTML = newText;
}

//this function adds a check mark
function addCheckMarkToLesson(value) {
	addMarkToLesson(value, '&#x2611;');
}
//this function adds a in progress mark
function addProgressMarkToLesson(value) {
	addMarkToLesson(value, '&#x27F3;');
}
