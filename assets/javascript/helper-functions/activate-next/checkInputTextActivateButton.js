/*function to check if text is entered into a input
	target: (node) is the target element to watch
	obs: (string) the query selector of the element to check the innerText - this may not exist yet
	text: (string) the text to check for
	success: (function) the function to run on success
*/
function checkInputTextActivateButton(props) {
	let id = Shepherd.activeTour.currentStep.id,//need to get the id to get the correct step
		elem = document.querySelector('[data-shepherd-step-id="'+id+'"] .navButton');

	elem.disabled = true;//disable the button
	props.success = ()=>{
		elem.disabled = false;//on success, remove the disable from the button
	}
	checkInputText(props);//set the observer
}