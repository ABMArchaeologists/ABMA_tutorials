let buildingLists = [
	{
		text:'<h2>'
		+  'Welcome to Introduction to Lists!'
		+'</h2>'
		+'<p>'
		+  'In this lesson, we will introduce a useful data structure to our simple trade model: lists. Lists are data structures that are handy for storing information in a more flexible manner.'
		+'<p>'
		+ '<p>'
		+  'This tutorial is for you if you have completed the first set of tutorials and/or are familiar with basic NetLogo syntax.'
		+'</p>'
		+'<p>'
		+  'In this lesson, you:'
		+'</p>'
		+'<ul>'
		+  '<li>will learn how to make and use simple lists.</li>'
		+'</ul>'
		+'<div class="abmMoreInfoHolder">'
		+  '<p>'
		+    '<b>Advancing your skills:</b> Up until now we have been placing the code for you and having you type it over. We are now going to be providing fewer of these '
		+    'types of examples and having you add the code on your own. These examples will taper off but you will still have a mix of the example code and self adding code '
		+    'for a few more lessons. When we don\'t provide the examples you will find that there is now a "Solution" button. If you get stuck, click that button to see what '
		+    'you code should look like. If you still have problems there will also be a insert example code button that you can use to reset the code and insert an example to type over.'
		+'</p>'
		+'</div>',
	},
	{
		text:'<p>'
		+  'In the last lesson made a plot with pens using <code class="codeABMA">calculate-volume</code>. Unfortunately, '
		+  'when the <code class="sliderName">level</code> is set to lower than 6, this plot causes problems, because there won\'t actually be any '
		+  '<code class="codeABMA">vendors with [distance-level = 6]</code> to calculate the goods mean of.'
		+'</p>'
		+'<p>'
		+  'There are several ways to fix this problem, but in this lesson, we are going to use a list.'
		+'</p>'
		+'<p>'
		+  'A list is a common data type used in many programming languages. It is a variable that takes the shape of an ordered sequence of values, each with an associated index.'
		+'</p>'
		+'<p>'
		+  'A list is usually deliminated by some kind of brackets. In NetLogo, an example of a list could be  <code class="codeABMA">[3 "David" 5 8 9]</code>. Open to the code tab to start.'
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
		+  'Start of by creating a new global variable <code class="newvar">mean-goods</code>.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('#netlogo-code-tab')},
		},
		codeExample: function() {
			addExampleCode({text:'globals [ mean-goods ]\n', insertAtText:'turtles-own'});
		},
		complexAdvanceOn: function() {
			advanceOnRecompile();
		},
	},
	{
		text:'<p>'
		+  'In the setup procedure, write <code class="codeABMA">set mean-goods [0 0 0 0 0 0]</code>, at the beginning of that procedure.'
		+'</p>'
		+'<p>'
		+  '<b>Important change: </b>you will notice there is no example code to type over. This is the first step where you will be on your own in adding the code in. Give it a go.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('#netlogo-code-tab')},
		},
		complexAdvanceOn: function() {
			advanceOnRecompile();
		},		
		advanceExampleCode: {
			solution:'to setup\n  clear-all\n  set mean-goods [0 0 0 0 0 0]\n  create-producers 1 [\n    set color red\n    set shape "house"\n    set goods 0\n    set distance-level 0\n  ]\n  repeat level[populate]\n  reset-ticks\nend',
			codeExample: function() {
				addExampleCode({text:'  set mean-goods [0 0 0 0 0 0]\n', insertAtText:'clear-all'});
			}, 
			fullCode:'breed [producers producer]\nbreed [vendors vendor]\nturtles-own [goods distance-level]\nglobals [ mean-goods ]\n\nto setup\n  clear-all\n  create-producers 1 [\n    set color red\n    set shape "house"\n    set goods 0\n    set distance-level 0\n  ]\n  repeat level[populate]\n  reset-ticks\nend\n\nto populate\n  ask turtles [\n  let not-occupied neighbors4 with [not any? turtles-here]\n  hatch count not-occupied [\n    set breed vendors\n    set color color - 10\n    set shape "person"\n    set goods 0\n    set distance-level distance-level + 1 \n    move-to one-of neighbors4 with [not any? turtles-here]\n     ]\n  ]\nend\n\nto go\n  ask producers [set goods production-level]\n  ask producers [trade]\n  ask vendors [trade]\n  ask vendors with [goods > 0][set goods goods - 1]\n  ask turtles [set label goods]\n  tick\nend\n\nto trade\n  let next-tier-neighbors (vendors-on neighbors4) with [distance-level = [distance-level + 1] of myself]\n  while [goods > storage * storage-threshold and any? next-tier-neighbors with [goods < storage]][\n    set goods goods - 1\n    ask one-of next-tier-neighbors with [goods < storage]\n    [\n      set goods goods + 1\n    ]\n  ]\nend\nto-report calculate-volume [a]\n  let vendor-tier vendors with [distance-level = a]\n  let tier-mean mean [goods] of vendor-tier\n  report tier-mean\nend\n\n',
		},
	},
	{
		text:'<p>'
		+  'Now that you have added <code class="codeABMA">set mean-goods [0 0 0 0 0 0]</code>, let\'s review what this code means. '
		+'</p>'
		+'<p>'
		+  'The list has a length of 6, the same as the maximum possible value for <code class="sliderName">level</code>. Each item, in this case, each zero, '
		+  'will represent the mean of a given <code class="var">distance-level</code>.'
		+'</p>'
		+'<p>'
		+  'For example, the first entry will represent the mean goods of <code class="codeABMA">vendors with [distance-level = 0]</code>'
		+'</p>'
		+'<p>'
		+  'One important thing to note is that the first item in the list in NetLogo is referred to as <code class="codeABMA">item 0</code> '
		+  'rather than <code class="codeABMA">item 1</code>. This will become important in a bit, when we change and read values from the list.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('#netlogo-code-tab')},
		},
	},
	{
		text:'<p>'
		+  'Next, we need a new procedure which will update the <code class="var">mean-goods</code> list at each time step.'
		+'</p>'
		+'<p>'
		+  'Create a new procedure <code class="codeABMA">iterate-list-of-mean-goods</code>, and insert it at the end of your code. This is another self-guided step.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('#netlogo-code-tab')},
		},
		advanceExampleCode: {
			solution:'to iterate-list-of-mean-goods\nend\n',
			codeExample: function() {
				addExampleCode({text:'\nto iterate-list-of-mean-goods\nend', insertAtText:'end', instance:11});
			},
			fullCode:'breed [producers producer]\nbreed [vendors vendor]\nturtles-own [goods distance-level]\nglobals [ mean-goods ]\n\nto setup\n  clear-all\n  set mean-goods [0 0 0 0 0 0]\n  create-producers 1 [\n    set color red\n    set shape "house"\n    set goods 0\n    set distance-level 0\n  ]\n  repeat level[populate]\n  reset-ticks\nend\n\nto populate\n  ask turtles [\n  let not-occupied neighbors4 with [not any? turtles-here]\n  hatch count not-occupied [\n    set breed vendors\n    set color color - 10\n    set shape "person"\n    set goods 0\n    set distance-level distance-level + 1 \n    move-to one-of neighbors4 with [not any? turtles-here]\n     ]\n  ]\nend\n\nto go\n  ask producers [set goods production-level]\n  ask producers [trade]\n  ask vendors [trade]\n  ask vendors with [goods > 0][set goods goods - 1]\n  ask turtles [set label goods]\n  tick\nend\n\nto trade\n  let next-tier-neighbors (vendors-on neighbors4) with [distance-level = [distance-level + 1] of myself]\n  while [goods > storage * storage-threshold and any? next-tier-neighbors with [goods < storage]][\n    set goods goods - 1\n    ask one-of next-tier-neighbors with [goods < storage]\n    [\n      set goods goods + 1\n    ]\n  ]\nend\nto-report calculate-volume [a]\n  let vendor-tier vendors with [distance-level = a]\n  let tier-mean mean [goods] of vendor-tier\n  report tier-mean\nend\n\n'
		},
		complexAdvanceOn: function() {
			advanceOnRecompile();
		},
	},
	{
		text:'<p>'
		+  'In the previous lesson, we showed you an alternative way of using <code class="codeABMA">populate</code> in the <code class="codeABMA">setup</code> '
		+  'procedure with a <code class="codeABMA">while</code> loop and a local variable: '
		+'</p>'
		+'<p>'
		+ '<code class="codeABMA">repeat level [populate]</code> could be rewritten as:'
		+'</p>'
		+'<pre class = codeblockABMA>'
		+  'let i 0 \n'
		+  'while [i < level][\n '
		+  '    populate\n'
		+  '    set i i + 1 \n '
		+  ']'
		+'</pre>'
		+'<p>'
		+  'We are going to use the same mechanism here.'
		+'</p>'
		+'<p>'
		+  'Inside the <code class="codeABMA">iterate-list-of-mean-goods</code> procedure:'
		+'</p>'
		+'<ol>'
		+  '<li> define a local variable <code class="newvar">i</code> as <code class="codeABMA">1</code> </li>'
		+  '<li> create a <code class="codeABMA">while</code> loop that continues until <code class="codeABMA">i <= level </code>'
		+  '<li> inside the loop, increase <code class="var">i</code> by <code class="codeABMA">1</code> </li>'
		+'</ol>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('#netlogo-code-tab')},
		},
		codeExample: function() {
			addExampleCode({text:'  let i 1\n  while [i <= level][\n    set i i + 1\n  ]\n', insertAtText:'to iterate-list-of-mean-goods'});
		},
		complexAdvanceOn: function() {
			advanceOnRecompile();
		},
	},
	{
		text:'<p>'
		+  'Next, inside the loop, but before increasing <code class="var">i</code>, define a local variable <code class="newvar">goods-at-distance</code> as '
		+  '<code class="codeABMA">calculate-volume i</code>'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('#netlogo-code-tab')},
		},
		codeExample: function() {
			addExampleCode({text:'    let goods-at-distance calculate-volume i \n', insertAtText:'i <= level'});
		},
		complexAdvanceOn: function() {
			advanceOnRecompile();
		},
	},
	{
		text:'<p>'
		+  'Below the previous line defining <code class="var">goods-at-distance</code> write <code class="codeABMA">set mean-goods replace-item (i - 1) mean-goods goods-at-distance</code>'
		+'<p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('#netlogo-code-tab')},
		},
		codeExample: function() {
			addExampleCode({text:'    set mean-goods replace-item (i - 1) mean-goods goods-at-distance\n', insertAtText:'goods-at-distance'});
		},
		complexAdvanceOn: function() {
			advanceOnRecompile();
		},
	},
	{
		text:'<p>'
		+  'Let\'s go over this procedure a bit, and explain how it works. Imagine we have set <code class="sliderName">level</code> to <code class="codeABMA">6</code>:'
		+'</p>'
		+'<ol>'
		+  '<li> First we define <code class="var">i</code> as <code class="codeABMA">1</code> </li>'
		+  '<li> Because <code class="codeABMA">i <= distance-level</code> is true (<code class="codeABMA">1 <= 6</code>), the commands inside the <code class="codeABMA">while</code> loop run</code>'
		+  '<li> Inside the <code class="codeABMA">while</code> loop, we pass <code class="var">i</code> to <code class="codeABMA">calculate-distance</code> as argument to define <code class="var">goods-at-level</code>. So when <code class="codeABMA">i = 1</code>, <code class="codeABMA">distance-level = 1</code>. </li>'
		+  '<li> Next we use <code class="codeABMA">replace-item</code> to replace the first item (<code class="codeABMA">item 0</code>), i - 1, with <code class="var">goods-at-level</code>. The code here might look a bit convoluted; this is because lists are immutable, and we can\'t change them directly. Instead, we have to create a new list by first taking a copy of <code class="var">mean-goods</code> with the <code class="codeABMA">item 0</code> replaced ((<code class="codeABMA">replace-item (i - 1) mean-goods goods-at-distance</code>) and then redefining <code class="var">mean-goods</code> <code class="codeABMA">set mean-goods</code> to this new list.</li>'
		+  '<li> Last, <code class="var">i</code> is increased by 1, and is now <code class="codeABMA">2</code>. </li>'
		+'</ol>'
		+'<p>'
		+  'The loop moves back to the beginning, and because <code class="codeABMA">2 <= 6</code> repeats step 2 to 5. '
		+  'This process continues until <code class="codeABMA">i <= 6</code> is false (i.e. <code class="codeABMA">i = 7</code>)'
		+'</p>',
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
				highlightLines({searchTerm:'to iterate-list-of-mean-goods', additionalLines:7});				//add the highlight element
			})
		},
	},
	{
		text:'<p>'
		+  'We want the <code class="var">mean-goods</code> to be recalculated at the end of every time-step, '
		+  'so call <code class="codeABMA">iterate-list-of-mean-goods</code> in the <code class="codeABMA">go</code> procedure in an appropriate place. This is another step on your own.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('#netlogo-code-tab')},
		},
		advanceExampleCode: {
			solution:'to go\n  ask producers [set goods production-level]\n  ask producers [trade]\n  ask vendors [trade]\n  ask vendors with [goods > 0][set goods goods - 1]\n  ask turtles [set label goods]\n  iterate-list-of-mean-goods\n  tick\nend',
			codeExample: function() {
				addExampleCode({text:'  iterate-list-of-mean-goods\n', insertAtText:'label'});
			},
			fullCode:'breed [producers producer]\nbreed [vendors vendor]\nturtles-own [goods distance-level]\nglobals [ mean-goods ]\n\nto setup\n  clear-all\n  set mean-goods [0 0 0 0 0 0]\n  create-producers 1 [\n    set color red\n    set shape "house"\n    set goods 0\n    set distance-level 0\n  ]\n  repeat level[populate]\n  reset-ticks\nend\n\nto populate\n  ask turtles [\n  let not-occupied neighbors4 with [not any? turtles-here]\n  hatch count not-occupied [\n    set breed vendors\n    set color color - 10\n    set shape "person"\n    set goods 0\n    set distance-level distance-level + 1 \n    move-to one-of neighbors4 with [not any? turtles-here]\n     ]\n  ]\nend\n\nto go\n  ask producers [set goods production-level]\n  ask producers [trade]\n  ask vendors [trade]\n  ask vendors with [goods > 0][set goods goods - 1]\n  ask turtles [set label goods]\n  tick\nend\n\nto trade\n  let next-tier-neighbors (vendors-on neighbors4) with [distance-level = [distance-level + 1] of myself]\n  while [goods > storage * storage-threshold and any? next-tier-neighbors with [goods < storage]][\n    set goods goods - 1\n    ask one-of next-tier-neighbors with [goods < storage]\n    [\n      set goods goods + 1\n    ]\n  ]\nend\nto-report calculate-volume [a]\n  let vendor-tier vendors with [distance-level = a]\n  let tier-mean mean [goods] of vendor-tier\n  report tier-mean\nend\n\nto iterate-list-of-mean-goods\n  let i 1\n  while [i <= level][\n    let goods-at-distance calculate-volume i \n    set mean-goods replace-item (i - 1) mean-goods goods-at-distance\n    set i i + 1\n  ]\nend'
		},
		complexAdvanceOn: function() {
			advanceOnRecompile();
		},
	},
	{
		text:'<p>'
		+  'To check whether our <code class="codeABMA">iterate-list-of-mean-goods</code> procedure works as intended, let\'s add a new widget to the interface: a monitor.'
		+'</p>'
		+'<p>'
		+  'Monitors are used to - you guessed it - monitor the value of an expression (the value of a variable, the return of a reporter etc.)'
		+'</p>',
		attachTo:{
			on: 'right',
			element: '.netlogo-display-vertical',
		},		
	},
	{
		text:'<p>'
		+  'Bring up the window to create a new monitor widget. Inside the reporter text-box write <code class="codeABMA">mean-goods</code> and press Ok.'
		+'</p>'
		+'<details>'
		+  '<summary>HINT</summary>' 
		+  '<p>'
		+    'Monitors are created similarly to buttons or sliders: by right-clicking on the interface when in authoring mode.'
		+  '</p>'
		+'</details>',
		attachTo:{
			on: 'right',
			element: '.netlogo-display-vertical',
		},	
		modalOverlayOpeningPadding:5000,
	},
	{
		text:'<p>'
		+  'Put the <code class="sliderName">level</code> to 6 and try running the simulation.'
		+'</p>',
		attachTo:{
			on: 'right',
			element: '.netlogo-display-vertical',
		},	
		complexAdvanceOn: function() {
			advanceOnButtonClick({type:'button', source:'go'});
		},		
	},
	{
		text:'<p>'
		+  'If everything works as intended, you should see the list in the monitor changing as the simulation progresses.'
		+'</p>'
		+'<p>'
		+  'Stop the simulation.'
		+'</p>',
		attachTo:{
			on: 'right',
			element: '.netlogo-display-vertical',
		},	
		complexAdvanceOn: function() {
			advanceOnButtonClick({type:'button', source:'go'});
		},	
		
	},
	{
		text:'<p>'
		+  'Next we are going to create a new plot that avoids the pesky error in the last lesson when putting the <code class="sliderName">level</code> lower than 6.'
		+'</p>'
		+'<p>'
		+  'Create a new plot, bringing up the edit plot window.'
		+'</p>',
		attachTo:{
			on: 'right',
			element: '.netlogo-display-vertical',
		},
		complexAdvanceOn: function() {
			fullProcessOnEditForm();
		},
		modalOverlayOpeningPadding:5000		
	},
	{
		text:'<p>'
		+  'Similarly to before, add a plot pen for every <code class="var">distance-level</code>, but instead of using the <code class="codeABMA">calculate-volume</code> '
		+  'reporter in the updates commands, we will use the list <code class="codeABMA">mean-goods</code>. You can use <code class="codeABMA">'
		+  '<a href="https://ccl.northwestern.edu/netlogo/docs/dictionary.html#item target="_blank" rel="noopener noreferrer"> item</a></code> to retrieve the relevant '
		+  'item from the list (e.g. distance-level 1 is <code class="codeABMA">item 0</code>)'
		+'</p>'
		+'<details>'
		+  '<summary>HINT</summary>' 
		+  '<p>'
		+    'In the plot pen update commands for the first distance level write <code class="codeABMA">plot item 0 mean-goods</code>, '
		+    'the second would be <code class="codeABMA">plot item 1 mean-goods</code>, and so on for all six levels</code>'
		+  '</p>'
		+'</details>'
		+'<p>'
		+  'When you are done, click OK and resize or move the plot as neseccary.'
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
		complexAdvanceOn: function() {
			advanceOnEditForm();
		},
	},
	{
		text:'<p>'
		+  'Set <code class="sliderName">level</code> to something below 6 and rerun the simulation. The error should be gone!'
		+'</p>',
		attachTo:{
			on: 'right',
			element: '.netlogo-display-vertical',
		},		
	},
	{
		text:'<p>'
		+  'Lists are particularly powerful when combined with loops, such as the '
		+  '<code class="codeABMA"><a href="https://ccl.northwestern.edu/netlogo/docs/dictionary.html#while" target="_blank" rel="noopener noreferrer">while</a></code> '
		+  'or <a href="https://ccl.northwestern.edu/netlogo/docs/dictionary.html#foreach" target="_blank" rel="noopener noreferrer">the <code class="codeABMA">for</code>-loop</a>, '
		+  'and you will find that they are common element of many ABMs.'
		+'</p>' 
		+'<p>'
		+  'By completing this lesson, you:'
		+'</p>'
		+'<ul>'
		+  '<li> have learned how to make and use simple lists.</li>'
		+'</ul>' 
		+'<p>'
		+  'Tutorial 4 will go over more complex list operations, but if you would like a sneak-peak, please check out NetLogo dictionary\'s '
		+  '<a href="https://ccl.northwestern.edu/netlogo/docs/dictionary.html#listsgroup" target="_blank" rel="noopener noreferrer">list-related primitives</a>.'
		+'</p>'
		+'<p>'
		+  'The next lesson will end this tutorial by going over some useful debugging techniques. To continue, click \'Next\''
		+'</p>'
	},
];
