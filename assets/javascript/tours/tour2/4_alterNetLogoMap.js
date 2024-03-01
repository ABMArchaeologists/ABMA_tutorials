const alterNetLogoMap = [
	{
		text:'<h2>'
		+  'Changing the world'
		+'</h2>'
		+'<p>'
		+  'In this lesson, we will quickly show you how to alter the NetLogo map.'
		+'</p>'
		+'<p>'
		+  'This lesson is for you if you are looking to build your first model with no prior experience, '
		+  'or if you want to strengthen your NetLogo basics before moving on to more complex models.'
		+'</p>',
	},
	{
		text:'<p>'
		+  'In this lesson, we are still setting up your first model and explain some of NetLogo\'s key concepts as we go along.'
		+'</p>'
		+'<p>'
		+  'At the end of this lesson you will have gained:'
		+'</p>'
		+'<ul>'
			+'<li>basic proficiency in using the NetLogo Interface;</li>'
			+'<li>familiarity with the NetLogo "world" and how to change it.</li>'
		+'</ul>',
	},
	{
		text:'<p>'
		+  'In the previous lesson, we created a <code class="codeABMA">setup</code> procedure. However, our agents are now crowding the middle of the world, so let\’s move them to a corner. '
		+  'To do so, we will need to change the world so that the origin (patch (0,0)) is in the left corner, instead of the center. Go to Authoring mode.'
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
		+  'Right-click the view, so you can edit it.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return getWidgetElement({type:'view'})}
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
			element: ()=>{
				for (const a of document.querySelectorAll(".netlogo-widget-editor-menu-items .context-menu-item")) {
					if (a.textContent.includes("Edit")) {
						return a
					}
				}
			},
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
			element: ()=>{return document.querySelector('#view-edit-window')},
		},
		when: {
			show: function() {
				let elem = document.querySelectorAll('.widget-edit-form-button-container .widget-edit-text'),
				disabledElm = Array.from(elem).map((e)=>{
					e.disabled = true;
				});
				setTimeout (() => {
						   setTourState();
				}, 100);
			}, 
			hide: function() {
				let elem = document.querySelectorAll('.widget-edit-form-button-container .widget-edit-text'),
				enabledElm = Array.from(elem).map((e)=>{
					e.disabled = false;
				});
			},
		}
	},
	{ 
		text:'<p>'
		+  'Change the minimum x coordinate to 0 i.e. what is labeled min-pxcor.'
		+'</p>',
		attachTo:{
			on: 'right',
			element: ()=>{ return document.querySelector('#view-edit-window-min-x') },
		},
	},
	{ 
		text:'<p>'
		+  'Change the maximum x coordinate to 20 i.e. what is labeled max-pxcor.'
		+'</p>',
		attachTo:{
			on: 'right',
			element: ()=>{ return document.querySelector('#view-edit-window-max-x') },
		},
	},
	{ 
		text:'<p>'
		+  'Change the minimum y coordinate to 0 i.e. what is labeled min-pycor.'
		+'</p>',
		attachTo:{
			on: 'right',
			element: ()=>{ return document.querySelector('#view-edit-window-min-y') },
		},
	},
	{ 
		text:'<p>'
		+  'Change the maximum y coordinate to 20 i.e. what is labeled max-pycor.'
		+'</p>',
		attachTo:{
			on: 'right',
			element: ()=>{ return document.querySelector('#view-edit-window-max-y') },
		},
	},
	{ 
		text:'<p>'
		+  'Now the origin of the world will be located in the left corner.'
		+'</p>',
		attachTo:{
			on: 'right',
			element: ()=>{
				return document.querySelector('.widget-edit-form .widget-edit-fieldset .flex-column')},
		},
	},
	{ 
		text:'<p>'
		+  'Uncheck the Wrap vertically and Wrap horizontally boxes, so the world is now a contained box and turtles won\'t walk over the edges to the other side of it.'
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
		when:{//TODO when NetLogo web is updated to fix the wrap problem this can be removed.
			show: () => {
				world.resize( 0, 20, 0, 20, false, false);	
			}
		},
	},
	{
		basicStep: goIntoInteractiveMode,
	},
	{
		basicStep: clickSetUpButton,
	},
	{
		text:'<p>'
		+  'Now the turtles are in the corner!'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return getWidgetElement({type:'view'})}
		},
	},
	{
		text:'<p>'
		+  'Congratulations, this is the end of the lesson. In it, you have changed the size of the world.'
		+  'Through completing this lesson you have:'
		+'</p>' 
		+'<ul>'
		+  '<li>gained basic proficiency in using the NetLogo Interface (changing views).</li>'
		+'</ul>'
	},
];
