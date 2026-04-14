import { type Chord, type ChordPosition, type Tonalities } from "../../lib/chordReference";

import { GuitarBody } from "./guitarBody";
import { GuitarLevers } from "./guitarLevers";
import { GuitarNeck } from "./guitarNeck";
import { GuitarPedals } from "./guitarPedals";

export type ChordChartCardProps = {
  id: string;
  chord: Chord;
  position: ChordPosition;
  onDelete: () => void;
  onChangePosition: (position: number) => void;
  onChangeTonality: (tonality: Tonalities) => void;
};

export const ChordChartCard = ({
  id,
  chord,
  position,
  onChangePosition,
  onChangeTonality,
  onDelete,
}: ChordChartCardProps) => {
  return (
    <div className="chord-position">
      <PositionTitle
        id={id}
        chord={chord}
        position={position}
        onChangePosition={onChangePosition}
        onChangeTonality={onChangeTonality}
        onDelete={onDelete}
      />
      <GuitarNeck position={position} />
      <div className="guitar">
        <GuitarBody />
        <GuitarLevers position={position} />
        <GuitarPedals position={position} />
      </div>
    </div>
  );
};

const PositionTitle = ({ id, chord, position, onChangePosition, onChangeTonality, onDelete }: ChordChartCardProps) => {
  const title = `Fret ${position.fret} - ${chord.label}${chord.tonality === "major" ? "Maj" : "min"}`;
  return <div className="title">
    <button popoverTarget={`pop_${id}`} popoverTargetAction="show">{title}</button>
    <ul id={`pop_${id}`} popover="" className="chord-menu">
      {chord.positions.map((pos, i) => (
        <li key={`changer_${id}_${i}`}>
          <button popoverTarget={`pop_${id}`} popoverTargetAction="hide" onClick={() => {
            onChangePosition(i);
          }}>
            Fret {pos.fret}
          </button>
        </li>
      ))}
      <li>
        <button popoverTarget={`pop_${id}`} popoverTargetAction="hide" onClick={() => {
          onChangeTonality(chord.tonality === 'major' ? 'minor' : 'major');
        }}>
          {chord.tonality === 'major' ? 'Make minor' : 'Make Major'}
        </button>
      </li>
    </ul>
    <div style={{ marginLeft: 'auto'}}><a href="#" onClick={() => onDelete()}>X</a></div>
  </div>;
};
