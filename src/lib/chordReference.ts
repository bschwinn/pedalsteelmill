export type Tonalities = 'major' | 'minor';

export type NoteName = {
  name: string;
  label: string;
};

export const NoteNames: NoteName[] = [
  { name: "E", label: "E" },
  { name: "F", label: "F" },
  { name: "F#", label: "F#/Gb" },
  { name: "G", label: "G" },
  { name: "G#", label: "G#/Ab" },
  { name: "A", label: "A" },
  { name: "A#", label: "A#/Bb" },
  { name: "B", label: "B" },
  { name: "C", label: "C" },
  { name: "C#", label: "C#/Db" },
  { name: "D", label: "D" },
  { name: "D#", label: "D#/Eb" },
];

export type TuningNames = "E9" | "C6";

export type Tuning = {
  scale: NoteName[];
  majorChords: { [id: string]: Chord };
  minorChords: { [id: string]: Chord };
};

export type Chord = {
  name: string;
  label: string;
  tonality: Tonalities;
  positions: ChordPosition[];
};

export type ChordPosition = {
  root: string;
  fret: number;
  pedals: string[],
  levers: string[],
  strings: { note: string, enabled: boolean }[];
};

export class ChordReference {
  private currentTuning: Tuning;
  private tunings: { [id: string]: Tuning };

  constructor(tuning?: TuningNames) {
    this.tunings = {};
    this.tunings["E9"] = this.createE9Tuning();
    this.tunings["C6"] = this.createC6Tuning();
    this.currentTuning = this.tunings[tuning ?? "E9"];
  }

  setTuning(name: TuningNames) {
    if (name === "E9") {
      this.currentTuning = this.tunings["E9"];
    } else {
      this.currentTuning = this.tunings["C6"];
    }
  }

  get majorChords() {
    return this.currentTuning.majorChords;
  }

  get minorChords() {
    return this.currentTuning.minorChords;
  }

  get chordNames() {
    return this.currentTuning.scale;
  }

  // E9 tunning
  private createE9Tuning() {
    const scale = NoteNames.slice(0);
    return {
      scale,
      majorChords: this.createE9MajorChords(scale),
      minorChords: this.createE9MinorChords(scale),
    };
  }

  // C6 tunning
  private createC6Tuning() {
    const scale = NoteNames.slice(0);
    for (let i = 0; i < 4; i++) {
      const item = scale.pop();
      scale.unshift(item!);
    }
    return {
      scale,
      majorChords: this.createC6MajorChords(scale),
      minorChords: this.createC6MinorChords(scale),
    };
  }

  private createE9MajorChords(scale: NoteName[]) {
    const chordMap: { [id: string]: Chord } = {};
    for (let i = 0; i < scale.length; i++) {
      const chordName = scale[i].name;
      chordMap[chordName] = this.createE9MajorChord(scale, i);
    }
    return chordMap;
  }

  private createE9MinorChords(scale: NoteName[]) {
    const chordMap: { [id: string]: Chord } = {};
    for (let i = 0; i < scale.length; i++) {
      const chordName = scale[i].name;
      chordMap[chordName] = this.createE9MinorChord(scale, i);
    }
    return chordMap;
  }

  private createE9MajorChord(scale: NoteName[], noteOffset: number): Chord {
    const noteInfo = scale[noteOffset];
    const positions: ChordPosition[] = [];
    positions[positions.length] = this.createE9ChordPosition(
      scale,
      noteInfo.name,
      noteOffset,
      [],
      [],
      [0, 0, 1, 1, 1, 1, 0, 1, 0, 1],
    );
    positions[positions.length] = this.createE9ChordPosition(
      scale,
      noteInfo.name,
      this.wrapChord(3 + noteOffset),
      ["A"],
      ["LKL"],
      [0, 0, 1, 1, 1, 1, 0, 1, 0, 1],
    );
    positions[positions.length] = this.createE9ChordPosition(
      scale,
      noteInfo.name,
      this.wrapChord(5 + noteOffset),
      [],
      ["LKR", "RKL"],
      [0, 0, 1, 1, 1, 1, 0, 1, 0, 1],
    );
    positions[positions.length] = this.createE9ChordPosition(
      scale,
      noteInfo.name,
      this.wrapChord(7 + noteOffset),
      ["A", "B"],
      [],
      [0, 0, 1, 1, 1, 1, 0, 1, 0, 1],
    );
    
    positions.sort((a: ChordPosition, b: ChordPosition) => {
      return a.fret - b.fret;
    });

    return {
      name: noteInfo.name,
      label: noteInfo.label,
      tonality: "major" as const,
      positions: positions,
    };
  }

  private createE9MinorChord(scale: NoteName[], noteOffset: number): Chord {
    const noteInfo = scale[noteOffset];
    const positions: ChordPosition[] = [];
    positions[positions.length] = this.createE9ChordPosition(
      scale,
      noteInfo.name,
      noteOffset,
      ["B"],
      ["RKL"],
      [0, 0, 0, 1, 1, 1, 0, 1, 0, 1],
    );
    positions[positions.length] = this.createE9ChordPosition(
      scale,
      noteInfo.name,
      this.wrapChord(3 + noteOffset),
      ["A"],
      [],
      [0, 0, 1, 1, 1, 1, 0, 1, 0, 1],
    );
    positions[positions.length] = this.createE9ChordPosition(
      scale,
      noteInfo.name,
      this.wrapChord(7 + noteOffset),
      ["A", "B"],
      ["LKV"],
      [0, 0, 1, 1, 1, 1, 0, 1, 0, 1],
    );
    positions[positions.length] = this.createE9ChordPosition(
      scale,
      noteInfo.name,
      this.wrapChord(10 + noteOffset),
      ["B", "C"],
      [],
      [0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
    );

    positions.sort((a: ChordPosition, b: ChordPosition) => {
      return a.fret - b.fret;
    });

    return {
      name: noteInfo.name,
      label: noteInfo.label,
      tonality: "minor" as const,
      positions: positions,
    };
  }

  private createE9ChordPosition(
    scale: NoteName[],
    noteName: string,
    noteOffset: number,
    pedals: string[],
    levers: string[],
    stringMask: number[],
  ): ChordPosition {
    const strings = [];
    for (let i = 0; i < stringMask.length; i++) {
      strings[strings.length] = {
        note: this.findNoteForOffsetE9(scale, noteOffset, i, pedals, levers),
        enabled: stringMask[i] === 1,
      };
    }
    return {
      root: noteName,
      fret: 0 + noteOffset,
      pedals: pedals,
      levers: levers,
      strings: strings,
    };
  }

  private findNoteForOffsetE9(
    scale: NoteName[],
    offset: number,
    stringNumber: number,
    pedals: string[],
    levers: string[],
  ) {
    const stringNoteOffsets = [2, 11, 4, 0, 7, 4, 2, 0, 10, 7];
    if (pedals.indexOf("A") > -1) {
      stringNoteOffsets[4] = stringNoteOffsets[4] + 2;
      stringNoteOffsets[9] = stringNoteOffsets[9] + 2;
    }
    if (pedals.indexOf("B") > -1) {
      stringNoteOffsets[2] = stringNoteOffsets[2] + 1;
      stringNoteOffsets[5] = stringNoteOffsets[5] + 1;
    }
    if (pedals.indexOf("C") > -1) {
      stringNoteOffsets[3] = stringNoteOffsets[3] + 2;
      stringNoteOffsets[4] = stringNoteOffsets[4] + 2;
    }
    if (levers.indexOf("LKL") > -1) {
      stringNoteOffsets[3] = stringNoteOffsets[3] + 1;
      stringNoteOffsets[7] = stringNoteOffsets[7] + 1;
    }
    if (levers.indexOf("LKR") > -1) {
      stringNoteOffsets[3] = stringNoteOffsets[3] - 1;
      stringNoteOffsets[7] = stringNoteOffsets[7] - 1;
    }
    if (levers.indexOf("LKV") > -1) {
      stringNoteOffsets[4] = stringNoteOffsets[4] - 1;
      stringNoteOffsets[9] = stringNoteOffsets[9] - 1;
    }
    if (levers.indexOf("RKL") > -1) {
      stringNoteOffsets[2] = stringNoteOffsets[2] - 2;
      stringNoteOffsets[5] = stringNoteOffsets[5] - 2;
    }
    for (let i = 0; i < stringNoteOffsets.length; i++) {
      if (stringNoteOffsets[i] < 0) {
        stringNoteOffsets[i] = 12 + stringNoteOffsets[i];
      }
    }
    return scale[(offset + stringNoteOffsets[stringNumber]) % 12].name;
  }

  private createC6MajorChords(scale: NoteName[]) {
    const chordMap: { [id: string]: Chord } = {};
    for (let i = 0; i < scale.length; i++) {
      const chordName = scale[i].name;
      chordMap[chordName] = this.createC6MajorChord(scale, i);
    }
    return chordMap;
  }

  private createC6MinorChords(scale: NoteName[]) {
    const chordMap: { [id: string]: Chord } = {};
    for (let i = 0; i < scale.length; i++) {
      const chordName = scale[i].name;
      chordMap[chordName] = this.createC6MinorChord(scale, i);
    }
    return chordMap;
  }

  private createC6MajorChord(scale: NoteName[], noteOffset: number): Chord {
    const noteInfo = scale[noteOffset];
    return {
      name: noteInfo.name,
      label: noteInfo.label,
      tonality: "major" as const,
      positions: [],
    };
  }

  private createC6MinorChord(scale: NoteName[], noteOffset: number): Chord {
    const noteInfo = scale[noteOffset];
    return {
      name: noteInfo.name,
      label: noteInfo.label,
      tonality: "minor" as const,
      positions: [],
    };
  }

  private wrapChord(offset: number) {
    return offset % 12;
  }
}
