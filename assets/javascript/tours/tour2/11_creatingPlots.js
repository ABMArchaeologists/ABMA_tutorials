const creatingPlots = [
	{
		text:'<h2>'
		+  'Creating Plots'
		+'</h2>'
		+'<p>'
		+  'In this lesson you will learn how to create plots to study and compare multiple simulation scenarios.'
		+'<p>'
		+'<p>'
		+  'This lesson is for you if you have completed all the previous lessons, and/or are looking to learn how to build a model to compare different simulation scenarios.'
		+'</p>',
		when:{
			show: () => {
				session.widgetController.ractive.set('showCode', true);
			},
		},
	},
	{
		text:'<p>'
		+  'Now the model has become quite complex with different factors and their combinations. '
		+  'With this complexity, it is virtually impossible to follow and compare scenarios just by visually inspecting the simulation. '
		+  'We will add a plot to quantitatively compare the dispersal patterns.'
		+'</p>',
	}, 
	{
		basicStep: goIntoAuthoringMode,
	},
	{
		basicStep: righClickGreenSpace,
	},
	{
		text:'<p>'
		+  'Then click ‘Create Plot’ from the dropdown menu.'
		+'</p>',
		attachTo:{
			on: 'right',
			element: ()=>{
				for (const a of document.querySelectorAll(".netlogo-widget-editor-menu-items .context-menu-item")) {
					if (a.textContent.includes("Create Plot")) {
						return a
					}
				}
			},
		},
		complexAdvanceOn: function() {
			advanceOnContextMenuCreateWidget();
		},
	},
	{
		text:'<p>'
		+  'A new window appeared - here we define the variable settings.'
		+'</p>',
		attachTo:{
			on: 'right',
			element: ()=>{
				let {settings} = getActiveEditForm(),
					target = document.querySelector('#'+settings.id);
				return target;
			},
		},
	},
	{
		text:'<p>'
		+  'Click add pen.'
		+'</p>',
		attachTo:{
			on: 'right',
			element: ()=>{return document.querySelector('input[value="Add Pen"]')},
		},
		complexAdvanceOn: function() {
			advanceOnAddPen();
		},
	},
	{
		text:'<p>'
		+  'Add <code class="codeABMA">plot count patches with [any? turtles-here]</code> to update commands'
		+'</p>',
		attachTo:{
			on: 'right',
			element: ()=>{return document.getElementById('netlogo-plot-6-edit-window-pen-0-update-code')},
		},
	},
	{
		text:'<p>'
		+  'Give the plot a name such as "area occupied".'
		+'</p>',
		attachTo:{
			on: 'right',
			element: ()=>{return document.getElementById('netlogo-plot-6-edit-window-name')},
		},
	},
	{
		basicStep: ConfirmByClickingOK ,
	},
	{
		basicStep: resizeAndMove ,
	},
	{
		basicStep: goIntoInteractiveMode,
	},
	{
		text:'<p>'
		+  'Now when you run the simulation you can see how fast the original population spreads and compare the different scenarios. '
		+  'Run the simulation a couple of times with different parameter values (all the switches and sliders on the interface). What do you notice?'
		+'</p>',
		attachTo:{
			on: 'right',
			element: ()=>{return document.querySelector('.netlogo-display-vertical')},
		},
	},
	{
		text:'<p>'
		+  'This is the end of the lesson. In it you have learned:'
		+'</p>'
		+'<ul>'
		+  '<li>how to create a model implementing different simulation scenarios;</li>'
		+  '<li>how to make and use plots to compare multiple simulation scenarios.</li>'
		+'</ul>'
		+'<p>'
		+  'In case you started at lesson 1, congratulations! From humble beginnings you\'ve built a model of dispersal that can be used to test several archaeological models.'
		+'</p>'
		+'<p>'
		+  'If you already had some NetLogo knowledge to start with, we hope these lessons have helped you practice and expand your skills!'
		+'</p>'
	},
];