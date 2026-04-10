import type { NoteName } from "../lib/chordReference";

export type NoteSelectorProps = {
  scale: NoteName[];
  value?: NoteName;
  onChange?: (note: NoteName) => void;
  onClick?: (note: NoteName) => void;
}

export const NoteSelector = ({ scale, value, onChange, onClick }: NoteSelectorProps) => {

  return (
    <div className="button-selector">
      {scale.map(note => (
        <button
          key={note.name}
          className={value?.name === note.name ? 'selected' : ''}
          onClick={() => {
            onChange?.(note);
            onClick?.(note);
          }}
        >
          {note.label}
        </button>
      ))}
    </div>
  );
};
