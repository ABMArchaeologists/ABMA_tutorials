/*function that moves to the next step when a command is entered into the console
uses:
	action: (function) the function to call on the click
returns: Shepherd.activeTour.next() output
*/
function advanceOnCommand(props={}){
	let { action = Shepherd.activeTour.next } = props;
	tourOnCommand({ action:action});
}
/*function that undertakes an action when a command is entered into the console and enter is pushed
uses:
	action: (function) the function to call on the click
returns: action outputs
*/
function tourOnCommand(props){
	let {action} = props,
		instance = session.widgetController.ractive.findComponent('console'),
		observer = instance.once( 'command-center-run', function ( value ) {
			action();
		});
	removeObserverOnTourAction(observer); //remove the Observer if tour changes, prevents sideaffects
}