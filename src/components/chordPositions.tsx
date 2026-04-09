import { useState } from "react";
import { TonalitySelector, type Tonalities } from "./tonalitySelector";

export const ChordPositions = () => {
  const [tonality, setTonality] = useState<Tonalities>('major');
  const [rootNote, setRootNote] = useState<string>('E');

  return (
    <section className="sub-panel">
      <div className="chord-panel">
        <div className="chord-panel-controls">
          <div className="chord-panel-controls-label">Chord Positions</div>
          <div>
            <TonalitySelector value={tonality} onChange={(t: Tonalities) => setTonality(t)} />
          </div>
          <div>A B C D E F G</div>
        </div>
        <div className="chord-panel-list">
          positions for chord: {rootNote}{tonality}
        </div>
      </div>
    </section>
  )
}
