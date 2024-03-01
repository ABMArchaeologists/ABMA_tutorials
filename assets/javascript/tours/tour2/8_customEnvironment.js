const customEnvironment = [
	{
		text:'<h2>'
		+  'Custom Environment'
		+'</h2>'
		+'<p>'
		+  'In this lesson, we’ll be adjusting a simple agent-based model to replicate Young & Bettinger’s simulation of the first Out of Africa dispersal of Homo Sapiens. '
		+  'We will use this model to study the Out of Africa dispersal.'
		+'</p>'
		+'<p>'
		+  'If you are a beginner in NetLogo, we advise you to first check out the previous lessons.'
		+'</p>'
		+'<p>'
		+  'This model is for you if you have done the first lessons and are looking to expand your NetLogo skills and learn to add external data to your model.'
		+'</p>'
		+'<p>'
		+  'This lesson is also for you if you have built a simple abstract NetLogo model before, but would like to learn how to add empirical data to customize your model.'
		+'</p>'
		+'<footer class="citation">'
		+  'Young, D.A. and Bettinger, R.L., 1995. Simulating the global human expansion in the Late Pleistocene. <i>Journal of Archaeological Science</i>, 22(1), pp.89-92.'
		+'</footer>',
	},
	{
		text:'<p>'
		+  'In this lesson, you will learn:'
		+'</p>'
		+'<ul>' 
		+  '<li>about extensions and how to add them to NetLogo;</li>'
		+  '<li>how to add external data with the use of the fetch and import-a extension.</li>'
		+'</ul>'
	},
	{
		text:'<p>'
		+  'As the first approximation, we will incorporate an environment consisting of landmasses and bodies of water depicted in this map.'
		+'</p>'
		+'<img src="assets/images/ch1_map.png" height="175px">'
		+'<p>'
		+  'This map is derived from global elevation and bathymetry data (Becker et al. 2009, Smith and Sandwell 1997), '
		+  'and adjusted so that the sea level is lowered by 85 meters.'
		+'</p>'
	},
	openCodeTab,
	{
		text:'<p>'
		+  'We want the map image to be imported so that it can be interacted with, not just as a background image. '
		+  'To do so,  we\'ll be using two extensions: fetch and import-a. '
		+  'There are many extensions that can be used to add new functionalities to NetLogo. Learn more here: '
		+  '<a href="https://ccl.northwestern.edu/netlogo/docs/extensions.html target="_blank" rel="noopener noreferrer">https://ccl.northwestern.edu/netlogo/docs/extensions.html</a>.'
		+'</p>'
		+'<p>'
		+  'To use these extensions in the simulation, we need to import them. '
		+  'Write at the top of the code <code class="codeABMA">extensions[fetch import-a]</code>'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('#netlogo-code-tab')},
		},
		codeExample: function() {
			addExampleCode({text:'extensions[fetch import-a]\n', insertAtText:'SETUP PROCEDURE',});
		},
	},
	{
		text:'<p>'
		+  'We will first import the map from its location on GitHub.  '
		+  'Write inside the setup:'
		+'</p>'
		+'<p>'
		+  '<code class="codeABMA">import-a:pcolors fetch:url (word "https://raw.githubusercontent.com/SantaFeInstitute/ABMA/master/ch1/ch1_map.png")</code>'
		+'</p>'
		+'<p>'
		+  'The <code class="codeABMA">import-a:pcolors</code> primitive sets patches <code class="codeABMA">pcolor</code> based on the imported map.'
		+'</p>'
		+'<p>'
		+  'Recompile the code when you are ready.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('#netlogo-code-tab')},
		},
		codeExample: function() {
			addExampleCode({text:'  import-a:pcolors fetch:url (word "https://raw.githubusercontent.com/SantaFeInstitute/ABMA/master/ch1/ch1_map.png")\n', insertAtText:'reset-ticks',});
		},
		complexAdvanceOn: function() {
			advanceOnRecompile();
		},
	},
	{
		text:'<p>'
		+  'Now, click the <code class="buttonName">setup</code> button.'
		+'</p>',
		attachTo:{
			on: 'right',
			element: ()=> { 
				return getWidgetElement({type:'button', source:'setup'}); 
			},
		}, 
		complexAdvanceOn: function() {
				advanceOnButtonClick({type:'button', source:'setup'}); 
		},
	},
	{
		text:'<p>'
		+  'The map looks bad. This is because the map\'s size is 600 by 350 pixels while our current setup of the world is 20 by 20. We need to change that.'
		+'</p>',
		attachTo:{
			on: 'right',
			element: ()=> {
				return getWidgetElement({type:'view'});
			},
		},
	},
	{
		basicStep: goIntoAuthoringMode,
	},
	{
		text:'<p>'
		+  'Right-click the view.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=> {
				return getWidgetElement({type:'view'});
			},
		},
		complexAdvanceOn: function() {
			advanceOnContextMenu();
		},
	},
	{
		text:'<p>'
		+  'Then click ‘Edit’.'
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
		+  'A new window Model Settings should pop up.'
		+'</p>',
		attachTo:{
			on: 'right',
			element: ()=>{return document.getElementById('view-edit-window')},
		},
	},
	{
		text:'<p>'
		+  'Set the world\'s dimensions to 599 max-pxcor and 350 max-pycor to create the best fit.'
		+'</p>',
		attachTo:{
			on: 'right',
			element: ()=>{
				return document.querySelector('.widget-edit-form .widget-edit-fieldset .flex-column')},
		},
	},
	{
		text:'<p>'
		+  'Set the patch size to 1.'
		+'</p>',
		attachTo:{
			on: 'right',
			element: ()=>{
				return document.querySelector('#view-edit-window-patch-size')},
		},
	},
	{
		text:'<p>'
		+  'Because the world is a globe, tick the Wraps Horizontally and Wraps Vertically boxes, if it is not already done.'
		+'</p>',
		attachTo:{
			on: 'right',
			element: ()=>{return document.querySelectorAll('.widget-edit-form .widget-edit-fieldset .flex-column')[1]},
		},
	},
		{
		text:'<p>'
		+  'Confirm by clicking on OK.'
		+'</p>',
		attachTo:{
			on: 'right',
			element: ()=>{return document.querySelector('.widget-edit-form-button-container .widget-edit-text')},
		},
		complexAdvanceOn: function() {
			advanceOnEditForm();
		},
	},
	{
		text:'<p>'
		+  'If necessary, resize and move the view.'
		+'</p>',
		attachTo:{
			on: 'top',
			element: '.netlogo-display-vertical',
		},
		when:{
			show: () => {
				world.resize( 0, 599, 0, 350, true, true);
				world.setPatchSize(1);	
			}
		},
	},
	{
		basicStep: goIntoInteractiveMode,
	},
	{
		text:'<p>'
		+  'Now, click the <code class="buttonName">setup</code> button, again.'
		+'</p>',
		attachTo:{
			on: 'right',
			element: ()=> { 
				return getWidgetElement({type:'button', source:'setup'}); 
			},
		}, 
		complexAdvanceOn: function() {
				advanceOnButtonClick({type:'button', source:'setup'}); 
		},
	},
	{
		text:'<p>'
		+  'This looks a lot better! But, Agents still appear in the left bottom corner, so let\'s change that to the starting point of Eastern Africa.'
		+'</p>',
		attachTo:{
			on: 'right',
			element: ()=> {
				return getWidgetElement({type:'view'});
			},
		},
		when: { 
			show: function () {
				session.run('me',' watch one-of turtles'); 
			}, 
		} 
	},
	{
		text:'<p>'
		+  'In the <code class="codeABMA">setup</code> procedure change the setxy line so that agents are initiated at the x-coordinate of <code class="codeABMA">(360 + random 5)</code>, i.e., ' 
		+  'between 360 and 365 and at the y-coordinate of <code class="codeABMA">(170 + random 5)</code>, that is, between 170 and 175.'
		+'</p> '
		+'<p>'
		+  'Recompile the code when you are ready.'
		+'</p> ',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('#netlogo-code-tab')},
		},
		codeExample: function() {
			addExampleCode({text:'    setxy (360 + random 5) (170 + random 5)', insertAtText:'setxy random 5 random 5', replace:true});
		},
		complexAdvanceOn: function() {
			advanceOnRecompile();
		},
		when: { 
			show: function () {
				session.run('me','reset-perspective'); 
			},
		}, 
	},
	{ 
		text: '<p>'
		+  'Re-run your simulation. First press <code class="buttonName">setup</code>, then <code class="buttonName">go</code>.'
		+'</p>', 
		attachTo:{
			on: 'right',
			element: '.netlogo-display-vertical',
		},
		multiStepAdvance: function () {
			let options = [
					{
						name:'actionSetSetup', 
						label:'Click setup button', 
						function:(action)=>{
							tourOnButtonClick({buttonSettings:{type:'button', source:'setup'}, action:action});
						}
					},
					{
						name:'actionSetGo', 
						label:'Click the go button.', 
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
		buttons: actionButtons,
	},
	{
		text:'<p>'
		+  'The agents are spreading! But not just on land! We have to tell agents that they can only hatch on land patches. '
		+  'We will be using the  <code class="codeABMA">color</code> variable to differentiate between land and water patches.'
		+'</p>'
		+'<p>'
		+  'Don\'t forget to stop the model.'
		+'</p>',
		attachTo:{
			on: 'right',
			element: '.netlogo-display-vertical',
		},
	},
	{
		text:'<p>'
		+  'Go to the  <code class="codeABMA">reproduce</code> procedure and change the <code class="var">empty-patches</code> variable so that it includes only empty patches that are not white. ' 
		+  'Change the with-conditional for <code class="var">empty-patches</code> with <code class="codeABMA">[pcolor != white and count turtles-here = 0]</code>'
		+'</p> '
		+'<p>'
		+  'Recompile the code when you are ready.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('#netlogo-code-tab')},
		},
		codeExample: function() {
			addExampleCode({text:'  let empty-patches neighbors with [pcolor != white and count turtles-here = 0]', insertAtText:'let empty-patches', replace:true});
		},
		complexAdvanceOn: function() {
			advanceOnRecompile();
		},
	},
	{ 
		text: '<p>'
		+  'Re-run your simulation. First press <code class="buttonName">setup</code>, then <code class="buttonName">go</code>.'
		+  'Remember because the button has the "Forever" setting checked, you need to stop it next step.'
		+'</p>', 
		attachTo:{
			on: 'right',
			element: '.netlogo-display-vertical',
		},
		multiStepAdvance: function () {
			let options = [
					{
						name:'actionSetSetup', 
						label:'Click setup button', 
						function:(action)=>{
							tourOnButtonClick({buttonSettings:{type:'button', source:'setup'}, action:action});
						}
					},
					{
						name:'actionSetGo', 
						label:'Click go button.', 
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
		buttons: actionButtons,
	},
	{
		text:'<p>'
		+  'Now, agents should only spread on land patches.'
		+'</p>'
		+'<p>Don\'t forget to stop the model.</p>',
		attachTo:{
			on: 'right',
			element: '.netlogo-display-vertical',
		},
	},
	{
		text:'<p>'
		+  'This is the end of the tutorial. In it, we have created a simple replication of Young & Bettinger’s simulation of the first Out of Africa dispersal of Homo Sapiens, '
		+  'by adding environmental data to a simple ABM.'
		+'</p>'
		+'<p>'
		+  'In this lesson you have learned:'
		+'</p>'
		+'<ul>'
		+  '<li>of extensions and how to add them to NetLogo;</li>'
		+  '<li>how to add external data with the use of the fetch extension.</li>'
		+'</ul>'
		+'<p>'
		+  'If you would like to learn how to incorporate more complex agent-environment interaction, please go to the next tutorial by clicking the Next button below.'
		+'</p>'
	},
	
];
