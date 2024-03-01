let patches = [
	{
		text:'<h2>'
		+  'Welcome to Patch Agency!'
		+'</h2>'
		+'<p>'
		+  'In this lesson, we will expand our model to investigate agent-environment interaction further, by giving patches more agency.'
		+'</p>'
		+'<p>'
		+  'This lesson is for you if you have completed the first three sets of tutorials and know basic NetLogo syntax, including loops, reporters and lists.'
		+'</p>'
		+'<p>'
		+  'In this lesson, you:'
		+'</p>'
		+'<ul>'
		+  '<li>will learn how to give more agency to patches </li>'
		+'</ul>',
	},
	{
		text:'<p>'
		+  'So far, the patches in our models have been very passive and homogeneous.'
		+'</p>'
		+'<p>'
		+  'However, while patches are immobile, they are agents. This means that like our forager agents, they have agency, the capability to change, and be diverse when needed.'
		+'</p>'
		+'<p>'
		+  'For example, each patch might belong to a different biome - like in tutorial 2\'s model - but the environment might also change.'
		+'</p>',
	},
	{
		text:'<p>'
		+  'Let\'s start off by giving our patches some behavior of their own.'
		+'</p>'
		+'<p>'
		+  'In our current model, there comes a point when all patches have been depleted and foragers stop moving. '
		+  'However, given that one tick represents one month, we would expect (some) resources to reappear in this timeframe.'
		+'</p>'
	},
	{
		text:'<p>'
		+  'Add a new slider on the interface for the  <code class="sliderName">growth-rate</code>, max to 10. '
		+  'This slider will control how much patches can regrow each month/tick, in absolute numbers. When you are done, open the code tab.'
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
		+  'Create a new procedure  <code class="codeABMA">regrow-patches</code>. In it, increase resources by the  <code class="var">growth-rate</code>. '
		+  'In the <code class="codeABMA">go</code> procedure, ask patches to <code class="codeABMA">regrow-patches</code>.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('#netlogo-code-tab')},
		},
		advanceExampleCode: {
			solution:'to go\n  ask patches [ regrow-patches ]\n  ask foragers [\n    gather\n    eat\n    move\n  ]\n  update-display\n  tick\nend\n....\nto regrow-patches\n  set resources resources + growth-rate\nend\n\n',
			codeExample: function() {
				addExampleCode({text:'  ask patches [ regrow-patches ]\n', insertAtText:'to go'});
				addExampleCode({text:'\nto regrow-patches\n  set resources resources + growth-rate\nend\n', insertAtText:'end', instance:5});
			},		
			fullCode:'breed [foragers forager]\nglobals [ ]\npatches-own [ resources ]\nforagers-own [ storage ]\n\n\nto setup\n  clear-all\n  create-foragers number-foragers [\n    set shape "house"\n    set storage 0\n    move-to one-of patches with [not any? foragers-here]\n  ]\n  ask patches [\n    set pcolor green\n    set resources 10\n  ]\n  update-display\n  reset-ticks\nend\n\nto go\n  ask foragers [\n    gather\n    eat\n    move\n  ]\n  update-display\n  tick\nend\n\nto gather\n  let current-gather 0\n  ifelse [resources] of patch-here < gather-rate\n  [\n    set current-gather [resources] of patch-here\n  ][\n    set current-gather gather-rate\n  ]\n  ask patch-here [ set resources resources - current-gather ]\n  set storage storage + current-gather\nend\n\nto update-display\n  let max-color max [resources] of patches * 2     \n  ask patches [ set pcolor scale-color green resources 0 max-color ]\n  ask foragers [\n    ifelse storage > 0\n    [\n      set color blue\n    ][\n      set color red\n    ]\n  ]\nend\n\nto eat\n  ifelse storage >= consumption-rate [\n    set storage storage - consumption-rate\n  ][\n    set storage 0\n  ]\nend\n\nto move\n  if [resources] of patch-here < consumption-rate\n  [\n    let p one-of patches with [not any? foragers-here and resources >= consumption-rate]\n    if p != nobody [move-to p]\n  ]\nend\n',
		},
		complexAdvanceOn: function() {
			advanceOnRecompile();
		},		
	},
	{
		text:'<p>'
		+  'Put the <code class="sliderName">gather-rate</code> higher than the <code class="sliderName">growth-rate</code> and try testing your model.'
		+'</p>', 
		attachTo:{
			on: 'top',
			element: '.netlogo-model',
		},
	},
	{
		text:'<p>'
		+  'You will notice that in the beginning, foragers move away quickly, but after a while, they stay put for longer.'
		+'</p>'
		+'<p>'
		+  'This is because resources are accumulating instead of being depleted and regrowing. We forgot to account for the fact that patches can only have a limited amount of resources!'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=> {
				return getWidgetElement({type:'view'});
			},
		},
	},
	{
		text:'<p>'
		+  'On the interface, include a new slider: <code class="sliderName">max-plants</code>, with an increment and default of 10, and a max of 100.'
		+'</p>',
		attachTo:{
			on: 'top',
			element: '.netlogo-model',
		},
		modalOverlayOpeningPadding:5000
	},
	{
		text:'<p>'
		+  'Next, modify the <code class="codeABMA">regrow-patches</code> procedure so that <code class="var">resources</code> will only increase if the '
		+  '<code class="var">resources</code> are less than the maximum of <code class="var">max-plants</code>.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('#netlogo-code-tab')},
		},
		advanceExampleCode: {
			solution:'\nto regrow-patches\n  if resources < max-plants [\n    set resources resources + growth-rate\n  ]\nend\n',
			codeExample: function() {
				addExampleCode({text:'  if resources < max-plants [\n  ', insertAtText:'growth-rate', position:'at'});
				addExampleCode({text:'  ]\n', insertAtText:'growth-rate',  ignoreDuplicate:true}); //TODO need to test this one last time to see if it works correctly.
			},	
			fullCode: 'breed [foragers forager]\nglobals [ ]\npatches-own [ resources ]\nforagers-own [ storage ]\n\n\nto setup\n  clear-all\n  create-foragers number-foragers [\n    set shape "house"\n    set storage 0\n    move-to one-of patches with [not any? foragers-here]\n  ]\n  ask patches [\n    set pcolor green\n    set resources 10\n  ]\n  update-display\n  reset-ticks\nend\n\nto go\n  ask patches [ regrow-patches ]\n  ask foragers [\n    gather\n    eat\n    move\n  ]\n  update-display\n  tick\nend\n\nto gather\n  let current-gather 0\n  ifelse [resources] of patch-here < gather-rate\n  [\n    set current-gather [resources] of patch-here\n  ][\n    set current-gather gather-rate\n  ]\n  ask patch-here [ set resources resources - current-gather ]\n  set storage storage + current-gather\nend\n\nto update-display\n  let max-color max [resources] of patches * 2     \n  ask patches [ set pcolor scale-color green resources 0 max-color ]\n  ask foragers [\n    ifelse storage > 0\n    [\n      set color blue\n    ][\n      set color red\n    ]\n  ]\nend\n\nto eat\n  ifelse storage >= consumption-rate [\n    set storage storage - consumption-rate\n  ][\n    set storage 0\n  ]\nend\n\nto move\n  if [resources] of patch-here < consumption-rate\n  [\n    let p one-of patches with [not any? foragers-here and resources >= consumption-rate]\n    if p != nobody [move-to p]\n  ]\nend\n\nto regrow-patches\n  set resources resources + growth-rate\nend\n',
		},
		complexAdvanceOn: function() {
			advanceOnRecompile();
		},			
	},
	{
		text:'<p>'
		+  'Try testing your model, varying some of the sliders. What do you notice?'
		+'</p>',
		attachTo:{
			on: 'top',
			element: '.netlogo-model',
		},
	},
	{
		text:'<p>'
		+  'By providing patches with more agency, our model is a more interesting! By completing this lesson, you: '
		+'</p>'
		+'<ul>'
			+'<li>have learned how to give more agency to patches.</li>'
		+'</ul>'
		+'<p>'
		+  'In the next lesson, we are going to look at making landscapes.'
		+'</p>'
	},
 ]
