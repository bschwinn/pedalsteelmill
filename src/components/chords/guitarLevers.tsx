import { type ChordPosition } from "../../lib/chordReference";

export type GuitarLeversProps = {
  position: ChordPosition;
};

export const GuitarLevers = ({ position }: GuitarLeversProps) => {
  const levers = position.levers;

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
