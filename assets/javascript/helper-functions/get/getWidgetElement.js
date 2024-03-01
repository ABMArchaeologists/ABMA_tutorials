/*function that returns the Element of a NetLogo Widget
uses:
	variables:
		type: (string) the type of widget - button, monitor, switch, slider, inputBox, chooser, output, view, textBox, plot
		source: (string) the source or variable that the widget uses,
		forever: (bool) if the element is a forever element
returns: (html element) the element of the widget
*/
function getWidgetElement(props){
	
	let { type, source, forever } = props,
		widgets = session.widgetController.widgets(),
		ID;
	
	
	for (const key in widgets) {
		let settings = widgets[key];
		//skip if not right type
		if ( settings.type !== type ) {
			continue
		}
		switch (type) {
			case 'button':
			case 'monitor':
				if ( source !== undefined && settings.source == source ) {
					if (forever && settings.forever !== forever) {
						break;
					}
					ID = 'netlogo-'+type+'-'+settings.id;
				}
			break;
			case 'switch':
			case 'slider':
			case 'inputBox':
			case 'chooser':
				if ( source !== undefined && settings.variable == source ) {
					ID = 'netlogo-'+type+'-'+settings.id;
				}
			break;
			case 'output':
			case 'view':
				ID = 'netlogo-'+type+'-'+settings.id;
			break;
			case 'textBox':
			case 'plot':
				if (source !== undefined && settings.display == source) {
					ID = 'netlogo-'+type+'-'+settings.id;
				}
			break;
		}
	}
	if (ID == undefined) {
		pausing();
		alert('An error has occured. The next step needs to find a '+type+' but could not find it. This could occur because no such '+type+' has been created. Or it has but the '+source+' has not been correctly set. The tutorial will pause now. Please check you settings to correct this problem' );
		Shepherd.activeTour.complete();
	}
	return document.getElementById(ID);
}