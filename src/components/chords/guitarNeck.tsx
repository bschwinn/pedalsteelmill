import { type ChordPosition } from "../../lib/chordReference";

export type GuitarNeckProps = {
  position: ChordPosition;
};

export const GuitarNeck = ({ position }: GuitarNeckProps) => {
  return (
    <div className={`strings fret${position.fret}`}>
      <div className="notes">
        {position.strings.map((s, i) => (
          <div
            key={`string_${position.fret}_${position.root}_${s.note}_${i}`}
            className={s.enabled ? "active" : ""}
          >
            {s.enabled ? s.note : "X"}
          </div>
        ))}
      </div>
      <div className="neckarea">
        <div className="slide">
          <div className="filler"></div>
          <div className="nose"></div>
          <div className="shaft"></div>
        </div>
      </div>
    </div>
  );
};
