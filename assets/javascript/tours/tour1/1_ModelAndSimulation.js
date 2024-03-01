let modelAndSimulation = [
	{
		text:'<h2>'
		+  'Welcome to Agent-based Modelling for Archaeologists!*'
		+'</h2>'
		+'<p>'
		+  'In this tutorial we will introduce some basic definitions and concepts in modeling and simulation.'
		+'</p>'
		+'<p>'
		+  'If you already have some familiarity with these concepts, please skip to the next lesson. '
		+  'If you already have some background in ABM and would like to learn how to build models yourself, please skip to the next tutorial.'
		+'</p>'
		+'<p>'
		+  '<b>*</b> this is for everyone wanting to learning Agent-based Modelling, not just archaeologists, but the examples used are archaeology related, '
		+  'and many of the "why" discussions are archaeology focused so knowledge of archaeology will help there.'
		+'</p>',
	},
	{
		text:'<p>'
		+  'At the end of this lesson you will:'
		+'</p>'
		+'<ul>'
			+'<li>have been introduced to modeling and simulation;</li>'
			+'<li>know the difference between bottom-up and top-down approaches;</li>'
			+'<li>have been introduced to the concepts of emergence and complexity.</li>'
		+'</ul>',
	},
	{
		text: '<p>'
		+  'Let\'s take a look at this model, please click the <code class="buttonName">setup</code> button to trigger the initialization phase. '
		+'</p>',
		attachTo:{
			on: 'right',
			element: ()=> { 
				return getWidgetElement({type:'button', source:'setup'}); 
			},
		}, 
		complexAdvanceOn: function() {
				advanceOnButtonClick({type:'button', source:'setup'}); 
		},
	},
	{
		text: '<p>'
		+  'As archaeologists we uncover traces of past human behavior. However, we are not just interested in these traces themselves, '
		+  'but also in what they can tell us about human behavior in the past. '
		+'</p>'
		+'<p>'
		+  'Let\'s start with the example represented here by the model: <b>Out-of-Africa dispersal</b>. '
		+  'To start, we might map all available and dated early human remains and try to reconstruct a general dispersal pattern from this. '
		+  'Still, that will leave us with several questions, especially about the <b>how</b> and <b>why</b> this dispersal might have occurred.'
		+'</p>'
		+'<p>'
		+  'What if you wanted to explore what drove Out-of-Africa dispersal in more detail? This is where simulation comes to the rescue!'
		+'</p>',
		attachTo:{
			on: 'right',
			element: ()=> { 
				return getWidgetElement({type:'view'}); 
			},
		},	
	}, 
	{
		text: '<p>'
		+  'This model here is based on Young & Bettinger’s simulation of the first <b>Out of Africa</b> dispersal of Homo Sapiens.'
		+'</p>'
		+'<p>'
		+  'This simulation demonstrates that the general patterns of early dispersal could largely be explained based on geography alone. '
		+'</p>'
		+'<p>'
		+  'The simulation will stop at 100 ticks and you will be able to move forward after that.'
		+'</p>'
		+'<footer class="citation">' 
		+  'Young, D.A. and Bettinger, R.L., 1995. Simulating the global human expansion in the Late Pleistocene. <i>Journal of Archaeological Science</i>, 22(1), pp.89-92. '
		+'</footer>',
		attachTo:{
			on: 'right',
			element: '.netlogo-display-vertical',
		},
		when: { 
			show: function () {
				Ractive.getContext(getWidgetElement({type:'button', source:'go'})).set('widget.running', true);
			},
		},
		complexAdvanceOn: function() {
				stopAtTicks({ticks:100, activeButton:getWidgetElement({type:'button', source:'go'}), action:enableNextButton}); 
		},
		buttons: disabledNextButtons,
	}, 
	{
		text: '<h3>'
		+  'Modeling and Simulation'
		+'</h3>'
		+'<p>'
		+  'Let\'s backtrack a bit and go over some definitions.'
		+'</p>'
		+'<p>'
		+  'Firstly, a <b>model</b> is an abstract, simplified representation of a piece of reality. '
		+  'Importantly, it preserves only some (relevant) aspects of reality, meaning multiple models of the same reality are possible. '
		+  'How a model is defined relates primarily to its <b>purpose</b>. For example, this drawing of a cat:'
		+'</p>'
		+'<img src="assets/images/Cat_Drawing.jpg" class="ABMAcatImage" alt="drawing of a cat head">  '
		+'<p>'
		+  'and the <span class="ABMAcatEmoticon">🐱</span> emoticon are both models of a cat. '
		+  'But, they differ in representation, because they serve a different purpose!'
		+'</p>'
		+'<p class="citation">'
		+  'Cat image by Ravi Gundal, CC BY-SA 4.0 <https://creativecommons.org/licenses/by-sa/4.0>, via Wikimedia Commons'
		+'</p>',		
	},
	{
		text: '<h3>'
		+  'Modeling and Simulation'
		+'</h3>'
		+'<p>'
		+  'As archaeologists, we model all the time. Any time you try to connect the archaeological data to past behavior you are essentially defining a model! '
		+  'However, usually, the models we use are verbal or informal. '
		+'</p>'
		+'<p>'
		+  '<b>Formal models</b>, on the other hand, are more explicitely defined, and usually expressed mathematically, with logical statements, and/or in computer code.'
		+'</p>',
	},
	{
		text: '<h3>'
		+  'Modeling and Simulation'
		+'</h3>'
		+'<p>'
		+  'Last, but not least: <b>Simulation</b>.'
		+'</p>'
		+'<p>'
		+  'At the core of each simulation is a formal model, so an abstract, simplified representation of a piece of reality. '
		+  'However, a simulation differs from a static model in that it also incorporates a temporal dimension. '
		+  'Time is explicitly modeled, which makes it so that the simulation can represent change and generate patterns throughout its run.'
		+'</p>',
		attachTo:{
			on: 'right',
			element: ()=> { 
				return getWidgetElement({type:'view'}); 
			},
		},
	},
	{
		text:'<h3>'
		+  'Top-down versus Bottom-up Simulation'
		+'</h3>' 
		+'<p>'
		+  'There are different simulation approaches, some top-down, some bottom-up.'
		+'</p>'
		+'<p>'
		+  'Top-down simulation focuses on describing global patterns from the get-go. '
		+  'For example, the original Young & Bettinger\’s model was based on an equation that pre-determines how the population will grow and move.'
		+'</p>',
	},
	{
		text:'<h3>'
		+  'Top-down versus Bottom-up Simulation'
		+'</h3>' 
		+'<p>'
		+  'On the other hand, a bottom-up approach focuses on modeling the behavior of smaller components. '
		+  'Here, Young & Bettinger\'s model is reimplemented as a bottom-up simulation, '
		+  'where the starting point is giving each hominin (agent) specific rules of behavior of when and where to reproduce.'
		+'</p>'
		+'<p>'
		+  'These tutorials are dedicated to agent-based modeling, which is also a type of bottom-up simulation; the next lesson will go into more depth.'
		+'</p>',
		attachTo:{
			on: 'right',
			element: ()=> { 
				return getWidgetElement({type:'view'}); 
			},
		},
	},
	{
		text: '<h3>'
		+  'Complexity and emergence'
		+'</h3>'
		+'<p>' 
		+'Even though only simple rules of behavior of agents are modeled here, an interesting global pattern emerges. '
		+'This is one of the strengths of bottom-up simulation: they are well suited to studying emergence and complex systems!'
		+'</p>'
		+'<p>'
		+  '<b>Emergence</b> is when macro-scale patterns in a system result from the micro-scale interactions of a system\'s parts.'
		+'</p>'
		+'<p>'
		+  'Related to emergence is the concept of <b>complexity</b>. Climate, the brain, ocean ecosystems, proteins, traffic jams, human societies: '
		+  'there are many systems that we describe as complex. '
		+  '<b>Complex systems</b> are systems composed of many individual elements which interact with each other in ways that lead to complex outcomes. \'Complex\', '
		+  'in this case, means not that the outcomes are necessarily complicated. '
		+  'Rather, it means that the outcomes would be difficult to predict by only studying the characteristics of the individual elements. '
		+'</p>',
		beforeShowPromise: function () {
			return new Promise(function(resolve) {
				setLessonState({nlogo:FlockingState, path:'Welcome to ABM'});
				observeLoadingOverlayChange({action:resolve});
			});
		},
	},
	{
		text:'<p>'
		+  'Let\'s look at and example of emergence. In this model, we have replaced the Out of Africa model with one called Flock, '
		+  'the flocking of birds emerges from each bird following the exact same set of rules, which is unpredictable. '
		+  'To start, click the  <code class="buttonName">setup</code> button to trigger the initialization phase.'
		+'</p>',
		attachTo:{
			on: 'right',
			element: ()=> { 
				return getWidgetElement({type:'button', source:'setup'}); 
			},
		}, 
		complexAdvanceOn: function() {
				advanceOnButtonClick({type:'button', source:'setup'}); 
		},
	},
	{
		text:'<p>'
		+  'Now that you have has initialized the model, click the <code class="buttonName">go</code> button.'
		+'</p>',
		attachTo:{
			on: 'right',
			element: ()=> { 
				return getWidgetElement({type:'button', source:'go'}); 
			},
		}, 
		complexAdvanceOn: function() {
				advanceOnButtonClick({type:'button', source:'go'}); 
		},
	},
	{
		text:'<p>'
		+  'Watch the model for a while to see <b>Emergence</b> in action. When you are ready to stop click the <code class="buttonName">go</code> button again.'
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
		+  'Many archaeological questions can be fruitfully approached with simulation. '
		+  'Simulation is commonly used when researchers cannot directly access, observe, and experiment on the system they want to study. The past is one such inaccessible system.'
		+'</p>'
		+'<p>'
		+  'This lesson has briefly introduced modeling and simulation, and some of the key concepts behind their use. '
		+  'A good overview of simulation methods in Archaeology can be found <a href = "https://link.springer.com/article/10.1007/s10816-013-9188-1">here</a>.'
		+'</p>'
		+'<p>'
		+  'By far the most popular form of simulation in Archaeology is <b>Agent-based Modeling</b>.'
		+'</p>'
		+'<p>'
		+  'The next lesson introduces Agent-based modeling and its key components. To continue, please press Next.'
		+'</p>'	
	},
 ];