//function to add a progress class (in-progress or completed) to lesson buttons
function addProgressClassToLesson(value, className) {
	let button = document.querySelector('button[value='+value+']');
	button.classList.add(className);
}

//this function adds a complete class
function addCompleteClassToLesson(value) {
	addProgressClassToLesson(value, 'ABMAbttnCompleted');
}
//this function adds a in progress class
function addInProgressClassToLesson(value) {
	addProgressClassToLesson(value, 'ABMAbttnInProgress');
}