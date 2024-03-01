let introToNetLogo = [
	{
		text:'<h2>'
		+  'Welcome to Introduction to NetLogo!'
		+'</h2>'
		+'<p>'
		+  'In these tutorials, you will be working with NetLogo. NetLogo is not the only toolkit used for ABM, but it\'s the most popular one in archaeology. '
		+'<\p>'
		+'<p>'
		+  'For these tutorials you\'ll use NetLogo Web, so you can work from your browser and there is no need to install any additional software. '
		+  'There are some differences between NetLogo and NetLogo Web. You can find out more and download the desktop version at the '
		+  '<a href = "https://ccl.northwestern.edu/netlogo/" target="_blank" rel="noopener noreferrer">NetLogo website<\a>. '
		+  'It is available for all operating systems and the installation is very simple.'
		+'<\p>'
		+'<p>'
		+  'This tutorial is meant as an introduction to the practicalities of NetLogo Web, rather than an introduction to Agent-based modeling more generally. '
		+  'If you are not sure what ABM is, head to Introduction to ABM, which will introduce you to this simulation technique and its basic concepts. '
		+  'If you know NetLogo, you can skip this tutorial.'
		+'</p>',
		when:{
			show: () => {
				session.widgetController.ractive.set('showCode', false);
			},
		},
	},
	{
		text:'<p>'
		+  'NetLogo is a toolkit that is based on Logo, an educational programming language.'
		+'<\p>'
		+'<p>'
		+  'While it is possible to build ABMs in different programming languages (python, R, java, etc.), NetLogo is a platform specifically made for ABM, relatively easy to learn, '
		+  'and the most commonly used tool in archaeology.'
		+'</p>'
		+'<p>'
		+  'It is well-documented and has a <a href="https://www.netlogoweb.org/launch#https://www.netlogoweb.org/assets/modelslib/Sample%20Models/Earth%20Science/Erosion.nlogo">expansive library '
		+  'of sample models</a> available.'
		+'</p>'
	},
	{
		text:'<p>'
		+  'To start, let\'s  orient ourselves around the NetLogo Web interface. '
		+'<\p>'
	},
	{
		text:'<p>'
		+  'Here, we have the interface, which consists of an empty space and some elements like buttons and sliders.'
		+'<\p>',
		attachTo:{
			on: 'right',
			element: '.netlogo-widget-container',
		},
	},
	{
		text:'<p>'
		+  'In the center, you will notice a rectangle or screen. This is the NetLogo View i.e. where the environment and agents are shown.'
		+'<\p>',
		attachTo:{
			on: 'right',
			element: ()=> { 
				return getWidgetElement({type:'view'}); 
			},
		},
	},
	{
		text:'<p>'
		+  'Here you can save models in the NetLogo file format (.nlogo), to be used on the desktop version or as an HTML, like the one you\'re viewing right now. You can also create a new model.'
		+'</p>'
		+'<p>'
		+  'For the sake of demonstration, we\'ve preloaded a sample model, a replication of Young & Bettinger’s simulation of the first Out of Africa dispersal of Homo Sapiens. '
		+'<\p>'
		+'<footer class="citation">'
		+  'Young, D.A. and Bettinger, R.L., 1995. Simulating the global human expansion in the Late Pleistocene. <i>Journal of Archaeological Science</i>, 22(1), pp.89-92. '
		+'</footer>',
		attachTo:{
			on: 'left',
			element: '.netlogo-model-masthead + .flex-column',
		},
	},
	{
		text:'<p>'
		+  'Let\'s go over some ways of customizing NetLogo Web models. First, let\'s start with editing the interface (on the left). In NetLogo Web, '
		+  'you need to change the mode to editing mode to be able to edit. Click this button to do that.'
		+'</p>',
		attachTo:{
			on: 'right',
			element: '#authoring-lock',
		},
		complexAdvanceOn: function() {
			advanceOnAuthoringLock();
		},
	},
	{
		text:'<p>'
		+  'Now the mode has gone from Interactive to Authoring, and you can change the interface! Right-click the light-green background space (not the green slider!)'
		+'</p>',
		attachTo:{
			on: 'top',
			element: '.netlogo-widget-container', 
		},
		complexAdvanceOn: function() {
			advanceOnContextMenu();
		},
	},
	{
		text:'<p>'
		+  'A context menu will appear where you can create elements like Buttons and Plots. '
		+  'Click the button tab.'
		+'</p>',
		attachTo:{
			on: 'right',
			element: '#netlogo-widget-context-menu',
		},
		complexAdvanceOn: function() {
			advanceOnContextMenuCreateWidget();
		},
	},
	{
		text:'<p>'
		+  'This brings up the editing for for this element. We don\'t want to create one yet, so please click cancel at the bottom of the menu.'
		+'</p>',
		attachTo:{
			on: 'right',
			element: ()=>{
				let {element} = getActiveEditForm();
				return element;
			},
		},
		complexAdvanceOn: function() {
			advanceOnEditForm();
		},
	},
	{
		text:'<p>'
		+  'In authoring mode, you can also edit the current elements. Let\'s try, right-click on the view.'
		+'</p>',
		attachTo:{
			on: 'top',
			element: '.editor-overlay',
		},
		complexAdvanceOn: function() {
			advanceOnContextMenu();
		},
	},
	{
		text:'<p>'
		+  'Right-clicking brings up an edit button, left click on it.'
		+'</p>',
		attachTo:{
			on: 'right',
			element: ()=>{return document.getElementById('netlogo-widget-context-menu')},
		},
		complexAdvanceOn: function() {
			advanceOnContextMenu();
		},
	},
	{
		text:'<p>'
		+  'Here you can change the NetLogo world\'s features like its size. For now, click cancel (at the bottom of the pop-up).'
		+'</p>',
		attachTo:{
			on: 'right',
			element: ()=>{return document.getElementById('view-edit-window')},
		},
		complexAdvanceOn: function() {
			advanceOnEditForm();
		},
	},
	{
		text:'<p>'
		+  'Click on the lock icon to go back to Interactive mode.'
		+'</p>',
		attachTo:{
			on: 'right',
			element: '#authoring-lock',
		},
		complexAdvanceOn: function() {
			advanceOnAuthoringLock();
		},
	},
	{
		text:'<p>'
		+  'Now if you right-click on elements, nothing happens. Give it a try, right-click the view.'
		+'</p>',
		attachTo:{
			on: 'right',
			element: '.netlogo-widget-container',
		},
	},
	{
		text: '<p>'
		+  'However, you need to be in interactive mode to actually run the simulation by clicking the <code class="buttonName">setup</code> and then <code class="buttonName">go</code> buttons. '
		+  'Try it!'
		+'</p>',
		attachTo:{
			on: 'right',
			element: '.netlogo-display-vertical',
		},
		multiStepAdvance: function () {
			let options = [
					{
						name:'actionSetSetup', 
						label:'Click setup', 
						function:(action)=>{
							tourOnButtonClick({buttonSettings:{type:'button', source:'setup'}, action:action});
						}
					},
					{
						name:'actionSetGo', 
						label:'Click go', 
						function:(action)=>{
							tourOnButtonClick({buttonSettings:{type:'button', source:'go'}, action:action});
						}
					},
				],
				actionOnComplete = ()=> {
					Shepherd.activeTour.next();
				}
			actionCheckList({options:options, actionOnComplete:actionOnComplete });
		},
	},
	{
		text:'<p>'
		+  'As you can see, the ticks counter is moving up. The model speed slider controls the rate of the simulation and shows how many time steps or ticks have passed.'
		+'</p>',
		attachTo:{
			on: 'top',
			element: '.netlogo-speed-slider',
		},
	},
	{
		text: '<p>'
		+  'Press <code class="buttonName">go</code> again to stop the simulation.'
		+'</p>',
		attachTo:{
			on: 'right',
			element: ()=> { 
				return getWidgetElement({type:'button', source:'go'}); 
			},
		}, 
		complexAdvanceOn: function() {
			advanceOnButtonClick({type:'button', source:'go'});
		},
	},
	{
		text:'<p>'
		+  'At the right of the screen there are three tabs: Command Center, NetLogo Code, and Model Info.  Let\'s go over them one by one.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: '.netlogo-tab-area',
		},
	},
	{
		text:'<p>'
		+  'Click on the Command Center tab.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: '.netlogo-tab-area .netlogo-tab:nth-of-type(1)',
		},
		complexAdvanceOn: function() {
			advanceOnTabs({tab:'showConsole'}); 
		},
	},
	{
		text:'<p>'
		+  'A new area pops up. If your model prints any text, it will show up here. '
		+  'Underneath you can add code on-the-fly and get an instant response from the simulation. We\'ll be showing how to do this in a later tutorial.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('.netlogo-tab-content, .netlogo-command-center')},
		},
	},
	{
		text:'<p>'
		+  'Click on the Model Info tab.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: '.netlogo-tab-area .netlogo-tab:nth-of-type(3)',
		},
		complexAdvanceOn: function() {
			advanceOnTabs({tab:'showInfo'});  
		},
	},
	{
		text:'<p>'
		+  'The Model Info tab is designed for the documentation of the model. In Authoring mode, you can change the text here. '
		+  'Later on, when we explore existing models in the NetLogo Model Library, you will use this tab to quickly learn about each model and what it is trying to simulate.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('.netlogo-tab-area .netlogo-info')},
		},
	},
	{
		text:'<p>'
		+  'Click on the NetLogo Code tab.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: '.netlogo-tab-area .netlogo-tab:nth-of-type(2)',
		},
		complexAdvanceOn: function() {
			advanceOnTabs({tab:'showCode'});  
		},
	},
	{
		text:'<p>'
		+  'This is where the action happens! It is where you\'ll be writing computer code that governs your simulation.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('.netlogo-tab-area .netlogo-code-container')},
		},
	},
	{
		text:'<p>'
		+  'You can change the position of the tabs and interface here.  '
		+  'Note - for the tutorials we default the tabs to the right.'
		+'</p>',
		attachTo:{
			on: 'right',
			element: '#tabs-position',
		},
	},
	{
		text:'<p>'
		+  'This is the end of the tutorial. In it, you have: '
		+'<\p>' 
		+'<ul>'
			+'<li>learned the basics of the NetLogo Web Interface.</li>'
		+'</ul>',
	}, 
];
