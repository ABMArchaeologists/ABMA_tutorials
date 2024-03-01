/*function to create a progress bar to be added to steps. Needs to be called at the Show hook, once the step is actually created.
props: none
uses: Shepherd - global object for the Shepherd tour
returns: N/A
*/
function createProgressBar() {
	const currentStep = Shepherd.activeTour.currentStep,
		currentStepElement = currentStep.el,
		steps = Shepherd.activeTour.steps,
		header = currentStepElement.querySelector('.shepherd-header'),
		stepNumber = steps.indexOf(currentStep) + 1,
		length = steps.length,
		progressPercentage = (stepNumber/length)*100 + '%',	//calculate the progress in percentages
		text =  'Step '+stepNumber+' of '+length,
		progressbar = createProgressBarElements({text:text, progressPercentage:progressPercentage});
	
	header.insertBefore(progressbar, currentStepElement.querySelector('.shepherd-cancel-icon'));
}
/*function to create all the progress bar html elements.
props: 
	text: (string) the numbering to display
	progressPercentage: (string) the css width for the progress bar (span)	
returns: (html element) the progress bar
*/
function createProgressBarElements(props){
	const { text, progressPercentage} = props,
		holder = createElement({				//create holder for everything
			type:'div', 
			attributes:{
				className:'ABMAprogressBarHolder'
			},
		}),
		innerBar = createElement({ 				//create the progress bar
			type:'span', 
		}),		
		textHolder = createElement({			//create holder for the text
			type:'div', 
			attributes:{
				className:'ABMAprogressText', 
				innerText:text
			},
		}),
		progress = createElement({				//create progress bar holder
			type:'div', 
			attributes:{
				className:'ABMAprogressBar'
			},
		});		

	innerBar.style.width = progressPercentage;
	progress.appendChild(innerBar);
	holder.appendChild(progress);	
	holder.appendChild(textHolder);
	return holder;
}