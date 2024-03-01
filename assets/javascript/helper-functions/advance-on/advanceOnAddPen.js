/*function that moves to the next step on the clicking of add pen
each widget has an edit form so need to set the widget to get that form for
uses:
returns: NA
*/
function advanceOnAddPen(){

	let ActiveEditForm = getActiveEditForm(),
		{ settings } = ActiveEditForm,
		instance = Ractive.getContext('#'+settings.id), //use the settings id to get the instance
		observer = instance.ractive.once('add-new', (a,b,c) => {
			Shepherd.activeTour.next();	
		});
	removeObserverOnTourAction(observer); //remove the Observer if tour changes, prevents sideaffects
}