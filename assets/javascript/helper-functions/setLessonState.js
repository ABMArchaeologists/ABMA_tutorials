//nlogoScript     = document.querySelector('#nlogo-code')
//  taken from example of how to import here: Galapagos/app/assets/javascripts/pages/simulation.js

function setLessonState (props) {
	let { nlogo, path, documentTile = 'Learn ABM' } = props;
	window.postMessage({
		nlogo: nlogo,
		path: 'test',
		type: "nlw-load-model"
	  }, "*")
}