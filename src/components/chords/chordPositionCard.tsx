import { type ChordPosition, type NoteName, type Tonalities } from "../../lib/chordReference";

import { GuitarBody } from "./guitarBody";
import { GuitarLevers } from "./guitarLevers";
import { GuitarNeck } from "./guitarNeck";
import { GuitarPedals } from "./guitarPedals";

export type ChordPositionCardProps = {
  tonality: Tonalities;
  note: NoteName;
  position: ChordPosition;
};

export const ChordPositionCard = ({ tonality, note, position }: ChordPositionCardProps) => {
  return <div className="chord-position">
    <PositionTitle note={note} tonality={tonality} position={position} />
    <GuitarNeck position={position} />
    <div className="guitar">
      <GuitarBody />
      <GuitarLevers position={position} />
      <GuitarPedals position={position} />
    </div>
  </div>;
};

const PositionTitle = ({ tonality, note, position }: ChordPositionCardProps) => {
  return (
    <div className="title">Fret {position.fret} - {note.label}{tonality === 'major' ? 'Maj' : 'min'}</div>
  );
};