/*
function to append and html element to a tour step
props:
	element: (html) the item to append
	id: (string) the id of where to append it in the step. Section id's are by the current steps id + (string) name
*/
function appendToTourStep(props){
	let { element, id} = props,
		tourStepid = getCurrentTourStep().currentStep.id,
		tourStep = document.getElementById(tourStepid+'-'+id);
	tourStep.append(element);	
}