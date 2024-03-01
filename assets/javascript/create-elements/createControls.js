/*function to create tour lesson buttons to run the different lessons
props:
	tourSelectorOptions: (array) and array of objects with- text and value attributes
returns: N/A appended to DOM
*/
function createControls(props) {
	let {tutorialList, lessonLists} = props,
		mainHolder = createElement({
			type:'div',
			attributes:{
				className:'ABMAcontrolTopHolder',
			},
		}),
		controlHolder = createElement({
			type:'div',
			attributes:{
				className:'ABMAcontrolHolderColumn',
			},
		}),
		controlHolderColumn1 = createElement({
			type:'div',
		}),
		controlHolderColumn2 = createElement({
			type:'div',
		}),
		helpHolder = createElement({
			type:'div',
			attributes:{
						className:'ABMAFAQHolderClass',
			},
		}),
		logo = createElement({type:'img', attributes:{src:"assets/images/ABMA.png", className:'ABMATitleLogo'}}),
		creativeImage = createElement({type:'img', attributes:{src:"assets/images/ABMAcreativeImage.png", className:'ABMACreativeImage'}}),
		header = createElement({type:'h2', attributes:{textContent:"Learn Agent-based Modelling", className:'ABMATitleText'}}),
		aboutTutorialText = createElement({type:'p', attributes:{textContent:'Select the tutorial you want to undertake. For beginners go in order e.g. 1, 2, 3, etc.', className:'ABMAStartText'}
		}),
		aboutChapterText = createElement({type:'p', attributes:{textContent:'Click the button for the lesson you need. For beginners go in order e.g. 1, 2, 3, etc.', className:'ABMAStartText'}
		}),
		helpInfo = createElement({type:'p', attributes:{textContent:'Need help? Check out these FAQs to help you.', className:'ABMAStartText'}
		}),
		tourOptions = createLessonControls({options:lessonLists[selectedTutorial]}),
		tutorialOptions = createTutorialControls( {options:tutorialList, lessonLists:lessonLists} ),
		commonIssuesOutput = createCommonIssuesDetails( {options:commonIssues} );
	
	controlHolderColumn1.append(aboutTutorialText, tutorialOptions,);
	controlHolderColumn2.append(aboutChapterText, tourOptions);
	
	controlHolder.append(controlHolderColumn1, controlHolderColumn2);
	helpHolder.append(creativeImage, helpInfo, commonIssuesOutput );
	mainHolder.append(logo, header, controlHolder);
	document.body.prepend(mainHolder); //add the holder to the body	
	document.body.append(helpHolder); //add the holder to the body	
}