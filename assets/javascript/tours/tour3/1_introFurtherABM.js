let introFurtherABM = [
	{
		text:'<h2>'
		+  'Welcome to Expanded Agent-based Modelling Skils!'
		+'</h2>'
		+'<p>'
		+  'In this tutorial, we will be building an Agent-Based Model (ABM) of Roman trade from scratch. '
		+'</p>'
		+'<p>'
		+  'Collectively these lessons will give you the necessary tools to start building more complex models independently while expanding your NetLogo vocabulary.'
		+  ' We\'ll continue to explore NetLogo - including some very nifty coding techniques such as loops, breeds, variables, lists, and new types of plots. By the end of this '
		+  'tutorial you will know how to develop simple code modules that when combined, create a complex simulation. '
		+  'We will also review a few debugging techniques - ways in which you can find and repair unintentional errors in the code.'
		+'</p>'
		+'<p>'
		+  'You can do this tutorial if you have completed the first set of two tutorials and would like to learn more complex NetLogo coding. '
		+  'This tutorial is also suitable if you have basic knowledge of NetLogo and would like to practice your skills expand your knowledge of NetLogo syntax.'
		+'</p>',
	},
	{
		text:'<h2>'
		+  'Tools for good modeling'
		+'</h2>' 
		+'<p>'
		+  'In this first lesson we will be examining an ABM for Roman trade. We will also be going over some things that will become increasingly important '
		+  'as you start building more complex models, such as modular code development, pseudocode, and commenting on code. '
		+  'Not only will these things make the code development process less frustrating, but they also help to clearly communicate your code to yourself and others.'
		+'</p>'
		+'<p>'
		+  'In this lesson, you:'
		+'</p>'
		+'<ul>'
		+  '<li>will learn some aids for code development.</li>'
		+'</ul>',
	},
	{
		text:'<p>'
		+  'We will be using this simple Roman trade model as an example. While still relatively simple, it is more complex than the model of dispersal we looked at in Tutorial 2.'
		+'</p>'
		+'<p>'
		+  'This model was built to investigate how accessibility to a production center, production capacity, and trading/storage capacity of surrounding markets impact '
		+  'the spatial distribution of a product over time. It can be used to examine how long it takes for a product to reach sites at different distances from the production center.'
		+'</p>'
		+'<p>'
		+  'The ABM was made to investigate the frequency curves of different Roman amphora types, but is general enough to study different types of archaeological materials '
		+  'and trends observed more broadly in the archaeological record. The model generates artificial frequency curves that can be compared against real frequency curves.'
		+'</p>'
		+'<p>'
		+  '<img src="assets/images/Frequencies.png" height="500px"/>'
		+'</p>',
	},
	{
		text:'<p>'
		+  'Click <code class="buttonName">setup</code>.'
		+'</p>',
		attachTo:{
			on: 'right',
			element: ()=>{return getWidgetElement({type:'button', source:'setup'})},
		},
		complexAdvanceOn: function() {
				advanceOnButtonClick({type:'button', source:'setup'});
		},
	},
	{
		text:'<p>'
		+  '<code class="codeABMA">setup</code> has created a world where one production center (the house-shaped agent) is surrounded by multiple vendors, '
		+  'representing markets (the person-shaped agents), some close by, some farther away. '
		+'</p>',
		attachTo:{
			on: 'right',
			element: ()=> {
				return getWidgetElement({type:'view'});
			},
		},
	},
	{
		text:'<p>'
		+  'Production and trade will use simple rules. As vendors are located at different distances from the producer, '
		+  ' some have direct access and contact with the producer, while others are dependent on trade with other vendors.'
		+'</p>'
		+'<p>'
		+  'Slow down the ticks a bit, run the model (click <code class="codeABMA">go</code>) and watch the graph.'
		+'</p>',

		attachTo:{
			on: 'right',
			element: '.netlogo-display-vertical',
		},
		complexAdvanceOn: function() {
				advanceOnButtonClick({type:'button', source:'go', forever:true});
		}, 
	},
	{
		text:'<p>'
		+  'At each tick, the average number of goods at each distance are drawn in the plot.'
		+'</p>',
		attachTo:{
			on: 'top',
			element: ()=> {
				return getWidgetElement({type:'plot', source:'Graph'});
			},
		},
	},
	{
		text:'<p>'
		+  'On the dashboard, <code class="sliderName">production-level</code> denotes the production capacity of the producer, while <code class="sliderName">storage</code> and '
		+  '<code class="sliderName">storage-threshold</code> determine the storage capacities of the vendors.'
		+'</p>'
		+'<p>'
		+  'Try experimenting a bit with different values for these parameters and rerunning the model a couple of times.  What do you notice?'
		+'</p>'
		+'<p>'
		+  'Before moving on, make sure to stop the model!'
		+'</p>',
		attachTo:{
			on: 'right',
			element: '.netlogo-display-vertical',
		},
	},
	{
		text:'<p>'
		+  'Let\'s examine the code and its structure in a bit more detail.'
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
		+  'If you are coming from tutorial 2, you might remember \'commenting out\' some code using semi-colons.'
		+'</p>'
		+'<p>'
		+  'Semi-colons are very useful because they allow the coder to add comments to the code, '
		+  'usually to add notes or explanations.'
		+'</p>'
		+'<p>'
		+  'This helps communicate the code to others, but also to yourself! You might understand your code as you write it, but what if you take a break and look at it later?'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('#netlogo-code-tab')},
	},
	},
	{
		text:'<p>'
		+  'Here most of the code is commented on to keep track of and communicate what each line does.'
		+'</p>'
		+'<p>'
		+  'Read through the code: how much do you understand? Feel free to look up some syntax in the '
		+  '<a href="https://ccl.northwestern.edu/netlogo/bind/" target="_blank" rel="noopener noreferrer">NetLogo Dictionary</a> or '
		+  '<a href="https://ccl.northwestern.edu/netlogo/docs/dictionary.html" target="_blank" rel="noopener noreferrer">Beginner\'s Interactive NetLogo Dictionary</a>.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('#netlogo-code-tab')},
	},
	},
	{
		text:'<p>'
		+  'Another thing that can be very useful in the development process is using pseudo-code. '
		+  'Pseudo-code looks a lot like code, but it is written in plain language.'
		+'</p>'
		+'<p>'
		+  'For example, the trade procedure in this model, might look like this in pseudo-code:'
		+'</p>'
		+'<pre class="codeblockABMA">to trade\n'
		+  ' if any goods in your storage\n'
		+  ' if any neighbors want to buy (their goods < storage)\n'
		+  ' give an item to one of the neighbors \n'
		+  ' remove one item from own storage'
		+'</pre>'
		+'<p>'
		+  'Going from a verbally defined model to a computational model can be challenging because natural language allows for more ambiguity. '
		+  'Pseudo-code can help bridge this gap and provide a summary of your code to clarify to yourself and others the model\'s intent.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('#netlogo-code-tab')},
	},
	},
	{
		text:'<p class="ABMAnonAttachedWidth ABMAcenter">'
		+  'One thing you might have noticed while reading the code, '
		+  'is that it is broken up into several procedures. '
		+  'In the next lessons we will be taking an approach called modular code development. '
		+  'Modular code development entails separating a code into building blocks, each delivering a particular functionality.'
		+'</p>'
		+'<p class="ABMAnonAttachedWidth ABMAcenter">'
		+  'In agent-based modeling different \'behaviors\' are often represented by different procedures. '
		+  ' For example, compare the <code class="codeABMA">go</code> procedure code in Code Tab, in the left column, with the <a href=https://en.wikipedia.org/wiki/Spaghetti_code target="_blank" rel="noopener noreferrer">spaghetti code</a> in the right column: </p>'
		+'<div class="ABAMcolumns">'
		+  '<div>'
		+    '<pre class="codeblockABMA">'
		+      'to go\n'
		+      '  ; main loop of the simulation\n'
		+      '  ask turtles [ set label goods ]'
		+      '  ask producers [ set goods production-level ]\n'
		+      '  ask producers [ trade ]\n'
		+      '  ask vendors with [goods > 0 ] [ trade ]\n'
		+      '  ask vendors with [ goods >= 1 ] [ set goods goods - 1 ]\n'
		+      '  iterate-list-of-mean-goods\n'
		+      '  tick\n'
		+      'end\n'
		+    '</pre>'
		+  '</div>'
		+'<div>'
		+  '<pre class="codeblockABMA">'
		+    'to go\n'
		+    '  ask turtles [ set label goods ]\n'
		+    '  ask producers [ set goods production-level ]\n'
		+    '  ask producers [\n'
		+    '    let next-tier-neighbors (vendors-on neighbors4) with [ distance-level = [ distance-level + 1 ] of myself ]\n'
		+    '    while [goods > storage * storage-threshold and any? next-tier-neighbors with [ goods < storage]] [\n'
		+    '      set goods goods - 1\n'
		+    '      ask one-of next-tier-neighbors with [ goods < storage ] [\n'
		+    '        set goods goods + 1\n'
		+    '      ]\n'
		+    '    ]\n'
		+    '  ]\n'
		+    '  ask vendors with [goods > 0 ] [\n'
		+    '    let next-tier-neighbors (vendors-on neighbors4) with [ distance-level = [ distance-level + 1 ] of myself ]\n'
		+    '    while [goods > storage * storage-threshold and any? next-tier-neighbors with [ goods < storage ]] [\n'
		+    '      set goods goods - 1\n'
		+    '      ask one-of next-tier-neighbors with [ goods < storage ] [\n'
		+    '        set goods goods + 1\n'
		+    '      ]\n'
		+    '    ]\n'
		+    '  ]\n'
		+    '  ask vendors with [ goods >= 1 ] [ set goods goods - 1 ]\n'
		+    '\n'
		+    '  let i 1\n'
		+    '  while [ i <= level ] [\n'
		+    '    let vendors-tier vendors with [ distance-level = i ]\n'
		+    '    let goods-at-distance mean [ goods ] of vendors-tier\n'
		+    '    set mean-goods replace-item (i - 1) mean-goods goods-at-distance\n'
		+    '    set i i + 1\n'
		+    '  ]\n'
		+    '  tick\n'
		+    'end'
		+    '</pre>'
		+  '</div>'
		+'</div>'
		+'<p class="ABMAnonAttachedWidth ABMAcenter">'
		+  'The code in both columns functions exactly the same, but the right looks a lot messier, '
		+  'has more repetition, and overall is more difficult to read. The code in the left column and NetLogo Code tab is much clearer because the trade actions are put in a separate procedure, '
		+  'which avoids repetition and helps with readability.'
		+'</p>',
		classes: 'ABMAfullWidth',
	},
	{
		text:'<p>'
		+  'Modular code development will also help you when you want to find potential errors.'
		+'</p>'
		+'<p>'
		+  'When the code doesn\'t do what you want it to do, we need to \'debug\' it: find and fix errors or \'bugs\'. '
		+  'Lesson 7 gets more into debugging and some useful strategies. Using modular code development will make both the development and '
		+  'debugging process much easier as it encourages you to start simple and check if each procedure works as intended before moving on.'
		+'</p>'
	},
	{
		text:'<p>'
		+  'As your models grow in complexity, aids for code developements such as the ones introduced here will become more and more important. '
		+'</p>'
		+'<p>'
		+  'This is the end of the lesson. In it, you have learned:'
		+'</p>'
		+'<ul>'
		+  '<li> some aids for code developments (e.g. modular code development, pseudocode, commenting). </li>'
		+'</ul>'
		+'<p>'
		+  'Please look at some ABMs from '
		+  '<a href="https://www.netlogoweb.org/launch#https://www.netlogoweb.org/assets/modelslib/Sample%20Models/Art/Follower.nlogo" target="_blank" rel="noopener noreferrer">the Models Library </a> '
		+  'to see how they handle documenting, commenting on and structuring code.'
		+'</p>'
		+'<p>'
		+  'In tutorial 5 we will go more in depth about the modeling progress and some neat tricks that can help you along. '
		+  'The next couple of tutorials will help you improve your NetLogo skills while teaching you the skills to start coding independently. To continue, click \'Next\' below.'
		+'</p>'
	},
 ];
