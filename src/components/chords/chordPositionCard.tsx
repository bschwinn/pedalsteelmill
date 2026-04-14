import { type Chord, type ChordPosition } from "../../lib/chordReference";

import { GuitarBody } from "./guitarBody";
import { GuitarLevers } from "./guitarLevers";
import { GuitarNeck } from "./guitarNeck";
import { GuitarPedals } from "./guitarPedals";

export type ChordPositionCardProps = {
  chord: Chord;
  position: ChordPosition;
};

export const ChordPositionCard = ({ chord, position }: ChordPositionCardProps) => {
  return <div className="chord-position">
    <PositionTitle chord={chord} position={position} />
    <GuitarNeck position={position} />
    <div className="guitar">
      <GuitarBody />
      <GuitarLevers position={position} />
      <GuitarPedals position={position} />
    </div>
  </div>;
};

const PositionTitle = ({ chord, position }: ChordPositionCardProps) => {
  const title = `Fret ${position.fret} - ${chord.label}${chord.tonality === 'major' ? 'Maj' : 'min'}`;
  return (
    <div className="title">{title}</div>
  );
};
