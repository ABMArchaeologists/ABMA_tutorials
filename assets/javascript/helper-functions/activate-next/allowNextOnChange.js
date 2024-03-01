/*function that undisables the next button on a tour after observing a keypath
works for 'switch', 'slider', 'inputBox', 'chooser'
uses:
	type: (string) the type of widget - button, monitor, switch, slider, inputBox, chooser, output, view, textBox, plot
	source: (string) the source or variable that the widget uses
returns: NA
*/
function allowNextOnChange(props){
	let element = getWidgetElement(props),
		context = Ractive.getContext(element);
		observer = context.ractive.observeOnce( 'widget.currentValue', function ( value ) {
			enableNextButton();
		});
	
	//needed if the tour is interupted i.e. cancel this observer others if the tour starts back up this will trigger two tours
	removeObserverOnTourAction(observer)
}