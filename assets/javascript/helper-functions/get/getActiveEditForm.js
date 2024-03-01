/*function that returns the active edit form
uses: N/A

returns: (html element) the element of the widget
*/
function getActiveEditForm(){
	let widgets = session.widgetController.widgets();
		
	for (const key in widgets) {
		let settings = widgets[key],
			element = Ractive.getContext('#netlogo-'+settings.type+'-'+settings.id),
			editForm = element.ractive.findComponent("editForm"),
			editFormSettings = editForm.get();
		if (editFormSettings.visible) {
			return {element: document.getElementById(editFormSettings.id), settings:editFormSettings, instance:editForm };
			break
		}
	}
}