const complexBehaviour = [
	{
		text:'<h2>'
		+  'Complex Behaviour'
		+'</h2>'
		+'<p>'
		+  'In this lesson you will expand the previous lesson\'s models to accommodate multiple simulation scenarios.'
		+'</p>'
		+'<p>'
		+  'This lesson is for you if you have completed all the previous tutorials, and/or are looking to learn how to build a model to compare different simulation scenarios. '
		+  'In this lesson you will learn:'
		+'</p>'
		+'<ul>'
		+  '<li>how to create a model implementing different simulation scenarios.</li>'
		+'</ul>',
	},
	{
		text:'<p>'
		+  'In one of the previous lesson, we implemented a scenario where agent movement minimizes extinction probability, while tutorial 6 only incorporates random movement. '
		+  'These represent two scenarios, which we will refer to as "random" and "foresight".'
		+'</p>'
		+'<p>'
		+  'We want to more easily compare these scenarios, without having to change the code every time.'
		+'</p>'
		+'<p>'
		+  'To facilitate this, we will add a new switch to the interface, controlling the global variable <code class="newvar">foresight?</code> with two options: true and false.'
		+'</p>',
	},
	openCodeTab,
	{
		text:'<p>'
		+  'Add a conditional that checks which scenario to use <code class="codeABMA">ifelse foresight? = true [ ] [ ]</code>. '
		+  'Then place one movement algorithm in the first set of brackets and the second one in the second set of brackets.'
		+'</p>'
		+'<p>'
		+  '<code class="codeABMA">[move-to min-one-of empty-patches [p_ext]]</code>'
		+'</p>'
		+'<p>'
		+  '<code class="codeABMA">[move-to one-of empty-patches]</code>'
		+'</p>'
		+'<p>'
		+  'Now, depending on the interface switch agents will either move to a random cell or the cell with the lowest probability of extinction.  Don\'t forget to recompile.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('#netlogo-code-tab')},
		},
		codeExample: function() {
			let text = '      ifelse foresight? = true\n'
						+'      [\n'
						+'        move-to min-one-of empty-patches [p_ext]\n'
						+'      ]\n'
						+'      [\n'
						+'        move-to one-of empty-patches\n'
						+'      ]\n'
						+'   ]\n'
						+' ]\n'
						+'end\n';
			addExampleCode({text:text, insertAtText:'move-to one-of empty-patches',replace:true});
		},
		complexAdvanceOn: function() {
			advanceOnAlert();
		},
	},	
	{
		text:'<p>'
		+  'It\'s that old error, NetLogo doesn\'t recognise our variable.'
		+'</p>'
		+'<p>'
		+  'We will fix it. Dismiss the error.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('#alert-dialog')},
		},
		complexAdvanceOn: function() {
			advanceOnAlert();
		},
		alertTrue:true,
	},
	{
		basicStep: goIntoAuthoringMode,
	},
	{
		basicStep: righClickGreenSpace,
	},
	{
		text:'<p>'
		+  'Then click ‘Create Switch’ from the dropdown menu.'
		+ '</p>',
		attachTo:{
			on: 'right',
			element: ()=>{
				for (const a of document.querySelectorAll(".netlogo-widget-editor-menu-items .context-menu-item")) {
					if (a.textContent.includes("Create Switch")) {
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
		+  'The edit window appears - here we define the variable settings. In the Global variable box type <code class="codeABMA">foresight?</code>. Be sure to include the question mark.'
		+'</p>',
		attachTo:{
			on: 'right',
			element: ()=>{
				let {settings} = getActiveEditForm(),
					target = document.querySelector('#'+settings.id+'-varname');
				return target;
			}
		},
	},
	{
		basicStep: ConfirmByClickingOK ,
	},
	moveAndResize,
	{
		basicStep: goIntoInteractiveMode,
	},
	{
		text:'<p>'
		+  'Run the model under each scenario and compare the results i.e. change the switch -> click <code class="codeABMA">setup</code> -> then click <code class="codeABMA">go</code>.'
		+'</p>',
		attachTo:{
			on: 'right',
			element: ()=>{return document.querySelector('.netlogo-display-vertical')},
		},
	},
	{
		text:'<p>'
		+  'Let\'s add some more scenarios to study. '
		+  'For example, Spikins (2015) suggested that dispersal may be fueled by people falling out with each other and therefore moving far from their original group. '
		+  'We can test this by allowing agents to move to patches further away than their immediate neighbors. '
		+  'First, we will control how far agents can move by adding a new slider to the interface with a global variable <code class="newvar">move-radius</code>, '
		+  'with a minimum of 1 and a maximum of 5. Notice we are doing this before changing the code - to avoid all those errors.'
		+'</p>'
		+'<footer class="citation">'
		+  'Spikins, Penny. "The geography of trust and betrayal: Moral disputes and Late Pleistocene dispersal." <i>Open Quaternary</i> (2015).'
		+'</footer>',
	},
	{
		basicStep: goIntoAuthoringMode,
	},
	{
		basicStep: righClickGreenSpace,
	},
	{
		text:'<p>'
		+  'Then click ‘Create Slider’ from the dropdown menu.'
		+'</p>',
		attachTo:{
			on: 'right',
			element: ()=>{
				for (const a of document.querySelectorAll(".netlogo-widget-editor-menu-items .context-menu-item")) {
					if (a.textContent.includes("Create Slider")) {
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
		+  'In the Global variable box type <code class="codeABMA">move-radius</code>'
		+'</p>',
		attachTo:{
			on: 'right',
			element: ()=>{
				let {settings} = getActiveEditForm(),
					target = document.querySelector('#'+settings.id+'-varname');
				return target;
			},
		},
	},
	{
		text:'<p>'
		+  'Now let\'s specify its value range. Minimum to 0, the Maximum to 5, the Increment to 1.'
		+'</p>',
		attachTo:{
			on: 'right',
			element: ()=>{return document.querySelectorAll('.widget-edit-form .flex-row')[0]},
		},
	},
	{
		text:'<p>'
		+  'Set the Default value to 1.'
		+'</p>',
		attachTo:{
			on: 'right',
			element: ()=>{return document.getElementById('netlogo-slider-5-edit-window-value')},
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
		+  'Adjust the <code class="codeABMA">reproduce</code> procedure. Replace the primitive <code class="codeABMA">neighbors</code>, '
		+  'with <code class="codeABMA">patches in-radius move-radius</code>.'
		+'</p>'
		+'<p>'
		+  'When you\'re done, recompile.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('#netlogo-code-tab')},
		},
		codeExample: function() {
		addExampleCode({text:'  let empty-patches patches in-radius move-radius with [count turtles-here = 0 AND pcolor != white]', insertAtText:'let empty-patches',replace:true})},
		complexAdvanceOn: function() {
			advanceOnRecompile();
		},		
	},
	{
		text:'<p>'
		+  'Run the model under each scenario and compare the results. '
		+  'The slider allows you to test different scenarios - in some agents move close to their parents, in others, they jump ahead.'
		+'</p>',
		attachTo:{
			on: 'right',
			element: ()=>{return document.querySelector('.netlogo-display-vertical')},
		},
	},
	{
		text:'<p>'
		+'  This is the end of the lesson. In it you have learned:'
		+'</p>'
		+'<ul>'
		+  '<li>how to create a model implementing different simulation scenarios.</li>'
		+'</ul>',
	},
	
];



