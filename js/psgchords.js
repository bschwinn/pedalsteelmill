var app = angular.module('psgchordsApp',['psgchords.controllers']);

angular.module('psgchords.controllers', []).controller('psgchordsController', ['$scope', function ($scope) {

    // chord names and labels
	$scope.chordNames = [
		{ "name": "E", "label": "E"}
		,{ "name": "F", "label": "F"}
		,{ "name": "F#", "label": "F#/Gb"}
		,{ "name": "G", "label": "G"}
		,{ "name": "G#", "label": "G#/Ab"}
		,{ "name": "A", "label": "A"}
		,{ "name": "A#", "label": "A#/Bb"}
		,{ "name": "B", "label": "B"}
		,{ "name": "C", "label": "C"}
		,{ "name": "C#", "label": "C#/Db"}
		,{ "name": "D", "label": "D"}
		,{ "name": "D#", "label": "D#/Eb" }
	];
    // chord moods
	$scope.chordMoods = [
		{ "name": "maj", "label": "Major"}
		,{ "name": "min", "label": "Minor"}
	];

    // utility routines for populating the chords "DB"
	createAllMajorChords = function(noteOffset) {
		var chordMap = {}
		for ( var i=0; i<$scope.chordNames.length; i++ ) {
			var chordName = $scope.chordNames[i].name;
			chordMap[chordName] = createMajorChord(chordName, i);
		}
		return chordMap;
	}
	createAllMinorChords = function(noteOffset) {
		var chordMap = {}
		for ( var i=0; i<$scope.chordNames.length; i++ ) {
			var chordName = $scope.chordNames[i].name;
			chordMap[chordName] = createMinorChord(chordName, i);
		}
		return chordMap;
	}
	createMajorChord = function(note, noteOffset) {
		var positions = [];
		positions[positions.length] = createMajorPosition(note, noteOffset, [], [], [0, 0, 1, 1, 1, 1, 0, 1, 0, 1]);
		positions[positions.length] = createMajorPosition(note, 3+noteOffset, ["A"], ["LKL"], [0, 0, 1, 1, 1, 1, 0, 1, 0, 1]);
		positions[positions.length] = createMajorPosition(note, 5+noteOffset, [], ["LKR", "RKL"], [0, 0, 1, 1, 1, 1, 0, 1, 0, 1]);
		positions[positions.length] = createMajorPosition(note, 7+noteOffset, ["A","B"], [], [0, 0, 1, 1, 1, 1, 0, 1, 0, 1]);
		return { "name" : $scope.chordNames[noteOffset].name, "type" : "maj", "positions": positions };
	}
	createMinorChord = function(note, noteOffset) {
		var positions = [];
		positions[positions.length] = createMajorPosition(note, noteOffset, ["B"], ["RKL"], [0, 0, 0, 1, 1, 1, 0, 1, 0, 1]);
		positions[positions.length] = createMajorPosition(note, 3+noteOffset, ["A"], [], [0, 0, 1, 1, 1, 1, 0, 1, 0, 1]);
		positions[positions.length] = createMajorPosition(note, 7+noteOffset, ["A", "B"], ["LKV"], [0, 0, 1, 1, 1, 1, 0, 1, 0, 1]);
		positions[positions.length] = createMajorPosition(note, 10+noteOffset, ["B", "C"], [], [0, 0, 1, 1, 1, 1, 0, 0, 0, 0]);
		return { "name" : $scope.chordNames[noteOffset].name, "type" : "min", "positions": positions };
	}
	createMajorPosition = function(note, noteOffset, pedals, levers, stringMask) {
		var strings = new Array();
		for( var i=0; i<stringMask.length; i++ ) {
			strings[strings.length] = { note: findNoteForOffset(noteOffset, i, pedals, levers), enabled: stringMask[i] };
		}
		return { "root": note, "fret" : 0+noteOffset, "pedals" : pedals, "levers" : levers, "strings" : strings };
	}
	findNoteForOffset = function(offset, string, pedals, levers) {
		var stringNoteOffsets = [2, 11, 4, 0, 7, 4, 2, 0, 10, 7];
		if ( pedals.indexOf("A") > -1 ) {
			stringNoteOffsets[4] = stringNoteOffsets[4] + 2;
			stringNoteOffsets[9] = stringNoteOffsets[9] + 2;
		}
		if ( pedals.indexOf("B") > -1 ) {
			stringNoteOffsets[2] = stringNoteOffsets[2] + 1;
			stringNoteOffsets[5] = stringNoteOffsets[5] + 1;
		}
		if ( pedals.indexOf("C") > -1 ) {
			stringNoteOffsets[3] = stringNoteOffsets[3] + 2;
			stringNoteOffsets[4] = stringNoteOffsets[4] + 2;
		}
		if ( levers.indexOf("LKL") > -1 ) {
			stringNoteOffsets[3] = stringNoteOffsets[3] + 1;
			stringNoteOffsets[7] = stringNoteOffsets[7] + 1;
		}
		if ( levers.indexOf("LKR") > -1 ) {
			stringNoteOffsets[3] = stringNoteOffsets[3] - 1;
			stringNoteOffsets[7] = stringNoteOffsets[7] - 1;
		}
		if ( levers.indexOf("LKV") > -1 ) {
			stringNoteOffsets[4] = stringNoteOffsets[4] - 1;
			stringNoteOffsets[9] = stringNoteOffsets[9] - 1;
		}
		if ( levers.indexOf("RKL") > -1 ) {
			stringNoteOffsets[2] = stringNoteOffsets[2] - 2;
			stringNoteOffsets[5] = stringNoteOffsets[5] - 2;
		}
		for( var i=0; i<stringNoteOffsets.length; i++ ) {
			if ( stringNoteOffsets[i] < 0 ) {
				stringNoteOffsets[i] = 12 + stringNoteOffsets[i];
			}
		}
		return $scope.chordNames[(offset + stringNoteOffsets[string]) % 12].name;
	}
	updateSelectedChord = function(chord) {
		if ( $scope.selectedMood.name == "maj") {
			$scope.selectedChord = $scope.majorChords[chord.name];
		} else {
			$scope.selectedChord = $scope.minorChords[chord.name];
		}
	}

	// populate major and minor chord details
	$scope.majorChords = createAllMajorChords();
	$scope.minorChords = createAllMinorChords();

	// init chord inspector data
    $scope.selectedMood = $scope.chordMoods[0];
    $scope.selectedChord = $scope.majorChords["E"];

    // init chord chart data
    $scope.chartSelectedMood = $scope.chordMoods[0];
    $scope.chordChart = [];  // [ { root : "A", chord : $scope.majorChords["A"], selectedPosition: 0, selectedMood: $scope.chordMoods[0] } ]

    // selection listeners
	$scope.onChordSelected = function(chord) {
		updateSelectedChord(chord);
	}
	$scope.onMoodSelected = function(mood) {
		$scope.selectedMood = mood;
		updateSelectedChord($scope.selectedChord);
	}
	$scope.onChartMoodSelected = function(mood) {
		$scope.chartSelectedMood = mood;
	}

	// chord dropped handler
	$scope.chordDropped = function(dropData, elem) {

		var chordName = dropData.root;
		var dragType = dropData.dragType;
		var chordMood = ($scope.chartSelectedMood.name == "maj") ? $scope.chordMoods[0] : $scope.chordMoods[1];
		var theChord = null;
		if ( chordMood.name == "maj") {
			theChord = $scope.majorChords[chordName];
		} else {
			theChord = $scope.minorChords[chordName];
		}
		var chordPos = 0; // todo select chordPos based on siblings position to select closest spot on the neck ??

		var chartPos = parseInt(elem);
		if ( dragType == "copy" ) {
			var chordData = { root: chordName, chord: theChord, selectedPosition: chordPos, selectedMood: chordMood };
			if ( isNaN(chartPos) ) {
				console.log("Drag-copy, no position, inserting at end");
		        $scope.$apply(function() {
					$scope.chordChart[$scope.chordChart.length] = chordData;
		        });
			} else {
				console.log("Drag-copy, with position of: " + chartPos);
		        $scope.$apply(function() {
					$scope.chordChart.splice(chartPos, 0, chordData);
		        });
			}
		} else {
			var origPos = dropData.originalPosition;
			var chart = $scope.chordChart;
        	var oitm = chart[origPos];
			chart.splice(origPos, 1);
			if ( isNaN(chartPos) ) {
				console.log("Drag-move, no destination position, moving to end: " + origPos);
				chart[chart.length] = oitm;
			} else {
				console.log("Drag-move, with destination position of: " + chartPos + ", moving item: " + origPos);
	        	chart.splice(chartPos, 0, oitm);
			}
	        $scope.$apply(function() {
				$scope.chordChart = chart;
	        });
		}
	}

	// delete handler for chord chart
	$scope.deleteChordFromChart = function(index) {
		console.log("Deleting chord from chart, index: " + index);
		$scope.chordChart.splice(index, 1);
	}

}]);

app.directive( "psgDraggable", [ "$rootScope", "$parse", function($rootScope, $parse) {
	return {
		restrict: "A",
		link : function(scope, el, attrs, controller) {
			
			angular.element(el).attr("draggable", "true");

            el.bind("dragstart", function (e) {
            	var chordName = ( angular.isUndefined(scope.chord) ) ? el.attr("chordname") : scope.chord.name;
            	var dragType = el.attr("dragtype");
            	var dragData = { root: chordName, dragType: dragType, originalPosition: el.attr("id") };
                e.originalEvent.dataTransfer.setData('text', JSON.stringify(dragData));
                $rootScope.$emit("PSG-DRAG-START");
            });

            el.bind("dragend", function (e) {
                $rootScope.$emit("PSG-DRAG-END");
            });

		}
	}
}]);

app.directive( "psgDroppable", [ "$rootScope", function($rootScope) {
	return {
		restrict: "A",
		scope: { onDrop: '&' },
		link: function(scope, el, attrs, controller) {

			el.bind("dragover", function(e) {
				if (e.preventDefault) {
					e.preventDefault();
				}
				e.originalEvent.dataTransfer.dropEffect = 'move';
                return false;
			});

            el.bind("dragenter", function (e) {
            	var id = angular.element(el).attr("id");
            	var tgtId = angular.element(e.target).attr("id");
            	if ( !angular.isUndefined( tgtId ) && tgtId == id ) {
	                el.addClass(attrs.dropindicatorclass);
            	}
            });

            el.bind("dragleave", function (e) {
            	var id = angular.element(el).attr("id");
            	var tgtId = angular.element(e.target).attr("id");
            	if ( !angular.isUndefined( tgtId ) && tgtId == id ) {
	                el.removeClass(attrs.dropindicatorclass);
            	}
            });

            el.bind("drop", function(e) {
            	if (e.preventDefault) {
                    e.preventDefault(); // Necessary. Allows us to drop.
                }
                if (e.stopPropagation) {
                    e.stopPropagation(); // Necessary. Allows us to drop.
                }

				var id = angular.element(el).attr("id");
                var dataStr = e.originalEvent.dataTransfer.getData("text");
                var data = JSON.parse(dataStr);

                scope.onDrop({dragData: data, dropEl: id});
            });

            $rootScope.$on("PSG-DRAG-START", function () {
                el.addClass(attrs.droptargetclass);
            });

            $rootScope.$on("PSG-DRAG-END", function () {
                el.removeClass(attrs.droptargetclass);
                el.removeClass(attrs.dropindicatorclass);
            });
		}
	}
}]);

app.directive('psgChordLayout', function() {
    return {
        restrict: 'AE',
        scope: {
          position: '='
        },
        link : function(scope, elem, attrs) {
			// utility for pedals/levers active
			scope.isPedalActive = function(arr, item) {
				for( var i=0; i<arr.length; i++ ) {
					if ( arr[i] == item ) {
						return true;
					}
				}
			}
        },
        templateUrl: 'js/templates/psgChordLayout.html'
    };
});

app.directive('psgChordSelector', function() {
    return {
        restrict: 'AE',
        scope: {
          chord: '=',
          chordIndex: '=',
          moods: '=',
          majors: '=',
          minors: '=',
          onDelete: '&'
        },
        link : function(scope, elem, attrs) {

			scope.getMoodToggleText = function(mood) {
				if ( mood.name == "min" ) {
					return scope.moods[0];
				} else {
					return scope.moods[1];
				}
			}
			scope.changeChordPosition = function(pos) {
				scope.chord.selectedPosition = pos;
			}
			scope.changeChordMood = function() {
				if ( scope.chord.selectedMood.name == "min" ) {
					scope.chord.selectedMood = scope.moods[0];
					scope.chord.chord = scope.majors[scope.chord.root];
				} else {
					scope.chord.selectedMood = scope.moods[1];
					scope.chord.chord = scope.minors[scope.chord.root];
				}
				scope.chord.selectedPosition = 0;
			}
        },
        templateUrl: 'js/templates/psgChordSelector.html'
    };
});
