/*function that moves to the next step on a switch click
uses:
	type: (string) the type of widget - button, monitor, switch, slider, inputBox, chooser, output, view, textBox, plot
	source: (string) the source or variable that the widget uses,
	action: (function) the function to call on the click
returns: Shepherd.activeTour.next() output
*/
function advanceOnSwitchClick(props){
	let { type = 'switch', source, action = Shepherd.activeTour.next } = props;
	tourOnSwitchClick({ type:type, source:source, action:action});
}
/*function that undertakes an action on the switch click
uses:
	switchSettings: (object)
		type: (string) the type of widget - button, monitor, switch, slider, inputBox, chooser, output, view, textBox, plot
		source: (string) the source or variable that the widget uses
	action: (function) the function to call on the click
returns: action outputs
*/
function tourOnSwitchClick(props){
	let {type, source, action} = props,
		element = getWidgetElement({ type:type, source:source}),
		context = Ractive.getContext(element),
		observer = context.ractive.observeOnce( 'internalValue', function ( value ) {
			action();
		});
	removeObserverOnTourAction(observer); //remove the Observer if tour changes, prevents sideaffects
}