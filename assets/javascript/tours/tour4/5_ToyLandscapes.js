let toyLandscapes = [
	{
		text:'<h2>'
		+  'Toy Landscapes!'
		+'</h2>'
		+'<p>'
		+  'In this lesson, we will expand our model to investigate agent-environment interaction further, by using toy landscapes. '
		+  'This lesson is for you if you have completed the first sets of tutorials and know basic NetLogo syntax, including loops, reporters and lists.'
		+'</p>'
		+'<p>'
		+  'In this lesson, you:'
		+'</p>'
		+'<ul>'
		+  '<li>will learn how to create toy landscapes.</li>'
		+'</ul>',
	},
	{
		text:'<p>'
		+  'Our model is more interesting! With foragers moving around and patches regrowing, we have already introduced some diversity to our model. '
		+  'But what if, instead of all patches starting from the same state, patches are different from the start, and all have different resource capacities?'
		+'<p>'
		+'<p>'
		+  'In tutorial 2, we imported a realistic landscape to differentiate patches, but this time we are going to create our own \'toy landscape\', with two hills of resources. '
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
		+  'First, give all patches a new variable <code class="newvar">max-resources</code>.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('#netlogo-code-tab')},
		},
		advanceExampleCode: {
			solution:'...\npatches-own [ resources max-resources]\n...\n',
			codeExample: function() {
				addExampleCode({text:'max-resources', insertAtText:'patches-own', position:'at', startCh:24});
			},			
			fullCode:'breed [foragers forager]\nglobals [ ]\npatches-own [ resources ]\nforagers-own [ storage ]\n\n\nto setup\n  clear-all\n  create-foragers number-foragers [\n    set shape "house"\n    set storage 0\n    move-to one-of patches with [not any? foragers-here]\n  ]\n  ask patches [\n    set pcolor green\n    set resources 10\n  ]\n  update-display\n  reset-ticks\nend\n\nto go\n  ask patches [ regrow-patches ]\n  ask foragers [\n    gather\n    eat\n    move\n  ]\n  update-display\n  tick\nend\n\nto gather\n  let current-gather 0\n  ifelse [resources] of patch-here < gather-rate\n  [\n    set current-gather [resources] of patch-here\n  ][\n    set current-gather gather-rate\n  ]\n  ask patch-here [ set resources resources - current-gather ]\n  set storage storage + current-gather\nend\n\nto update-display\n  let max-color max [resources] of patches * 2     \n  ask patches [ set pcolor scale-color green resources 0 max-color ]\n  ask foragers [\n    ifelse storage > 0\n    [\n      set color blue\n    ][\n      set color red\n    ]\n  ]\nend\n\nto eat\n  ifelse storage >= consumption-rate [\n    set storage storage - consumption-rate\n  ][\n    set storage 0\n  ]\nend\n\nto move\n  if [resources] of patch-here < consumption-rate\n  [\n    let p one-of patches with [not any? foragers-here and resources >= consumption-rate]\n    if p != nobody [move-to p]\n  ]\nend\n\nto regrow-patches\n  if resources < max-plants [\n    set resources resources + growth-rate\n  ]\nend\n',
		},
		complexAdvanceOn: function() {
			advanceOnRecompile();
		},		
		
	},
	{
		text:'<p>'
		+  'Next, make a new empty procedure <code class="codeABMA">make-hills</code>.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('#netlogo-code-tab')},
		},
		advanceExampleCode: {
			solution:'\nto make-hills\nend\n',
			codeExample: function() {
				addExampleCode({text:'\nto make-hills\nend\n', insertAtText:'end', instance:6});
			},	
			fullCode: 'breed [foragers forager]\nglobals [ ]\npatches-own [ resources max-resources]\nforagers-own [ storage ]\n\n\nto setup\n  clear-all\n  create-foragers number-foragers [\n    set shape "house"\n    set storage 0\n    move-to one-of patches with [not any? foragers-here]\n  ]\n  ask patches [\n    set pcolor green\n    set resources 10\n  ]\n  update-display\n  reset-ticks\nend\n\nto go\n  ask patches [ regrow-patches ]\n  ask foragers [\n    gather\n    eat\n    move\n  ]\n  update-display\n  tick\nend\n\nto gather\n  let current-gather 0\n  ifelse [resources] of patch-here < gather-rate\n  [\n    set current-gather [resources] of patch-here\n  ][\n    set current-gather gather-rate\n  ]\n  ask patch-here [ set resources resources - current-gather ]\n  set storage storage + current-gather\nend\n\nto update-display\n  let max-color max [resources] of patches * 2     \n  ask patches [ set pcolor scale-color green resources 0 max-color ]\n  ask foragers [\n    ifelse storage > 0\n    [\n      set color blue\n    ][\n      set color red\n    ]\n  ]\nend\n\nto eat\n  ifelse storage >= consumption-rate [\n    set storage storage - consumption-rate\n  ][\n    set storage 0\n  ]\nend\n\nto move\n  if [resources] of patch-here < consumption-rate\n  [\n    let p one-of patches with [not any? foragers-here and resources >= consumption-rate]\n    if p != nobody [move-to p]\n  ]\nend\n\nto regrow-patches\n  if resources < max-plants [\n    set resources resources + growth-rate\n  ]\nend\n',
		},
		complexAdvanceOn: function() {
			advanceOnRecompile();
		},		
	},
	{
		text:'<p>'
		+  'We want to create a landscape featuring two resource \'hills\'. '
		+  'We want the top of the hills to have the highest value, and resources to gradually decrease around them, like so:'
		+'</p>'
		+'<p>'
		+  '<img src="assets/images/hills.png" height="200px"/>'
		+'</p>'
		+'<p>'
		+  'In this image, the lightest green patches are the top of the hills.'
		+'</p>'
	},
	{
		text:'<p>'
		+  'As a first step we are going to define which patches are the highest points.'
		+'<p>'
		+'<p>'
		+  'Inside the <code class="codeABMA">make-hills</code> procedure, write <code class="codeABMA">'
		+  'let hills (patch-set patch (max-pxcor * 0.33)(max-pycor * 0.33) patch (max-pxcor * 0.67)(max-pycor * 0.67))</code>'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('#netlogo-code-tab')},
		},
		advanceExampleCode: {
			solution:'to make-hills\n  let hills (patch-set patch (max-pxcor * 0.33)(max-pycor * 0.33) patch (max-pxcor * 0.67)(max-pycor * 0.67))\nend\n\n',
			codeExample: function() {
				addExampleCode({text:'  let hills (patch-set patch (max-pxcor * 0.33)(max-pycor * 0.33) patch (max-pxcor * 0.67)(max-pycor * 0.67))\n', insertAtText:'make-hills'});
			},
			fullCode: 'breed [foragers forager]\nglobals [ ]\npatches-own [ resources max-resources]\nforagers-own [ storage ]\n\n\nto setup\n  clear-all\n  create-foragers number-foragers [\n    set shape "house"\n    set storage 0\n    move-to one-of patches with [not any? foragers-here]\n  ]\n  ask patches [\n    set pcolor green\n    set resources 10\n  ]\n  update-display\n  reset-ticks\nend\n\nto go\n  ask patches [ regrow-patches ]\n  ask foragers [\n    gather\n    eat\n    move\n  ]\n  update-display\n  tick\nend\n\nto gather\n  let current-gather 0\n  ifelse [resources] of patch-here < gather-rate\n  [\n    set current-gather [resources] of patch-here\n  ][\n    set current-gather gather-rate\n  ]\n  ask patch-here [ set resources resources - current-gather ]\n  set storage storage + current-gather\nend\n\nto update-display\n  let max-color max [resources] of patches * 2     \n  ask patches [ set pcolor scale-color green resources 0 max-color ]\n  ask foragers [\n    ifelse storage > 0\n    [\n      set color blue\n    ][\n      set color red\n    ]\n  ]\nend\n\nto eat\n  ifelse storage >= consumption-rate [\n    set storage storage - consumption-rate\n  ][\n    set storage 0\n  ]\nend\n\nto move\n  if [resources] of patch-here < consumption-rate\n  [\n    let p one-of patches with [not any? foragers-here and resources >= consumption-rate]\n    if p != nobody [move-to p]\n  ]\nend\n\nto regrow-patches\n  if resources < max-plants [\n    set resources resources + growth-rate\n  ]\nend\n\nto make-hills\nend\n',
		},	
		complexAdvanceOn: function() {
			advanceOnRecompile();
		},	
	},
	{
		text:'<p>'
		+  'Next, ask patches to define a new local variable <code class="newvar">dist</code> as <code class="codeABMA">distance min-one-of hills [ distance myself ]</code>'
		+'</p>'
		+'<p>'
		+  'This variable stores the distance from the patch to the closest hill.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('#netlogo-code-tab')},
		},
		advanceExampleCode: {
			solution:'to make-hills\n  let hills (patch-set patch (max-pxcor * 0.33)(max-pycor * 0.33) patch (max-pxcor * 0.67)(max-pycor * 0.67))\n  ask patches [\n    let dist distance min-one-of hills [ distance myself ]\n  ]\nend\n',
			codeExample: function() {
				addExampleCode({text:'  ask patches [\n    let dist distance min-one-of hills [ distance myself ]\n  ]\n', insertAtText:'let hills'});
			},
			fullCode:'breed [foragers forager]\nglobals [ ]\npatches-own [ resources max-resources]\nforagers-own [ storage ]\n\n\nto setup\n  clear-all\n  create-foragers number-foragers [\n    set shape "house"\n    set storage 0\n    move-to one-of patches with [not any? foragers-here]\n  ]\n  ask patches [\n    set pcolor green\n    set resources 10\n  ]\n  update-display\n  reset-ticks\nend\n\nto go\n  ask patches [ regrow-patches ]\n  ask foragers [\n    gather\n    eat\n    move\n  ]\n  update-display\n  tick\nend\n\nto gather\n  let current-gather 0\n  ifelse [resources] of patch-here < gather-rate\n  [\n    set current-gather [resources] of patch-here\n  ][\n    set current-gather gather-rate\n  ]\n  ask patch-here [ set resources resources - current-gather ]\n  set storage storage + current-gather\nend\n\nto update-display\n  let max-color max [resources] of patches * 2     \n  ask patches [ set pcolor scale-color green resources 0 max-color ]\n  ask foragers [\n    ifelse storage > 0\n    [\n      set color blue\n    ][\n      set color red\n    ]\n  ]\nend\n\nto eat\n  ifelse storage >= consumption-rate [\n    set storage storage - consumption-rate\n  ][\n    set storage 0\n  ]\nend\n\nto move\n  if [resources] of patch-here < consumption-rate\n  [\n    let p one-of patches with [not any? foragers-here and resources >= consumption-rate]\n    if p != nobody [move-to p]\n  ]\nend\n\nto regrow-patches\n  if resources < max-plants [\n    set resources resources + growth-rate\n  ]\nend\n\nto make-hills\n  let hills (patch-set patch (max-pxcor * 0.33)(max-pycor * 0.33) patch (max-pxcor * 0.67)(max-pycor * 0.67))\nend\n',
		},
		complexAdvanceOn: function() {
			advanceOnRecompile();
		},	
	},
	{
		text:'<p>'
		+  'We\'ll use the <code class="var">dist</code> variable to determine which value for <code class="var">max-resources</code> '
		+  'and starting value for <code class="var">resources</code> each patch should get.'
		+'</p>'
		+'<p>'
		+  'Define <code class="codeABMA">max-resources</code> as  <code class="codeABMA"> max-plants - (dist / (max-pxcor * 0.75) * max-plants)</code>'
		+'<p>'
		+'<p>'
		+  'This sets a patch\'s maximum resources as a function of distance from the nearest hill top and the user-defined <code class="var">max-plant</code> value.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('#netlogo-code-tab')},
		},
		advanceExampleCode: {
			solution:'to make-hills\n  let hills (patch-set patch (max-pxcor * 0.33)(max-pycor * 0.33) patch (max-pxcor * 0.67)(max-pycor * 0.67))\n  ask patches [\n    let dist distance min-one-of hills [ distance myself ]\n    set max-resources max-plants - (dist / (max-pxcor * 0.75) * max-plants)\n  ]\nend\n',
			codeExample: function() {
				addExampleCode({text:'    set max-resources max-plants - (dist / (max-pxcor * 0.75) * max-plants)\n', insertAtText:'let dist'});
			},
			fullCode:'breed [foragers forager]\nglobals [ ]\npatches-own [ resources max-resources]\nforagers-own [ storage ]\n\n\nto setup\n  clear-all\n  create-foragers number-foragers [\n    set shape "house"\n    set storage 0\n    move-to one-of patches with [not any? foragers-here]\n  ]\n  ask patches [\n    set pcolor green\n    set resources 10\n  ]\n  update-display\n  reset-ticks\nend\n\nto go\n  ask patches [ regrow-patches ]\n  ask foragers [\n    gather\n    eat\n    move\n  ]\n  update-display\n  tick\nend\n\nto gather\n  let current-gather 0\n  ifelse [resources] of patch-here < gather-rate\n  [\n    set current-gather [resources] of patch-here\n  ][\n    set current-gather gather-rate\n  ]\n  ask patch-here [ set resources resources - current-gather ]\n  set storage storage + current-gather\nend\n\nto update-display\n  let max-color max [resources] of patches * 2     \n  ask patches [ set pcolor scale-color green resources 0 max-color ]\n  ask foragers [\n    ifelse storage > 0\n    [\n      set color blue\n    ][\n      set color red\n    ]\n  ]\nend\n\nto eat\n  ifelse storage >= consumption-rate [\n    set storage storage - consumption-rate\n  ][\n    set storage 0\n  ]\nend\n\nto move\n  if [resources] of patch-here < consumption-rate\n  [\n    let p one-of patches with [not any? foragers-here and resources >= consumption-rate]\n    if p != nobody [move-to p]\n  ]\nend\n\nto regrow-patches\n  if resources < max-plants [\n    set resources resources + growth-rate\n  ]\nend\n\nto make-hills\n  let hills (patch-set patch (max-pxcor * 0.33)(max-pycor * 0.33) patch (max-pxcor * 0.67)(max-pycor * 0.67))\n  ask patches [\n    let dist distance min-one-of hills [ distance myself ]\n  ]\nend\n',
		},	
		complexAdvanceOn: function() {
			advanceOnRecompile();
		},	
	},
	{
		text:'<p>'
		+  'Lastly set each patches\'s <code class="var">resources</code> starting value to <code class="var">max-resources</code>.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('#netlogo-code-tab')},
		},
		advanceExampleCode: {
			solution:'to make-hills\n  let hills (patch-set patch (max-pxcor * 0.33)(max-pycor * 0.33) patch (max-pxcor * 0.67)(max-pycor * 0.67))\n  ask patches [\n    let dist distance min-one-of hills [ distance myself ]\n    set max-resources max-plants - (dist / (max-pxcor * 0.75) * max-plants)\n    set resources max-resources\n  ]\nend\n',
			codeExample: function() {
				addExampleCode({text:'    set resources max-resources\n', insertAtText:'set max-resources'});
			},	
			fullCode:'breed [foragers forager]\nglobals [ ]\npatches-own [ resources max-resources]\nforagers-own [ storage ]\n\n\nto setup\n  clear-all\n  create-foragers number-foragers [\n    set shape "house"\n    set storage 0\n    move-to one-of patches with [not any? foragers-here]\n  ]\n  ask patches [\n    set pcolor green\n    set resources 10\n  ]\n  update-display\n  reset-ticks\nend\n\nto go\n  ask patches [ regrow-patches ]\n  ask foragers [\n    gather\n    eat\n    move\n  ]\n  update-display\n  tick\nend\n\nto gather\n  let current-gather 0\n  ifelse [resources] of patch-here < gather-rate\n  [\n    set current-gather [resources] of patch-here\n  ][\n    set current-gather gather-rate\n  ]\n  ask patch-here [ set resources resources - current-gather ]\n  set storage storage + current-gather\nend\n\nto update-display\n  let max-color max [resources] of patches * 2     \n  ask patches [ set pcolor scale-color green resources 0 max-color ]\n  ask foragers [\n    ifelse storage > 0\n    [\n      set color blue\n    ][\n      set color red\n    ]\n  ]\nend\n\nto eat\n  ifelse storage >= consumption-rate [\n    set storage storage - consumption-rate\n  ][\n    set storage 0\n  ]\nend\n\nto move\n  if [resources] of patch-here < consumption-rate\n  [\n    let p one-of patches with [not any? foragers-here and resources >= consumption-rate]\n    if p != nobody [move-to p]\n  ]\nend\n\nto regrow-patches\n  if resources < max-plants [\n    set resources resources + growth-rate\n  ]\nend\n\nto make-hills\n  let hills (patch-set patch (max-pxcor * 0.33)(max-pycor * 0.33) patch (max-pxcor * 0.67)(max-pycor * 0.67))\n  ask patches [\n    let dist distance min-one-of hills [ distance myself ]\n    set max-resources max-plants - (dist / (max-pxcor * 0.75) * max-plants)\n  ]\nend\n\n',
		},	
		complexAdvanceOn: function() {
			advanceOnRecompile();
		},	
	},
	{
		text:'<p>'
		+  'In the <code class="codeABMA">setup</code> procedure, comment out the lines of code asking patches to set their color and resources.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('#netlogo-code-tab')},
		},
		advanceExampleCode: {
			solution:'to setup\n  clear-all\n  create-foragers number-foragers [\n    set shape "house"\n    set storage 0\n    move-to one-of patches with [not any? foragers-here]\n  ]\n  ;ask patches [\n  ;  set pcolor green\n  ;  set resources 10\n  ;]\n  update-display\n  reset-ticks\nend\n\n',
			codeExample: function() {
				addExampleCode({text:';', insertAtText:'ask patches', position:'at', ignoreDuplicate:true, startCh:2});
				addExampleCode({text:';', insertAtText:'pcolor', position:'at', ignoreDuplicate:true, startCh:2});
				addExampleCode({text:';', insertAtText:'set resources', position:'at', ignoreDuplicate:true, startCh:2});
				addExampleCode({text:';', insertAtText:']', instance:6, position:'at', ignoreDuplicate:true, startCh:2});
			},	
			fullCode:'breed [foragers forager]\nglobals [ ]\npatches-own [ resources max-resources]\nforagers-own [ storage ]\n\n\nto setup\n  clear-all\n  create-foragers number-foragers [\n    set shape "house"\n    set storage 0\n    move-to one-of patches with [not any? foragers-here]\n  ]\n  ask patches [\n    set pcolor green\n    set resources 10\n  ]\n  update-display\n  reset-ticks\nend\n\nto go\n  ask patches [ regrow-patches ]\n  ask foragers [\n    gather\n    eat\n    move\n  ]\n  update-display\n  tick\nend\n\nto gather\n  let current-gather 0\n  ifelse [resources] of patch-here < gather-rate\n  [\n    set current-gather [resources] of patch-here\n  ][\n    set current-gather gather-rate\n  ]\n  ask patch-here [ set resources resources - current-gather ]\n  set storage storage + current-gather\nend\n\nto update-display\n  let max-color max [resources] of patches * 2     \n  ask patches [ set pcolor scale-color green resources 0 max-color ]\n  ask foragers [\n    ifelse storage > 0\n    [\n      set color blue\n    ][\n      set color red\n    ]\n  ]\nend\n\nto eat\n  ifelse storage >= consumption-rate [\n    set storage storage - consumption-rate\n  ][\n    set storage 0\n  ]\nend\n\nto move\n  if [resources] of patch-here < consumption-rate\n  [\n    let p one-of patches with [not any? foragers-here and resources >= consumption-rate]\n    if p != nobody [move-to p]\n  ]\nend\n\nto regrow-patches\n  if resources < max-plants [\n    set resources resources + growth-rate\n  ]\nend\n\nto make-hills\n  let hills (patch-set patch (max-pxcor * 0.33)(max-pycor * 0.33) patch (max-pxcor * 0.67)(max-pycor * 0.67))\n  ask patches [\n    let dist distance min-one-of hills [ distance myself ]\n    set max-resources max-plants - (dist / (max-pxcor * 0.75) * max-plants)\n    set resources max-resources\n  ]\nend\n\n',
		},	
		complexAdvanceOn: function() {
			advanceOnRecompile();
		},	
	},
	{
		text:'<p>'
		+  'Next, call <code class="codeABMA">make-hills</code> after <code class="codeABMA">clear-all</code> in the <code class="codeABMA">setup</code> procedure.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('#netlogo-code-tab')},
		},
		advanceExampleCode: {
			solution:'to setup\n  clear-all\n  make-hills\n  create-foragers number-foragers [\n    set shape "house"\n    set storage 0\n    move-to one-of patches with [not any? foragers-here]\n  ]\n  ;ask patches [\n  ;  set pcolor green\n  ;  set resources 10\n  ;]\n  update-display\n  reset-ticks\nend\n\n',
			codeExample: function() {
				addExampleCode({text:'  make-hills\n', insertAtText:'clear-all'});
			},	
			fullCode:'breed [foragers forager]\nglobals [ ]\npatches-own [ resources max-resources]\nforagers-own [ storage ]\n\n\nto setup\n  clear-all\n  create-foragers number-foragers [\n    set shape "house"\n    set storage 0\n    move-to one-of patches with [not any? foragers-here]\n  ]\n  ;ask patches [\n  ;  set pcolor green\n  ;  set resources 10\n  ;]\n  update-display\n  reset-ticks\nend\n\nto go\n  ask patches [ regrow-patches ]\n  ask foragers [\n    gather\n    eat\n    move\n  ]\n  update-display\n  tick\nend\n\nto gather\n  let current-gather 0\n  ifelse [resources] of patch-here < gather-rate\n  [\n    set current-gather [resources] of patch-here\n  ][\n    set current-gather gather-rate\n  ]\n  ask patch-here [ set resources resources - current-gather ]\n  set storage storage + current-gather\nend\n\nto update-display\n  let max-color max [resources] of patches * 2     \n  ask patches [ set pcolor scale-color green resources 0 max-color ]\n  ask foragers [\n    ifelse storage > 0\n    [\n      set color blue\n    ][\n      set color red\n    ]\n  ]\nend\n\nto eat\n  ifelse storage >= consumption-rate [\n    set storage storage - consumption-rate\n  ][\n    set storage 0\n  ]\nend\n\nto move\n  if [resources] of patch-here < consumption-rate\n  [\n    let p one-of patches with [not any? foragers-here and resources >= consumption-rate]\n    if p != nobody [move-to p]\n  ]\nend\n\nto regrow-patches\n  if resources < max-plants [\n    set resources resources + growth-rate\n  ]\nend\n\nto make-hills\n  let hills (patch-set patch (max-pxcor * 0.33)(max-pycor * 0.33) patch (max-pxcor * 0.67)(max-pycor * 0.67))\n  ask patches [\n    let dist distance min-one-of hills [ distance myself ]\n    set max-resources max-plants - (dist / (max-pxcor * 0.75) * max-plants)\n    set resources max-resources\n  ]\nend\n\n',
		},	
		complexAdvanceOn: function() {
			advanceOnRecompile();
		},	
	},
	{
		text:'<p>'
		+  'Setup your model to check the distribution of resources. Does it look the same?'
		+'</p>'
		+'<p>'
		+  '<img src="assets/images/hills.png" height="200px"/>'
		+'</p>',
		attachTo:{
			on: 'top',
			element: '.netlogo-model',
		},
	},
	{
		text:'<p>'
		+  'We want to be able to compare this hill environment scenario with one where resources are equally distributed (like before).'
		+'</p>'
		+'<p>'
		+  'Create a new procedure <code class="codeABMA">make-plain</code>.'
		+'<\p>'
		+'<p>'
		+  'Inside it, ask patches to set their <code class="var">max-resources</code> and <code class="var">resources</code> to <code class="var">max-plants</code>.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('#netlogo-code-tab')},
		},
		advanceExampleCode: {
			solution:'\nto make-plain\n  ask patches [\n    set max-resources max-plants\n    set resources max-resources\n  ]\nend\n\n',
			codeExample: function() {
				addExampleCode({text:'\nto make-plain\nend\n', insertAtText:'end', instance:7});
				addExampleCode({text:'  ask patches [\n    set max-resources max-plants\n    set resources max-resources\n  ]\n', insertAtText:'make-plain'});
			},	
			fullCode:'breed [foragers forager]\nglobals [ ]\npatches-own [ resources max-resources]\nforagers-own [ storage ]\n\n\nto setup\n  clear-all\n  make-hills\n  create-foragers number-foragers [\n    set shape "house"\n    set storage 0\n    move-to one-of patches with [not any? foragers-here]\n  ]\n  ;ask patches [\n  ;  set pcolor green\n  ;  set resources 10\n  ;]\n  update-display\n  reset-ticks\nend\n\nto go\n  ask patches [ regrow-patches ]\n  ask foragers [\n    gather\n    eat\n    move\n  ]\n  update-display\n  tick\nend\n\nto gather\n  let current-gather 0\n  ifelse [resources] of patch-here < gather-rate\n  [\n    set current-gather [resources] of patch-here\n  ][\n    set current-gather gather-rate\n  ]\n  ask patch-here [ set resources resources - current-gather ]\n  set storage storage + current-gather\nend\n\nto update-display\n  let max-color max [resources] of patches * 2     \n  ask patches [ set pcolor scale-color green resources 0 max-color ]\n  ask foragers [\n    ifelse storage > 0\n    [\n      set color blue\n    ][\n      set color red\n    ]\n  ]\nend\n\nto eat\n  ifelse storage >= consumption-rate [\n    set storage storage - consumption-rate\n  ][\n    set storage 0\n  ]\nend\n\nto move\n  if [resources] of patch-here < consumption-rate\n  [\n    let p one-of patches with [not any? foragers-here and resources >= consumption-rate]\n    if p != nobody [move-to p]\n  ]\nend\n\nto regrow-patches\n  if resources < max-plants [\n    set resources resources + growth-rate\n  ]\nend\n\nto make-hills\n  let hills (patch-set patch (max-pxcor * 0.33)(max-pycor * 0.33) patch (max-pxcor * 0.67)(max-pycor * 0.67))\n  ask patches [\n    let dist distance min-one-of hills [ distance myself ]\n    set max-resources max-plants - (dist / (max-pxcor * 0.75) * max-plants)\n    set resources max-resources\n  ]\nend\n\n',
		},
		complexAdvanceOn: function() {
			advanceOnRecompile();
		},	
	},
	{
		text:'<p>'
		+  'Next, put a new switch on the interface <code class="sliderName">hills?</code>.'
		+'</p>',
		attachTo:{
			on: 'top',
			element: '.netlogo-model',
		},
		modalOverlayOpeningPadding:5000
	},
	{
		text:'<p>'
		+  'Then, modify the <code class="codeABMA">setup</code> procedure so that depending on whether <code class="sliderName">hills</code> is true or false, '
		+  'the <code class="codeABMA">make-hills</code> or the <code class="codeABMA">make-plain</code> procedure is called.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('#netlogo-code-tab')},
		},
		advanceExampleCode: {
			solution:'to setup\n  clear-all\n  ifelse hills? [ make-hills ][ make-plain ]\n  create-foragers number-foragers [\n    set shape "house"\n    set storage 0\n    move-to one-of patches with [not any? foragers-here]\n  ]\n  ;ask patches [\n  ;  set pcolor green\n  ;  set resources 10\n  ;]\n  update-display\n  reset-ticks\nend\n\n',
			codeExample: function() {
				addExampleCode({text:'  ifelse hills? [ make-hills ][ make-plain ]', insertAtText:'make-hills', replace:true});
			},	
			fullCode:'breed [foragers forager]\nglobals [ ]\npatches-own [ resources max-resources]\nforagers-own [ storage ]\n\n\nto setup\n  clear-all\n  make-hills\n  create-foragers number-foragers [\n    set shape "house"\n    set storage 0\n    move-to one-of patches with [not any? foragers-here]\n  ]\n  ;ask patches [\n  ;  set pcolor green\n  ;  set resources 10\n  ;]\n  update-display\n  reset-ticks\nend\n\nto go\n  ask patches [ regrow-patches ]\n  ask foragers [\n    gather\n    eat\n    move\n  ]\n  update-display\n  tick\nend\n\nto gather\n  let current-gather 0\n  ifelse [resources] of patch-here < gather-rate\n  [\n    set current-gather [resources] of patch-here\n  ][\n    set current-gather gather-rate\n  ]\n  ask patch-here [ set resources resources - current-gather ]\n  set storage storage + current-gather\nend\n\nto update-display\n  let max-color max [resources] of patches * 2     \n  ask patches [ set pcolor scale-color green resources 0 max-color ]\n  ask foragers [\n    ifelse storage > 0\n    [\n      set color blue\n    ][\n      set color red\n    ]\n  ]\nend\n\nto eat\n  ifelse storage >= consumption-rate [\n    set storage storage - consumption-rate\n  ][\n    set storage 0\n  ]\nend\n\nto move\n  if [resources] of patch-here < consumption-rate\n  [\n    let p one-of patches with [not any? foragers-here and resources >= consumption-rate]\n    if p != nobody [move-to p]\n  ]\nend\n\nto regrow-patches\n  if resources < max-plants [\n    set resources resources + growth-rate\n  ]\nend\n\nto make-hills\n  let hills (patch-set patch (max-pxcor * 0.33)(max-pycor * 0.33) patch (max-pxcor * 0.67)(max-pycor * 0.67))\n  ask patches [\n    let dist distance min-one-of hills [ distance myself ]\n    set max-resources max-plants - (dist / (max-pxcor * 0.75) * max-plants)\n    set resources max-resources\n  ]\nend\n\nto make-plain\n  ask patches [\n    set max-resources max-plants\n    set resources max-resources\n  ]\nend\n\n',
		},	
		complexAdvanceOn: function() {
			advanceOnRecompile();
		},	
	},
	{
		text:'<p>'
		+  'Check whether everything works by setting up the model for each <code class="sliderName">hills?</code> mode.'
		+'</p>',
		attachTo:{
			on: 'top',
			element: '.netlogo-model',
		},
	},
	{
		text:'<p>'
		+  'Lastly, change <code class="codeABMA">regrow-patches</code> so that <code class="var">resources</code> regrow to each patch\'s <code class="var">max-resources</code> '
		+  'instead of <code class="var">max-plants</code>.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('#netlogo-code-tab')},
		},
		advanceExampleCode: {
			solution:'to regrow-patches\n  if resources < max-resources [\n    set resources resources + growth-rate\n  ]\nend\n',
			codeExample: function() {
				addExampleCode({text:'  if resources < max-resources [', insertAtText:'resources < max-plants', replace:true});
			},	
			fullCode:'breed [foragers forager]\nglobals [ ]\npatches-own [ resources max-resources]\nforagers-own [ storage ]\n\n\nto setup\n  clear-all\n  ifelse hills? [ make-hills ][ make-plain ]\n  create-foragers number-foragers [\n    set shape "house"\n    set storage 0\n    move-to one-of patches with [not any? foragers-here]\n  ]\n  ;ask patches [\n  ;  set pcolor green\n  ;  set resources 10\n  ;]\n  update-display\n  reset-ticks\nend\n\nto go\n  ask patches [ regrow-patches ]\n  ask foragers [\n    gather\n    eat\n    move\n  ]\n  update-display\n  tick\nend\n\nto gather\n  let current-gather 0\n  ifelse [resources] of patch-here < gather-rate\n  [\n    set current-gather [resources] of patch-here\n  ][\n    set current-gather gather-rate\n  ]\n  ask patch-here [ set resources resources - current-gather ]\n  set storage storage + current-gather\nend\n\nto update-display\n  let max-color max [resources] of patches * 2     \n  ask patches [ set pcolor scale-color green resources 0 max-color ]\n  ask foragers [\n    ifelse storage > 0\n    [\n      set color blue\n    ][\n      set color red\n    ]\n  ]\nend\n\nto eat\n  ifelse storage >= consumption-rate [\n    set storage storage - consumption-rate\n  ][\n    set storage 0\n  ]\nend\n\nto move\n  if [resources] of patch-here < consumption-rate\n  [\n    let p one-of patches with [not any? foragers-here and resources >= consumption-rate]\n    if p != nobody [move-to p]\n  ]\nend\n\nto regrow-patches\n  if resources < max-plants [\n    set resources resources + growth-rate\n  ]\nend\n\nto make-hills\n  let hills (patch-set patch (max-pxcor * 0.33)(max-pycor * 0.33) patch (max-pxcor * 0.67)(max-pycor * 0.67))\n  ask patches [\n    let dist distance min-one-of hills [ distance myself ]\n    set max-resources max-plants - (dist / (max-pxcor * 0.75) * max-plants)\n    set resources max-resources\n  ]\nend\n\nto make-plain\n  ask patches [\n    set max-resources max-plants\n    set resources max-resources\n  ]\nend\n\n',
		},
		complexAdvanceOn: function() {
			advanceOnRecompile();
		},
		
	},
	{
		text:'<p>'
		+  'Try running your model a couple of times with different parameters. How is the foragers\' behavior different when there are hills? How about when '
		+  'there\'s different gather and consumption rates?'
		+'</p>',
		attachTo:{
			on: 'top',
			element: '.netlogo-model',
		},
	},
	{
		text:'<p>'
		+  'By providing patches with more diversity and agency, our model is a lot more interesting! '
		+  'By completing this lesson, you:'
		+'</p>'
		+'<ul>'
		+  '<li>have learned how to create toy landscapes for more complex agent-environment interaction.</li>'
		+'</ul>'
		+'<p>'
		+  'Toy landscapes are particularly useful because they are simple and carefully controlled, making them perfect for better understanding a model\'s dynamics.'
		+'</p>'
		+'<p>'
		+  'In the next lesson, we are going to look at validation and the comparison of simulated results to the archaeological record.'
		+'</p>'
	},
 ]
