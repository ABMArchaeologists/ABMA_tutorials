/*

*/
function createWidget(props) {
	let {type, settings, x, y} = props,
		wc = session.widgetController,
		ractiveWC = wc.ractive,
		currentWidgetsCount = wc.widgets().length,
		path = 'widgetObj.'+currentWidgetsCount,
		obs = ractiveWC.observe(path,()=> {
			let newWidget = ractiveWC.findAllComponents("").find((c) => {
				if ( c.get('widget') !== undefined && c.get('widget').id == currentWidgetsCount ) {
					return true;
				}
				return false;
			});

			if (newWidget) {
				newWidget.findComponent('editForm')?.set('amProvingMyself', false);
				newWidget.findComponent('editForm')?.fire("activate-cloaking-device");
				let currentSettings = _.cloneDeep(ractiveWC.get('widgetObj')[currentWidgetsCount]),
					newSettings = _.merge(currentSettings, settings);

				ractiveWC.set('widgetObj.'+currentWidgetsCount, newSettings);
				ractiveWC.update('widgetObj');
				obs.cancel();
				return;
			}
		}, [{defer:true, strict: true}]);

	session.widgetController.ractive.set('isEditing',true); //prevents errors when creating a widget
	session.widgetController.createWidget(type, x, y);
	session.widgetController.ractive.set('isEditing',false); //prevents errors when creating a widget
}
	
