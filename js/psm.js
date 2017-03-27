// the globals
var chordDB = new ChordDB();
var selectedMood = chordDB.chordMoods[0];
var selectedChord = chordDB.majorChords["E"];
var chartSelectedMood = chordDB.chordMoods[0];
var chordChart = []; // [ { root : "A", chord : chordDB.majorChords["A"], selectedPosition: 0, selectedMood: chordDB.chordMoods[0] } ]

$( document ).ready(function() {
	// init the chord positions panel - chord/mood selectors and chord positions
	moodSelector = new TemplatedSelector(chordDB.chordMoods, '#moodSelector', '#tmplMoodSelector', function(mood){
		selectedMood = mood;
		updateSelectedChord(selectedChord);
	}, selectedMood, 'active');
	chordSelector = new TemplatedSelector(chordDB.chordNames, '#chordSelector', '#tmplChordSelector', function(chord){
		updateSelectedChord(chord);
	}, selectedChord, 'active');
	chordPositions = new ChordPositions(selectedChord, '#chordPositions', '#tmplChordPositions');

	// init the chord chart panel
	chartMoodSelector = new TemplatedSelector(chordDB.chordMoods, '#chartMoodSelector', '#tmplChartMoodSelector', function(mood){
		chartSelectedMood = mood;
		chartChordSelector.mood = mood;
	}, chartSelectedMood, 'active');
	chartChordSelector = new ChordChartSelector(chordDB.chordNames, '#chartChordSelector', '#tmplChartChordSelector', chartSelectedMood);
	chartChords = new ChordChart(chordChart, '#chordChart', '#tmplChordChart', onNoteDropped);

	// render the chord positions components
	moodSelector.render();
	chordSelector.render();
	chordPositions.render();
	// render the chord chart components
	chartMoodSelector.render();
	chartChordSelector.render();
	chartChords.render();
});

updateSelectedChord = function(chord) {
	if ( selectedMood.name == "maj") {
		selectedChord = chordDB.majorChords[chord.name];
	} else {
		selectedChord = chordDB.minorChords[chord.name];
	}
	chordPositions.update(selectedChord);
}

onNoteDropped = function(data, position) {
	var note = data.root;
	var chord = (chartSelectedMood.name=="maj") ? chordDB.majorChords[note] : chordDB.minorChords[note];

	var chordPos = 0; // todo select chordPos based on siblings position to select closest spot on the neck ??

	var chartPos = parseInt(position);
	if ( data.dragType == "copy" ) {
		var chordData = { root: note, chord: chord, selectedPosition: chordPos, selectedMood: data.mood };
		if ( isNaN(chartPos) ) {
			console.log("Drag-copy, no position, inserting at end");
			chordChart[chordChart.length] = chordData;
		} else {
			console.log("Drag-copy, with position of: " + chartPos);
			chordChart.splice(chartPos, 0, chordData);
		}
	} else {
		var origPos = data.originalPosition;
		var chart = chordChart;
    	var oitm = chart[origPos];
		chordChart.splice(origPos, 1);
		if ( isNaN(chartPos) ) {
			console.log("Drag-move, no destination position, moving to end: " + origPos);
			chordChart[chordChart.length] = oitm;
		} else {
			console.log("Drag-move, with destination position of: " + chartPos + ", moving item: " + origPos);
        	chordChart.splice(chartPos, 0, oitm);
		}
	}

	chartChords.update(chordChart);
}
