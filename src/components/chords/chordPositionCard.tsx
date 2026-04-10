import { type ChordPosition } from "../../lib/chordReference";

import { GuitarBody } from "./guitarBody";
import { GuitarLevers } from "./guitarLevers";
import { GuitarNeck } from "./guitarNeck";
import { GuitarPedals } from "./guitarPedals";

export type ChordPositionCardProps = {
  position: ChordPosition;
};

export const ChordPositionCard = ({ position }: ChordPositionCardProps) => {
  return <div className="chord-position">
    <PositionTitle position={position} />
    <GuitarNeck position={position} />
    <div className="guitar">
      <GuitarBody />
      <GuitarLevers position={position} />
      <GuitarPedals position={position} />
    </div>
  </div>;
};

const PositionTitle = ({ position }: ChordPositionCardProps) => {
  return (
    <div>{position.root} ({position.fret})</div>
  );
};