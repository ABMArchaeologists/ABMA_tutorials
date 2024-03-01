/*function will stop the running of the model at X number of clicks
uses:
	variables:
		ticks: (integer) the number of ticks to stop at
		activeButton: (element) the element for triggering the start/stop i.e. the go button
		action: (function) what to do when the ticks hit a certain amount, defaults to next step
	global objects:
		Ractive
		Shepherd
	functions:
		getMainRactiveInstance
returns: NA
*/
function stopAtTicks(props){
	let { 
			ticks, 
			activeButton, 
			action = Shepherd.activeTour.next
		} = props,	//get the props, default the action() to trigger the next step
		ractiveInstance = getMainRactiveInstance(),	//get the main container
		ABcontext = Ractive.getContext(activeButton),						//get the ractive context of the button provided
		observeTicks = ractiveInstance.ractive.observe( 'ticks', function ( value ) { //observe the 'ticks' setting
			if ( value == ticks) {
				observeTicks.cancel();						//cancel this observation once this is reached
				ABcontext.set('widget.running', false);		//the button will be a forever button so that needs to be turned off
				action();									//function to run i.e. what happens next
			}
		});
	removeObserverOnTourAction(observeTicks); //remove the Observer if tour changes, prevents sideaffects
}