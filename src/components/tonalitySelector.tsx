import type { Tonalities } from "../lib/chordReference";

export type TonalitySelectorProps = {
  value: Tonalities;
  onChange: (tonality: Tonalities) => void;
  orientation?: 'horizontal' | 'vertical';
  width?: string;
}

export const TonalitySelector = ({ value, onChange, orientation = 'horizontal', width }: TonalitySelectorProps) => {
  const options: Tonalities[] = ['major', 'minor'];
  const styles = width ? { width } : {};

  return (
    <div className={`button-selector ${orientation}`}>
      {options.map((t) => (
        <button
          key={t}
          style={{...styles}}
          className={value === t ? 'selected' : ''}
          onClick={() => onChange(t)}
        >
          {t === 'major' ? 'Major' : 'Minor'}
        </button>
      ))}
    </div>
  );
};
