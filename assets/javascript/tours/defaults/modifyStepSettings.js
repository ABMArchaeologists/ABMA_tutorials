/*
fuction to make logic changes to the default Shepherd step settings - all of them
 */
function modifyStepSettings(props){
	let {settings, selectedTour} = props,
		settingsLength = settings.length;
	 
	return modifiedSettings = settings.map((e, index) => {
		return  modifySingleStepSettings({e:e, index:index, selectedTour:selectedTour, settingsLength:settingsLength});
	});
}
/*
fuction to make logic changes to the default Shepherd step settings for a single step
Settings from 
actionButtons - the buttons when an action is required to advance - assets/javascript/tours/defaults/actionButtonsSettings.js
finishButtons - the buttons when a tour finishes - assets/javascript/tours/defaults/finishButtonsSettings.js
startButtons - the buttons when a tour starts - assets/javascript/tours/defaults/startButtonsSettings.js
 */
function modifySingleStepSettings(props){
	let {e, index, selectedTour, settingsLength } = props,
		modified = {...getDefaults({}).defaultStepOptions},	//get the default settings
			promises = [];										//use to collect and then later run through all the promises
			
	//when, beforeShowPromise
	for (const key in e) {
		if (key == 'when') {
			let d = {...modified['when']};
			modified[key] = mergeWhen({ when:e[key], whenDefault: d });
			
			continue;
		}
		if (key == 'beforeShowPromise') {	//if there are promises, add it to the array, see end.
			promises.push(e[key]);
			continue;
		}
		modified[key] = e[key];
	}

	//these are basic steps that are repeated often enough it is easier to create set steps
	if (modified.basicStep !== undefined) {
		modified = {...modified.basicStep};
	}
	
	//LOGIC
	//add greater width class to stand alone steps
	if (modified.attachTo == undefined) {
		modified.classes += ' ABMAnonAttachedWidth';
	}
	//add offset to steps
	if (modified.attachTo !== undefined) {
		modified.floatingUIOptions = {
			middleware: [FloatingUIDOM.offset({ mainAxis: 50, crossAxis: 0 })],
		};
	}
	
	//add start buttons and change the button colors of the menu
	if (index == 0 ) {
		modified.buttons = startButtons; 							//change the buttons
		
		modified.when = mergeWhen({ 
			when: {
				'before-show':()=>{
					addProgressMarkToLesson(selectedTour);			//mark changes to lessons
					addInProgressClassToLesson(selectedTour);
				},
				'show':()=>{
					session.widgetController.ractive.set('isVertical', false);//make sure the code tab is set to the right before each tour.
				}
			}, 
			whenDefault: {...modified['when']},
		});

		let settingState = function() {
			return new Promise(function(resolve) {
				tourState = {};															//reset the tour state
				setLessonState({nlogo:tourData[selectedTour], path:'Welcome to ABM'});	//load up the model
				observeLoadingOverlayChange({action:resolve}); 							//sometimes this change is not fully complete and a time delay is needed for certain when show actions
			}).then(()=>{
				//this is to catch updates to the form - making sure the final settings are saved in the current step, instead of the next one - for moving back
				session.widgetController.ractive.on("*.update-widgets", ()=>{
					let {indexOfStep} = getCurrentTourStep(),
						s = session.widgetController.ractive.get('widgetObj');
					tourState['widgetObj'][indexOfStep] = s;
				});
			});
		}
		promises.push(settingState);
	}

	//add end buttons and change the button colors of the menu
	if (index == (settingsLength -1)) {
		modified.buttons = finishButtons({selectedTour:selectedTour});		//change the buttons
		modified.when = mergeWhen({ 
			when: {'before-show':()=>{
					addCheckMarkToLesson(selectedTour);						//mark changes to lessons
					addCompleteClassToLesson(selectedTour);
				}
			}, 
			whenDefault: {...modified['when']},
		});
	}

	//add action buttons to advanceOn, except if we are disabling the next button
	if ((modified?.advanceOn || modified?.complexAdvanceOn || modified?.multiStepAdvance) && modified.buttons !== disabledNextButtons ){
		modified.buttons = actionButtons;
	}
	if ( modified.advanceExampleCode !== undefined) {	
		modified.text += solutionButton();
	}
	
	if (modified.multiStepAdvance !== undefined ) {
		modified.when = mergeWhen({ 
			when: {
				'show': modified.multiStepAdvance,
			}, 
			whenDefault: {...modified['when']},
		});
	}
	
	if ( modified.attachTo !== undefined ) { //TODO come back to look at issues this might cause
		const checkE = function() {
			new Promise(function(resolve) {
				return testForElement({resolve: resolve, element: modified.attachTo.element});
			}).then(()=> {
				if ( modified.codeExample !== undefined) {
					modified.codeExample();
				}
				if ( modified.complexAdvanceOn !== undefined) {
					modified.complexAdvanceOn();
				}

			});
		};
		promises.push(checkE);
	}
	
	modified.beforeShowPromise = function() {
		return new Promise(function(resolve) {
			promises = promises.map((p) => {
				return p();
			}); //actually call all the promises that are inside consumer functions
			Promise.all(promises).then((results) => {
				resolve();
			});
		})
	};
			
	return modified;
}