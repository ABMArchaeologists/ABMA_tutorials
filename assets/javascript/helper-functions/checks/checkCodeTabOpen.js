/*function to check if the code tab is open, if the code tab is not showing add a step to have the user show it
uses: 
	variables: N/A
	functions: getMainRactiveInstance, getCurrentTourStep
	global objects: 
		Shepherd tour object
		actionButtons
returns: Browser alert
*/
function checkCodeTabOpen(){
	let model =  getMainRactiveInstance(),
		modelSettings = model.get();
		//if the code tab is not showing add a step to have it show
	if (modelSettings.showCode == false) {
		let { indexOfStep } = getCurrentTourStep(),
			steps = _.cloneDeep(Shepherd.activeTour.steps),
			newStepSettings = {
				floatingUIOptions: {
					middleware: [FloatingUIDOM.offset({ mainAxis:60, crossAxis:0 })],
				},
				highlightClass: 'highlightZIndex',
				buttons:actionButtons,
				text: '<p>Click on the NetLogo Code tab.</p>',
				attachTo:{ on: 'left', element: '.netlogo-tab-area .netlogo-tab:nth-of-type(2)'},
				beforeShowPromise: function() {
					return new Promise(function(resolve) {
						advanceOnTabs({tab:'showCode'}); 
						resolve();
					});
				},
			},
			newStep = _.merge(getDefaults({tourName:''}).defaultStepOptions, newStepSettings);

		indexOfStep++;									//make sure this is the next step
		Shepherd.activeTour.addStep(step, indexOfStep);			//add new step
	}
	return Promise.resolve("Success");
}