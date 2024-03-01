/*function to pause a tour and then creates an unpause button
uses: 
	variables: N/A
	functions: createElement, resuming
	global objects: 
		Shepherd tour object
returns: appends button element and its holder to the DOM
*/
function pausing() {
	let activeTour = Shepherd.activeTour,						//get the active tour
		currentStep = activeTour.getCurrentStep(),				//get the current step in that active tour
		indexOfStep = activeTour.steps.indexOf(currentStep),	//get index of the current step
		tourName = activeTour.options.tourName,					//get the tour name
		settings = JSON.stringify({tourName:tourName,step:indexOfStep}), 																		//save the tour name and step index as a string
		container = createElement({type:'div', attributes:{className:'pauseHolder', id:'ABMTutorialResume'}}), 									//create a holder
		span = createElement({
			type:'span', 
			attributes:{
				className:'ABMAbttnSpanClass', 
				textContent: 'Resume', 
			}
		}),
		button = createElement({
			type:'button', 
			attributes:{
				className:'ABMAprimaryBttn pauseButton', 
				value:settings, 
				onclick:resuming
			}
		});	//create the resume button
					
		button.appendChild(span);
		
	
	activeTour.complete();				//end the tour
	container.append(button);			//add the button to the holder
	document.body.append(container);	//add the holder to the document
}