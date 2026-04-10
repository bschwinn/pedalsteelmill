import { useState } from "react";
import {
  ChordReference,
  type NoteName,
  type Tonalities,
} from "../lib/chordReference";

import { TonalitySelector } from "./tonalitySelector";
import { NoteSelector } from "./noteSelector";
import { ChordPositionCard } from "./chordPositionCard";

export type ChordPositionsProps = {
  chordRef: ChordReference;
};

export const ChordPositions = ({ chordRef }: ChordPositionsProps) => {
  const [tonality, setTonality] = useState<Tonalities>("major");
  const [rootNote, setRootNote] = useState<NoteName>(chordRef.chordNames[0]);

  const selectedChord =
    tonality === "major"
      ? chordRef.majorChords[rootNote.name]
      : chordRef.minorChords[rootNote.name];

  return (
    <section className="sub-panel">
      <div className="chord-panel">
        <div className="chord-panel-controls">
          <div className="chord-panel-controls-label">Chord Positions</div>
          <div>
            <TonalitySelector
              value={tonality}
              onChange={(t: Tonalities) => setTonality(t)}
            />
          </div>
          <div>
            <NoteSelector
              scale={chordRef.chordNames}
              value={rootNote}
              onChange={(note: NoteName) => setRootNote(note)}
            />
          </div>
        </div>
        <div className="chord-panel-list">
          {selectedChord.positions.map((p) => (
            <ChordPositionCard position={p} key={`${p.root}_${p.fret}`} />
          ))}
        </div>
      </div>
    </section>
  );
};
