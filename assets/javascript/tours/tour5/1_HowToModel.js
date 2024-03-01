let howToModel = [
	{
		text:'<h2>'
		+  'Welcome to Model Developement'
		+'</h2>'
		+'<p>'
		+  'This tutorial will be a bit different than the previous ones! '
		+'</p>'
		+'<p>'
		+  'There will be notably less coding involved. Instead, we will go through the phases of the <b>model development process</b> step-by-step, '
		+  'discuss the challenges, and provide a few neat tricks to deal with them. '
		+  'This more methodological-oriented look will enable us to recap the lessons learned so far and to consolidate the higher-level understanding of modeling as a scientific technique for theory building.'
		+'</p>'
		+'<p>'
		+  'We will also provide exercises in the form of quizzes and tasks, as well as links to further resources for you to explore at will.'
		+  '</p>' 
		+'<p>'
		+  'By the end of this tutorial, you will have everything needed to start building your models on your own! '
		+'</p>'
		+'<p>'
		+  'This lesson briefly introduces the topic of this tutorial and AmphorABM, the ABM we will be using as a backdrop. '
		+'</p>',
	},
	{
		text:'<p>'
		+  'So far, we have focussed on gaining some practical programming experience in NetLogo Web.'
		+'</p>'
		+'<p>'
		+  'However, modelling is not <b>just</b> about coding. Rather, it is just as, if not more(!), important to properly conceptualize your coding choices, understand their implications, '
		+  'create good experiments, and analyze the output of your experiments in a way that is methodologically sound.'
		+'</p>'
	},
	{
		text:'<p>'
		+  'Roughly speaking and in an ideal scenario, there are three phases to modeling:'
		+'</p>'
		+'<figure>'
		+  '<img src="assets/images/modelphases.png" height="300px">'
		+  '<figcaption>Model Developement Process, Romanowska, 2015</figcaption>'
		+'</figure>' 
		+'<p>'
		+  'In <b>the Conceptual Phase</b>, you frame the research question(s), choose the most appropriate methodology, and develop the ontology of the model.'
		+'</p>'
		+'<p>'
		+  'In <b>the Technical Phase</b>, you implement the conceptual model, run and interpretate it.'
		+'</p>'
		+'<p>'
		+  'In <b>the Dissemination Phase</b>, you publish the model, and, ideally, it is then replicated by others.'
		+'</p>'
		+'<p>'
		+  'In the next couple of lessons, we will be going through these phases and the steps they contain in more detail, gradually taking you through the modeling process.'
		+'</p>'
		+'<footer class="citation">'
		+  'Romanowska, Iza. "So you think you can model? A guide to building and evaluating archaeological simulation models of dispersals." <i>Human biology</i> 87, no. 3 (2015): 169-192.'
		+'</footer>'
	},
	{
		text:'<p>'
		+  'In the next lessons, we will go through the model development process step-by-step against the backdrop of this Agent-based model here: AmphorABM, developed by Stefani A. Crabtree.'
		+'</p>'
		+'<p>'
		+  'We will refer back to it occasionally, but we will also provide different examples.'
		+'</p>',
		attachTo:{
			on: 'right',
			element: '.netlogo-display-vertical',
		},
		modalOverlayOpeningPadding:5000,
	},
	{
		text:'<p>'
		+  'Open up the \'Model Info\' tab.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: '.netlogo-tab-area .netlogo-tab:nth-of-type(3)',
		},
		complexAdvanceOn: function() {
			advanceOnTabs({tab:'showInfo'});  
		},
	},
	{
		text:'<p>'
		+  'Read the contents of the Model Info tab to get some background on this model.'
		+'</p>'
		+'<p>'
		+  'This model was built to examine the transition from one type of artifact to another, namely Etruscan-produced amphorae and Greek-produced amphorae, and the wine contained in them, '
		+  'in southern Gaul (France), as seen in the period from 600 to 100 BC. Grapes are not local to this region, but the Gaulish elite consumed imported wine. '
		+  'Around 500 BC, Etruscan amphorae quickly gave way to Greek ones.'
		+'</p>'
		+'<p>'
		+  'If you want, you can check out the linked publication and the associated supplementary materials for more information.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return document.querySelector('.netlogo-tab-content, .netlogo-info')},
		},
	},
	{
		text:'<p>'
		+  'Setup the model.'
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
		+  'As you can see, the landscape is simplified and stylized. Patches are differentiated by their color. '
		+  'Blue patches represent water, standing in for the sea in the south, lime patches denote the littoral zone along which wine can be produced, '
		+  'and green and brown patches are land for grain production.'
		+'</p>'
		+'<p>'
		+  'So far, there\'s only one agent type visible in red, representing the original Gaulish population.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=>{return getWidgetElement({type:'view'})},
		},
	},
	{
		text:'<p>'
		+  'Try running the model.'
		+'</p>'
		+'<p>'
		+  'In this case, each tick denotes a year and the simulation will run until 500 ticks/years are reached.'
		+'</p>'
		+'<p>'
		+  'Gradually, you will see new agents appearing in blue and orange - Etruscan and Greek colonists respectively - and patches changing as they are being exploited.'
		+'</p>'
		+'<p>'
		+  'You will also see the two plots - one tracking each population, one tracking the amount of wine - dynamically updating as the simulation progresses.'
		+'</p>'
		+'<p>'
		+  'Feel free to experiment with the <code class="sliderName">weighted-trade-choice</code> slider as suggested in the Model info to see how this affects wine and population numbers. '
		+  'This slider controls who Gauls will prefer to trade with: the closer to 0 the more Etruscan wine is favored, the closer to 100, the more Greek wine is.'
		+'</p>',
		attachTo:{
			on: 'right',
			element: '.netlogo-display-vertical',
		},
	},
	{
		text:'<p>'
		+  'Once you\'re satisfied, make sure the model is stopped (make sure the <code class="buttonName">go</code> button is unpressed) and click \'Next\' below. '
		+  'We will examine this model further in the next lessons, but, for now, it is enough to have a general impression.'
		+'</p>',
		attachTo:{
			on: 'right',
			element: '.netlogo-display-vertical',
		},
	},
	{
		text:'<p>'
		+  'This lesson briefly introduced the modeling process and the AmphorABM which we will be using as a backdrop throughout this tutorial. '
		+  'The model process introduced in the lessons here is an ideal scenario representing best practices. '
		+  'The next lesson will get into <b>the Conceptual Phase</b> of the modeling process, some of its challenges, and best practices. When you\'re ready click \'Next\'.'
		+'</p>',	
	},
	
 ];
