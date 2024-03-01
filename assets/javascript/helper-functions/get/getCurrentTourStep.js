/*function that returns the current step and its index
uses:
	global object:
		Shepherd
returns: obj { 
	currentStep: (obj) the ccurent step
	indexOfStep: (int) the index of the step
*/
function getCurrentTourStep(){
	let activeTour = Shepherd.activeTour;
	if (!activeTour){
		return false;
	}
	let currentStep = activeTour.getCurrentStep(),
		indexOfStep = activeTour.steps.indexOf(currentStep);
	return { currentStep:currentStep, indexOfStep:indexOfStep};
}