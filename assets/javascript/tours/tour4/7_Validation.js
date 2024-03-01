let validation = [
	{
		text:'<h2>'
		+  'Welcome to Simulation as a Scientific Experiment'
		+'</h2>'
		+'<p>'
		+  'In this lesson, we will be expanding upon a replication of the Sugarscape model to learn about validation and simulation.'
		+'<p>'
		+'<p>'
		+  'In this lesson, you will learn:'
		+'</p>'
		+'<ul>'
		+  '<li>about validation;</li>'
		+  '<li>how to design a good experiment;</li>'
		+  '<li>how to add output measures to compare simulation results with the archeological record.</li>'
		+'</ul>',
	},
	{
		text:'<p>'
		+  'Now that we\'ve created a couple of ways to measure output, let\'s build and run some experiments.'
		+'</p>'
		+'<p>'
		+  'We want to conduct a rigorous experiment and that means parameter values remain the same throughout the full span of a run (no wiggling of sliders as the simulation is running!). '
		+  'Parameter values are tested across reasonably wide ranges and never cherry-picked. '
		+  'If the model contains random elements, then each run needs to be repeated and a mean of the measure taken from these runs.'
		+'</p>',
	},
	{
		text:'<p>'
		+  'First set up the model with the values given below: '
		+  '<pre class = codeblockABMA>'
		+    '<b>Experiment 1</b>\n'
		+    'number-foragers: 10\n'
		+    'gather-rate: 3\n'
		+    'consumption-rate: 2\n'
		+    'growth-rate: 1\n'
		+    'max-plants: 10\n'
		+    'hills?: On Off\n'
		+  '</pre>'
		+  'You might have noticed that hills? has two values: On and Off. '
		+  'This means that you\'ll have to run the model first with  <code class="sliderName">hills?</code> On and then once more with  <code class="sliderName">hills?</code> Off. '
		+  'When you are ready, open the code tab.'
		+'</p>',
		attachTo:{
			on: 'top',
			element: '.netlogo-model',
		},
		complexAdvanceOn: function() {
			advanceOnTabs({tab:'showCode'});  
		},	
	},
	{
		text:'<p>'
		+  'We want to run each scenario for 1000 ticks. To do this, add a new line of code to the end of the go procedure: <code class="codeABMA"> if ticks = 1000 [ stop ]</code>'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('#netlogo-code-tab')},
		},	
		advanceExampleCode: {
			solution:'to go\n  if ticks = 1000 [ stop ]\n  ask foragers [\n    gather\n    eat\n    move\n  ]\n  \n  ask patches [\n    regrow-patches\n  ]\n  update-display\n  tick\nend\n\n',
			codeExample: function() {
				addExampleCode({text:'  if ticks = 1000 [ stop ]\n', insertAtText:'to go'});
			},		
			fullCode:'breed [foragers forager]\npatches-own [ resources max-resources]\nforagers-own [ storage ]\n\n\nto setup\n  clear-all\n  create-foragers number-foragers [\n    set shape "house"\n    set storage 0\n    move-to one-of patches with [not any? foragers-here]\n  ]\n  ;ask patches [\n  ;  set pcolor green\n  ;  set resources 10\n  ;]\n  ifelse hills?[make-hills][make-plain]\n  update-display\n  reset-ticks\nend\n\nto go\n  ask foragers [\n    gather\n    eat\n    move\n  ]\n  \n  ask patches [\n    regrow-patches\n  ]\n  update-display\n  tick\nend\n\nto gather\n  let current-gather 0\n  ifelse [resources] of patch-here < gather-rate\n  [\n    set current-gather [resources] of patch-here\n  ][\n    set current-gather gather-rate\n  ]\n  ask patch-here [ set resources resources - current-gather ]\n  set storage storage + current-gather\nend\n\nto update-display\n  let max-color max [resources] of patches * 2     \n  ask patches [ set pcolor scale-color green resources 0 max-color ]\n  ask foragers [\n    ifelse storage > 0\n    [\n      set color blue\n    ][\n      set color red\n    ]\n  ]\nend\n\nto eat\n  ifelse storage >= consumption-rate [\n    set storage storage - consumption-rate\n  ][\n    set storage 0\n  ]\nend\n\nto move\n  if [resources] of patch-here < consumption-rate\n  [\n    let p one-of patches with [not any? foragers-here and resources >= consumption-rate]\n    if p != nobody [move-to p]\n  ]\nend\n\nto regrow-patches\n  if resources < max-resources[\n    set resources resources + growth-rate\n  ]\nend\n\nto make-hills\n  let hills (patch-set patch (max-pxcor * 0.33)(max-pycor * 0.33) patch (max-pxcor * 0.67)(max-pycor * 0.67))\n  ask patches [\n    let dist distance min-one-of hills [distance myself]\n    set max-resources max-plants - (dist / (max-pxcor * 0.75) * max-plants)\n    set resources max-resources \n  ]\nend\n\nto make-plain\n  ask patches [\n    set max-resources max-plants\n    set resources max-plants\n  ]\nend\n',
		},
		complexAdvanceOn: function() {
			advanceOnRecompile();
		},
	},
	{
		text:'<p>'
		+  'Run each scenario (with <code class="sliderName">hills?</code> on and off) ten times, noting down the mean and standard deviation value at the end of each run.'
		+'</p>'
		+'<p>'
		+  'What are your findings?'
		+'</p>',
		attachTo:{
			on: 'top',
			element: '.netlogo-model',
		},	
	},
	{
		text:'<p>'
		+  'Congratulations on running your first NetLogo experiment!'
		+'</p>'
		+'<p>'
		+  'The experiment taught us something about the abstract sugarscape model - the hills do not make a lot of difference in the mean amount of sugar turtles have but the distribution '
		+  'of it is rather different compared to the plain. In the hills scenario, some turtles have more sugar than others as indicated by the standard deviation, '
		+  'whereas in the plain scenario, they all have exactly the same.'
		+'</p>'
	},
	{
		text:'<p>'
		+  'This is a nice result but has it told us anything about the past? If we study an ancient group we wouldn\'t know how much each person had in their \'storage\' - '
		+  'that information is not preserved in the archaeological record.'
		+'</p>'
		+'<p>'
		+  'In other words, it is difficult to validate our model. '
		+  'Validation relates to figuring out whether your model, your representation of choice, is \'right\', which involves comparing model outputs to empirical data. '
		+'</p>'
		+'<p>'
		+  'We almost always have the spatial distribution of archaeological finds. Let\'s use it!'
		+'</p>'
	},
	{
		text:'<p>'
		+  'Let\'s change the model slightly so that at the end of the experiment, we have an artificial record of occupation which can more easily be compared against the archaeological record.'
		+'</p>'
		+'<p>'
		+  'Each patch will keep track of how often (how many ticks) it is occupied.'
		+'</p>',
		attachTo:{
			on: 'top',
			element: '.netlogo-model',
		},		
	},
	{
		text:'<p>'
		+  'Start off by giving patches a new variable <code class="newvar">occupation-frequency</code>.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('#netlogo-code-tab')},
		},
		advanceExampleCode: {
			solution:'breed [foragers forager]\npatches-own [ resources occupation-frequency max-resources]\nforagers-own [ storage ]\n\n',
			codeExample: function() {
				addExampleCode({text:'occupation-frequency ', insertAtText:'patches-own', position:'at', startCh:24});
			},			
			fullCode:'breed [foragers forager]\npatches-own [ resources max-resources]\nforagers-own [ storage ]\n\n\nto setup\n  clear-all\n  create-foragers number-foragers [\n    set shape "house"\n    set storage 0\n    move-to one-of patches with [not any? foragers-here]\n  ]\n  ;ask patches [\n  ;  set pcolor green\n  ;  set resources 10\n  ;]\n  ifelse hills?[make-hills][make-plain]\n  update-display\n  reset-ticks\nend\n\nto go\n  if ticks = 1000 [ stop ]\n  ask foragers [\n    gather\n    eat\n    move\n  ]\n  \n  ask patches [\n    regrow-patches\n  ]\n  update-display\n  tick\nend\n\nto gather\n  let current-gather 0\n  ifelse [resources] of patch-here < gather-rate\n  [\n    set current-gather [resources] of patch-here\n  ][\n    set current-gather gather-rate\n  ]\n  ask patch-here [ set resources resources - current-gather ]\n  set storage storage + current-gather\nend\n\nto update-display\n  let max-color max [resources] of patches * 2     \n  ask patches [ set pcolor scale-color green resources 0 max-color ]\n  ask foragers [\n    ifelse storage > 0\n    [\n      set color blue\n    ][\n      set color red\n    ]\n  ]\nend\n\nto eat\n  ifelse storage >= consumption-rate [\n    set storage storage - consumption-rate\n  ][\n    set storage 0\n  ]\nend\n\nto move\n  if [resources] of patch-here < consumption-rate\n  [\n    let p one-of patches with [not any? foragers-here and resources >= consumption-rate]\n    if p != nobody [move-to p]\n  ]\nend\n\nto regrow-patches\n  if resources < max-resources[\n    set resources resources + growth-rate\n  ]\nend\n\nto make-hills\n  let hills (patch-set patch (max-pxcor * 0.33)(max-pycor * 0.33) patch (max-pxcor * 0.67)(max-pycor * 0.67))\n  ask patches [\n    let dist distance min-one-of hills [distance myself]\n    set max-resources max-plants - (dist / (max-pxcor * 0.75) * max-plants)\n    set resources max-resources \n  ]\nend\n\nto make-plain\n  ask patches [\n    set max-resources max-plants\n    set resources max-plants\n  ]\nend\n\n',
		},
		complexAdvanceOn: function() {
			advanceOnRecompile();
		},	
	},
	{
		text:'<p>'
		+  'Create a new procedure <code class="codeABMA">record-occupation</code>. Inside it, increase <code class="var">occupation-frequency</code> by 1.'
		+'</p>'
		+'<p>'
		+  'Inside the go procedure, ask foragers to <code class="codeABMA">record-occupation</code>.'
		+'</p>'
		+'<p>'
		+  'Because <code class="var">occupation-frequency</code> is a patch variable, NetLogo automatically understands that the forager is asking the patch it '
		+  'is on to update their occupation frequency. The alternative and more explicit version of <code class="codeABMA">record-occupation</code> would be '
		+  '<code class="codeABMA">ask patch-here [set occupation-frequency occupation-frequency  + 1]</code>'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('#netlogo-code-tab')},
		},
		advanceExampleCode: {
			solution:'to go\n  if ticks = 1000 [ stop ]\n  ask foragers [\n    gather\n    eat\n    move\n  ]\n  \n  ask patches [\n    regrow-patches\n  ]\n  update-display\n  ask foragers [record-occupation]\n  tick\nend\n...\nto record-occupation\n  set occupation-frequency occupation-frequency + 1\nend\n',
			codeExample: function() {
				addExampleCode({text:'  ask foragers [record-occupation]\n', insertAtText:'tick', instance:2, position:'at'});
				addExampleCode({text:'\n\nto record-occupation\n  set occupation-frequency occupation-frequency + 1\nend\n', insertAtText:'end', instance:8});
			},			
			fullCode:'breed [foragers forager]\npatches-own [ resources occupation-frequency max-resources]\nforagers-own [ storage ]\n\n\nto setup\n  clear-all\n  create-foragers number-foragers [\n    set shape "house"\n    set storage 0\n    move-to one-of patches with [not any? foragers-here]\n  ]\n  ;ask patches [\n  ;  set pcolor green\n  ;  set resources 10\n  ;]\n  ifelse hills?[make-hills][make-plain]\n  update-display\n  reset-ticks\nend\n\nto go\n  if ticks = 1000 [ stop ]\n  ask foragers [\n    gather\n    eat\n    move\n  ]\n  \n  ask patches [\n    regrow-patches\n  ]\n  update-display\n  tick\nend\n\nto gather\n  let current-gather 0\n  ifelse [resources] of patch-here < gather-rate\n  [\n    set current-gather [resources] of patch-here\n  ][\n    set current-gather gather-rate\n  ]\n  ask patch-here [ set resources resources - current-gather ]\n  set storage storage + current-gather\nend\n\nto update-display\n  let max-color max [resources] of patches * 2     \n  ask patches [ set pcolor scale-color green resources 0 max-color ]\n  ask foragers [\n    ifelse storage > 0\n    [\n      set color blue\n    ][\n      set color red\n    ]\n  ]\nend\n\nto eat\n  ifelse storage >= consumption-rate [\n    set storage storage - consumption-rate\n  ][\n    set storage 0\n  ]\nend\n\nto move\n  if [resources] of patch-here < consumption-rate\n  [\n    let p one-of patches with [not any? foragers-here and resources >= consumption-rate]\n    if p != nobody [move-to p]\n  ]\nend\n\nto regrow-patches\n  if resources < max-resources[\n    set resources resources + growth-rate\n  ]\nend\n\nto make-hills\n  let hills (patch-set patch (max-pxcor * 0.33)(max-pycor * 0.33) patch (max-pxcor * 0.67)(max-pycor * 0.67))\n  ask patches [\n    let dist distance min-one-of hills [distance myself]\n    set max-resources max-plants - (dist / (max-pxcor * 0.75) * max-plants)\n    set resources max-resources \n  ]\nend\n\nto make-plain\n  ask patches [\n    set max-resources max-plants\n    set resources max-plants\n  ]\nend\n',
		},
		complexAdvanceOn: function() {
			advanceOnRecompile();
		},		
	},
	{
		text:'<p>'
		+  'We\'ll create a new type of visualization for the occupation record.'
		+'</p>'
		+'<p>'
		+  'Create a new procedure <code class="codeABMA">update-display-occupation</code>'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('#netlogo-code-tab')},
		},
		advanceExampleCode: {
			solution:'to update-display-occupation\nend\n',
			codeExample: function() {
				addExampleCode({text:'\nto update-display-occupation\nend\n', insertAtText:'end', instance:9});
			},				
			fullCode:'breed [foragers forager]\npatches-own [ resources occupation-frequency max-resources]\nforagers-own [ storage ]\n\n\nto setup\n  clear-all\n  create-foragers number-foragers [\n    set shape "house"\n    set storage 0\n    move-to one-of patches with [not any? foragers-here]\n  ]\n  ;ask patches [\n  ;  set pcolor green\n  ;  set resources 10\n  ;]\n  ifelse hills?[make-hills][make-plain]\n  update-display\n  reset-ticks\nend\n\nto go\n  if ticks = 1000 [ stop ]\n  ask foragers [\n    gather\n    eat\n    move\n  ]\n  \n  ask patches [\n    regrow-patches\n  ]\n  update-display\n  ask foragers [record-occupation]\n  tick\nend\n\nto gather\n  let current-gather 0\n  ifelse [resources] of patch-here < gather-rate\n  [\n    set current-gather [resources] of patch-here\n  ][\n    set current-gather gather-rate\n  ]\n  ask patch-here [ set resources resources - current-gather ]\n  set storage storage + current-gather\nend\n\nto update-display\n  let max-color max [resources] of patches * 2     \n  ask patches [ set pcolor scale-color green resources 0 max-color ]\n  ask foragers [\n    ifelse storage > 0\n    [\n      set color blue\n    ][\n      set color red\n    ]\n  ]\nend\n\nto eat\n  ifelse storage >= consumption-rate [\n    set storage storage - consumption-rate\n  ][\n    set storage 0\n  ]\nend\n\nto move\n  if [resources] of patch-here < consumption-rate\n  [\n    let p one-of patches with [not any? foragers-here and resources >= consumption-rate]\n    if p != nobody [move-to p]\n  ]\nend\n\nto regrow-patches\n  if resources < max-resources[\n    set resources resources + growth-rate\n  ]\nend\n\nto make-hills\n  let hills (patch-set patch (max-pxcor * 0.33)(max-pycor * 0.33) patch (max-pxcor * 0.67)(max-pycor * 0.67))\n  ask patches [\n    let dist distance min-one-of hills [distance myself]\n    set max-resources max-plants - (dist / (max-pxcor * 0.75) * max-plants)\n    set resources max-resources \n  ]\nend\n\nto make-plain\n  ask patches [\n    set max-resources max-plants\n    set resources max-plants\n  ]\nend\n\n\nto record-occupation\n  set occupation-frequency occupation-frequency + 1\nend\n',
		},
		complexAdvanceOn: function() {
			advanceOnRecompile();
		},
	},
	{
		text:'<p>'
		+  'Inside this new procedure, start by defining a local-variable <code class="newvar">max-color</code> which stores the maximum <code class="var">occupation-frequency</code> of patches.'
		+'</p>'
		+'<p>'
		+  'Next, ask patches to set themselves to a shade of red using <a href="https://ccl.northwestern.edu/netlogo/bind/primitive/scale-color.html" target="_blank" rel="noopener noreferrer">'
		+  'scale-color</a> according to their  <code class="var">occupation-frequency</code> and <code class="codeABMA">max-color</code> as maximum.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('#netlogo-code-tab')},
		},
		advanceExampleCode: {
			solution:'to update-display-occupation\n  let max-color max [occupation-frequency] of patches\n  ask patches [\n    set pcolor scale-color red occupation-frequency 0 max-color\n  ]\nend\n',
			codeExample: function() {
				addExampleCode({text:'  let max-color max [occupation-frequency] of patches\n  ask patches [\n    set pcolor scale-color red occupation-frequency 0 max-color\n  ]\n', insertAtText:'update-display-occupation'});
			},				
			fullCode:'breed [foragers forager]\npatches-own [ resources occupation-frequency max-resources]\nforagers-own [ storage ]\n\n\nto setup\n  clear-all\n  create-foragers number-foragers [\n    set shape "house"\n    set storage 0\n    move-to one-of patches with [not any? foragers-here]\n  ]\n  ;ask patches [\n  ;  set pcolor green\n  ;  set resources 10\n  ;]\n  ifelse hills?[make-hills][make-plain]\n  update-display\n  reset-ticks\nend\n\nto go\n  if ticks = 1000 [ stop ]\n  ask foragers [\n    gather\n    eat\n    move\n  ]\n  \n  ask patches [\n    regrow-patches\n  ]\n  update-display\n  ask foragers [record-occupation]\n  tick\nend\n\nto gather\n  let current-gather 0\n  ifelse [resources] of patch-here < gather-rate\n  [\n    set current-gather [resources] of patch-here\n  ][\n    set current-gather gather-rate\n  ]\n  ask patch-here [ set resources resources - current-gather ]\n  set storage storage + current-gather\nend\n\nto update-display\n  let max-color max [resources] of patches * 2     \n  ask patches [ set pcolor scale-color green resources 0 max-color ]\n  ask foragers [\n    ifelse storage > 0\n    [\n      set color blue\n    ][\n      set color red\n    ]\n  ]\nend\n\nto eat\n  ifelse storage >= consumption-rate [\n    set storage storage - consumption-rate\n  ][\n    set storage 0\n  ]\nend\n\nto move\n  if [resources] of patch-here < consumption-rate\n  [\n    let p one-of patches with [not any? foragers-here and resources >= consumption-rate]\n    if p != nobody [move-to p]\n  ]\nend\n\nto regrow-patches\n  if resources < max-resources[\n    set resources resources + growth-rate\n  ]\nend\n\nto make-hills\n  let hills (patch-set patch (max-pxcor * 0.33)(max-pycor * 0.33) patch (max-pxcor * 0.67)(max-pycor * 0.67))\n  ask patches [\n    let dist distance min-one-of hills [distance myself]\n    set max-resources max-plants - (dist / (max-pxcor * 0.75) * max-plants)\n    set resources max-resources \n  ]\nend\n\nto make-plain\n  ask patches [\n    set max-resources max-plants\n    set resources max-plants\n  ]\nend\n\n\nto record-occupation\n  set occupation-frequency occupation-frequency + 1\nend\n\nto update-display-occupation\nend\n\n',
		},
		complexAdvanceOn: function() {
			advanceOnRecompile();
		},	
	},
	{
		text:'<p>'
		+  'Because we are not interested in individual foragers but rather the long-term occupation, we\'ll also ask foragers to hide themselves.'
		+'</p>'
		+'<p>'
		+  'For this, use <code class="codeABMA"><a href="http://ccl.northwestern.edu/netlogo/docs/dict/hidden.html" target="_blank" rel="noopener noreferrer">hidden?</a></code> or '
		+  '<code class="codeABMA"><http://ccl.northwestern.edu/netlogo/docs/dictionary.html#hide-turtle" target="_blank" rel="noopener noreferrer">hide-turtle</a></code>'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('#netlogo-code-tab')},
		},
		advanceExampleCode: {
			solution:'to update-display-occupation\n  ask foragers [ set hidden? true ]\n  let max-color max [occupation-frequency] of patches\n  ask patches [\n    set pcolor scale-color red occupation-frequency 0 max-color\n  ]\nend\n',
			codeExample: function() {
				addExampleCode({text:'  ask foragers [ set hidden? true ]\n', insertAtText:'update-display-occupation'});
			},				
			fullCode:'breed [foragers forager]\npatches-own [ resources occupation-frequency max-resources]\nforagers-own [ storage ]\n\n\nto setup\n  clear-all\n  create-foragers number-foragers [\n    set shape "house"\n    set storage 0\n    move-to one-of patches with [not any? foragers-here]\n  ]\n  ;ask patches [\n  ;  set pcolor green\n  ;  set resources 10\n  ;]\n  ifelse hills?[make-hills][make-plain]\n  update-display\n  reset-ticks\nend\n\nto go\n  if ticks = 1000 [ stop ]\n  ask foragers [\n    gather\n    eat\n    move\n  ]\n  \n  ask patches [\n    regrow-patches\n  ]\n  update-display\n  ask foragers [record-occupation]\n  tick\nend\n\nto gather\n  let current-gather 0\n  ifelse [resources] of patch-here < gather-rate\n  [\n    set current-gather [resources] of patch-here\n  ][\n    set current-gather gather-rate\n  ]\n  ask patch-here [ set resources resources - current-gather ]\n  set storage storage + current-gather\nend\n\nto update-display\n  let max-color max [resources] of patches * 2     \n  ask patches [ set pcolor scale-color green resources 0 max-color ]\n  ask foragers [\n    ifelse storage > 0\n    [\n      set color blue\n    ][\n      set color red\n    ]\n  ]\nend\n\nto eat\n  ifelse storage >= consumption-rate [\n    set storage storage - consumption-rate\n  ][\n    set storage 0\n  ]\nend\n\nto move\n  if [resources] of patch-here < consumption-rate\n  [\n    let p one-of patches with [not any? foragers-here and resources >= consumption-rate]\n    if p != nobody [move-to p]\n  ]\nend\n\nto regrow-patches\n  if resources < max-resources[\n    set resources resources + growth-rate\n  ]\nend\n\nto make-hills\n  let hills (patch-set patch (max-pxcor * 0.33)(max-pycor * 0.33) patch (max-pxcor * 0.67)(max-pycor * 0.67))\n  ask patches [\n    let dist distance min-one-of hills [distance myself]\n    set max-resources max-plants - (dist / (max-pxcor * 0.75) * max-plants)\n    set resources max-resources \n  ]\nend\n\nto make-plain\n  ask patches [\n    set max-resources max-plants\n    set resources max-plants\n  ]\nend\n\n\nto record-occupation\n  set occupation-frequency occupation-frequency + 1\nend\n\nto update-display-occupation\n  let max-color max [occupation-frequency] of patches\n  ask patches [\n    set pcolor scale-color red occupation-frequency 0 max-color\n  ]\nend\n',
		},
		complexAdvanceOn: function() {
			advanceOnRecompile();
		},	
	},
	{
		text:'<p>'
		+  'Lastly, inside the go procedure, adjust your code so that after 1000 ticks <code class="codeABMA">update-display-occupation</code> is called before the model is stopped.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('#netlogo-code-tab')},
		},
		advanceExampleCode: {
			solution:'to go\n  if ticks = 1000 [ update-display-occupation  stop ]\n  ask foragers [\n    gather\n    eat\n    move\n  ]\n  \n  ask patches [\n    regrow-patches\n  ]\n  update-display\n  ask foragers [record-occupation]\n  tick\nend\n',
			codeExample: function() {
				addExampleCode({text:' update-display-occupation ', insertAtText:'if ticks = 1000', position:'at', startCh:19});
			},				
			fullCode:'breed [foragers forager]\npatches-own [ resources occupation-frequency max-resources]\nforagers-own [ storage ]\n\n\nto setup\n  clear-all\n  create-foragers number-foragers [\n    set shape "house"\n    set storage 0\n    move-to one-of patches with [not any? foragers-here]\n  ]\n  ;ask patches [\n  ;  set pcolor green\n  ;  set resources 10\n  ;]\n  ifelse hills?[make-hills][make-plain]\n  update-display\n  reset-ticks\nend\n\nto go\n  if ticks = 1000 [ stop ]\n  ask foragers [\n    gather\n    eat\n    move\n  ]\n  \n  ask patches [\n    regrow-patches\n  ]\n  update-display\n  ask foragers [record-occupation]\n  tick\nend\n\nto gather\n  let current-gather 0\n  ifelse [resources] of patch-here < gather-rate\n  [\n    set current-gather [resources] of patch-here\n  ][\n    set current-gather gather-rate\n  ]\n  ask patch-here [ set resources resources - current-gather ]\n  set storage storage + current-gather\nend\n\nto update-display\n  let max-color max [resources] of patches * 2     \n  ask patches [ set pcolor scale-color green resources 0 max-color ]\n  ask foragers [\n    ifelse storage > 0\n    [\n      set color blue\n    ][\n      set color red\n    ]\n  ]\nend\n\nto eat\n  ifelse storage >= consumption-rate [\n    set storage storage - consumption-rate\n  ][\n    set storage 0\n  ]\nend\n\nto move\n  if [resources] of patch-here < consumption-rate\n  [\n    let p one-of patches with [not any? foragers-here and resources >= consumption-rate]\n    if p != nobody [move-to p]\n  ]\nend\n\nto regrow-patches\n  if resources < max-resources[\n    set resources resources + growth-rate\n  ]\nend\n\nto make-hills\n  let hills (patch-set patch (max-pxcor * 0.33)(max-pycor * 0.33) patch (max-pxcor * 0.67)(max-pycor * 0.67))\n  ask patches [\n    let dist distance min-one-of hills [distance myself]\n    set max-resources max-plants - (dist / (max-pxcor * 0.75) * max-plants)\n    set resources max-resources \n  ]\nend\n\nto make-plain\n  ask patches [\n    set max-resources max-plants\n    set resources max-plants\n  ]\nend\n\n\nto record-occupation\n  set occupation-frequency occupation-frequency + 1\nend\n\nto update-display-occupation\n  ask foragers [ set hidden? true ]\n  let max-color max [occupation-frequency] of patches\n  ask patches [\n    set pcolor scale-color red occupation-frequency 0 max-color\n  ]\nend\n',
		},
		complexAdvanceOn: function() {
			advanceOnRecompile();
		},	
	},
	{
		text:'<p>'
		+  'Rerun your model with <code class="sliderName">hills?</code> on until 1000 ticks have passed, to check that everything works as intended.'
		+'</p>', 
		attachTo:{
			on: 'top',
			element: '.netlogo-model',
		},	
	},
	{
		text:'<p>'
		+  'Now we\'ve created a distribution map which can more easily be compared against real archaeological data!'
		+'</p>'
		+'<img src="assets/images/occupation_hills.png" height="200px"/>',
		attachTo:{
			on: 'top',
			element: '.netlogo-model',
		},	
	},
	{
		text:'<p>'
		+  'Simulation is a form of experimentation and it is essential to take steps to ensure that we learn what we want from it.'
		+'</p>' 
		+'<p>'
		+  'In this lesson, you have learned:'
		+'</p>'
		+'<ul>'
		+  '<li>what validation is;</li>'
		+  '<li>how to design a good experiment.</li>'
		+'</ul>'
		+'<p>'
		+  'With regards to validation and simulation as scientific experimentation, it is important to note that all models are \'wrong\' to some degree. '
		+  'This is because they are simplified representations of reality.'
		+'</p>'
		+'<p>'
		+  'There is no way to \'prove\' that your model is correct: this is due to equifinality, the fact that the same pattern can arise in different ways. '
		+  'This is a problem inherent to all types of scientific reasoning however, and by comparing model outputs to the archaeological record we can get insight into which model might be wrong, '
		+  'or which explanations may fit better than others.'
		+'</p>'
		+'<p>'
		+  'We\'ll get further into validation techniques in tutorial 5. If, instead, you would like to learn about dynamic list operations, click \'Next\' below.'
		+'</p>'
	},
 ]
