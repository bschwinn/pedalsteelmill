import type { Tonalities } from "../lib/chordReference";

export type TonalitySelectorProps = {
  value: Tonalities;
  onChange: (tonality: Tonalities) => void;
  orientation?: 'horizontal' | 'vertical';
  width?: string;
  className?: string;
}

export const TonalitySelector = ({ value, onChange, orientation = 'horizontal', className = '' }: TonalitySelectorProps) => {
  const options: Tonalities[] = ['major', 'minor'];

  return (
    <div className={`button-selector ${orientation} ${className}`}>
      {options.map((t) => (
        <button
          key={t}
          className={value === t ? 'selected' : ''}
          onClick={() => onChange(t)}
        >
          {t === 'major' ? 'Major' : 'Minor'}
        </button>
      ))}
    </div>
  );
};
