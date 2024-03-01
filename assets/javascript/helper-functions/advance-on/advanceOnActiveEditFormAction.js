/*function that moves to the next step on a change in an editing form action
each widget has an edit form so need to set the widget to get that form for
uses:
	action: (string) 
returns: NA
*/
function advanceOnActiveEditFormAction(action){
	let ActiveEditForm = getActiveEditForm(),
		{ instance } = ActiveEditForm,
		observer = instance.once( action, function ( value ) {
			Shepherd.activeTour.next();	
		});
	removeObserverOnTourAction(observer); //remove the Observer if tour changes, prevents sideaffects
}