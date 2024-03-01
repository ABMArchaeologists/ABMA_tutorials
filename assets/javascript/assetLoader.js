const jsAssetFiles = [
	'assets/javascript/shepherd/shepherd.js',									//the tour library used. More details https://shepherdjs.dev/						
	'assets/javascript/lodash/lodash.min.js',									//used for the _.cloneDeep & _.isEqual functions
	'assets/javascript/floatingUI/core@1_2_1.js',								//used by ShepherdJS, and needed to change the presentation of the tour
	'assets/javascript/floatingUI/dom@1_2_1.js',								//used by ShepherdJS, and needed to change the presentation of the tour
	'assets/javascript/create-elements/createElement.js',
	'assets/javascript/create-elements/createProgressBar.js',
	'assets/javascript/create-elements/createLessonControls.js',
	'assets/javascript/create-elements/createTutorialControls.js',
	'assets/javascript/create-elements/commonIssues.js',
	'assets/javascript/create-elements/createControls.js',
	'assets/javascript/create-elements/createMoreInfoBox.js',
	
	'assets/javascript/helper-functions/get/getWidgetElement.js',				//function that returns the Element of a NetLogo Widget
	'assets/javascript/helper-functions/get/getActiveEditForm.js',				//function that returns the active edit form
	'assets/javascript/helper-functions/get/getMainRactiveInstance.js',			//function that returns a ractive instance of the main model
	'assets/javascript/helper-functions/get/getCurrentTourStep.js',				//function that returns the current step and its index
	'assets/javascript/helper-functions/advance-on/dispacthBackEvent.js',					//function dispatches a backEvent, this triggers the removal of on's/observers to prevent errors
	'assets/javascript/helper-functions/advance-on/actionCheckList.js',						//function to allow multiple advance on actions
	'assets/javascript/helper-functions/advance-on/removeObserverOnTourAction.js',			//function that removes a Ractive observer to prevent side effects
	'assets/javascript/helper-functions/advance-on/advanceOnAlert.js',						//function that moves to the next step on a showing the alert
	'assets/javascript/helper-functions/advance-on/advanceOnButtonClick.js',				//function that moves to the next step on a button click
	'assets/javascript/helper-functions/advance-on/advanceOnAuthoringLock.js',				//function that advances to the next tour step on a click of the authoring lock
	'assets/javascript/helper-functions/advance-on/advanceOnContextMenu.js',				//function that moves to the next step on a showing or hiding of the contextMenu
	'assets/javascript/helper-functions/advance-on/advanceOnContextMenuCreateWidget.js',	//function that moves to the next step when items on the contextMenu are clicked to create a new widget
	'assets/javascript/helper-functions/advance-on/advanceOnEditForm.js',					//function that moves to the next step on a showing or hiding of the editing menu
	'assets/javascript/helper-functions/advance-on/advanceOnActiveEditFormAction.js',		//function that moves to the next step on a change in an editing form action
	'assets/javascript/helper-functions/advance-on/advanceOnRecompile.js',					//function that moves to the next step on recompling
	'assets/javascript/helper-functions/advance-on/advanceOnSpeedChange.js',				//function that moves to the next step on change of speed
	'assets/javascript/helper-functions/advance-on/advanceOnTabs.js',						//function that moves to the next step on a showing or hiding a tab menu
	'assets/javascript/helper-functions/advance-on/stopAtTicks.js',							//function will stop the running of the model at X number of clicks
	'assets/javascript/helper-functions/advance-on/advanceOnAddPen.js',						//function that moves to the next step on the clicking of add pen
	'assets/javascript/helper-functions/advance-on/advanceOnCreateWidgetWithContextMenuWait.js',	//function that chains the advance on context menu and add widget
	'assets/javascript/helper-functions/advance-on/advanceOnSwitchClick.js',				//function that moves to the next step on a switch click
	'assets/javascript/helper-functions/advance-on/advanceWidgetRunningChange.js',			//function that moves to the next step when a forever widget changes
	'assets/javascript/helper-functions/advance-on/advanceOnCommand.js',					//function that moves to the next step when a command is entered into the console
	'assets/javascript/helper-functions/advance-on/advanceOnClearHistory.js',				//function that moves to the next step when clear history is clicked on the console

	'assets/javascript/helper-functions/activate-next/enableNextButton.js',					//function that un-disables the next button on a tour 
	'assets/javascript/helper-functions/activate-next/allowNextOnChange.js',				//function that undisables the next button on a tour after observing a keypath
	'assets/javascript/helper-functions/activate-next/activateNextOnFormCodeText.js',		//function that will remove the disabled tag from the next button when certain text is typed into a form input
	'assets/javascript/helper-functions/activate-next/activateNextOnFormVariableText.js',	//function that will remove the disabled tag from the next button when certain text is typed into a form input that is a variable
	'assets/javascript/helper-functions/activate-next/checkInputTextActivateButton.js',		//function to check if text is entered into a input
	'assets/javascript/helper-functions/activate-next/allowNextOnCodeTypeover.js',			//function that undisables the next button when code its typed over i.e. no more marks present
	
	'assets/javascript/helper-functions/checks/checkCodeTabOpen.js',						//function to check if the code tab is open, if the code tab is not showing add a step to have the user show it
	'assets/javascript/helper-functions/checks/checkInputText.js',							//function to check if text is entered into a input
	'assets/javascript/helper-functions/code-helpers/demoCode.js',							//function to give an example of typing out the code
	'assets/javascript/helper-functions/code-helpers/testFunctionName.js',					//test for function name in an array of functions
	'assets/javascript/helper-functions/code-helpers/handleCodeMirrorChange.js',			//function to make changes when the codeMirror instance content changes
	'assets/javascript/helper-functions/code-helpers/markOnChange.js',						//function to mark example code with css classes, triggered by codeMirror change event	
	'assets/javascript/helper-functions/code-helpers/containsMarks.js',						//function to determine if a bit of text is marked in Code Mirror
	'assets/javascript/helper-functions/code-helpers/setCodeMirrorOptions.js',				//function to set the codeMirror options for our needs
	'assets/javascript/helper-functions/code-helpers/advanceExampleCode.js',				//
	
	'assets/javascript/helper-functions/code-helpers/returnCodeMirrorLines.js',				//function to loop through each line of a codeMirror instance and check in the text is in it. If it is, return an array of the lines that have it
	'assets/javascript/helper-functions/code-helpers/getCMLineWith.js',						//function to return a specific instance of a line with the search term i.e. return the 1st or 3rd instance
	'assets/javascript/helper-functions/code-helpers/addExampleCode.js',					//function to add code to the Code tab, highlighting the code and allow overtyping
	'assets/javascript/helper-functions/code-helpers/highlightLines.js',					//
	
	'assets/javascript/helper-functions/styling/addMarkToLesson.js',					//function to add an Unicode Hex Character to the front of the lesson buttons
	'assets/javascript/helper-functions/styling/addProgressClassToLesson.js',			//function to add a progress class (in-progress or completed) to lesson buttons
	
	'assets/javascript/helper-functions/setLessonState.js',
	'assets/javascript/helper-functions/observeLoadingOverlayChange.js',			//This function watches for the #looading-overlay to be hidden. Signalling that a waiting process has ended
	'assets/javascript/tours/defaults/mergeWhen.js',								//this function combines the functions found in two different when objects
	'assets/javascript/tours/defaults/buttonSettings.js',
	'assets/javascript/tours/defaults/modifyStepSettings.js',
	'assets/javascript/tours/defaults/basicSteps.js',
	'assets/javascript/helper-functions/tour-nav/getOrderedSettings.js',		//function that returns the tourstate settings in order. Object does not guerentee order
	'assets/javascript/helper-functions/tour-nav/getLastEntry.js',				//function that returns the last entry in an array. Makes a copy of the array so as to not mutate the orgional
	'assets/javascript/helper-functions/tour-nav/getItem.js',					//function that gets an item x locations forward or backward from another time in the object. Needed because order in objects can be random.
	
	'assets/javascript/helper-functions/tour-nav/setTourState.js',
	'assets/javascript/helper-functions/tour-nav/testForElement.js',			//function to test if the html element that the tour is going to attach too exists. If not repeat checking for an amount of time, in case element does not exist yet, then alert.
	'assets/javascript/helper-functions/tour-nav/resuming.js',					//function to resume a tour, starting at a specific step
	'assets/javascript/helper-functions/tour-nav/pausing.js',					//function to pause a tour and then creates an unpause butto
	'assets/javascript/helper-functions/tour-nav/alertPause.js',				//function to check if a NetLogo alter is expected, if not, pause the tour
	'assets/javascript/helper-functions/tour-nav/appendToTourStep.js',			//function to append and html element to a tour step
	'assets/javascript/helper-functions/tour-nav/manageBack.js',
	'assets/javascript/tours/runTutorialSetUp.js', 
	'assets/javascript/helper-functions/createWidget.js',
]
//Loop through the array and add each file
jsAssetFiles.forEach((item) => {
	const script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = item;
	script.async = false; //needs to be set so that each file is first loaded, before the next one is executed, as it might be dependent on this file
	document.head.appendChild(script);
})
