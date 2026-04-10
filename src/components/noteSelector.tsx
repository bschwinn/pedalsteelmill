import type { NoteName } from "../lib/chordReference";

export type NoteSelectorProps = {
  scale: NoteName[];
  value?: NoteName;
  onChange?: (note: NoteName) => void;
  onClick?: (note: NoteName) => void;
  className?: string;
  orientation?: "horizontal" | "vertical";
  width?: string;
};

export const NoteSelector = ({
  scale,
  value,
  onChange,
  onClick,
  width,
  orientation = "horizontal",
  className = "",
}: NoteSelectorProps) => {
  const styles = width ? { width } : {};

  return (
    <div className={`button-selector ${orientation} ${className}`}>
      {scale.map((note) => (
        <button
          key={note.name}
          style={{...styles}}
          className={value?.name === note.name ? "selected" : ""}
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
