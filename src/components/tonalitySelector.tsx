export type Tonalities = 'major' | 'minor';

export type TonalitySelectorProps = {
  value: Tonalities;
  onChange: (tonality: Tonalities) => void;
}

export const TonalitySelector = ({ value, onChange }: TonalitySelectorProps) => {
  const options: Tonalities[] = ['major', 'minor'];

  return (
    <div className="button-selector">
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
