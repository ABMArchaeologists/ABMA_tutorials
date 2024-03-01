let dynamicLists = [
	{
		text:'<h2>'
		+  'Welcome to Dynamic Lists!'
		+'</h2>'
		+'<p>'
		+  'In this lesson we will be introducing more complex ways of using lists and expanding upon a replication of the Sugarscape model. '
		+  'This lesson is for you if you have basic proficiency in NetLogo (including if-else statements, loops, etc.), especially lists, '
		+  'and would like to practice your skills and learn more complex ways of using lists. '
		+'</p>'
		+'<p>In this lesson, you will: </p>'
		+'<ul>'
		+  '<li>learn additional syntax to make lists more dynamic;</li>'
		+  '<li>practice refactoring code.</li>'
		+'</ul>',
	},
	{
		text: '<p>'
		+  'While our simulation is pretty useful already, you might say that people don\'t wander around collecting one resource. '
		+  'In most cases, people have more requirements, a mental list of what resources they are willing to harvest and in what quantities.'
		+'</p>'
		+'<p>'
		+  'One way of implementing multiple resources would be to use variables, e.g. '
		+  'every patch has a <code class="codeABMA">resourceA</code>, <code class="codeABMA">resourceB</code>, <code class="codeABMA">resourceC</code>, etc. '
		+  'However, what if the number of resources varies throughout the simulation, or we aren\'t sure how many resources we need? '
		+'</p>'
		+'<p>'
		+  'This is where lists come to the rescue! Lists can be any length, with each index representing a value, so they are much more flexible. '
		+'</p>'
	},
	{
		text: '<p>'
		+  'We are going to switch data structures, from simple variables to lists. '
		+  'This means we will have to <b>refactor</b> our code - restructure it so that it can account for the change to list, maintaining as much of the original functionality as possible. '
		+'</p>'	
		+'<p>'
		+  'Start off by adding a new slider to the interface <code class="sliderNamer">num-resources</code>, '
		+  'with a maximum of 10 and default of choice. This slider will control how many resources there are and the length of the lists keeping track of them. '
		+  'When you are ready, open the code tab.'
		+'</p>',
		attachTo:{
			on: 'top',
			element: '.netlogo-display-vertical',
		},
		modalOverlayOpeningPadding:5000,
		complexAdvanceOn: function() {
			advanceOnTabs({tab:'showCode'});  
		},
	},
	{
		text: '<p>'
		+  'Next, we are going to systematically go through the code, replacing all relevant variables. '
		+'</p>'
		+'<p>'
		+  'Let\'s start simple by changing the <code class="codeABMA">make-plain</code> procedure so that patches\' <code class="var">resources</code> variable now stores a list with the size/length <code class="var">num-resources</code>, '
		+  'with in each index the <code class="var">max-plants</code> value. '
		+  'For this, you can use <code class="codeABMA"><a href="https://ccl.northwestern.edu/netlogo/docs/dict/n-values.html" target="_blank" rel="noopener noreferrer">n-values</a></code>'
		+'</p>'
		+'<p>'
		+  'Because <code class="var">resources</code> is now a list, we also need to redefine <code class="var">max-resources</code> as the maximum value in <code class="codeABMA">resources</code>, '
		+  'using <code class="codeABMA"><a href="https://ccl.northwestern.edu/netlogo/docs/dict/max.html" target="_blank" rel="noopener noreferrer">max.</a></code>'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('#netlogo-code-tab')},
		},
		advanceExampleCode: {
			solution:'to make-plain\n  ask patches\n  [\n    set resources n-values num-resources [max-plants]\n    set max-resources max resources\n  ]\nend\n',
			codeExample: function() {
				addExampleCode({text:'    set resources n-values num-resources [max-plants]', insertAtText:'set resources max-plants', replace:true});
				addExampleCode({text:'    set max-resources max resources', insertAtText:'set max-resources resources', replace:true});
			},	
			fullCode:'breed [foragers forager]\nglobals [ ]\npatches-own [ resources max-resources occupation-frequency ]\nforagers-own [ storage ]\n\n\nto setup\n  clear-all\n  ifelse hills? [make-hills][make-plain]\n\n  create-foragers number-foragers [\n    set shape "house"\n    set storage 10\n    set color blue\n    ;setxy random max-pxcor + 1 random max-pycor + 1\n    move-to one-of patches with [not any? foragers-here]\n  ]\n  update-display\n  reset-ticks\nend\n\nto go\n  ask foragers [\n    gather\n    eat\n    move\n    record-occupation\n  ]\n\n  ask patches [\n    regrow-patches\n  ]\n\n ;update-display\n  ;update-display-occupation\n  tick\nend\n\nto gather\n  let current-gather 0\n  ifelse [resources] of patch-here < gather-rate\n  [\n    set current-gather [resources] of patch-here\n  ][\n    set current-gather gather-rate\n  ]\n  ask patch-here [ set resources resources - current-gather ]\n  set storage storage + current-gather\nend\n\nto update-display\n  ;let max-color max [resources] of patches * 2      ; We add * 2 to the max, so that the color is scaled from black-green instead of black-green-white\n  let max-color max-plants * 2\n  ask patches [ set pcolor scale-color green resources 0 max-color ]\n  ask foragers [\n    ifelse storage > 0\n    [\n      set color blue\n    ][\n      set color red\n    ]\n  ]\nend\n\nto eat\n  ifelse storage >= consumption-rate [\n    set storage storage - consumption-rate\n  ][\n    set storage 0\n  ]\nend\n\nto move\n  if [resources] of patch-here < consumption-rate\n  [\n    let p one-of patches with [not any? foragers-here and resources >= consumption-rate]\n    if p != nobody [move-to p]\n  ]\nend\n\nto regrow-patches\n  if resources < max-resources\n  [\n    ;set resources 10\n    set resources resources + growth-rate\n  ]\nend\n\nto make-plain\n  ask patches\n  [\n    set resources max-plants\n    set max-resources resources\n  ]\nend\n\nto make-hills\n  let hills (patch-set patch (max-pxcor * .33) (max-pycor * .33) patch (max-pxcor * .67) (max-pycor * .67))\n  ask patches [\n    let dist distance min-one-of hills [distance myself]\n    set resources max-plants - (distance min-one-of hills [distance myself] / (max-pxcor * .75) * max-plants)\n    set max-resources resources\n  ]\nend\n\nto record-occupation\n  set occupation-frequency occupation-frequency + 1\nend\n\nto update-display-occupation\n  let max-color max [occupation-frequency] of patches\n  ask patches [set pcolor scale-color red occupation-frequency 0 max-color]\n  ask foragers [set hidden? true]\nend\n\n',
		},
		complexAdvanceOn: function() {
			advanceOnRecompile();
		},	
	},
	{
		text:'<p>'
		+  'Now, let\'s change the <code class="codeABMA">make-hills</code> procedure. To keep things as simple as possible every resource will follow the same \'hill\' pattern.'
		+'</p>'
		+'<p>'
		+  'Similarly as in <code class="codeABMA">make-hills</code>, we are going to redefine resources as a list with length <code class="var">num-resources</code>. '
		+  'This time, use <code class="codeABMA">[round max-plants - (distance min-one-of hills [distance myself] / (max-pxcor * .75) * max-plants)]</code>- as the value for each index.'
		+'</p>'
		+'<p>'
		+  'Set the <code class="var">max-resources</code> value as the maximum value in <code class="var">resources</code>, same as in <code class="codeABMA">make-plain</code>'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('#netlogo-code-tab')},
		},
		advanceExampleCode: {
			solution:'to make-hills\n  let hills (patch-set patch (max-pxcor * .33) (max-pycor * .33) patch (max-pxcor * .67) (max-pycor * .67))\n  ask patches [\n    let dist distance min-one-of hills [distance myself]\n    set resources n-values num-resources [round (max-plants - (dist / (max-pxcor * .75) * max-plants))]\n    set max-resources max resources\n  ]\nend\n\n',
			codeExample: function() {
				addExampleCode({text:'    set resources n-values num-resources [round (max-plants - (dist / (max-pxcor * .75) * max-plants))]      ', insertAtText:'set resources max-plants', replace:true});
				addExampleCode({text:'    set max-resources max resources', insertAtText:'set max-resources resources', replace:true, ignoreDuplicate:true});
			},
			fullCode:'breed [foragers forager]\nglobals [ ]\npatches-own [ resources max-resources occupation-frequency ]\nforagers-own [ storage ]\n\n\nto setup\n  clear-all\n  ifelse hills? [make-hills][make-plain]\n\n  create-foragers number-foragers [\n    set shape "house"\n    set storage 10\n    set color blue\n    ;setxy random max-pxcor + 1 random max-pycor + 1\n    move-to one-of patches with [not any? foragers-here]\n  ]\n  update-display\n  reset-ticks\nend\n\nto go\n  ask foragers [\n    gather\n    eat\n    move\n    record-occupation\n  ]\n\n  ask patches [\n    regrow-patches\n  ]\n\n ;update-display\n  ;update-display-occupation\n  tick\nend\n\nto gather\n  let current-gather 0\n  ifelse [resources] of patch-here < gather-rate\n  [\n    set current-gather [resources] of patch-here\n  ][\n    set current-gather gather-rate\n  ]\n  ask patch-here [ set resources resources - current-gather ]\n  set storage storage + current-gather\nend\n\nto update-display\n  ;let max-color max [resources] of patches * 2      ; We add * 2 to the max, so that the color is scaled from black-green instead of black-green-white\n  let max-color max-plants * 2\n  ask patches [ set pcolor scale-color green resources 0 max-color ]\n  ask foragers [\n    ifelse storage > 0\n    [\n      set color blue\n    ][\n      set color red\n    ]\n  ]\nend\n\nto eat\n  ifelse storage >= consumption-rate [\n    set storage storage - consumption-rate\n  ][\n    set storage 0\n  ]\nend\n\nto move\n  if [resources] of patch-here < consumption-rate\n  [\n    let p one-of patches with [not any? foragers-here and resources >= consumption-rate]\n    if p != nobody [move-to p]\n  ]\nend\n\nto regrow-patches\n  if resources < max-resources\n  [\n    ;set resources 10\n    set resources resources + growth-rate\n  ]\nend\n\nto make-plain\n  ask patches\n  [\n    set resources n-values num-resources [max-plants]\n    set max-resources max resources\n  ]\nend\n\nto make-hills\n  let hills (patch-set patch (max-pxcor * .33) (max-pycor * .33) patch (max-pxcor * .67) (max-pycor * .67))\n  ask patches [\n    let dist distance min-one-of hills [distance myself]\n    set resources max-plants - (distance min-one-of hills [distance myself] / (max-pxcor * .75) * max-plants)\n    set max-resources resources\n  ]\nend\n\nto record-occupation\n  set occupation-frequency occupation-frequency + 1\nend\n\nto update-display-occupation\n  let max-color max [occupation-frequency] of patches\n  ask patches [set pcolor scale-color red occupation-frequency 0 max-color]\n  ask foragers [set hidden? true]\nend\n\n\n',
		},
		complexAdvanceOn: function() {
			advanceOnRecompile();
		},	
	},
	{
		text:'<p>'
		+  'Setup your model with both <code class="sliderName">hills?</code> options. Note if the background changes if you check hills? or not, it may not, then move to the next step.'
		+'</p>',
		attachTo:{
			on: 'top',
			element: '.netlogo-model',
		},
	},
	{
		text:'<p>'
		+  'Hmm, both options give a black landscape... However, if you ask patches to show their resources through the command center, '
		+  'you should see that the resource lists have been initialized properly. Try it!'
		+'</p>'
		+'<details>'
		+  '<summary>HINT</summary>' 
		+'  Type <code class="codeABMA">ask patches [show resources] </code> in the command center and press enter.'
		+'</details>'
		+'<p>'
		+  'The problem lies with the visualization: let\'s change the update-display procedure so that it takes into account the list format.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: '.netlogo-tab-area',
		},
	},
	{
		text: '<p>'
		+  'In the <code class="codeABMA">update-display</code> procedure, first change <code class="var">max-color</code> so that the number is multiplied by <code class="var">num-resources</code>'
		+'</p>'
		+'<p>'
		+  'Then, change <code class="var">pcolor</code> of patches so that it is scaled to the '
		+  '<a href="https://ccl.northwestern.edu/netlogo/docs/dict/sum.html" target="_blank" rel="noopener noreferrer">sum </a>of resources.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('#netlogo-code-tab')},
		},
		advanceExampleCode: {
			solution:'to update-display\n  ;let max-color max [resources] of patches * 2\n  let max-color max-plants * 2 * num-resources\n  ask patches [ set pcolor scale-color green sum resources 0 max-color ]\n  ask foragers [\n    ifelse storage > 0\n    [\n      set color blue\n    ][\n      set color red\n    ]\n  ]\nend\n',
			codeExample: function() {
				addExampleCode({text:' * num-resources', insertAtText:'let max-color', position:'at', instance:1, startCh:30});
				addExampleCode({text:'  ask patches [ set pcolor scale-color green sum resources 0 max-color ]', insertAtText:'set pcolor scale-color', replace:true});
			},
			fullCode:'breed [foragers forager]\nglobals [ ]\npatches-own [ resources max-resources occupation-frequency ]\nforagers-own [ storage ]\n\n\nto setup\n  ca\n\n  ifelse hills? [make-hills][make-plain]\n\n  create-foragers number-foragers [\n    set shape "house"\n    set storage 10\n    set color blue\n    ;setxy random max-pxcor + 1 random max-pycor + 1\n    move-to one-of patches with [not any? foragers-here]\n  ]\n  update-display\n  reset-ticks\nend\n\nto go\n  ask foragers [\n    gather\n    eat\n    move\n    record-occupation\n  ]\n\n  ask patches [\n    regrow-patches\n  ]\n\n ;update-display\n  ;update-display-occupation\n  tick\nend\n\nto gather\n  let current-gather 0\n  ifelse [resources] of patch-here < gather-rate\n  [\n    set current-gather [resources] of patch-here\n  ][\n    set current-gather gather-rate\n  ]\n  ask patch-here [ set resources resources - current-gather ]\n  set storage storage + current-gather\nend\n\nto update-display\n  ;let max-color max [resources] of patches * 2      ; We add * 2 to the max, so that the color is scaled from black-green instead of black-green-white\n  let max-color max-plants * 2\n  ask patches [ set pcolor scale-color green resources 0 max-color ]\n  ask foragers [\n    ifelse storage > 0\n    [\n      set color blue\n    ][\n      set color red\n    ]\n  ]\nend\n\nto eat\n  ifelse storage >= consumption-rate [\n    set storage storage - consumption-rate\n  ][\n    set storage 0\n  ]\nend\n\nto move\n  if [resources] of patch-here < consumption-rate\n  [\n    let p one-of patches with [not any? foragers-here and resources >= consumption-rate]\n    if p != nobody [move-to p]\n  ]\nend\n\nto regrow-patches\n  if resources < max-resources\n  [\n    ;set resources 10\n    set resources resources + growth-rate\n  ]\nend\n\nto make-plain\n  ask patches\n  [\n    set resources n-values num-resources [max-plants]\n    set max-resources max resources\n  ]\nend\n\nto make-hills\n  let hills (patch-set patch (max-pxcor * .33) (max-pycor * .33) patch (max-pxcor * .67) (max-pycor * .67))\n  ask patches [\n    let dist distance min-one-of hills [distance myself]\n    set resources n-values num-resources [round (max-plants - (dist / (max-pxcor * .75) * max-plants))]      \n    set max-resources max resources\n  ]\nend\n\nto record-occupation\n  set occupation-frequency occupation-frequency + 1\nend\n\nto update-display-occupation\n  let max-color max [occupation-frequency] of patches\n  ask patches [set pcolor scale-color red occupation-frequency 0 max-color]\n  ask foragers [set hidden? true]\nend\n\n',
		},
		complexAdvanceOn: function() {
			advanceOnRecompile();
		},	
	},
	{
		text:'<p>'
		+  'Try setting up your model again with <code class="sliderName">hills?</code> turned on.'
		+'</p>',
		attachTo:{
			on: 'right',
			element: '.netlogo-display-vertical',
		},
		complexAdvanceOn: function() {
			advanceOnButtonClick({type:'button', source:'setup'}); 
		},
	},
	{
		text:'<p>'
		+  'Looks good!'
		+'</p>'
		+'<p>'
		+  'However, if you now try to run the model, it wil give you an error. Go on, try it!'
		+'</p>',
		attachTo:{
			on: 'right',
			element: ()=>{return getWidgetElement({type:'button', source:'go'})},
		},
		complexAdvanceOn: function() {
			advanceOnAlert();
		},
		alertTrue:true,
	},
	{
		text:'<p>'
		+  'The first error appears for the <code class="codeABMA">gather</code> procedure because this is the first action foragers perform, '
		+  'but <code class="codeABMA">gather</code>,  <code class="codeABMA">move</code> and  <code class="codeABMA">eat</code> will all have to be updated for the refactoring to lists. '
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
		+  'Change the  <code class="codeABMA">gather</code> procedure so that it looks like this:'
		+'</p>'
		+'<pre class = codeblockABMA>'
		+  'to gather\n'
		+  ' let current-gather 0\n'
		+  ' ifelse max [ resources ] of patch-here < gather-rate\n'
		+  ' [\n'
		+  '  set current-gather max [resources] of patch-here\n'
		+  '  let i position current-gather [resources] of patch-here\n'
		+  '  ask patch-here [ set resources replace-item i resources 0 ]\n'
		+  '	][\n'
		+  '  let resources-available map [ x -> x >= gather-rate ] resources\n'
		+  '  let i position true resources-available\n'
		+  '  set current-gather gather-rate\n'
		+  '  ask patch-here [ set resources replace-item i resources (item i resources - current-gather) ]\n'
		+  '	]\n'
		+  '  set storage storage + current-gather\n'
		+  'end'
		+'</pre>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('#netlogo-code-tab')},
		},
		advanceExampleCode: {
			solution:'to gather\n  let current-gather 0\n  ifelse max [ resources ] of patch-here < gather-rate\n  [\n    set current-gather max [resources] of patch-here\n    let i position current-gather [resources] of patch-here\n    ask patch-here [ set resources replace-item i resources 0 ]\n  ][\n    let resources-available map [ x -> x >= gather-rate ] resources\n    let i position true resources-available\n    set current-gather gather-rate\n    ask patch-here [ set resources replace-item i resources (item i resources - current-gather) ]\n  ] \n  set storage storage + current-gather\nend\n',
			codeExample: function() {
				addExampleCode({text:'\n\n\n\n', insertAtText:'patch-here < gather-rate', position:'after'}); //add some spaces for the replace
				addExampleCode({text:'  ifelse max [ resources ] of patch-here < gather-rate\n  [\n    set current-gather max [resources] of patch-here\n    let i position current-gather [resources] of patch-here\n    ask patch-here [ set resources replace-item i resources 0 ]\n  ][\n    let resources-available map [ x -> x >= gather-rate ] resources\n    let i position true resources-available\n    set current-gather gather-rate\n    ask patch-here [ set resources replace-item i resources (item i resources - current-gather) ]\n  ]                                                                 \n', insertAtText:'patch-here < gather-rate', replace:true});
			},
			fullCode:'breed [foragers forager]\nglobals [ ]\npatches-own [ resources max-resources occupation-frequency ]\nforagers-own [ storage ]\n\n\nto setup\n  clear-all\n  ifelse hills? [make-hills][make-plain]\n  create-foragers number-foragers [\n    set shape "house"\n    set storage 10\n    set color blue\n    ;setxy random max-pxcor + 1 random max-pycor + 1\n    move-to one-of patches with [not any? foragers-here]\n  ]\n  update-display\n  reset-ticks\nend\n\nto go\n  ask foragers [\n    gather\n    eat\n    move\n    record-occupation\n  ]\n\n  ask patches [\n    regrow-patches\n  ]\n\n ;update-display\n  ;update-display-occupation\n  tick\nend\n\nto gather\n  let current-gather 0\n  ifelse [resources] of patch-here < gather-rate\n  [\n    set current-gather [resources] of patch-here\n  ][\n    set current-gather gather-rate\n  ]\n  ask patch-here [ set resources resources - current-gather ]\n  set storage storage + current-gather\nend\n\nto update-display\n  ;let max-color max [resources] of patches * 2      ; We add * 2 to the max, so that the color is scaled from black-green instead of black-green-white\n  let max-color max-plants * 2 * num-resources\n  ask patches [ set pcolor scale-color green sum resources 0 max-color ]\n  ask foragers [\n    ifelse storage > 0\n    [\n      set color blue\n    ][\n      set color red\n    ]\n  ]\nend\n\nto eat\n  ifelse storage >= consumption-rate [\n    set storage storage - consumption-rate\n  ][\n    set storage 0\n  ]\nend\n\nto move\n  if [resources] of patch-here < consumption-rate\n  [\n    let p one-of patches with [not any? foragers-here and resources >= consumption-rate]\n    if p != nobody [move-to p]\n  ]\nend\n\nto regrow-patches\n  if resources < max-resources\n  [\n    ;set resources 10\n    set resources resources + growth-rate\n  ]\nend\n\nto make-plain\n  ask patches\n  [\n    set resources n-values num-resources [max-plants]\n    set max-resources max resources\n  ]\nend\n\nto make-hills\n  let hills (patch-set patch (max-pxcor * .33) (max-pycor * .33) patch (max-pxcor * .67) (max-pycor * .67))\n  ask patches [\n    let dist distance min-one-of hills [distance myself]\n    set resources n-values num-resources [round (max-plants - (dist / (max-pxcor * .75) * max-plants))]      \n    set max-resources max resources\n  ]\nend\n\nto record-occupation\n  set occupation-frequency occupation-frequency + 1\nend\n\nto update-display-occupation\n  let max-color max [occupation-frequency] of patches\n  ask patches [set pcolor scale-color red occupation-frequency 0 max-color]\n  ask foragers [set hidden? true]\nend\n\n',
		},
		complexAdvanceOn: function() {
			advanceOnRecompile();
		},	
	},
	{
		text: '<p>'
		+  'We\'ve rewritten gather so that different resources, but only one resource at a time, can be gathered.  Let\'s go over the changes a little bit. '
		+'</p>'
		+'<p>'
		+  'Firstly, let\'s look at the ifelse statement. If the <code class="var">gather-rate</code> is more than the maximum value in the <code class="var">resources</code> list, '
		+  'the foragers will gather this maximum in the list.'
		+'</p>'
		+'<p>'
		+  'If the <code class="var">gather-rate</code> is less than the maximum in the resource list, '
		+  'the foragers will gather one of the resources whose amount exceeds the <code class="var">gather-rate</code>.'
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
				highlightLines({searchTerm:'ifelse max [ resources ] of patch-here < gather-rate', additionalLines:10});				//add the highlight element
			})
		},
	},
	{
		text: '<p>'
		+  'If the condition is true, the amount gathered (<code class="var">current-gather</code>) is set to the maximum value in the resources list. '
		+'</p>'
		+'<p>'
		+  'Then, to correctly update the patch\'s <code class="var">resources</code> list, we use <code class="codeABMA">position</code> to define a local variable <code class="newvar">i</code>, ' 
		+  'which returns the position (the index) of a number in a list (note that this will always be the first occurrence of the maximum), in this case, the maximum in resources. '
		+'</p>'
		+'<p>'
		+  'Lastly, we use <code class="var">i</code> to ask the patch to redefine <code class="var">resources</code> with resource with <code class="codeABM">item i</code> replaced with 0. '
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
				highlightLines({searchTerm:'ifelse max [ resources ] of patch-here < gather-rate', additionalLines:10});				//add the highlight element
			})
		},
	},
	{
		text:'<p>'
		+  'If the condition is false, first we will make a new list <code class="newvar">resources-available</code> using '
		+  '<code class="codeABMA"><a href="https://ccl.northwestern.edu/netlogo/docs/dict/map.html" target="_blank" rel="noopener noreferrer">map</a></code> and an '
		+  '<a href="http://ccl.northwestern.edu/netlogo/docs/programming.html#anonymous-procedures" target="_blank" rel="noopener noreferrer">anonymous procedure</a> with <code class="codeABMA">-></code>. '
		+'</p>'
		+'<p>'
		+  '<code class="codeABMA">Map</code> can be a bit hard to wrap your head around, but basically, it runs the reporter for every item in the list. So in this case for every list item, x, '
		+  'it checks whether x is higher than and/or equal to <code class="var">gather-rate</code>, and puts the answer in a new list <code class="newvar">resources-available</code>. '
		+'</p>'
		+'<p>'
		+  'For example, if a patch\' <code class="var">resources</code> is <code class="codeABMA">[5 2 3 4 4 7]</code> and <code class="var">gather-rate</code> is 5, '
		+  '<code class="var">resources-available</code> will be defined as <code class="codeABMA">[true false false false false true]</code>'
		+'</p>'
		+'<p>'
		+  'Then, <code class="codeABMA">position</code> is used to find the index of the first item that is higher or the same as the <code class="var">gather-rate</code>. '
		+'</p>'
		+'<p>'
		+  'The amount to be gathered (<code class="var">current-gather</code>) is set to the <code class="var">gather-rate</code>. '
		+  'Then patches redefine <code class="var">resources</code> to where <code class="var">current-gather</code> is subtracted from the right item in the list, <code class="var">i</code>. '
		+'</p>'
		+'<p>'
		+  'So taking our previous list <code class="codeABMA">[5 2 3 4 4 7]</code> and <code class="var">gather-rate</code> 5, <code class="var">i</code> would be 0, and the patch\' '
		+  '<code class="var">resources</code> would be changed to <code class="codeABMA">[0 2 3 4 4 7]</code>'
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
				highlightLines({searchTerm:'ifelse max [ resources ] of patch-here < gather-rate', additionalLines:10});				//add the highlight element
			})
		},
	},
	{
		text:'<p>'
		+  'Rerun your model to see whether <code class="codeABMA">gather</code> now works, and to check where the next error should be. '
		+'</p>',
		attachTo:{
			on: 'right',
			element: '.netlogo-display-vertical',
		},
		complexAdvanceOn: function() {
			advanceOnAlert();
		},
		alertTrue:true,
	},
	{
		text:'<p>'
		+  'The next error is for the move procedure.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('#alert-dialog')},
		},
		complexAdvanceOn: function() {
			advanceOnAlert();
			checkCodeTabOpen();
		},
		alertTrue:true,
	},
	{
		text:'<p>'
		+  'This error will be much easier to fix. Can you figure out how? Change the code and recompile.'
		+'</p>'
		+'<details>'
		+  '<summary>HINT</summary>' 
		+  '<pre class = codeblockABMA>'
		+    'Remember, resources is now a list! Something like <code class="codeABMA">if [resources] of patch-here < consumption-rate</code> would therefore not work, '
		+    'because resources is not a single number. How did we fix this in make-plain? \n'
		+  '</pre>'
		+'</details>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('#netlogo-code-tab')},
		},
		advanceExampleCode: {
			solution:'to move\n  if [max resources] of patch-here < consumption-rate\n  [\n    let p one-of patches with [not any? foragers-here and max resources >= consumption-rate]\n    if p != nobody [move-to p]\n  ]\nend\n',
			codeExample: function() {
				addExampleCode({text:'max ', insertAtText:'of patch-here < consumption-rate', position:'at', startCh:6, ignoreDuplicate:true,});
				addExampleCode({text:'max ', insertAtText:'foragers-here and resources >= consumption-rate', position:'at', startCh:58, ignoreDuplicate:true,});
			},
			fullCode:'breed [foragers forager]\nglobals [ ]\npatches-own [ resources max-resources occupation-frequency ]\nforagers-own [ storage ]\n\n\nto setup\n  clear-all\n  ifelse hills? [make-hills][make-plain]\n  create-foragers number-foragers [\n    set shape "house"\n    set storage 10\n    set color blue\n    ;setxy random max-pxcor + 1 random max-pycor + 1\n    move-to one-of patches with [not any? foragers-here]\n  ]\n  update-display\n  reset-ticks\nend\n\nto go\n  ask foragers [\n    gather\n    eat\n    move\n    record-occupation\n  ]\n\n  ask patches [\n    regrow-patches\n  ]\n\n ;update-display\n  ;update-display-occupation\n  tick\nend\n\nto gather\n  let current-gather 0\n  ifelse max [ resources ] of patch-here < gather-rate\n  [\n    set current-gather max [resources] of patch-here\n    let i position current-gather [resources] of patch-here\n    ask patch-here [ set resources replace-item i resources 0 ]\n  ][\n    let resources-available map [ x -> x >= gather-rate ] resources\n    let i position true resources-available\n    set current-gather gather-rate\n    ask patch-here [ set resources replace-item i resources (item i resources - current-gather) ]\n  ]                                                                 \n  set storage storage + current-gather\nend\n\nto update-display\n  ;let max-color max [resources] of patches * 2      ; We add * 2 to the max, so that the color is scaled from black-green instead of black-green-white\n  let max-color max-plants * 2 * num-resources\n  ask patches [ set pcolor scale-color green sum resources 0 max-color ]\n  ask foragers [\n    ifelse storage > 0\n    [\n      set color blue\n    ][\n      set color red\n    ]\n  ]\nend\n\nto eat\n  ifelse storage >= consumption-rate [\n    set storage storage - consumption-rate\n  ][\n    set storage 0\n  ]\nend\n\nto move\n  if [resources] of patch-here < consumption-rate\n  [\n    let p one-of patches with [not any? foragers-here and resources >= consumption-rate]\n    if p != nobody [move-to p]\n  ]\nend\n\nto regrow-patches\n  if resources < max-resources\n  [\n    ;set resources 10\n    set resources resources + growth-rate\n  ]\nend\n\nto make-plain\n  ask patches\n  [\n    set resources n-values num-resources [max-plants]\n    set max-resources max resources\n  ]\nend\n\nto make-hills\n  let hills (patch-set patch (max-pxcor * .33) (max-pycor * .33) patch (max-pxcor * .67) (max-pycor * .67))\n  ask patches [\n    let dist distance min-one-of hills [distance myself]\n    set resources n-values num-resources [round (max-plants - (dist / (max-pxcor * .75) * max-plants))]      \n    set max-resources max resources\n  ]\nend\n\nto record-occupation\n  set occupation-frequency occupation-frequency + 1\nend\n\nto update-display-occupation\n  let max-color max [occupation-frequency] of patches\n  ask patches [set pcolor scale-color red occupation-frequency 0 max-color]\n  ask foragers [set hidden? true]\nend\n\n',
		},
		complexAdvanceOn: function() {
			advanceOnRecompile();
		},	
	},
	{
		text:'<p>'
		+  'The last procedure we need to fix is <code class="codeABMA">regrow-patches</code>.'
		+'</p>'
		+'<p>'
		+  'We\'ll use <code class="codeABMA">map</code> again, this time increase every value in the <code class="var">resources</code> list lower than <code class="var">max-plants</code> '
		+  'with <code class="var">growth-rate</code>.'
		+'</p>'
		+'<p>'
		+  'Replace the procedure with:' 
		+'</p>'
		+'<pre class = codeblockABMA>'
		+  'to regrow-patches\n'
		+  '  set resources map [\n    x -> ifelse-value (x < max-resources) [x + growth-rate] [x]\n  ]\n  resources\n'
		+  'end\n'
		+'</pre>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('#netlogo-code-tab')},
		},
		complexAdvanceOn: function() {
			advanceOnRecompile();
		},	
	},
	{
		text:'<p>'
		+  'Here, <code class="codeABMA">map</code> and  <code class="codeABMA">ifelse</code> is used to create a list where if x is lower than the patch\' <code class="var">max-resources</code>, '
		+  'it is replaced by <code class="codeABMA">x + growth-rate</code>. If not, it stays the same, <code class="codeABMA">x</code>.'
		+'</p>'
		+'<p>'
		+  'The patch\' resources value is then redefined to this list.'
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
				highlightLines({searchTerm:'to regrow-patches', additionalLines:5});				//add the highlight element
			})
		},
	},
	{
		text:'<p>'
		+  'Try rerunning your model to check if everything works. Try running the model a couple of times, comparing what happens when you increase or decrease the number of resources.'
		+'</p>',
		attachTo:{
			on: 'top',
			element: '.netlogo-model',
		},
	},
	{
		text:'<p>'
		+  'Congratulations! You have successfully refactored your code to dynamically use lists!'
		+'</p>'
		+'<p>'
		+  'Lists are very flexible in combination with functions such as map and are thus often used in more complex models.'
		+'</p>'
		+'<p>'
		+  'Another common command used for complex list use is <a href="https://ccl.northwestern.edu/netlogo/docs/dict/foreach.html" target="_blank" rel="noopener noreferrer">foreach</a>, '
		+  'which can also be used with the anonymous procedure <code class="codeABMA">-></code>.'
		+'</p>'
		+'<p>'
		+  'While  <code class="codeABMA">map</code> is structured as a reporter - it returns values -  <code class="codeABMA">foreach</code> is more useful for executing commands. '
		+  'So, for example, in the gather procedure:'
		+'</p>'
		+'<pre class = codeblockABMA>'
		+  'let resources-available map [ x -> x >= gather-rate ] resources'
		+'</pre>'
		+'<p>'
		+  'could be rewritten as:'
		+'</p>'
		+'<pre class = codeblockABMA>'
		+  'let resources_available []\n'
		+  'foreach resources [ x -> set resources_available lput (x >= gather-rate) resources_available]\n'
		+  'report resources_available\n'
		+'</pre>'
		+'<p>'
		+  'Instead of returning a value as with  <code class="codeABMA">map</code>,  <code class="codeABMA">foreach</code> is used to perform an action - set in combination with lput. '
		+  'In this case, the  <code class="codeABMA">foreach</code> method is a bit more convoluted, but in some cases, it may be more useful and concise, '
		+  'for example when directly asking turtles to act based on a list.'
		+'</p>',
	},
	{
		text: '<p>'
		+  'Mastering smarter and more flexible ways of using lists, especially with anonymous procedures, will be incredibly useful when building more complex models.'
		+'</p>'
		+'<p>'
		+  'By completing this tutorial, you have:'
		+'</p>'
		+'<ul>'
		+  '<li>learned additional syntax to make lists more dynamic;</li>'
		+  '<li>practiced refactoring code. </li>'
		+'</ul>'
		+'<p>'
		+  'Going over all list operations is beyond the scope of this lesson, '
		+  'but if you would like to learn more, please check out the <a href="http://ccl.northwestern.edu/netlogo/docs/programming.html#anonymous-procedures" target="_blank" rel="noopener noreferrer">Anonymous procedures section</a> '
		+  'in the NetLogo Dictionary.'
		+'</p>',
	},
	
 ];
