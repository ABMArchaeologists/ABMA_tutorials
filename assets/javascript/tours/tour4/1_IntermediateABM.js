let intermediateABM = [
	{
		text:'<h2>Welcome to Intermediate ABM!</h2>'
		+'<p>'
		+  'In this tutorial, we\'ll start putting together many of the elements of NetLogo that you\'ve learned about in the previous tutorials, such as loops, breeds, and '
		+  'lists to create more complex code structures. You will be able to consolidate the skills acquired and see them being used in a new context. '
		+  'By the end of this tutorial, you will know how to develop a full simulation out of code modules. '
		+  'We will also look at our models as controlled scientific experiments and discuss how to parametrize, validate, and run them to obtain meaningful results.'
		+'</p>'
		+'<p>'
		+  'If you found yourself here but are not sure what ABM or NetLogo is, head to Tutorial 1 and Tutorial 2 respectively. '
		+  'These will introduce you to the technique and basic concepts. We assume you know basic NetLogo structures and syntax so if you need a refresher look at Tutorial 3.  '
		+'</p>'
		+'<p>'
		+  'If you instead want to learn more about the Model Developement process and all it entails, head over to Tutorial 5.'
		+'</p>',
	},
	{
		text: '<p>'
		+  'This set of tutorials is based on the well-known subsistence model the Sugarscape model, originally built by Joshua M. Epstein and Robert Axtell. '
		+  'SugarScape is a resource-subtraction model where agents consume resources distributed unevenly over an abstract landscape.'
		+'</p>'
		+'<p>'
		+  'This model was the basis for perhaps the most well-known ABM in archaeology: Artificial Anasazi, which we showed you in tutorial 1. '
		+'</p>'
		+'<p>'
		+  'In modeling it is very common to start from one of the canonic models and then adapt it to one\'s particular needs. '
		+  'We will learn more about these canonic models in the next tutorial.'
		+'</p>'
		+'<p>'
		+  'Setup your model i.e. click setup.'
		+'</p>'
		+'<footer class="citation">'
		+  'Epstein, J.M. and Axtell, R., 1996. Growing artificial societies: social science from the bottom up. Brookings Institution Press.'
		+'</footer>',
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
		+  'The SugarScape has three main components., which are now visible.'
		+'</p>'
		+'<p>'
		+  'Firstly, agents, which are blue houses in this version. '
		+  'Agents can be imagined as individuals whose one goal is to collect and metabolize as much resource (sugar) as possible. '
		+  'They have some limited sensing ability that allows them to detect where to find sugar.'
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=> {
				return getWidgetElement({type:'view'});
			},
		},
		when: { 
			show: function () {
				session.run('me','watch turtle 0'); 
			},
		}
	},
	{
		text: '<p>Secondly, space! </p>'
		+'<p>'
		+  'Agents move through space with two "hills" of sugars. '
		+  'When they collect sugar they decrease it for other agents. In later iterations of the model, they can also exchange and trade sugar. '
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=> {
				return getWidgetElement({type:'view'});
			},
		},
		when: { 
			show: function () {
				session.run('me','reset-perspective'); 
			},
		}
	},
	{
		text: '<p>Last: resources or sugar. </p>'
		+'<p>'
		+  'Sugar is a universal resource available to all agents. However, it is distributed over space in a particular way - the lighter green the patch, the more sugar. '
		+'</p>',
		attachTo:{
			on: 'left',
			element: ()=> {
				return getWidgetElement({type:'view'});
			},
		},
	},
	{
		text: '<p>'
		+  'In its simplest form, SugarScape is an economic model; sugar is a general stand-in for resources/wealth, and the model can be used to investigate wealth distribution and inequality. '
		+  'In NetLogo Desktop you can view three different implementations of this original premise. '
		+  'It has also been expanded to encorporate behavior for pollution, trade, disease transmission and reproduction, to name a few.'
		+'</p>'
	},
	{
		text: '<p>'
		+  'The SugarScape model also forms the basis for the Artificial Anasazi model, developed by Axtell et al. This model was built to study the occupation of the Anasazi in the Long House Valley in Arizona'
		+  'These Ancestral Pueblo people settled in the region in the early 6th-7th century AD, and continued farming maize there until around 1300, when the valley was abandoned in favor of a move to current-day New Mexico. </p>'
		+'<p>'
		+  'The Artificial Anasazi model was developed to examine why the Anasazi may have left the Long House Valley, and in particular, whether the abandonment could be explained by environmental factors. '
		+'</p>'
		+'<p>'
		+  'For a more in-depth look into the Artificial Anasazi model, please go to tutorial 1. '
		+'</p>'
		+'<footer class="citation">'
		+  'Axtell, Robert L., Joshua M. Epstein, Jeffrey S. Dean, George J. Gumerman, Alan C. Swedlund, Jason Harburger, Shubha Chakravarty, Ross Hammond, Jon Parker, and Miles Parker. "Population growth and collapse in a multiagent model of the Kayenta Anasazi in Long House Valley." <i>Proceedings of the National Academy of Sciences </i>99, no. suppl_3 (2002): 7275-7279.'
		+'</footer>'
	},
	{
		text: '<p>'
		+  'In this set of tutorials we will implement a simple replication of the SugarScape model to study archaeological data patterns, that can be expanded into the Artificial Anasazi model. '
		+'</p>'
		+'<p>'
		+  'To get started, please press the Next button below.'
		+'</p>'
	},
 ];
