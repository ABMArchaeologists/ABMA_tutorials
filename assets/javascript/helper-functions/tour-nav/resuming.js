/*function to resume a tour, starting at a specific step
uses: 
	variables: event, the event object of a button click
	functions: getDefaults, modifyStepSettings
	global objects: 
		Shepherd tour object
returns: new Shepherd tour
*/
function resuming(event){
	let settings = event.target.value,													//get the settings of the tour name and step index, stored as the button value
		convertedSettings = JSON.parse(settings),										//convert to object
		{ tourName, step } = convertedSettings,											//get tour name and step index as vairables
		tourSettings = tourOptions[tourName],											//get the tour options
		defaultTourSettings = getDefaults({tourName:tourName}),							//get the tour settings
		tour = new Shepherd.Tour(defaultTourSettings),									//create a new tour with those settings
		finalSteps = modifyStepSettings({settings:tourSettings,selectedTour:tourName}), //modify the steps
		resumeButtonHolder = document.getElementById('ABMTutorialResume');				//get the button holder

	resumeButtonHolder.remove();	//remove the button holder
	tour.addSteps(finalSteps);		//add the steps to the tour
	tour.show(step);				//go to the specific step
}
	