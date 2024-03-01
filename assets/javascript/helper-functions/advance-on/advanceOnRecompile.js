/*function that moves to the next step on recompling
each widget has an edit form so need to set the widget to get that form for
uses:
	tab: (string) the name of the keypath to monitor - showConsole, showCode, or showInfo
returns: NA
*/
function advanceOnRecompile(){
	let action = Shepherd.activeTour.next;
	tourOnRecompile(action);
}
/*function that enacts and action on recompling
each widget has an edit form so need to set the widget to get that form for
uses:
	tab: (string) the name of the keypath to monitor - showConsole, showCode, or showInfo
returns: NA
*/
function tourOnRecompile(action){
	let observer = session.widgetController.ractive.observeOnce( 'lastCompiledCode', function ( value ) { //required to check the compiled code to avoid issues with example code. The old way resulted in the example code being added to the recompiled code before the next step properly kicked in, cause it not to see any changes
			action();
		});	
	removeObserverOnTourAction(observer); //remove the Observer if tour changes, prevents sideaffects
}