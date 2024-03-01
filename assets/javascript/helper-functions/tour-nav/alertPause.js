/*function to check if a NetLogo alter is expected, if not, pause the tour
uses: 
	variables: N/A
	functions: pausing
	global objects: 
		Shepherd tour object
returns: Browser alert
*/
function alertPause () {
	let activeTour = Shepherd.activeTour;
	
	if ( activeTour == null ) {		//if no tours are active, do not run
		return;
	}
	
	let currentStep = activeTour.getCurrentStep(),	
		tourName = activeTour.options.tourName,
		indexOfStep = activeTour.steps.indexOf(currentStep),
		settings = tourOptions[tourName][indexOfStep];
		
	if ( settings.alertTrue !== undefined && settings.alertTrue ) { //next check if the alert is expected
		return;
	}
	//remove any observers to prevent errors when it starts back up
	dispacthBackEvent();
	//if a tour is active and the alert is not expected, show the error message and pause the tour	
	alert('An unexpected error has occurred. We have paused the tutorial while you work out what has happend and how to fix it. '
	+'A list of common NetLogo error messages and how to fix them can be found here: '
	+'	https://ccl.northwestern.edu/netlogo/bind/article/common-netlogo-error-messages.html . '
	+'Also, a NetLogo error popup will provide further information to help you correct the error.'
	+'Once you have fixed the problem, resume the tutorial - the button to so is at the top of the screen.');
	pausing();
}