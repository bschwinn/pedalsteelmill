// the chord position list
class ChordPositions {
	constructor(chord, domId, templateId) {
		this.domId = domId;
		this.templateId = templateId;
		this.chord = chord;
		this.detailPath = '.chordDetail';
	}

	render() {
		let that = this;
		for (let i=0; i<this.chord.positions.length; i++) {
			let pos = this.chord.positions[i];
			// outer wrap
		    var tmpl = document.querySelector(this.templateId);
			var clone = document.importNode(tmpl.content, true);
			var clone$ = $(clone);
			var chordPos = new ChordPosition(pos);
			var dclone$ = chordPos.parseTemplate();
			// append err thang
			clone$.find(this.detailPath).append(dclone$);
			$(this.domId).append(clone$);
		}
	}
	update(chord) {
		this.chord = chord;
		$(this.domId).empty();
		this.render();
	}
}

class ChordChart {
	constructor(moods, chords, domId, templateId, noteDropped, positionChanged, moodChanged, chordDeleted) {
		this.domId = domId;
		this.templateId = templateId;
		this.moods = moods;
		this.chords = chords;
		this.noteDropped = noteDropped;
		this.positionChanged = positionChanged;
		this.moodChanged = moodChanged;
		this.chordDeleted = chordDeleted;
		this.detailPath = '.chordChartDetail';
		this.dragPath = '.chordChartWellDrop';
		this.dropPath = '.chordChartWellDrop';
		this.dropClass = 'dropme';
		this.dropClassMove = 'dropme2';
		this.rendered = false;
	}

	render(skipBind) {
		let mainElem = $(this.domId);
		if (this.chords.length > 0 ) {
			mainElem.empty();
		}
		let that = this;
		for (let i=0; i<this.chords.length; i++) {
			let chordData = this.chords[i];
			// outer wrap
		    var tmpl = document.querySelector(this.templateId);
			var clone = document.importNode(tmpl.content, true);
			var clone$ = $(clone);
			// chord position and editor
			var chordPos = new ChordPosition(chordData.chord.positions[chordData.selectedPosition]);
			var dclone$ = chordPos.parseTemplate();
			var chordEdit = new ChordChartEditor(this.moods, i, chordData, this.positionChanged, this.moodChanged, this.chordDeleted);
			var eclone$ = chordEdit.parseTemplate();
			// append err thang
			let dragger = clone$.find(this.dragPath);
			dragger.attr('position', i);
			clone$.find(this.detailPath).append(eclone$);
			clone$.find(this.detailPath).append(dclone$);
			this.bindDragHandlers(chordData, dragger);
			this.bindDropHandlers(dragger, dragger.attr('id'), this.dropClassMove);
			mainElem.append(clone$);
		}
		if ( !this.rendered ) {
			this.bindDropHandlers(mainElem, mainElem.attr('id'), this.dropClass);
		    window.addEventListener("PSM-DRAG-START", function () {
		        mainElem.addClass('droptarget');
		    });

		    window.addEventListener("PSM-DRAG-END", function () {
		        mainElem.removeClass('droptarget');
		        mainElem.removeClass(that.dropClass);
		    });
		    window.addEventListener("PSM-DROPPED", function () {
		        mainElem.removeClass('droptarget');
		        mainElem.removeClass(that.dropClass);
		    });
		}
		this.rendered = true;
	}

	update(chords) {
		this.chords = chords;
		$(this.domId).empty();
		this.render(true);
	}

	bindDragHandlers(chord, el) {
		let that = this;
		el.attr("draggable", "true");

	    el.bind("dragstart", function (e) {
	    	var dragData = { root: chord.name, label: chord.label, dragType: "move", originalPosition: el.attr('position') };
	        e.originalEvent.dataTransfer.setData('text', JSON.stringify(dragData));
	    	var event = new Event('PSM-DRAG-START');
	        window.dispatchEvent(event);
	    });

	    el.bind("dragend", function (e) {
	    	var event = new Event('PSM-DRAG-END');
	        window.dispatchEvent(event);
	    });
	}

	bindDropHandlers(el, id, dropClass) {
		let that = this;
		el.bind("dragover", function(e) {
			if (e.preventDefault) e.preventDefault();
			if (e.stopPropagation) e.stopPropagation(); 
			// e.originalEvent.dataTransfer.dropEffect = 'move';
			return false;
		});

	    el.bind("dragenter", function (e) {
	    	if ( that.isMyElement(el, $(e.target)) || that.isChildElement(el, $(e.target)) ) {
		    	// console.log("dragenter on " + el.attr('class') + ", adding drop class: " + dropClass);
				el.addClass(dropClass);
	    	}
	    });

	    el.bind("dragleave", function (e) {
	    	if ( that.isMyElement(el, $(e.target)) || !that.isChildElement(el, $(e.target)) ) {
				// console.log("dragleave on " + el.attr('class') + ", removing drop class: " + dropClass);
				el.removeClass(dropClass);
			}
	    });

	    el.bind("drop", function(e) {
	    	// Necessary. Allows us to drop.
	    	if (e.preventDefault) e.preventDefault(); 
	        if (e.stopPropagation) e.stopPropagation(); 
	        var data = JSON.parse(e.originalEvent.dataTransfer.getData("text"));
	        that.noteDropped(data, el.attr('position'));
	    	var event = new Event('PSM-DROPPED');
	        window.dispatchEvent(event);
	    });
	}

	isMyElement(el, tgt) {
		if ( el.attr('id') == tgt.attr("id") ) {
			return true;
		}
		return false;
	}

	isChildElement(el, tgt) {
		var parent = tgt;
		while (parent != null) {
			// console.log('checking child element: ' + parent.attr("id"));
			if ( el.attr('id') == parent.attr("id") ) {
				// console.log('child element found');
				return true;
			}
			parent = parent.parent();
		}
		return false;
	}
}

class ChordChartSelector {
	constructor(chords, domId, templateId, currentMood) {
		this.domId = domId;
		this.templateId = templateId;
		this.chords = chords;
		this.mood = currentMood;
		this.labelPath = 'span';
		this.dragPath = 'button';
	}

	render() {
		let that = this;
		for (let i=0; i<this.chords.length; i++) {
			let chord = this.chords[i];
		    var tmpl = document.querySelector(this.templateId);
			var clone = document.importNode(tmpl.content, true);
			var clone$ = $(clone);
			clone$.find(this.labelPath).text(chord.label);
			let el = clone$.find(this.dragPath);
			this.bindDragHandlers(chord, el);
			$(this.domId).append(clone$);
		}
	}
	bindDragHandlers(chord, el) {
		let that = this;
		el.attr("draggable", "true");

	    el.bind("dragstart", function (e) {
	    	var dragData = { root: chord.name, label: chord.label, dragType: "copy", mood: that.mood.name };
	        e.originalEvent.dataTransfer.setData('text', JSON.stringify(dragData));
	    	var event = new Event('PSM-DRAG-START');
	        window.dispatchEvent(event);
	    });

	    el.bind("dragend", function (e) {
	    	var event = new Event('PSM-DRAG-END');
	        window.dispatchEvent(event);
	    });
	}
}

class ChordPosition {
	constructor(pos) {
		this.pos = pos;
		this.positionPath = '.fretMarker';
		this.neckPath = '.guitarNeck';
		this.neckTemplate = '#tmplChordDetailNeck';
		this.detailTemplate = '#tmplChordDetail';
		this.stringPath = '.string div';
		this.fretLabelPath = '.string .label span';
		this.LKLPath = '.leftkneeleft';
		this.LKVPath = '.leftkneeup';
		this.LKRPath = '.leftkneeright';
		this.RKLPath = '.rightkneeleft';
		this.RKRPath = '.rightkneeright';
		this.PedalAPath = '.pedalA';
		this.PedalBPath = '.pedalB';
		this.PedalCPath = '.pedalC';
	}

	parseTemplate() {
	    var dtmpl = document.querySelector(this.detailTemplate);
		var dclone = document.importNode(dtmpl.content, true);
		var dclone$ = $(dclone);
		dclone$.find(this.positionPath).text(this.pos.fret);

		// render the neck/strings
		for ( var j=0; j<10; j++) {
		    var ntmpl = document.querySelector(this.neckTemplate);
			var nclone = document.importNode(ntmpl.content, true);
			var nclone$ = $(nclone);
			if ( !this.pos.strings[j].enabled ) {
				nclone$.find(this.stringPath).each(function(){
					$(this).addClass('disabled');
				});
			}
			nclone$.find(this.fretLabelPath).text(this.pos.strings[j].note);
			dclone$.find(this.neckPath).append(nclone$);
		}
		// apply the levers
		if (this.isPedalActive(this.pos.levers, 'LKL')) {
			dclone$.find(this.LKLPath).addClass('active');
		}
		if (this.isPedalActive(this.pos.levers, 'LKV')) {
			dclone$.find(this.LKVPath).addClass('active');
		}
		if (this.isPedalActive(this.pos.levers, 'LKR')) {
			dclone$.find(this.LKRPath).addClass('active');
		}
		if (this.isPedalActive(this.pos.levers, 'RKL')) {
			dclone$.find(this.RKLPath).addClass('active');
		}
		if (this.isPedalActive(this.pos.levers, 'RKL')) {
			dclone$.find(this.RKLPath).addClass('active');
		}
		// apply the pedals
		if (this.isPedalActive(this.pos.pedals, 'A')) {
			dclone$.find(this.PedalAPath).addClass('active');
		}
		if (this.isPedalActive(this.pos.pedals, 'B')) {
			dclone$.find(this.PedalBPath).addClass('active');
		}
		if (this.isPedalActive(this.pos.pedals, 'C')) {
			dclone$.find(this.PedalCPath).addClass('active');
		}

		return dclone$;
	}
	isPedalActive(arr, item) {
		for( var i=0; i<arr.length; i++ ) {
			if ( arr[i] == item ) {
				return true;
			}
		}		
	}
}

// chord chart editor - allows changing positions, maj/min and deleting
class ChordChartEditor {
	constructor(moods, chartPosition, chordData, positionChanged, moodChanged, chordDeleted) {
		this.moods = moods;
		this.chartPosition = chartPosition;
		this.chordData = chordData;
		this.positionChanged = positionChanged;
		this.moodChanged = moodChanged;
		this.chordDeleted = chordDeleted;
		this.template = '#tmplChordChartEditor';
		this.labelPath = '.chordEditorLabel';
		this.positionsPath = 'ul.dropdown-menu';
		this.moodTogglePath = 'li.chordChartMoodToggle a';
		this.deletePath = 'li.chordChartDelete a';
	}

	parseTemplate() {
	    var dtmpl = document.querySelector(this.template);
		var dclone = document.importNode(dtmpl.content, true);
		var dclone$ = $(dclone);
		var chordPos = this.chordData.chord.positions[this.chordData.selectedPosition];
		dclone$.find(this.labelPath).text( chordPos.root + this.chordData.selectedMood.label + ' - Fret:' + chordPos.fret);
		var list = dclone$.find(this.positionsPath);
		let that = this;
		for (let i=this.chordData.chord.positions.length-1; i>=0; i--) {
			let pos = this.chordData.chord.positions[i];
			var item = $('<li></li>');
			var link = $('<a></a>').text(pos.fret);
			item.append(link);
			item.click(function() {
				if (that.positionChanged != null) {
					that.positionChanged(that.chartPosition, that.chordData, i);
				}
			});
			list.prepend(item);
		}
		dclone$.find(this.deletePath).click(function() {
			if (that.chordDeleted != null) {
				that.chordDeleted(that.chartPosition, that.chordData);
			}
		});
		dclone$.find(this.moodTogglePath).text('Make ' + this.getMoodToggleText(this.chordData.selectedMood)).click(function() {
			if (that.moodChanged != null) {
				that.moodChanged(that.chartPosition, that.chordData);
			}
		});
		return dclone$;
	}
	getMoodToggleText(mood) {
		if ( mood.name == "min" ) {
			return this.moods[0].label;
		} else {
			return this.moods[1].label;
		}
	}
}

// the chord "database"
class ChordDB {
	constructor() {

		this._chordNames = [
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
		this._chordMoods = [
			{ "name": "maj", "label": "Major"}
			,{ "name": "min", "label": "Minor"}
		];
		this._majorChords = this.createAllMajorChords();
		this._minorChords = this.createAllMinorChords();
	}

	get majorChords() {
		return this._majorChords;
	}
  
	get minorChords() {
		return this._minorChords;
	}

	get chordNames() {
		return this._chordNames;
	}

	get chordMoods() {
		return this._chordMoods;
	}

	createAllMajorChords() {
		var chordMap = {}
		for ( var i=0; i<this._chordNames.length; i++ ) {
			var chordName = this._chordNames[i].name;
			chordMap[chordName] = this.createMajorChord(chordName, i);
		}
		return chordMap;
	}
	createAllMinorChords() {
		var chordMap = {}
		for ( var i=0; i<this._chordNames.length; i++ ) {
			var chordName = this._chordNames[i].name;
			chordMap[chordName] = this.createMinorChord(chordName, i);
		}
		return chordMap;
	}

	createMajorChord(note, noteOffset) {
		var positions = [];
		positions[positions.length] = this.createChordPosition(note, noteOffset, [], [], [0, 0, 1, 1, 1, 1, 0, 1, 0, 1]);
		positions[positions.length] = this.createChordPosition(note, 3+noteOffset, ["A"], ["LKL"], [0, 0, 1, 1, 1, 1, 0, 1, 0, 1]);

		if ( noteOffset > 6 ) {
			positions.unshift(this.createChordPosition(note, (7+noteOffset)-12, ["A","B"], [], [0, 0, 1, 1, 1, 1, 0, 1, 0, 1]));
			positions.unshift(this.createChordPosition(note, (5+noteOffset)-12, [], ["LKR", "RKL"], [0, 0, 1, 1, 1, 1, 0, 1, 0, 1]));
		} else if ( noteOffset > 4 ) {
			positions[positions.length] = this.createChordPosition(note, 5+noteOffset, [], ["LKR", "RKL"], [0, 0, 1, 1, 1, 1, 0, 1, 0, 1]);
			positions.unshift(this.createChordPosition(note, (7+noteOffset)-12, ["A","B"], [], [0, 0, 1, 1, 1, 1, 0, 1, 0, 1]));
		} else {
			positions[positions.length] = this.createChordPosition(note, 5+noteOffset, [], ["LKR", "RKL"], [0, 0, 1, 1, 1, 1, 0, 1, 0, 1]);
			positions[positions.length] = this.createChordPosition(note, 7+noteOffset, ["A","B"], [], [0, 0, 1, 1, 1, 1, 0, 1, 0, 1]);
		}

		return { "name" : note, "type" : "maj", "positions": positions };
	}
	createMinorChord(note, noteOffset) {
		var positions = [];
		positions[positions.length] = this.createChordPosition(note, noteOffset, ["B"], ["RKL"], [0, 0, 0, 1, 1, 1, 0, 1, 0, 1]);
		positions[positions.length] = this.createChordPosition(note, 3+noteOffset, ["A"], [], [0, 0, 1, 1, 1, 1, 0, 1, 0, 1]);
		if ( noteOffset > 4 ) {
			positions.unshift(this.createChordPosition(note, (10+noteOffset)-12, ["B", "C"], [], [0, 0, 1, 1, 1, 1, 0, 0, 0, 0]));
			positions.unshift(this.createChordPosition(note, (7+noteOffset)-12, ["A", "B"], ["LKV"], [0, 0, 1, 1, 1, 1, 0, 1, 0, 1]));
		} else if ( noteOffset > 1 ) {
			positions[positions.length] = this.createChordPosition(note, 7+noteOffset, ["A", "B"], ["LKV"], [0, 0, 1, 1, 1, 1, 0, 1, 0, 1]);
			positions.unshift(this.createChordPosition(note, (10+noteOffset)-12, ["B", "C"], [], [0, 0, 1, 1, 1, 1, 0, 0, 0, 0]));
		} else {
			positions[positions.length] = this.createChordPosition(note, 7+noteOffset, ["A", "B"], ["LKV"], [0, 0, 1, 1, 1, 1, 0, 1, 0, 1]);
			positions[positions.length] = this.createChordPosition(note, 10+noteOffset, ["B", "C"], [], [0, 0, 1, 1, 1, 1, 0, 0, 0, 0]);
		}
		return { "name" : note, "type" : "min", "positions": positions };
	}
	createChordPosition(note, noteOffset, pedals, levers, stringMask) {
		var strings = new Array();
		for( var i=0; i<stringMask.length; i++ ) {
			strings[strings.length] = { note: this.findNoteForOffset(noteOffset, i, pedals, levers), enabled: stringMask[i] };
		}
		return { "root": note, "fret" : 0+noteOffset, "pedals" : pedals, "levers" : levers, "strings" : strings };
	}
	findNoteForOffset(offset, string, pedals, levers) {
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
		return this._chordNames[(offset + stringNoteOffsets[string]) % 12].name;
	}
}

// kinda generic templated selector
class TemplatedSelector {
	constructor(items, domId, templateId, selectHandler, selected, selectedClass) {
		this.domId = domId;
		this.templateId = templateId;
		this.items = items;
		this.selectHandler = selectHandler;
		this.selected = selected;
		this.selectedClass = selectedClass;
		this.labelPath = 'span';
		this.clickPath = 'label';
		this.selectedPath = 'label';
	}

	// utility routines for populating the chords "DB"
	render() {
		let that = this;
		for (let i=0; i<this.items.length; i++) {
			let itm = this.items[i];
		    var tmpl = document.querySelector(this.templateId);
			var clone = document.importNode(tmpl.content, true);
			var clone$ = $(clone);
			clone$.find(this.labelPath).text(itm.label);
			if ( this.selected != null ) {
				if ( this.selected.name == itm.name ) {
					clone$.find(this.selectedPath).addClass(this.selectedClass);
				}
			}
			if ( this.selectHandler != null ) {
				clone$.find(this.clickPath).click(function(){
					that.selected = itm;
					that.selectHandler(itm);
				});
			}
			$(this.domId).append(clone$);
		}

	}
}
