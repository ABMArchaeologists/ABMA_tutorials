/*function that moves to the next step when clear history is clicked on the console
uses:
	action: (function) the function to call on the click
returns: nothing
*/
function advanceOnClearHistory(props={}){
	let { action = Shepherd.activeTour.next } = props;
	tourOnClearHistory({ action:action});
}
/*function that undertakes an action when the console clears its history
uses:
	action: (function) the function to call on the click
returns: action outputs
*/
function tourOnClearHistory(props){
	let {action} = props,
		instance = session.widgetController.ractive.findComponent('console'),
		observer = instance.once( 'clear-history', function ( value ) {
			action();
		});
	removeObserverOnTourAction(observer); //remove the Observer if tour changes, prevents sideaffects
}