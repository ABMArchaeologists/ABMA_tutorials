/*function that returns an object of settings we are tracking
uses:
	world: (object) global object
	session: (object) global object
returns: (object) of the current settings
*/
function getModelSettings(){
	let w = world.exportState(),
		baseSettings = { 
			widgetObj: session.widgetController.ractive.get('widgetObj'),
			patches: w.patches,
			turtles: w.turtles, 
			patchSize: world.patchSize,
			height: world.topology.height,
			width: world.topology.width,
			maxPxcor: world.topology.maxPxcor,
			maxPycor: world.topology.maxPycor,
			minPxcor: world.topology.minPxcor,
			minPycor: world.topology.minPycor,
			_wrapInX: world.topology._wrapInX,
			_wrapInY: world.topology._wrapInY,
			code: session.widgetController.code(),
			ticks: world.ticker._count, 
			nextWhoNumber: world.turtleManager.peekNextID(),
			codeGlobals: w.globals.codeGlobals,
		};
	return addRactiveSettings({baseSettings:baseSettings});
}
/*function that adds the settings from various Ractive instance components to the basesettings
props:
	baseSettings: (object) the object to add the settings to
returns:
	baseSettings: (object) the object of settings
*/
function addRactiveSettings(props){
	let { baseSettings } = props,
		alertRactiveInstance = Ractive.getContext('#alert-container'),
		alertSettings = alertRactiveInstance.ractive.get();
		ractiveInstance =  getMainRactiveInstance(),
		ractiveInstanceSettings = ractiveInstance.get(),
		{ isEditing, showCode, showConsole, showInfo, ticks } = ractiveInstanceSettings,
		editForms = ractiveInstance.findAllComponents("editForm"),
		contextMenu = ractiveInstance.findComponent("contextMenu"),
		contextMenuSettings = contextMenu.get({virtual:false});
		
	baseSettings = {															//add the main instance settings
		...baseSettings, 
		alertSetting: alertSettings,
		isEditing: isEditing, 
		showCode: showCode, 
		showConsole: showConsole, 
		showInfo: showInfo, 
		ticks: ticks,
		contextMenu: contextMenuSettings,
	};
	
	//loop through the components of the main ractive instance
	editForms.forEach( (f)=> {
		let id = f._guid,
			formSettings = f.get({virtual:false}),
			{visible, amProvingMyself, xLoc, yLoc} = formSettings; //we only need these few settings
		
		if ( baseSettings.widgets == undefined ) {
			baseSettings.widgets = {};
		}
		if ( baseSettings.widgets[id] == undefined ) {
			baseSettings.widgets[id] = {};
		}
		baseSettings.widgets[id]['editFormSettings'] = {visible:visible, amProvingMyself:amProvingMyself, xLoc:xLoc, yLoc:yLoc};
	});

	return baseSettings;	
}

/*function that adds a setting to a state, if it has changed. 
uses:
	currentStep(): (function) used to return the current step of the tour
	tourState: (object) global object - the state 

returns: tourState  (object) updated state
*/
function setTourState() {
	let {indexOfStep} = getCurrentTourStep(),
		settings = getModelSettings(); 

	for (const s in settings) {
		if ( s == 'patches' ) {
			if ( tourState[s] == undefined) {			//if this setting has not been set, set it and exit.
				tourState[s] = {};
				tourState[s][indexOfStep] = _.cloneDeep(settings[s]);
				continue;
			}
			let orderedSettings = getOrderedSettings(tourState[s]),
				lastEntry = getLastEntry(orderedSettings);
			if (  !_.isEqual(tourState[s][lastEntry][0], settings[s][0]) ){
				tourState[s][indexOfStep] = _.cloneDeep(settings[s]);
			}
			continue;
		}
		
		//let value = settings[s];
		let value = _.cloneDeep(settings[s]);
		
		if ( tourState[s] == undefined) {			//if this setting has not been set, set it and exit.
			tourState[s] = {};
			tourState[s][indexOfStep] = value;
			continue;
		}
	
		let orderedSettings = getOrderedSettings(tourState[s]),
			lastEntry = getLastEntry(orderedSettings);
			
		//special settings for context menu as can't use _.isEqual because it will contain a cyclic reference which causes the browser to freeze.
		if ( s == 'contextMenu' ) {
			for (const key in value) {
				if ( key !== 'target' && !_.isEqual(tourState[s][lastEntry][key], value[key]) ){ //avoid target for cyclic reference which will destory everything
					tourState[s][indexOfStep] = value;	
					break;
				}
			}
			continue;
		}
		//only get the widgets that have changed
		if ( s == 'widgets' ) {
			for (const id in value) {
				let localOrderedSettings = [...orderedSettings],
					lastSetting = {};
				
				while(localOrderedSettings.length) {				//need to loop through each setting to see if the component has been set
					let item = localOrderedSettings.pop();
					if ( tourState[s][item][id] !== undefined ) {
						lastSetting = tourState[s][item][id]		//get the last setting with this component change
						break;
					}
				}
				
				if ( lastSetting == undefined ) {					//if there are no previous settings, which shouldn't happen but if it does, then stop
					console.log('no last setting');
					continue;
				}
				
				if ( !_.isEqual(lastSetting, value[id]) ){ 			//check if there has been a change between now and the last setting
					if ( tourState[s][indexOfStep] == undefined ) {
						tourState[s][indexOfStep] = {};
					}
					tourState[s][indexOfStep][id] = value[id];	
				}
			}
			continue;
		}
		
		if ( s == 'codeGlobals' ) {
			for (const id in value) {
				let newGlobalSetting = value[id],
					previousGlobalSetting = tourState[s][lastEntry][id];
				
				if (  !_.isEqual(previousGlobalSetting, newGlobalSetting) ){
					tourState[s][indexOfStep] = value;
					break;
				}
			}
			continue;
		}
		
		//check if the settings are the same
		if (  !_.isEqual(tourState[s][lastEntry], value) ){
			tourState[s][indexOfStep] = value;
		}
	}
}