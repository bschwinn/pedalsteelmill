import { type ChordPosition } from "../../lib/chordReference";

export type GuitarPedalsProps = {
  position: ChordPosition;
};

export const GuitarPedals = ({ position }: GuitarPedalsProps) => {
  const pedals = position.pedals;

  return (
    <div style={{ padding: '4px 8px' }}>
      <div className="pedals">
        <div className={pedals.includes('A') ? 'active' : ''}></div>
        <div className={pedals.includes('B') ? 'active' : ''}></div>
        <div className={pedals.includes('C') ? 'active' : ''}></div>
      </div>
      <div className="labels">
        <div className={pedals.includes('A') ? 'active' : ''}>A</div>
        <div className={pedals.includes('B') ? 'active' : ''}>B</div>
        <div className={pedals.includes('C') ? 'active' : ''}>C</div>
      </div>
    </div>
  );
};
