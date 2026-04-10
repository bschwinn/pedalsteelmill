import type { Chord, ChordReference, NoteName, Tonalities } from "../lib/chordReference";

import { useState } from "react"

import { TonalitySelector } from "./tonalitySelector";
import { NoteSelector } from "./noteSelector";

export type PositionedChord = {
  selectedPosition: number;
} & Chord;

export type ChordChartProps = {
  chordRef: ChordReference;
}

export const ChordChart = ({ chordRef }: ChordChartProps) => {
  const [tonality, setTonality] = useState<Tonalities>('major');
  const [chords, setChords] = useState<PositionedChord[]>([]);

  const addChord = (note: NoteName) => {
    const selectedChord = tonality === "major" ? chordRef.majorChords[note.name] : chordRef.minorChords[note.name];
    const posCh: PositionedChord = {
      ...selectedChord,
      selectedPosition: 0,
    };
    console.log(`adding chord: ${note.name} ${tonality}`, posCh);
    setChords((prev) => {
      return [
        ...prev,
        posCh,
      ];
    });
  }

  console.log('chords so far', chords);

  return (
    <section className="sub-panel">
      <div className="chord-panel">
        <div className="chord-panel-controls">
          <div className="chord-panel-controls-label">Chord Chart</div>
          <div>
            <TonalitySelector value={tonality} onChange={(t: Tonalities) => setTonality(t)} />
          </div>
          <div>
            <NoteSelector scale={chordRef.chordNames} onClick={(note: NoteName) => addChord(note)} />
          </div>
        </div>
        <div className="chord-panel-list">
          {chords.length === 0 && (
            <div className="chord-panel-list-empty">
              Drag notes from above to assemble a chord progression.
            </div>
          )}
          {chords.length > 0 && (
            chords.map((ch) => (
              <ChordChartCard chord={ch} key={`${ch.name}_${ch.selectedPosition}`} />
            ))
          )}
        </div>
      </div>
    </section>
  )
}

const ChordChartCard = ({ chord }: { chord: PositionedChord }) => {
  return <div className="chord-position">
    <div>{chord.label} ({chord.selectedPosition})</div>
  </div>;
};
