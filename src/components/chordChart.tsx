import { useState } from "react"
import { TonalitySelector, type Tonalities } from "./tonalitySelector";

type ChordInfo = {
  noteName: string;
  positions: string[];
}

export const ChordChart = () => {
  const [tonality, setTonality] = useState<Tonalities>('major');
  const [chords, setChords] = useState<ChordInfo[]>([]);

  return (
    <section className="sub-panel">
      <div className="chord-panel">
        <div className="chord-panel-controls">
          <div className="chord-panel-controls-label">Chord Chart</div>
          <div>
            <TonalitySelector value={tonality} onChange={(t: Tonalities) => setTonality(t)} />
          </div>
          <div>A B C D E F G</div>
        </div>
        <div className="chord-panel-list">
          {chords.length === 0 && (
            <div className="chord-panel-list-empty">
              Drag notes from above to assemble a chord progression.
            </div>
          )}
          {chords.length > 0 && (
            <div>
              chords will be here soon
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
