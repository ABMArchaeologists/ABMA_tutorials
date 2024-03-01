let Debugging = [
	{
		text:'<h2>'
		+  'Welcome to Debugging!'
		+'</h2>'
		+'<p>'
		+  'In this lesson we will be correcting a model with errors: debugging! Debugging is a time-consuming, but very important aspect of model developement.'
		+'<p>'
		+'<p>'
		+  'This lesson is for you if you know the NetLogo basics and would like to learn some nifty tricks for finding and correcting errors in your model.'
		+'</p>'
		+'<p>'
		+  'In this lesson, you:'
		+'</p>'
		+'<ul>'
		+  '<li>will learn some useful debugging techniques</li>'
		+'</ul>'
		+'<div class="abmMoreInfoHolder">'
		+  '<p>'
		+    'Like in the last lesson, you will be taking on more and more of the coding yourself, though with support if you need it.'
		+  '</p>'
		+'</div>',
	},
	{
		text:'<p>'
		+  'When it comes to coding, perhaps the most time-consuming part is debugging.'
		+'</p>'
		+'<p>'
		+  'The techniques mentioned in lesson 1 - modular code development, pseudo-code, commenting - will help in the debugging process. '
		+  'Still, it is easy to introduce unintentional errors, especially when your code gets longer or more complex.'
		+'</p>'
		+'<p>'
		+  'Start by opening the code tab.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: '.netlogo-tab-area',
		},
		complexAdvanceOn: function() {
			advanceOnTabs({tab:'showCode'});  
		},
	},
	{//might want to add some more common ones from https://ccl.northwestern.edu/netlogo/bind/article/common-netlogo-error-messages.html? 
		text:'<p>'
		+  'When there\'s errors in your code, one of two things might happen.'
		+'</p>'
		+'<p>'
		+  'NetLogo might throw you an error message. This happens when NetLogo cannot interpret the code or cannot perform the action you are asking it to do. '
		+  'Errors that stop your model from running are sometimes referred to as syntax errors. While sometimes cryptic, error messages often help to solve errors. '
		+'</p>'
		+'<p>'
		+  'If you\'ve followed all tutorials in order, you will have come across several error messages already. '
		+  'For example, when we tried to create a setup button without having a setup procedure defined, '
		+  'NetLogo threw the <code class="codeABMA">Nothing names [NAME] has been defined</code> message.'
		+'</p>'
		+'<p>'
		+  'Try recompiling the code and see what happens.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('#netlogo-code-tab')},
		},
		codeExample: function() {
			addExampleCode({text:'    set color black\n', insertAtText:'ask patches', markExample:false});
		},
		complexAdvanceOn: function() {
			advanceOnAlert();
		},
		alertTrue:true,
	},
	{
		text:'<p>'
		+  'Woop, an error! In this case, the error message is pretty informative. Can you fix the bug based on the message here? Note that it says the line of the error.'
		+'</p>'
		+'<p>'
		+  'Dismiss the error.'
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
		+  'Fix the error in the code and recompile.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('#netlogo-code-tab')},
		},
		codeExample: function() {
			
		},
		complexAdvanceOn: function() {
			advanceOnRecompile();
		},
		advanceExampleCode: {
			solution:'set pcolor black',
			codeExample: function() {
				addExampleCode({text:'    set pcolor black', insertAtText:'set color black', replace:true});
			}, 
			fullCode:'breed [ producers producer ]\nbreed [ vendors vendor ]\nglobals [ mean-goods ]\nvendors-own [ goods distance-level ]\nproducers-own [ goods distance-level ]\n\nto setup\n  clear-all\n\n  ask patches [\n    set color black\n  ]\n\n  create-producers 1 [\n    set color red\n    set shape "house"\n    set goods 0\n    set distance-level 0\n  ]\n\n  repeat level[populate]\n  set mean-goods [0 0 0 0 0 0]\n  reset-ticks\nend\n\nto populate\n  ask turtles [\n    let not-occupied neighbors4 with [not any? turtles-here]\n    hatch count not-occupied [\n      set distance-level [distance-level] of myself + 1\n      set color color - 10\n      set shape "person"\n      set goods 0\n      move-to one-of neighbors4 with [not any? turtles-here]\n    ]\n  ]\nend\n\nto go\n  ; main loop of the simulation\n\n  ask turtles [ set label goods ]\n  ask producers [ set goods production-level ]              ; 1. producer produces goods\n  ask producers [ trade ]                                   ; 2. producer distributes goods to the closest markets\n  ask vendors [ trade ]                   ; 3. markets that have goods trade goods moving them further away from the production site\n  ask vendors with [goods > 0] [ set goods goods - 1 ]   ; 4. some percentage of goods is destroyed in the process\n  iterate-list-of-mean-goods\n  tick\nend\n\nto trade\n  let next-tier-neighbors (vendors-on neighbors4) with [ distance-level = [ distance-level + 1 ] of myself ] ; establish trading partners: turtles on neighbouring patches with a higher distance-level\n  while [goods < storage * storage-threshold and any? next-tier-neighbors with [ goods > storage ]] [ \n    set goods goods - 1\n    ;if any trading partners\n    ask one-of next-tier-neighbors with [ goods < storage ] [                                              ; trade with one of the trading partners\n      set goods goods + 1\n    ]\n  ]\nend\nto-report calculate-volume [a]\n  ; reporter function used to calculate the mean number of goods at a given distance-level\n  let vendors-tier turtles with [ distance-level = a ]\n  report mean [ goods ] of vendors-tier\nend\n\nto iterate-list-of-mean-goods\n  ; auxilary procedure used to update the current mean number of goods at each distance-level\n  ; results are stored in the list "mean-goods"\n  let i 1\n  while [ i < level ] [                                               ; for each distance-level\n    let goods-at-distance calculate-volume i                           ; calculate the mean number of goods\n    set mean-goods replace-item (i - 1)  mean-goods goods-at-distance   ; store the result in the correct position in the list\n    set i i + 1\n  ]\nend\n',		},
	},
	{
		text:'<p>'
		+  'Other times, NetLogo might not throw an error but the model is not doing what you want it to do.'
		+'</p>'
		+'<p>'
		+  'Figuring out why your code is not working as you intended can be very time-consuming.'
		+'</p>'
		+'<p>'
		+  'It is important to realize that NetLogo can only do what you tell it to. When the code is not working like you want it to, '
		+  'it is probably because you are making an error in logic without realizing it.'
		+'</p>'
		+'<p>'
		+  'Try running the model and see for yourself.'
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
		+  'That is strange...all turtles have an equal amount of <code class="var">goods</code> that stays the same. Try changing the <code class="sliderName">production-level</code> '
		+  'and rerunning the model a couple of times. What do you notice?'
		+'</p>'
		+'<p>'
		+  'Stop the model.'
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
		+  'One very useful tool for debugging are the primitives <code class="codeABMA">'
		+  '<a href="https://ccl.northwestern.edu/netlogo/docs/dict/print.html" target="_blank" rel="noopener noreferrer">print</a></code>, and <code class="codeABMA">'
		+  '<a href="https://ccl.northwestern.edu/netlogo/docs/dict/show.html" target="_blank" rel="noopener noreferrer">show</a></code>.'
		+  'These can be put strategically inside the code to check whether NetLogo actually executes the intended action.'
		+'</p>'
		+'<p>'
		+  'In the go procedure ask vendors to <code class="codeABMA">print \"vendor is trading!\"</code> before trading.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('#netlogo-code-tab')},
		},		
		advanceExampleCode: {
			solution:'to go\n  ; main loop of the simulation\n\n  ask turtles [ set label goods ]\n  ask producers [ set goods production-level ]\n  ask producers [ trade ]\n  ask vendors [ print "vendor is trading!" trade ]\n  ask vendors with [goods > 0] [ set goods goods - 1 ]\n  tick\nend\n',
			codeExample: function() {
				addExampleCode({text:'print "vendor is trading!" ', insertAtText:'ask vendors', position:'at', startCh:16});
			}, 
			fullCode:'breed [ producers producer ]\nbreed [ vendors vendor ]\nglobals [ mean-goods ]\nvendors-own [ goods distance-level ]\nproducers-own [ goods distance-level ]\n\nto setup\n  clear-all\n\n  ask patches [\n    set pcolor black\n  ]\n\n  create-producers 1 [\n    set color red\n    set shape "house"\n    set goods 0\n    set distance-level 0\n  ]\n\n  repeat level[populate]\n  set mean-goods [0 0 0 0 0 0]\n  reset-ticks\nend\n\nto populate\n  ask turtles [\n    let not-occupied neighbors4 with [not any? turtles-here]\n    hatch count not-occupied [\n      set distance-level [distance-level] of myself + 1\n      set color color - 10\n      set shape "person"\n      set goods 0\n      move-to one-of neighbors4 with [not any? turtles-here]\n    ]\n  ]\nend\n\nto go\n  ; main loop of the simulation\n\n  ask turtles [ set label goods ]\n  ask producers [ set goods production-level ]              ; 1. producer produces goods\n  ask producers [ trade ]                                   ; 2. producer distributes goods to the closest markets\n  ask vendors [ trade ]                   ; 3. markets that have goods trade goods moving them further away from the production site\n  ask vendors with [goods > 0] [ set goods goods - 1 ]   ; 4. some percentage of goods is destroyed in the process\n  iterate-list-of-mean-goods\n  tick\nend\n\nto trade\n  let next-tier-neighbors (vendors-on neighbors4) with [ distance-level = [ distance-level + 1 ] of myself ] ; establish trading partners: turtles on neighbouring patches with a higher distance-level\n  while [goods < storage * storage-threshold and any? next-tier-neighbors with [ goods > storage ]] [ \n    set goods goods - 1\n    ;if any trading partners\n    ask one-of next-tier-neighbors with [ goods < storage ] [                                              ; trade with one of the trading partners\n      set goods goods + 1\n    ]\n  ]\nend\nto-report calculate-volume [a]\n  ; reporter function used to calculate the mean number of goods at a given distance-level\n  let vendors-tier turtles with [ distance-level = a ]\n  report mean [ goods ] of vendors-tier\nend\n\nto iterate-list-of-mean-goods\n  ; auxilary procedure used to update the current mean number of goods at each distance-level\n  ; results are stored in the list "mean-goods"\n  let i 1\n  while [ i < level ] [                                               ; for each distance-level\n    let goods-at-distance calculate-volume i                           ; calculate the mean number of goods\n    set mean-goods replace-item (i - 1)  mean-goods goods-at-distance   ; store the result in the correct position in the list\n    set i i + 1\n  ]\nend\n',
		},
		complexAdvanceOn: function() {
			advanceOnRecompile();
		},
	},
	{
		text:'<p>'
		+  'Try rerunning the model.'
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
		+  'Go to the Command Center.'
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
		+  'Despite adding this line of code, if you check the Command Center, you will see that nothing gets printed to the console.'
		+'</p>'
		+'<p>'
		+  'This means that no vendors are executing the print command. This also means that no vendors are performing the <code class="codeABMA">trade</code> procedure.'
		+'</p>'
		+'<p>'
		+  'Stop the model.'
		+'</p>',
		attachTo:{
			on: 'top',
			element: '.netlogo-display-horizontal',
		},	
		complexAdvanceOn: function() {
			advanceOnButtonClick({type:'button', source:'go'});
		},
	},
	{
		text:'<p>'
		+  'In the command center, write <code class="codeABMA">ask turtles [show breed]</code> and press enter.'
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
		+  'Ah, that\'s the problem! Instead of one producer and multiple vendors, we only have producer agents. '
		+  'That explains why the number of <code class="var">goods</code> doesn\'t change and is the same as the <code class="sliderName">production-level</code> value.'
		+'</p>'
		+'<p>'
		+  'Inspect the <code class="codeABMA">setup</code> and <code class="codeABMA">populate</code> procedure again: do you know how to fix this error? Change the code.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: '.netlogo-tab-area',
		},	
		advanceExampleCode: {
			solution:'to populate\n  ask turtles [\n    let not-occupied neighbors4 with [not any? turtles-here]\n    hatch count not-occupied [\n      set breed vendors\n      set distance-level [distance-level] of myself + 1\n      set color color - 10\n      set shape "person"\n      set goods 0\n      move-to one-of neighbors4 with [not any? turtles-here]\n    ]\n  ]\nend\n',
			codeExample: function() {
				addExampleCode({text:'      set breed vendors\n', insertAtText:'hatch'});
			}, 
			fullCode:'breed [ producers producer ]\nbreed [ vendors vendor ]\nglobals [ mean-goods ]\nvendors-own [ goods distance-level ]\nproducers-own [ goods distance-level ]\n\nto setup\n  clear-all\n\n  ask patches [\n    set pcolor black\n  ]\n\n  create-producers 1 [\n    set color red\n    set shape "house"\n    set goods 0\n    set distance-level 0\n  ]\n\n  repeat level[populate]\n  set mean-goods [0 0 0 0 0 0]\n  reset-ticks\nend\n\nto populate\n  ask turtles [\n    let not-occupied neighbors4 with [not any? turtles-here]\n    hatch count not-occupied [\n      set distance-level [distance-level] of myself + 1\n      set color color - 10\n      set shape "person"\n      set goods 0\n      move-to one-of neighbors4 with [not any? turtles-here]\n    ]\n  ]\nend\n\nto go\n  ; main loop of the simulation\n\n  ask turtles [ set label goods ]\n  ask producers [ set goods production-level ]              ; 1. producer produces goods\n  ask producers [ trade ]                                   ; 2. producer distributes goods to the closest markets\n  ask vendors [ print "vendor is trading!" trade ]                   ; 3. markets that have goods trade goods moving them further away from the production site\n  ask vendors with [goods > 0] [ set goods goods - 1 ]   ; 4. some percentage of goods is destroyed in the process\n  iterate-list-of-mean-goods\n  tick\nend\n\nto trade\n  let next-tier-neighbors (vendors-on neighbors4) with [ distance-level = [ distance-level + 1 ] of myself ] ; establish trading partners: turtles on neighbouring patches with a higher distance-level\n  while [goods < storage * storage-threshold and any? next-tier-neighbors with [ goods > storage ]] [ \n    set goods goods - 1\n    ;if any trading partners\n    ask one-of next-tier-neighbors with [ goods < storage ] [                                              ; trade with one of the trading partners\n      set goods goods + 1\n    ]\n  ]\nend\nto-report calculate-volume [a]\n  ; reporter function used to calculate the mean number of goods at a given distance-level\n  let vendors-tier turtles with [ distance-level = a ]\n  report mean [ goods ] of vendors-tier\nend\n\nto iterate-list-of-mean-goods\n  ; auxilary procedure used to update the current mean number of goods at each distance-level\n  ; results are stored in the list "mean-goods"\n  let i 1\n  while [ i < level ] [                                               ; for each distance-level\n    let goods-at-distance calculate-volume i                           ; calculate the mean number of goods\n    set mean-goods replace-item (i - 1)  mean-goods goods-at-distance   ; store the result in the correct position in the list\n    set i i + 1\n  ]\nend\n',
		},
		complexAdvanceOn: function() {
			advanceOnRecompile();
		},
	},
	{
		text:'<p>'
		+  'Try rerunning the model.'
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
		+  'Unfortunately, while <code class="codeABMA">vendor is trading!</code> is printed to the command center, goods are stuck at the producer...stop the model.'
		+'</p>',
		attachTo:{
			on: 'right',
			element: '.netlogo-display-horizontal',
		},	
		complexAdvanceOn: function() {
			advanceOnButtonClick({type:'button', source:'go'});
		},
	},
	{
		text:'</p>'
		+  'Let\'s move the <code class="codeABMA">print</code> line from the <code class="codeABMA">go</code> procedure to the beginning of the <code class="codeABMA">trade</code> procedure. '
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('#netlogo-code-tab')},
		},	
		advanceExampleCode: {
			solution:'ask vendors [ trade ]\n...\nto trade\n  print "vendor is trading!"\n...\n',
			codeExample: function() {
				addExampleCode({text:'  ask vendors [ trade ]                              ', insertAtText:'vendor is trading', position:'at', replace:true, ignoreDuplicate:true, });
				addExampleCode({text:'  print "vendor is trading!"\n', insertAtText:'to trade', ignoreDuplicate:true});
			},
			fullCode:'breed [ producers producer ]\nbreed [ vendors vendor ]\nglobals [ mean-goods ]\nvendors-own [ goods distance-level ]\nproducers-own [ goods distance-level ]\n\nto setup\n  clear-all\n\n  ask patches [\n    set pcolor black\n  ]\n\n  create-producers 1 [\n    set color red\n    set shape "house"\n    set goods 0\n    set distance-level 0\n  ]\n\n  repeat level[populate]\n  set mean-goods [0 0 0 0 0 0]\n  reset-ticks\nend\n\nto populate\n  ask turtles [\n    let not-occupied neighbors4 with [not any? turtles-here]\n    hatch count not-occupied [\n      set breed vendors\n      set distance-level [distance-level] of myself + 1\n      set color color - 10\n      set shape "person"\n      set goods 0\n      move-to one-of neighbors4 with [not any? turtles-here]\n    ]\n  ]\nend\n\nto go\n  ; main loop of the simulation\n\n  ask turtles [ set label goods ]\n  ask producers [ set goods production-level ]              ; 1. producer produces goods\n  ask producers [ trade ]                                   ; 2. producer distributes goods to the closest markets\n  ask vendors [ print "vendor is trading!" trade ]                   ; 3. markets that have goods trade goods moving them further away from the production site\n  ask vendors with [goods > 0] [ set goods goods - 1 ]   ; 4. some percentage of goods is destroyed in the process\n  iterate-list-of-mean-goods\n  tick\nend\n\nto trade\n  let next-tier-neighbors (vendors-on neighbors4) with [ distance-level = [ distance-level + 1 ] of myself ] ; establish trading partners: turtles on neighbouring patches with a higher distance-level\n  while [goods < storage * storage-threshold and any? next-tier-neighbors with [ goods > storage ]] [ \n    set goods goods - 1\n    ;if any trading partners\n    ask one-of next-tier-neighbors with [ goods < storage ] [                                              ; trade with one of the trading partners\n      set goods goods + 1\n    ]\n  ]\nend\nto-report calculate-volume [a]\n  ; reporter function used to calculate the mean number of goods at a given distance-level\n  let vendors-tier turtles with [ distance-level = a ]\n  report mean [ goods ] of vendors-tier\nend\n\nto iterate-list-of-mean-goods\n  ; auxilary procedure used to update the current mean number of goods at each distance-level\n  ; results are stored in the list "mean-goods"\n  let i 1\n  while [ i < level ] [                                               ; for each distance-level\n    let goods-at-distance calculate-volume i                           ; calculate the mean number of goods\n    set mean-goods replace-item (i - 1)  mean-goods goods-at-distance   ; store the result in the correct position in the list\n    set i i + 1\n  ]\nend\n',			
		},
		complexAdvanceOn: function() {
			advanceOnRecompile();
		},
	},
	{
		text:'<p>'
		+  'Clear the command console so we can see if the print is working.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: '.netlogo-command-center button',
		},	
		complexAdvanceOn: function() {
			advanceOnClearHistory();
		},
	},
	{
		text:'<p>'
		+  'Try rerunning the model.'
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
		+  'Again, according to the console, the <code class="codeABMA">trade</code> procedure is executed, but nothing seems to be happening.'
		+'</p>'
		+'<p>'
		+  'The error must be occurring in the procedure, but after the <code class="codeABMA">print</code> line...'
		+'</p>'
		+'<p>'
		+  'Stop the model.'
		+'</p>',
		attachTo:{
			on: 'right',
			element: '.netlogo-display-horizontal',
		},
		complexAdvanceOn: function() {
			advanceOnButtonClick({type:'button', source:'go'});
		},
	},
	{
		text:'<p>'
		+  'Try moving the <code class="codeABMA">print</code> line to inside the beginning of the <code class="codeABMA">while</code> loop.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('#netlogo-code-tab')},
		},	
		advanceExampleCode: {
			solution:'to trade\n  ;print "vendor is trading!"\n  let next-tier-neighbors (vendors-on neighbors4) with [ distance-level = [ distance-level + 1 ] of myself ] ; establish trading partners: turtles on neighbouring patches with a higher distance-level\n  while [goods < storage * storage-threshold and any? next-tier-neighbors with [ goods > storage ]] [ \n    print "vendor is trading!"\n    set goods goods - 1\n...',
			codeExample: function() {
				addExampleCode({text:';', insertAtText:'vendor is trading', position:'at', ignoreDuplicate:true, startCh:2});
				addExampleCode({text:'    print "vendor is trading!"\n', insertAtText:'while',ignoreDuplicate:true});
			},
			fullCode:'breed [ producers producer ]\nbreed [ vendors vendor ]\nglobals [ mean-goods ]\nvendors-own [ goods distance-level ]\nproducers-own [ goods distance-level ]\n\nto setup\n  clear-all\n\n  ask patches [\n    set pcolor black\n  ]\n\n  create-producers 1 [\n    set color red\n    set shape "house"\n    set goods 0\n    set distance-level 0\n  ]\n\n  repeat level[populate]\n  set mean-goods [0 0 0 0 0 0]\n  reset-ticks\nend\n\nto populate\n  ask turtles [\n    let not-occupied neighbors4 with [not any? turtles-here]\n    hatch count not-occupied [\n      set breed vendors\n      set distance-level [distance-level] of myself + 1\n      set color color - 10\n      set shape "person"\n      set goods 0\n      move-to one-of neighbors4 with [not any? turtles-here]\n    ]\n  ]\nend\n\nto go\n  ; main loop of the simulation\n\n  ask turtles [ set label goods ]\n  ask producers [ set goods production-level ]              ; 1. producer produces goods\n  ask producers [ trade ]                                   ; 2. producer distributes goods to the closest markets\n  ask vendors [ trade ]                                              ; 3. markets that have goods trade goods moving them further away from the production site\n  ask vendors with [goods > 0] [ set goods goods - 1 ]   ; 4. some percentage of goods is destroyed in the process\n  iterate-list-of-mean-goods\n  tick\nend\n\nto trade\n  print "vendor is trading!"\n  let next-tier-neighbors (vendors-on neighbors4) with [ distance-level = [ distance-level + 1 ] of myself ] ; establish trading partners: turtles on neighbouring patches with a higher distance-level\n  while [goods < storage * storage-threshold and any? next-tier-neighbors with [ goods > storage ]] [ \n    set goods goods - 1\n    ;if any trading partners\n    ask one-of next-tier-neighbors with [ goods < storage ] [                                              ; trade with one of the trading partners\n      set goods goods + 1\n    ]\n  ]\nend\nto-report calculate-volume [a]\n  ; reporter function used to calculate the mean number of goods at a given distance-level\n  let vendors-tier turtles with [ distance-level = a ]\n  report mean [ goods ] of vendors-tier\nend\n\nto iterate-list-of-mean-goods\n  ; auxilary procedure used to update the current mean number of goods at each distance-level\n  ; results are stored in the list "mean-goods"\n  let i 1\n  while [ i < level ] [                                               ; for each distance-level\n    let goods-at-distance calculate-volume i                           ; calculate the mean number of goods\n    set mean-goods replace-item (i - 1)  mean-goods goods-at-distance   ; store the result in the correct position in the list\n    set i i + 1\n  ]\nend\n',
		},
		complexAdvanceOn: function() {
			advanceOnRecompile();
		},
	},
	{
		text:'<p>'
		+  'Clear the command console so we can see if the print is working.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: '.netlogo-command-center button',
		},	
		complexAdvanceOn: function() {
			advanceOnClearHistory();
		},
	},
	{
		text:'<p>'
		+  'Try rerunning the model. No new text appears in the console: this means that the  <code class="codeABMA">while</code> code block is not being executed!'
		+'</p>'
		+'<p>'
		+  'This means that the conditions set for the <code class="codeABMA">while</code> loop are not met...'
		+'</p>'
		+'<p>'
		+  'Stop the model.'
		+'</p>',
		attachTo:{
			on: 'right',
			element: '.netlogo-display-horizontal',
		},		
	},
	{
		text:'<p>'
		+  'Examine the conditions in the first set of brackets after <code class="codeABMA">while</code> critically: can you spot the problem?'
		+'</p>'
		+'<p>'
		+  'Fix the code and remove the printing statement.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('#netlogo-code-tab')},
		},	
		advanceExampleCode: {
			solution:'to trade\n  ;print "vendor is trading!"\n  let next-tier-neighbors (vendors-on neighbors4) with [ distance-level = [ distance-level + 1 ] of myself ] ; establish trading partners: turtles on neighbouring patches with a higher distance-level\n  while [goods > storage * storage-threshold and any? next-tier-neighbors with [goods < storage]][] [ \n    ;print "vendor is trading!"\n    set goods goods - 1\n...',
			codeExample: function() {
				addExampleCode({text:'  while [goods > storage * storage-threshold and any? next-tier-neighbors with [goods < storage]][   \n', insertAtText:'while', replace:true});
				addExampleCode({text:';', insertAtText:'vendor is trading!', instance:1, position:'at', startCh:4, ignoreDuplicate:true});
			},
			fullCode:'breed [ producers producer ]\nbreed [ vendors vendor ]\nglobals [ mean-goods ]\nvendors-own [ goods distance-level ]\nproducers-own [ goods distance-level ]\n\nto setup\n  clear-all\n\n  ask patches [\n    set pcolor black\n  ]\n\n  create-producers 1 [\n    set color red\n    set shape "house"\n    set goods 0\n    set distance-level 0\n  ]\n\n  repeat level[populate]\n  set mean-goods [0 0 0 0 0 0]\n  reset-ticks\nend\n\nto populate\n  ask turtles [\n    let not-occupied neighbors4 with [not any? turtles-here]\n    hatch count not-occupied [\n      set breed vendors\n      set distance-level [distance-level] of myself + 1\n      set color color - 10\n      set shape "person"\n      set goods 0\n      move-to one-of neighbors4 with [not any? turtles-here]\n    ]\n  ]\nend\n\nto go\n  ; main loop of the simulation\n\n  ask turtles [ set label goods ]\n  ask producers [ set goods production-level ]              ; 1. producer produces goods\n  ask producers [ trade ]                                   ; 2. producer distributes goods to the closest markets\n  ask vendors [ trade ]                                              ; 3. markets that have goods trade goods moving them further away from the production site\n  ask vendors with [goods > 0] [ set goods goods - 1 ]   ; 4. some percentage of goods is destroyed in the process\n  iterate-list-of-mean-goods\n  tick\nend\n\nto trade\n  ;print "vendor is trading!"\n  let next-tier-neighbors (vendors-on neighbors4) with [ distance-level = [ distance-level + 1 ] of myself ] ; establish trading partners: turtles on neighbouring patches with a higher distance-level\n  while [goods < storage * storage-threshold and any? next-tier-neighbors with [ goods > storage ]] [ \n    print "vendor is trading!"\n    set goods goods - 1\n    ;if any trading partners\n    ask one-of next-tier-neighbors with [ goods < storage ] [                                              ; trade with one of the trading partners\n      set goods goods + 1\n    ]\n  ]\nend\nto-report calculate-volume [a]\n  ; reporter function used to calculate the mean number of goods at a given distance-level\n  let vendors-tier turtles with [ distance-level = a ]\n  report mean [ goods ] of vendors-tier\nend\n\nto iterate-list-of-mean-goods\n  ; auxilary procedure used to update the current mean number of goods at each distance-level\n  ; results are stored in the list "mean-goods"\n  let i 1\n  while [ i < level ] [                                               ; for each distance-level\n    let goods-at-distance calculate-volume i                           ; calculate the mean number of goods\n    set mean-goods replace-item (i - 1)  mean-goods goods-at-distance   ; store the result in the correct position in the list\n    set i i + 1\n  ]\nend\n',
		},		
		complexAdvanceOn: function() {
			advanceOnRecompile();
		},
	},
	{
		text:'<p>'
		+  'Rerun!'
		+'</p>',
		attachTo:{
			on: 'right',
			element: '.netlogo-display-horizontal',
		},
		complexAdvanceOn: function() {
			advanceOnButtonClick({type:'button', source:'go'});
		},
	},
	{
		text:'<p>'
		+  'Everything seems to be working! Congratulations, you have successfully debugged a faulty code!'
		+'</p>'
		+'<p>'
		+  'Small faults of logic or \'spelling\' mistakes can cause a lot of frustration because they can be difficult to identify. '
		+  'Using monitors and strategically placing <code class="codeABMA">print</code> and <code class="codeABMA">show</code> statements(e.g. '
		+  '<code class="codeABMA">print "reaching code-block X"</code>) at critical places in your code can help you figure out whether commands are being executed as intended.'
		+'</p>'
		+'<p>'
		+  'For this it is essential that you understand the structure and flow of your code, which is one of the reasons why modular code development and pseudocode can be so '
		+  'helpful in combination with these debugging strategies.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return getWidgetElement({type:'view'})},
		},
	},
	{
		text:'<p>'
		+  'Debugging is an unavoidable part of coding, but keeping your code as clear as possible and using smart debugging techniques will get you far.'
		+'</p>'
		+'<p>'
		+  'In this lesson, you:'
		+'</p>'
		+'<ul>'
		+  '<li> have learned some useful debugging techniques</li>'
		+'</ul>' 
		+'<p>'
		+  'For some common syntax errors please check out '
		+  '<a href="https://ccl.northwestern.edu/netlogo/bind/article/common-netlogo-error-messages.html" target="_blank" rel="noopener noreferrer">this page</a> '
		+  'on common NetLogo error messages, some of which you may have come across in previous tutorials.'
		+'</p>'
		+'<p>'
		+  'This is the end of the tutorial! If you would like to continue expanding your NetLogo skills, go to the next tutorial. '
		+  'If, instead, you have grown more curious about the model developement process and all it entails, you can skip ahead to tutorial 5.'
		+'</p>'
	},
 ];
