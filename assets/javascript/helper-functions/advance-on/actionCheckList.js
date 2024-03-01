/*
function to tick off actions, and once all done undertake addtional action, if needed i.e. advance or enable next button
props:
	options: (array) an array of objects
		name: (string) a unique name to use for the checkbox
		label: (string) the helper text to tell the user what to do i.e. 'click button x'
		function: (function) the function that triggers the checking i.e. a function to check if button x is clicked
	actionOnComplete: (function) what to do once all the steps are complete e.g. move to next step, undisable button.
*/
function actionCheckList(props) {
	let { options, actionOnComplete } = props,
		holder = document.createElement("div"),
		tourStepid = getCurrentTourStep().currentStep.id,
		count = options.length,
		validator = {
			set(target, prop, newval) {
				if (count == newval && actionOnComplete!== undefined) {
					actionOnComplete();
				}
				return Reflect.set(...arguments);
			},
		},
		actionsCompleted = new Proxy({action:0}, validator);
		
	options.map((e)=> {
		
		function onComplete() {
			let element =  document.getElementById(tourStepid+'-'+e.name);
			element.checked = true;
			actionsCompleted.action = actionsCompleted.action+1;
		}
		e.function(onComplete);
		holder.append( createElement({type:'input', attributes:{type:'checkbox',id:tourStepid+'-'+e.name, name:e.name, 'aria-disabled':true, className:'ABMAactionCheckBox'}}) );
		holder.append( createElement({type:'label', attributes:{htmlFor:tourStepid+'-'+e.name, textContent:e.label, className:'ABMAactionCheckBoxLabel'}}) );
		holder.append( createElement({type:'br'} ));
	});
	appendToTourStep({id:'description', element:holder});
}
