import type {
  Chord,
  ChordPosition,
  ChordReference,
  NoteName,
  Tonalities,
} from "../../lib/chordReference";

import { useRef, useState } from "react";

import { TonalitySelector } from "../tonalitySelector";
import { NoteSelector } from "../noteSelector";
import { ChordChartCard } from "./chordChartCard";

const orientation = "vertical";

export type PositionedChord = {
  selectedPosition: ChordPosition;
} & Chord;

export type ChordChartProps = {
  chordRef: ChordReference;
};

export const ChordChart = ({ chordRef }: ChordChartProps) => {
  const [tonality, setTonality] = useState<Tonalities>("major");
  const [chords, setChords] = useState<PositionedChord[]>([]);
  const dragIndexRef = useRef<number | null>(null);
  const draggedNoteRef = useRef<NoteName | null>(null);

  const buildPositionedChord = (note: NoteName) => {
    const selectedChord =
      tonality === "major"
        ? chordRef.majorChords[note.name]
        : chordRef.minorChords[note.name];
    return { ...selectedChord, selectedPosition: selectedChord.positions[0] };
  };

  const addChord = (note: NoteName) => {
    setChords((prev) => [...prev, buildPositionedChord(note)]);
  };

  const insertChord = (note: NoteName, index: number) => {
    setChords((prev) => {
      const next = [...prev];
      next.splice(index, 0, buildPositionedChord(note));
      return next;
    });
  };

  const removeChord = (chordIndex: number) => {
    const newChords = [...chords];
    newChords.splice(chordIndex, 1);
    setChords(newChords);
  };

  const changePosition = (chordIndex: number, newPosition: number) => {
    const newChords = [...chords];
    const ch = newChords[chordIndex];
    ch.selectedPosition = ch.positions[newPosition];
    setChords(newChords);
  };

  const reorderChords = (dropIndex: number) => {
    const dragIndex = dragIndexRef.current;
    if (dragIndex === null || dragIndex === dropIndex) return;
    const newChords = [...chords];
    const [dragged] = newChords.splice(dragIndex, 1);
    newChords.splice(dropIndex, 0, dragged);
    setChords(newChords);
    dragIndexRef.current = null;
  };

  const changeTonality = (chordIndex: number, newTonality: Tonalities) => {
    const newChords = [...chords];
    const existingChord = newChords[chordIndex];
    const newChord = newTonality === "major"
        ? chordRef.majorChords[existingChord.name]
        : chordRef.minorChords[existingChord.name];
    newChords[chordIndex] = { ...newChord, selectedPosition: newChord.positions[0] }      
    setChords(newChords);
  };

  return (
    <section className="sub-panel">
      <div className="chord-panel">
        <div className="chord-panel-controls">
          <div className="chord-panel-controls-label">Chord Chart</div>
          <div>
            <TonalitySelector
              value={tonality}
              onChange={(t: Tonalities) => setTonality(t)}
              orientation="vertical"
              className="twoby"
            />
          </div>
          <div>
            <NoteSelector
              scale={chordRef.chordNames}
              onClick={(note: NoteName) => addChord(note)}
              onDragStart={(note: NoteName) => { draggedNoteRef.current = note; }}
              orientation={orientation}
              className="twoby"
              prefix="+ "
            />
          </div>
        </div>
        <div
          className="chord-panel-list"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            if (draggedNoteRef.current) {
              addChord(draggedNoteRef.current);
              draggedNoteRef.current = null;
            }
          }}
        >
          {chords.length === 0 && (
            <div className="chord-panel-list-empty">
              Drag notes from above to assemble a chord progression.
            </div>
          )}
          {chords.length > 0 &&
            chords.map((ch, i) => (
              <ChordChartCard
                chord={ch}
                position={ch.selectedPosition}
                onDelete={() => removeChord(i)}
                onChangePosition={(newPos: number) => changePosition(i, newPos)}
                onChangeTonality={(newTonality: Tonalities) => changeTonality(i, newTonality)}
                onDragStart={() => { dragIndexRef.current = i; }}
                onDrop={() => {
                  if (draggedNoteRef.current) {
                    insertChord(draggedNoteRef.current, i);
                    draggedNoteRef.current = null;
                  } else {
                    reorderChords(i);
                  }
                }}
                key={`${ch.name}_${ch.selectedPosition}_${i}`}
                id={`${ch.name}_${ch.selectedPosition}_${i}`}
              />
            ))}
        </div>
      </div>
    </section>
  );
};
