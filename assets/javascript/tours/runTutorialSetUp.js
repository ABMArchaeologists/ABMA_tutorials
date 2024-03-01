let	tourState = {},
	selectedTutorial = 'introToABM';
	
function getDefaults(props) {
	let {tourName} = props,
		tourDefaults = {
			confirmCancel: true,
			confirmCancelMessage:'You are exiting this lesson. Click Ok to leave, cancel to stay.',
			useModalOverlay: true,
			tourName:tourName,
			defaultStepOptions: {
				scrollTo: { behavior: 'smooth', block: 'center' },
				buttons: basicButtons,
				cancelIcon: {
					enabled: true,
				}, 
				when: {
					show: function () {
						createProgressBar();
						setTourState();
					},
				},
				modalOverlayOpeningPadding: 1,
				modalOverlayOpeningRadius: 5,
				highlightClass: 'highlightZIndex',
			},
		};
	return tourDefaults;
}
//function to run the tour
function runTour (event) {
	let selectedTour;
	if (event.currentTarget !== undefined) {
		 selectedTour = event.currentTarget.value;
	}
	if (event.currentTarget == undefined) {
		 selectedTour = event.target.value;
	}
	
	let	tourSettings = tourOptions[selectedTour],
		defaultTourSettings = getDefaults({tourName:selectedTour}),
		tour = new Shepherd.Tour(defaultTourSettings),
		finalSteps = modifyStepSettings({settings:tourSettings, selectedTour:selectedTour}),
		alertRactiveInstance = Ractive.getContext('#alert-container');
	
	alertRactiveInstance.ractive.on('show', alertPause);			//pause the tour and present an alert message if there is an unexpected error
	tour.addSteps(finalSteps);
	tour.start();
}

function runTutorialSetUp(props){
	const url = new URL(window.location.href);									//disable saving work in progress, to avoid caching error
	url.searchParams.set('disableWorkInProgress', '');
	url.searchParams.set('tabs', 'right');										//set the default for tabs to be to the right
	window.history.replaceState(null, null, url); 
	document.title = "Learn ABM";												//set the document title
	createControls({tutorialList:tutorialList, lessonLists:lessonLists}); 		//create the control panel
	localStorage.removeItem('netLogoWebWip');									// remove the cache to avoid the caching error
	setTimeout(()=>{session.widgetController.ractive.set('isVertical', false)}, 1000);
}