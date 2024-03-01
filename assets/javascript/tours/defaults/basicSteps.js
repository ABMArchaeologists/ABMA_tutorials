const clickSetUpButton = {
		text:'<p>Click the setup button.</p>',
		attachTo:{
			on: 'bottom',
			element: ()=>{return getWidgetElement({type:'button', source:'setup'})},
		},
		complexAdvanceOn: function() {
			advanceOnButtonClick({type:'button', source:'setup'}); 
		},
	},
	clickRecompileCode = {
		text:'<p>Recompile the code. </p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('.netlogo-recompilation-button')},
		},
		complexAdvanceOn: function() {
			advanceOnRecompile();
		},
	},
	righClickGreenSpace = {
		text:'<p>Right-click the light green space.</p>',
		attachTo:{
			on: 'top',
			element: '.netlogo-widget-container',
		},
		complexAdvanceOn: function() {
			advanceOnContextMenu();
		},
	},
	resizeAndMove = {
		text:'<p>Move the interface element to a convenient spot and resize if necessary.</p>',
		attachTo:{
			on: 'right',
			element: '.netlogo-display-vertical',
		},
		modalOverlayOpeningPadding:5000,
	},
	goIntoAuthoringMode = {
		text:'<p>Go into the "Authoring mode".</p>',
		attachTo:{
			on: 'right',
			element: '#authoring-lock',
		},
		complexAdvanceOn: function() {
			advanceOnAuthoringLock();
		},
	},
	goIntoInteractiveMode = {
		text:'<p>Go back to Interactive mode. </p>',
		attachTo:{
			on: 'right',
			element: '#authoring-lock',
		},
		complexAdvanceOn: function() {
			advanceOnAuthoringLock();
		},
	},
	createButtonContextMenu = {
		text:'<p>Then click ‘Create Button’ from the dropdown menu.</p>',
		attachTo:{
			on: 'right',
			element: ()=>{
				for (const a of document.querySelectorAll(".netlogo-widget-editor-menu-items .context-menu-item")) {
					if (a.textContent.includes("Create Button")) {
						return a
					}
				}
			},
		},
		complexAdvanceOn: function() {
			advanceOnContextMenuCreateWidget();
		},
	},
	ConfirmByClickingOK	= {
		text:'<p>Confirm by clicking on OK.</p>',
		attachTo:{
			on: 'right',
			element: ()=>{return document.querySelector('.widget-edit-form-button-container .widget-edit-text')},
		},
		complexAdvanceOn: function() {
			advanceOnEditForm();
		},
	},
	openCodeTab = {
		text:'<p>Click on the NetLogo Code tab.</p>',
		attachTo:{
			on: 'left',
			element: '.netlogo-tab-area .netlogo-tab:nth-of-type(2)',
		},
		complexAdvanceOn: function() {
			advanceOnTabs({tab:'showCode'});  
		},
	},
	moveAndResize = {
		text:'<p>Resize and move the newly created component to a convenient spot on the interface, as needed.',
		attachTo:{
			on: 'right',
			element: '.netlogo-widget-container',
		},
		modalOverlayOpeningPadding:5000,
	};