let disseminationPhase = [
	{
		text:'<h2>'
		+  'The Dissemination Phase'
		+'</h2>'
		+'<p>'
		+  'Hopefully, once your model has been built, tested, and analyzed, you have indeed learned something new! At this point, '
		+  'it is time to put your model and your findings out into the world.'
		+'</p>'
		+'<p>'
		+  'In this lesson, you:'
		+'</p>'
		+'<ul>'
		+  '<li>learn about (the importance of) publishing your models;</li>'
		+  '<li>learn about replication.</li>'
		+'</ul>',
	},
	{
		text:'<p>'
		+  '<b>The Dissemination Phase</b> is the last step of the model development process, but it should not be an afterthought! '
		+  'Modeling is a time-consuming process and properly publishing and documenting your model ensures that your efforts will not go to waste.'
		+'</p>'
		+'<figure>'
		+  '<img src="assets/images/Dissemination_Phase.png" height="75px">'
		+  '<figcaption>The Dissemination Phase, adapted from Romanowska, 2015</figcaption>'
		+'</figure>'
		+'<footer class="citation">'
		+  'Romanowska, Iza. "So you think you can model? A guide to building and evaluating archaeological simulation models of dispersals." <i>Human biology</i> 87, no. 3 (2015): 169-192.'
		+'</footer>'
	},
	{
		text:'<p>'
		+  '<b> Step 9: Publication </b>'
		+'</p>'
		+'<p>'
		+  'Archaeological models follow a slightly different publishing trajectory than traditional types of academic writing. '
		+  'The model will be scrutinized by two sets of experts: domain experts and other modelers, which means that you need to cater to two very diverse audiences.'
		+'</p>'
	},
	{
		text:'<p>'
		+  '<b> Step 9: Publication </b>'
		+'</p>'
		+'<p>'
		+  'It is common to either:'
		+'</p>'
		+'<ul>'
		+  '<li>publish two papers. First, an archaeological publication detailing the research problem and how the model answers the research questions with only a high-level description of the model. Second, a technical publication with a detailed model description including validation, datasets generated, and the script for data analysis;</li>'
		+  '<li> publish one paper but with an extensive Supplementary Information (SI) set of documents where the technical details of the model implementation are contained. </li>'
		+'</ul>',
	},
	{
		text:'<p>'
		+'<b> Step 9: Publication </b>'
		+'</p>'
		+'<p>'
		+  'While the publication of the model’s description and results follows a similar trajectory to other archaeological papers, '
		+  'there is one additional step all modelers need to follow: the publication of the model’s code.'
		+'</p>'
		+'<p>'
		+  'There are several repositories used by scientists to share their code, data, and papers. The one most commonly used in ABM is <a href="https://www.comses.net/">OpenABM/CoMSES</a>, '
		+  'but other platforms such as GitHub are also useful. For example, this ABM, AmphorABM is posted '
		+  '<a href="https://www.comses.net/codebases/c310d351-b629-46ec-a29e-eb365aaa08b4/releases/1.0.0/">on ComSES</a>, as well as on '
		+  '<a href="https://github.com/SantaFeInstitute/ABMA">GitHub</a>.'
		+'</p>'
		+'<p>'
		+  'When you are ready, open the code tab.'
		+'</p>',
		complexAdvanceOn: function() {
			advanceOnTabs({tab:'showCode'});
		},
		attachTo:{
			on: 'top',
			element: '.netlogo-model',
		},
	},
	{
		text:'<p>'
		+  '<b> Step 9: Publication </b>'
		+'</p>'
		+'<p>'
		+  'As mentioned before, proper documentation also consists of commenting on your code, '
		+  'and it is often helpful to include a description of the model embedded if there is a dedicated space for it. '
		+'</p>'
		+'<p>'
		+  'Here, for example, you can see comments with explanation on relevant lines of code. The Model Info tab includes a brief description of the model as well. '
		+  'Taking actions like this will greatly lower the threshold to understanding for anyone looking at your model. '
		+'</p>',
		attachTo:{
			on: 'left',
			element: '.netlogo-tab-area',
		},
	},
	{
		text:'<p>'
		+  '<b> Step 9: Publication </b>'
		+'</p>'
		+'<p>'
		+  'It is also a good practice to use the ODD protocol to document your model in a way that will facilitate its reading, replication, and reuse.'
		+'</p>'
		+'<p>'
		+  'The ODD is generally posted with the model or included in the publication\'s supplementary material.'
		+'</p>'
	},
	{
		text:'<p>'
		+  '<b> Step 9: Publication </b>'
		+'</p>'
		+'<p>'
		+  'ODD stands for Overview, Design Concepts, and Detail, and it is a protocol used to generate a standardized document for describing ABMs. Each ODD contains 7 elements:'
		+'</p>'
		+'<figure>'
		+  '<img src="assets/images/ODD.png" width=300px>'
		+  '<figcaption>Components of the ODD protocol, Grimm et al., 2020</figcaption>'
		+'</figure>'
		+'<p>'
		+  'To see what this looks like, you can check out AmphorABM\'s <a href="https://www.mdpi.com/2073-445X/5/1/5">ODD</a> in the supplementary material.'
		+'</p>'
		+'<p>'
		+  'The most up to date (2020) guidelines for ODDs can be found <a href="https://doi.org/10.18564/jasss.4259"> here </a>'
		+'</p>'
		+'<footer class="citation">'
		+  'Grimm, Volker, Steven F. Railsback, Christian E. Vincenot, Uta Berger, Cara Gallagher, Donald L. DeAngelis, Bruce Edmonds et al. '
		+  '"The ODD protocol for describing agent-based and other simulation models: A second update to improve clarity, replication, and structural realism." '
		+  '<i>Journal of Artificial Societies and Social Simulation </i>23, no. 2 (2020).'
		+'</footer>'
	},
	{
		text:'<p>'
		+  '<b> Step 10: Replication </b>'
		+'</p>'
		+'<p>'
		+  'Of course, the publication is not the end of the road, but the start of a new one altogether!'
		+'</p>'
		+'<p>'
		+  'In an ideal case scenario, your model will not only be read and reviewed but also replicated and built on by others.'
		+'</p>'
		+'<p>'
		+  'Replication of research results is the cornerstone of science. Modeling is no exception. Thus, many of the elements we have discussed (documentation, publication, code-sharing) '
		+  'are designed explicitly to enable replication of the model and, hopefully, its results.'
		+'</p>'
	},
	{
		text:'<p>'
		+  '<b> Step 10: Replication </b>'
		+'</p>'
		+'<p>'
		+  'Many models replicate, while others do not. This is not a problem, since in both cases, we progress our knowledge. '
		+  'It has happened many times in the past that models failed to replicate, meaning that the results reported originally were not upheld. '
		+  'Sometimes, it can show shortcomings in the model\'s documentation, or reveal unintended bugs. Often times, thanks to replication, '
		+  'it is possible to correct mistakes and arrive at valid results.'
		+'</p>'
	},
	{
		text:'<p>'
		+  '<b> Step 10: Replication </b>'
		+'</p>'
		+'<p>'
		+  'This process of replicating simulations, extending them, '
		+  'changing particular elements or combining them with other models in a constant effort to test and retest the underlying conceptual models is what enables cumulative knowledge building thus growing our understanding of societies and their worlds, past and present.'
		+'</p>',
	},
	{
		text:'<p>'
		+  'Modelling is collaborative, and properly disseminating your model and findings is an essential part of the development process. '
		+  'It ensures that you and others can learn from and build on your efforts.'
		+'</p>'
		+'<p> In this lesson, you have learned about: </p>'
		+'<ul>'
		+  '<li>(the importance of) publishing your models;</li>'
		+  '<li>replication.</li>'
		+'</ul>'
		+'<p>'
		+  'To learn more, check out the CoMSES library for examples of model publication, and the articles published about the ODD protocol. '
		+  'Some nice replication studies can be found here:'
		+'</p>'
		+'<ul>Wilensky, U. and Rand, W., 2007. Making models match: Replicating an agent-based model. Journal of Artificial Societies and Social Simulation, 10(4), p.2. </ul>'
		+'<ul>Janssen, M.A., 2009. Understanding artificial anasazi. Journal of Artificial Societies and Social Simulation, 12(4), p.13.</ul>'
		+'<ul>Carney, M. and Davies, B., 2020. Agent-based modeling, scientific reproducibility, and taphonomy: A successful model implementation case study. Journal of Computer Applications in Archaeology, 3(1). </ul>'
	},
 ];
