let usingReporters = [
	{
		text:'<h2>'
		+  'Welcome to Introduction to Reporters!'
		+'</h2>'
		+'<p>'
		+  'In this lesson we will be introducing a plot to a simple trade model with the use of a reporter. '
		+  'Reporters add a flexibility to your model which will help you avoid repition and implement more sophisticated behavior.'
		+'<p>'
		+'<p>'
		+  'In this lesson, you will:'
		+'</p>'
		+'<ul>'
		+  '<li>learn how to use reporters.</li>'
		+'</ul>',
	},
	{
		text:'<p>'
		+  'Try running the simulation.'
		+'</p>',
		attachTo:{
			on: 'right',
			element: '.netlogo-display-vertical',
		},
	},
	{
		text:'<p>'
		+  'This model was built to explore the impact of accessibility to the distribution of goods.'
		+'</p>'
		+'<p>'
		+  'However, with only the agents\' labels, it\'s a bit difficult to judge what\'s going on.'
		+'</p>'
		+'<p>'
		+  'Let\'s add a graph so that it is a bit easier to understand what is going on.'
		+'</p>'
		+'<p>'
		+  'We want to create a graph that plots the average (<code class="codeABMA">mean</code>) <code class="var">goods</code> at each '
		+  '<code class="var">distance-level</code> from the production-center, to create artificial frequency curves (like below) which can be compared against real data.'
		+'</p>'
		+'<p>'
		+  'Open the code tab to start'
		+  '</p>'
		+'<p>'
		+  '<img src="assets/images/Frequencies.png" height=400px"/>'
		+'</p>',
		attachTo:{
			on: 'left',
			element: '.netlogo-tab-area',
		},
		complexAdvanceOn: function() {
			advanceOnTabs({tab:'showCode'});  
		},
	},
	{
		text:'<p>'
		+  'Go to your code tab and at the bottom of your code write: '
		+'</p>'
		+'<pre class = codeblockABMA>'
		+  'to-report calculate-volume \nend \n'
		+'</pre>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('#netlogo-code-tab')},
		},
		codeExample: function() {
			addExampleCode({text:'\nto-report calculate-volume\nend', insertAtText:'end', instance:8});
		},
		complexAdvanceOn: function() {
			advanceOnRecompile();
		},
	},
	{
		text:'<p>'
		+  'You may recognize these lines of code as defining a new procedure.'
		+'</p>'
		+'<p>'
		+  'However, this procedure is special: it is a reporter procedure. Reporter procedures are used for reporting a value.'
		+'</p>'
		+'<p>'
		+  'You may not have realized, but you have been using built-in reporters already. '
		+  'For example, <code class="codeABMA">one-of</code> is a reporter primitive: it simply returns one random member of a list or agentset. '
		+  'Another example is <code class="codeABMA">ticks</code>, which returns the number of ticks passed, or mathematical reporters such as '
		+  '<code class="codeABMA">mean</code>, <code class="codeABMA">sum</code>, <code class="codeABMA">pi</code> etc.'
		+'</p>'
		+'<p>'
		+  'You can recognize reporter procedures because instead of <code class="codeABMA">to</code> they are defined with <code class="codeABMA">to-report</code>.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('#netlogo-code-tab')},
		},		
	},
	{
		text:'<p>'
		+  'We want the reporter to return the mean <code class="var">goods</code> of a specific <code class="var">distance-level</code>.'
		+'</p>'
		+'<p>'
		+  'Let\'s start by using 1 as <code class="var">distance-level</code>'
		+'</p>'
		+'<p>'
		+  'Inside the <code class="codeABMA">calculate-volume</code> reporter, create a local variable <code class="newvar">vendors-tier</code> storing all vendors with a '
		+  '<code class="var">distance-level</code> of 1.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('#netlogo-code-tab')},
		},
		codeExample: function() {
			addExampleCode({text:'  let vendors-tier vendors with [distance-level = 1]\n', insertAtText:'to-report calculate-volume'});
		},
		complexAdvanceOn: function() {
			advanceOnRecompile();
		},		
	},
	{
		text:'<p>'
		+  'Next, create a new local variable <code class="newvar">tier-mean</code> defined as the mean of <code class="var">vendors-tier</code>\'s <code class="var">goods</code>, '
		+  'using <code class="codeABMA"><a href="https://ccl.northwestern.edu/netlogo/bind/primitive/mean.html" target="_blank" rel="noopener noreferrer">mean</a></code>.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('#netlogo-code-tab')},
		},
		codeExample: function() {
			addExampleCode({text:'  let tier-mean mean [goods] of vendors-tier\n', insertAtText:'vendors-tier'});
		},
		complexAdvanceOn: function() {
			advanceOnRecompile();
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
		+  'In the command center, type <code class="codeABMA">calculate-volume</code> and press enter.'
		+'</p>', 
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('.netlogo-tab-content, .netlogo-command-center')},
		},
		complexAdvanceOn: function() {
			advanceOnCommand({}); 
		},
	},
	{
		text:'<p>'
		+  'The command center has printed an error. It reads \'Reached end of reporter procedure without REPORT being called\'.'
		+'</p>'
		+'<p>'
		+  'A special thing about reporter procedures is that they should always end with  <code class="codeABMA">report</code> in combination with a value.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('.netlogo-tab-content, .netlogo-command-center')},
		},
	},
	{
		text:'<p>'
		+ 'In this case, we want the <code class="codeABMA">calculate-volume</code> reporter to report the value of <code class="var">tier-mean</code>, '
		+  'so we will write <code class="codeABMA">report tier-mean</code> at the end of <code class="codeABMA">calculate-volume</code>'
		+'</p>' 
		+'<p>'
		+  'Alternatively, you could simple replace defining <code class="var">tier-mean</code> with <code class="codeABMA">report</code>.'
		+'</p>'
		+'<p>'
		+  '<code class="codeABMA">report</code> always goes at the end of the procedure, and any lines of code inside the procedure after it will be ignored.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: '.netlogo-tab-area',
		},
		codeExample: function() {
			addExampleCode({text:'  report tier-mean\n', insertAtText:'tier-mean'});
		},
		complexAdvanceOn: function() {
			advanceOnRecompile();
		},		
	},
	{
		text:'<p>'
		+  'Try calling the <code class="codeABMA">calculate-volume</code> again.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('.netlogo-tab-content, .netlogo-command-center')},
		},
		complexAdvanceOn: function() {
			advanceOnCommand(); 
		},
	},
	{
		text:'<p>'
		+  'If you did everything correctly, it should output the mean <code class="var">goods</code> of the first distance tier in the command center. '
		+'</p>'
		+'<p>'
		+  '<b>Note:</b> the model needs to be in initialized and have run for this to work. If you did not start the simulation the error will still occur, '
		+  'pause the tutorial and run a quick simulation, then re-run the command.'
		+'</p>'
		+'<p>'
		+  'You will also notice, looking at the console, that NetLogo automatically adds <code class="codeABMA">show</code> in front of <code class="codeABMA">calculate-volume</code>: '
		+  'reporters, as opposed to commands, cannot be used on their own as they don\'t represent an action, they just return a value. '
		+  'In this case, NetLogo is smart enough to add <code class="codeABMA">show</code>, which is needed to turn it into the action of showing the value '
		+  '<code class="codeABMA">calculate-volume</code> returns.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('.netlogo-tab-content, .netlogo-command-center')},
		},
	},
	{
		text:'<p>'
		+  'Of course, we don\'t just want to know the mean at the first <code class="var">distance-level</code>, but the mean of each separate <code class="var">distance-level</code>.'
		+'</p>'
		+'<p>'
		+  'To achieve this, after <code class="codeABMA">to-report calculate-volume</code> write <code class="codeABMA">[a]</code>'
		+'</p>'
		+'<p>'
		+  'Next, rewrite the definition of <code class="var">vendors-tier</code> so that it stores all vendors at <code class="var">distance-level</code> <code class="codeABMA">a</code>'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('#netlogo-code-tab')},
		},
		codeExample: function() {
			addExampleCode({text:' [a] ', insertAtText:'to-report calculate-volume', position:'at', startCh:26});
			addExampleCode({text:'  let vendors-tier vendors with [distance-level = a]', insertAtText:'vendors-tier', replace:true});
		},
		complexAdvanceOn: function() {
			advanceOnRecompile();
		},		
	},
	{
		text: '<p>'
		+  'What we have done here is given the reporter an argument so that it can be used more flexibly to calculate the mean at each <code class="var">distance-level</code>'
		+'</p>'
		+ '<p>'
		+  'One of the reasons reporters, or any procedures really, are so useful is because they help to avoid repetition and cluttering of your code.'
		+'</p>'
		+'<p>'
		+  'For example, if you know you have to show the count of red star-shaped turtles in your world at multiple points in your simulation, '
		+  'instead of writing <code class="codeABMA"> show count turtles with [color = "red" and shape = "star"]</code> every time, '
		+  'you can put it in a reporter called <code class="codeABMA"> countredstars  </code> and use <code class="codeABMA">show countredstars</code>.'
		+'</p>'
		+'<p>'
		+  'In combination with arguments, reporter procedures are very flexible. Instead of having to write separate lines to show the count of red star-shaped turtles, '
		+  'blue triangle-shaped turtles, and yellow circle-shaped turtles you can simply make a reporter that uses color and shape as arguments, like so:'
		+'</p>'
		+'<pre class="codeblockABMA">'
		+  'to go\n'
		+  ' show colorshaped "triangle" blue\n'
		+  ' show colorshaped "star" red\n'
		+  ' show colorshaped "circle" yellow\n'
		+  'end\n'
		+  ' \n'
		+  'to-report colorshaped [s c]\n'
		+  '  report count turtles with [shape = s and color = c]\n'
		+  'end\n'
		+'</pre>',
		attachTo:{
			on: 'left',
			element: ()=>{
				return document.getElementById('ABMAlineHighlightDiv');
			},
		},
		beforeShowPromise: function() {
			return new Promise(function(resolve) {
				let observer = new MutationObserver(function(mutations) {				//create the observer of changes to the document
					if ( document.getElementById('ABMAlineHighlightDiv') !== null ) {	//if the div highlight exists, end observe and resolve the promise
						resolve();
						this.disconnect();												//disconnect it after use to avoid infinity loop
					}
				}),
				config = { childList: true, subtree: false };							//set the config for observer	
				observer.observe(document.body, config); 								// pass in the target node, as well as the observer options					
				highlightLines({searchTerm:'to-report calculate-volume [a]', additionalLines:4});				//add the highlight element
			})
		},
	},
	{
		text:'<p>'
		+  'Let\'s try it out for a bit! In the command center call the <code class="codeABMA">calculate-volume</code> reporter, '
		+  'giving it a <code class="var">distance-level</code> of choice as argument (e.g. calculate-volume 3).'
		+'</p>',	
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('.netlogo-tab-content, .netlogo-command-center')},
		},
	},
	{
		text:'<p>'
		+  'Now that we have gotten our <code class="codeABMA">calculate-volume</code> reporter working, we are going to create a plot.'
		+'</p>'
		+'<p>'
		+  'Create a new plot, bringing up the plot window.'
		+'</p>',
		attachTo:{
			on: 'right',
			element: '.netlogo-display-vertical',
		},
		complexAdvanceOn: function() {
			fullProcessOnEditForm();
		},
	},
	{
		text:'<p>'
		+  'Each <code class="var">distance-level</code> will be drawn by a different plot pen. '
		+  'In the plot window, specify a plot name and add as many plot pens as distance-levels with fitting names ( starting with <code class="codeABMA">distance 1</code> etc.)'
		+'</p>',
		attachTo:{
			on: 'right',
			element: ()=>{
				let {settings} = getActiveEditForm(),
					target = document.querySelector('#'+settings.id);
				return target;
			},
		},
		modalOverlayOpeningPadding:5000,
	},
	{
		text:'<p>'
		+  'For each pen write in pen update commands <code class="codeABMA">plot calculate-volume</code> followed by the relevant <code class="var">distance-level</code> '
		+  'just like you did in the command center. e.g. plot calculate-volume 1, plot calculate-volume 2, etc.'
		+'</p>'
		+'<p>'
		+  'When you\'re done, press Ok and resize or move the plot as neseccary.'
		+'</p>',
		attachTo:{
			on: 'right',
			element: ()=>{
				let {settings} = getActiveEditForm(),
					target = document.querySelector('#'+settings.id);
				return target;
			},
		},
		complexAdvanceOn: function() {
			advanceOnEditForm();
		},
		modalOverlayOpeningPadding:5000
	},
	{
		text:'<p>'
		+  'Put the <code class="sliderName">level</code> to 6, slow down the model speed a bit, and try running the simulation.'
		+'</p>'
		+'<p>'
		+  'What pattern do you see?'
		+'</p>',
		attachTo:{
			on: 'right',
			element: '.netlogo-display-vertical',
		},
	},
	{
		text:'<p>'
		+  'That\'s working great! Now, try putting <code class="sliderName">distance-level</code> to something lower than 6 and resetting the model.'
		+'</p>',
		attachTo:{
			on: 'right',
			element: '.netlogo-display-vertical',
		},
		complexAdvanceOn: function() {
			advanceOnAlert();
		},
		alertTrue:true,	},
	{
		text:'<p>'
		+  'An error! It reads: \'Can\'t find the mean of a list with no numbers: []. error while running MEAN in button "setup"\'.'
		+'</p>'
		+'<p>'
		+  '<code class="codeABMA">calculate-volume</code> reports the mean of a given <code class="var">distance-level</code>. '
		+  'In this case, the plot is trying to use <code class="codeABMA">calculate-volume</code> to draw a line for one or multiple <code class="var">distance-level</code> '
		+  'that don\'t exist, which is why it throws this error.'
		+'</p>'
		+'<p>'
		+  'Dismiss the alert.'
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
		text:'<p>'
		+  'Reporters add flexibility which will become increasingly important when developing more complex models.'
		+'</p>'
		+'<p>'
		+  'In this lesson, you:'
		+'</p>'
		+'<ul>'
		+  '<li> have learned how to use reporters (with command-center, in plots, in code).</li>'
		+'</ul>' 
		+'<p>'
		+  'To learn more, check out the <a href="https://ccl.northwestern.edu/netlogo/bind/primitive/to-report.html" target="_blank" rel="noopener noreferrer">Beginner\'s Interactive NetLogo Dictionary\'s entry </a> on '
		+  '<code class="codeABMA">report</code> and some of the models linked at the bottom of the page.'
		+'</p>'
		+'<p>'
		+  'There are several ways to fix the problem you just ran into, but in the next lesson, we are going to use a list. To continue, press \'Next\'.'
		+'</p>'
	},
];
