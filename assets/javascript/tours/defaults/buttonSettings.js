const backButton = {
		action() {
			return manageBack();
		},
		text:  '<span class="ABMAbttnSpanClass">Back</span>',
		classes:'ABMAsecondaryBttn',
	},
	pauseButton = {
		action() {
			pausing();
		},
		text:  '<span class="ABMAbttnSpanClass">Pause</span>',
		classes:'ABMAsecondaryBttn',
	},
	nextButton = {
		action() {
			return Shepherd.activeTour.next();
		},
		text: '<span class="ABMAbttnSpanClass">Next</span>',
		classes:'ABMAprimaryBttn',
	},
	actionNotice = {
		classes: 'actionNotice',
		text: 'Action required to advance',
		disabled: true,
	},
	startButton = {
		action() {
			return this.next();
		},
		text: '<span class="ABMAbttnSpanClass">Start</span>',
		classes:'ABMAsecondaryBttn',
	},
	disabledNext = {
		...nextButton, 
		classes:'ABMAprimaryBttn disabledNav', 
		disabled: true,
	},
	finishedButton = {
		action() {
			return Shepherd.activeTour.complete();
		},
		text: '<span class="ABMAbttnSpanClass">Finish</span>',
		classes:'ABMAsecondaryBttn',
	},
	actionButtons = [
		backButton,
		pauseButton,
		actionNotice,
	],
	startButtons = [
		startButton,
	],
	disabledNextButtons = [
		backButton,
		pauseButton,
		disabledNext,
	],
	basicButtons = [
		backButton,
		pauseButton,
		nextButton,
	];
	
//this are default settings for the buttons when an action is required
function finishButtons(props) {
	let {selectedTour} = props,
		mark = 0,
		buttons = [
			backButton,
			finishedButton,
		];
	//loop through the selectedTutorial
	for (const e of lessonLists[selectedTutorial]) {
		if (mark == 1) {
			buttons.push({
				action() {
					this.complete();			//end this tour
					let event = { target:{value:e.value} };
					runTour(event);				//start the next tour
				},
				text: '<span class="ABMAbttnSpanClass">Next Lesson: '+e.text+'</span>' ,
				classes:'ABMAprimaryBttn',
			});
			break;
		}
		//if this tour is the same as this entry, the next entry will be the next tour
		if (e.value == selectedTour) {
			mark = 1;
		}
	};
	return buttons;
}
