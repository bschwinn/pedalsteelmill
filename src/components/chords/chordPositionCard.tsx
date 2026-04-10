import { type ChordPosition } from "../../lib/chordReference";

export type ChordPositionCardProps = {
  position: ChordPosition;
};

export const ChordPositionCard = ({ position }: ChordPositionCardProps) => {
  return <div className="chord-position">
    <div>{position.root} ({position.fret})</div>
    <GuitarStrings position={position} />
    <div className="guitar">
      <GuitarBody />
      <GuitarLevers levers={position.levers} />
      <GuitarPedals pedals={position.pedals} />
    </div>
  </div>;
};

const GuitarStrings = ({ position }: { position: ChordPosition}) => {
  return <div className={`strings fret${position.fret}`}>
    <div>
      {position.strings.map( (s, i) => (
        <div key={`string_${position.fret}_${position.root}_${s.note}_${i}`} className={s.enabled ? 'active' : ''}>{s.enabled ? s.note : 'X'}</div>
      ))}
    </div>
  </div>;
};

const GuitarBody = () => {
  return <div className="body">
    <div className="end"></div>
    <div className="middle"></div>
    <div className="end"></div>
  </div>;
};

const GuitarLevers = ({ levers }: { levers: string[]}) => {
  return <div className="levers">
    <div className={`lever leftkneeleft ${levers.includes('LKL') ? 'active' : ''}`}></div>
    <div className={`leverup leftkneeup ${levers.includes('LKV') ? 'active' : ''}`}></div>
    <div className={`lever leftkneeright ${levers.includes('LKR') ? 'active' : ''}`}></div>
    <div className="lever spacer"></div>
    <div className={`lever rightkneeleft ${levers.includes('RKL') ? 'active' : ''}`}></div>
    <div className="leverup notinstalled"></div>
    <div className={`lever rightkneeright ${levers.includes('RKR') ? 'active' : ''}`}></div>
  </div>;
};

const GuitarPedals = ({ pedals }: { pedals: string[]}) => {
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