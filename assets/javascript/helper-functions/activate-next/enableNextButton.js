/*function that un-disables the next button on a tour 
uses:NA
returns: NA
*/
function enableNextButton(){
	let id = Shepherd.activeTour.currentStep.id,
	nextButton = document.querySelector('[data-shepherd-step-id="'+id+'"] .disabledNav');
	nextButton.disabled = false;
}