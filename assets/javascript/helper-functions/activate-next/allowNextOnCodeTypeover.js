/*function that undisables the next button when code its typed over i.e. no more marks present
uses:
	codeMirror: (object) the codeMirror instance for the code tab
returns: NA
*/
function allowNextOnCodeTypeover(props = {}){
	let codeTab = Ractive.getContext('#netlogo-code-tab'),
		codeMirror = codeTab.findComponent('codeEditor').getEditor();

	codeMirror.on('update', checkForMarkingToStartNextWatch);
	
	//needed if the tour is interupted 
	['complete', 'cancel'].forEach(event => Shepherd.on(event, () => {
		codeMirror.off('change', checkForMarkingToStartNextWatch);		//turn this off to avoid extra checking
		codeMirror.off('change', checkForMarkingForNextChange);				//turn this off to avoid extra checking
	}));
}
//function to check for markings first to start the checkForMarkingForNextChange()
function checkForMarkingToStartNextWatch(cm, change) {
	let currentMarks = cm.getAllMarks();

	if (currentMarks.length > 0) {
		cm.off('update', checkForMarkingToStartNextWatch);		//turn this off to avoid extra checking
		cm.on('change', checkForMarkingForNextChange);
	}
}

//function that checks for markings to activate next
function checkForMarkingForNextChange(cm, change) {
	let currentMarks = cm.getAllMarks(),
		countMarks = 0;

	currentMarks.forEach((e, index)=> {
		if (e.className == "codeExample" || e.className == 'incorrectCode') {
			countMarks++
		}
	});

	if(countMarks == 0) {
		enableNextButton();
		cm.off('change', checkForMarkingForNextChange);		//turn this off to avoid extra checking
	}
}