/*function that moves to the next step when a forever widget changes
uses:
	type: (string) the type of widget - button, monitor, switch, slider, inputBox, chooser, output, view, textBox, plot
	source: (string) the source or variable that the widget uses,
	forever: (bool) if the element is a forever element
returns: Shepherd.activeTour.next() output
*/
function advanceWidgetRunningChange(props){
	let action = Shepherd.activeTour.next;
	onWidgetRunningChange({buttonSettings:props, action:action});
}
/*function that undertakes an action on the button click
uses:
	buttonSettings: (object)
		type: (string) the type of widget - button, monitor, switch, slider, inputBox, chooser, output, view, textBox, plot
		source: (string) the source or variable that the widget uses
		forever: (bool) if the element is a forever element
	action: (function) the function to call on the click
returns: action outputs
*/
function onWidgetRunningChange(props){
	let {buttonSettings, action} = props,
		element = getWidgetElement(buttonSettings),
		context = Ractive.getContext(element);

	let observer = context.ractive.observeOnce( 'widget.running', function ( value ) {
		action();
	});
	removeObserverOnTourAction(observer); //remove the Observer if tour changes, prevents sideaffects
}