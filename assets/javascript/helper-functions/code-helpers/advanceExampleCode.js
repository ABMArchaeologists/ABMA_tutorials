

function advanceExampleCode() {
	let exampleButton = '<div>'
		+'<p class="ABMAsolutionText">If you become stuck, as a last resort, click the button below and the code will be reset and the example added.</p>'
		+'<button class="ABMAsecondaryBttn " onClick="setCodeExample()"><span class="ABMAbttnSpanClass">Full Example</span></button> </div>',
		step = Shepherd.activeTour.getCurrentStep(),
		{ el, options } = step,
		{ text, advanceExampleCode} = options,
		{ solution, codeExample, fullCode } = advanceExampleCode,
		addSolution = '<div class="ABMAsolutionHolder">'+solution+'</div>';
		
	function setOnResise() {
		let dim = el.getBoundingClientRect();
		el.style.maxWidth = dim.right+'px';
	}
	setOnResise();	
	//add an event listener for resize - then resize if needed	
	window.addEventListener('resize', setOnResise);
	//remove the event listener when the step changes, or tour ends, etc..	
	['complete', 'cancel', 'show', 'hide','active'].forEach(event => Shepherd.activeTour.once(event, ()=>{
		window.removeEventListener('resize', setOnResise, false);
	}));
	//for some reason this needs to be called twice... why- still trying to figure that out
	['complete', 'cancel', 'show', 'hide','active'].forEach(event => Shepherd.activeTour.once(event, ()=>{
		window.removeEventListener('resize', setOnResise, false);
	}));
	step.updateStepOptions({text:text.replace(solutionButton(),'')+addSolution+exampleButton});
}

function setCodeExample() {
	let codeTab = Ractive.getContext('#netlogo-code-tab'),
		codeMirror = codeTab.findComponent('codeEditor').getEditor(),
		step = Shepherd.activeTour.getCurrentStep();

	codeMirror.on('change', triggerCodeExample);
	codeMirror.setValue(step.options.advanceExampleCode.fullCode);
}

function solutionButton() {
	return '<p class="ABMAsolutionText">If you run into issues and need help, click the button below to see the solution.</p>'
	+'<button class="ABMAsecondaryBttn " onClick="advanceExampleCode()"><span class="ABMAbttnSpanClass">Solution</span></button>';
}

function triggerCodeExample(cm, change) {
	if ( change.origin == "setValue" ) {
		let step = Shepherd.activeTour.getCurrentStep();
		step.options.advanceExampleCode.codeExample();
		cm.off('change', triggerCodeExample);		//turn this off to avoid extra marking
	}
}