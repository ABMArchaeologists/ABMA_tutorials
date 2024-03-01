/*function that moves to the next step on change of speed
uses:
returns: 
*/
function advanceOnSpeedChange(props){
	let action = Shepherd.activeTour.next;
	tourOnSpeedChange(action);
}
/*function that undertakes an action on the speed change
uses:
	action: (function) the function to call on the click
returns: action outputs
*/
function tourOnSpeedChange(action){
	let ractiveInstance =  getMainRactiveInstance(),
		observer = ractiveInstance.observeOnce( 'speed', function ( value ) {
			action();
		});
	removeObserverOnTourAction(observer); //remove the Observer if tour changes, prevents sideaffects
}