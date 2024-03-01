/*function that moves to the next step on a button click
uses:
	type: (string) the type of widget - button, monitor, switch, slider, inputBox, chooser, output, view, textBox, plot
	source: (string) the source or variable that the widget uses,
	forever: (bool) if the element is a forever element
returns: Shepherd.activeTour.next() output
*/
function advanceOnButtonClick(props){
	let action = Shepherd.activeTour.next;
	tourOnButtonClick({buttonSettings:props, action:action});
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
function tourOnButtonClick(props){
	let {buttonSettings, action} = props,
		element = getWidgetElement(buttonSettings),
		context = Ractive.getContext(element),
		settings = context.get();

	//if this is a normal button then advance on the activate-button trigger
	if (settings.widget.forever == false ) {
		let observer = context.ractive.once('activate-button', (a,b,c) => {
			action();	
		});
		removeObserverOnTourAction(observer); //remove the Observer if tour changes, prevents sideaffects
	}
	//if this is a forever button then observe if widget.running keypath changes to true, then trigger
	if (settings.widget.forever == true ) {
		let observer = context.ractive.observeOnce( 'widget.running', function ( value ) {
			action();
		});
		removeObserverOnTourAction(observer); //remove the Observer if tour changes, prevents sideaffects
	}
}