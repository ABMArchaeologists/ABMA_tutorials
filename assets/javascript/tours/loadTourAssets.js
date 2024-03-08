const Tour1AssetFiles = [
	'assets/javascript/tours/tour1/1_ModelAndSimulation.js',
	'assets/javascript/tours/tour1/1_ModelAndSimulationState.js',
	'assets/javascript/tours/tour1/FlockingState.js',
	'assets/javascript/tours/tour1/2_introToABM.js',
	'assets/javascript/tours/tour1/4_introToNetLogo.js',
	'assets/javascript/tours/tour1/3_ArtificialAnasazi.js',
	'assets/javascript/tours/tour2/3_theSetupProcedure.js',
	'assets/javascript/tours/tour2/4_alterNetLogoMap.js',
	'assets/javascript/tours/tour2/5_theGoProcedure.js',
	'assets/javascript/tours/tour2/6_createProcedure.js',
	'assets/javascript/tours/tour2/7_createVariable.js',
	'assets/javascript/tours/tour2/8_customEnvironment.js',
	'assets/javascript/tours/tour2/9_advancedEnvironment.js',
	'assets/javascript/tours/tour2/10_complexBehaviour.js',
	'assets/javascript/tours/tour2/11_creatingPlots.js',
	'assets/javascript/tours/tour1/2_introToABMState.js',
	'assets/javascript/tours/tour1/3_ArtificialAnasaziState.js',
	'assets/javascript/tours/tour2/3_theSetupProcedureState.js',
	'assets/javascript/tours/tour2/4_alterNetLogoMapState.js',
	'assets/javascript/tours/tour2/5_theGoProcedureState.js',
	'assets/javascript/tours/tour2/6_createProcedureState.js',
	'assets/javascript/tours/tour2/7_createVariableState.js',
	'assets/javascript/tours/tour2/8_customEnvironmentState.js',
	'assets/javascript/tours/tour2/9_advancedEnvironmentState.js',
	'assets/javascript/tours/tour2/10_complexBehaviourState.js',
	'assets/javascript/tours/tour2/11_creatingPlotsState.js',
	'assets/javascript/tours/tour3/1_introFurtherABM.js',
	'assets/javascript/tours/tour3/2_furtherABMBuilding.js',
	'assets/javascript/tours/tour3/3_breeds.js',
	'assets/javascript/tours/tour3/4_BuildingLoops.js',
	'assets/javascript/tours/tour3/5_Reporters.js',
	'assets/javascript/tours/tour3/6_Lists.js',
	'assets/javascript/tours/tour3/7_Debugging.js',
	'assets/javascript/tours/tour3/1_introFurtherABMState.js',
	'assets/javascript/tours/tour3/2_furtherABMBuildingState.js',
	'assets/javascript/tours/tour3/3_breedsState.js',
	'assets/javascript/tours/tour3/4_BuildingLoopsState.js',
	'assets/javascript/tours/tour3/5_ReportersState.js',
	'assets/javascript/tours/tour3/6_ListsState.js',
	'assets/javascript/tours/tour3/7_DebuggingState.js',
	'assets/javascript/tours/tour4/1_IntermediateABM.js',
	'assets/javascript/tours/tour4/2_SugarScape.js',
	'assets/javascript/tours/tour4/3_visualiseSugarscape.js',
	'assets/javascript/tours/tour4/4_Patches.js',
	'assets/javascript/tours/tour4/5_ToyLandscapes.js',
	'assets/javascript/tours/tour4/6_complexPlots.js',
	'assets/javascript/tours/tour4/7_Validation.js',
	'assets/javascript/tours/tour4/8_DynamicLists.js', 
	'assets/javascript/tours/tour4/1_IntermediateABMState.js',
	'assets/javascript/tours/tour4/2_SugarScapeState.js',
	'assets/javascript/tours/tour4/3_visualiseSugarscapeState.js',
	'assets/javascript/tours/tour4/4_PatchesState.js',
	'assets/javascript/tours/tour4/5_ToyLandscapesState.js',
	'assets/javascript/tours/tour4/6_complexPlotsState.js',
	'assets/javascript/tours/tour4/7_ValidationState.js',
	'assets/javascript/tours/tour4/8_DynamicListsState.js',	
	'assets/javascript/tours/tour5/1_HowToModel.js',
	'assets/javascript/tours/tour5/2_ConceptualPhase.js',
	'assets/javascript/tours/tour5/3_TechnicalPhase.js',
	'assets/javascript/tours/tour5/4_ExportingData.js',
	'assets/javascript/tours/tour5/5_DisseminationPhase.js',
	'assets/javascript/tours/tour5/1_HowToModelState.js',
	'assets/javascript/tours/tutorial.js', 
]
//Loop through the array and add each file
Tour1AssetFiles.forEach((item) => {
	const script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = item;
	script.async = false; //needs to be set so that each file is first loaded, before the next one is executed, as it might be dependent on this file
	document.head.appendChild(script);
})