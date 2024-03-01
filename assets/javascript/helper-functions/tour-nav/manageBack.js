function manageBack(){
	let activeTour = Shepherd.activeTour,
		{indexOfStep, currentStep} = getCurrentTourStep(),
		backStep = indexOfStep -1, 
		backStepObject = activeTour.steps[backStep],
		backStepOptions = backStepObject.options,
		currentState = {...world.exportState()},
		stateChange = false,
		topology = {...world.topology};
		topologyChange = false,
		ractiveInstance =  getMainRactiveInstance(),
		alertRactiveInstance = Ractive.getContext('#alert-container'),
		contextMenuRactiveInstance  = Ractive.getContext('#netlogo-widget-context-menu');

	//dispacth and even to cancel the on's and observers to prevent errors
	dispacthBackEvent();


	for (const change in tourState) {
		//if this are undefined end this 
		if (tourState[change] == undefined) { 
			continue;
		}
		let setting,
			nextIndex = indexOfStep - 1;
		//if the next step is a change step, then set the changes to be for that step 
		if (tourState[change][nextIndex] !== undefined) { 
			setting = tourState[change][nextIndex];
		}
		//if the current step is a change step but the next one isn't then go to the next change
		if (tourState[change][nextIndex] == undefined && tourState[change][indexOfStep] ) { 
			setting = getItem({obj:tourState[change], key:indexOfStep, movement:-1}); //get the previous setting before this change
		}
		
		if ( setting == undefined || setting == null ) {
			continue
		}
		switch (change) {
			case 'widgetObj':
				ractiveInstance.ractive.set('widgetObj', setting);
			break;
			case 'globals':
			case 'patches':
			case 'turtles':
				currentState[change] = setting;
				stateChange = true;
			break;
			case 'patchSize':
				world.setPatchSize(setting);
			break;
			case 'code': 
				let codeTab = Ractive.getContext('#netlogo-code-tab'),
					codeMirror;
				if ( codeTab !== undefined ) {
					codeMirror	= codeTab.findComponent('codeEditor').getEditor();
					codeMirror.setValue(setting);
				}
			break;
			case 'height': 
			case 'width': 
			case 'maxPxcor': 
			case 'maxPycor':
			case 'minPxcor': 
			case 'minPycor':
			case '_wrapInX': 
			case '_wrapInY':
				topology[change] = setting;
				topologyChange = true;
			break;
			case 'alertSetting': 
				alertRactiveInstance.ractive.set(setting);
			break;
			case 'contextMenu':
				let cm = ractiveInstance.findComponent('contextMenu');

				//intercept the click so that this will appear, once
				document.body.addEventListener("click", (event)=> {
					event.stopPropagation();
					event.stopImmediatePropagation();
				}, {once:true});	

				cm.set(setting);
			break;
			case 'widgets':
				let components = ractiveInstance.findAllComponents(),
					componentsOrdered = {};	
				//order the componets object by their ids
				for (const key in components) {
					componentsOrdered[components[key]._guid] = components[key];
				}

				//loop though all the components and change the settings that need to be changed	
				for (const id in setting) {
					let comp = componentsOrdered[id]

					if ( setting[id]['editFormSettings'] !== undefined ) {				
						comp.set(setting[id]['editFormSettings'])
					}	
				}
			break;
			case 'isEditing':
			case 'showCode':
			case 'showConsole':
			case 'showInfo':
				ractiveInstance.set(change, setting);
			break;
			case 'ticks':
				ractiveInstance.set(change, setting);
				currentState.globals.ticks = setting;
				stateChange = true;
			break;
			case 'nextWhoNumber':
				currentState.globals.nextWhoNumber = setting;
				stateChange = true;
			break;
			case 'codeGlobals':
				currentState.globals.codeGlobals = setting;
				stateChange = true;
			break;
		}
	}
	if (stateChange) {
		world.importState(currentState);
	}
	if (topologyChange) {
		//TODO check if we need height or width
		let {maxPxcor,maxPycor,minPxcor,minPycor,_wrapInX,_wrapInY} = topology;
		world.changeTopology(_wrapInX,_wrapInY, minPxcor, maxPxcor, minPycor, maxPycor);
	}
	
	//because many steps have promises we have to re-add them to the steps. This gets the settings for the next step, modifies them like happens when the tour is created i.e. adds new promises, and the updates that tour step with the modified step. 
	let tourID = activeTour.id,
		tourIDSplit = tourID.split('--'),
		tourName = tourIDSplit[0],
		tourSettings = tourOptions[tourName],
		modBackStep = modifySingleStepSettings({e:tourSettings[backStep], index:backStep, selectedTour:tourName, settingsLength: tourSettings.length}),
		modeCurrentStep = modifySingleStepSettings({e:tourSettings[indexOfStep], index:indexOfStep, selectedTour:tourName, settingsLength: tourSettings.length});
		
	backStepObject.updateStepOptions(modBackStep);  
	currentStep.updateStepOptions(modeCurrentStep); //reset the current step for when they go forward again.

	return activeTour.show(backStep);
}