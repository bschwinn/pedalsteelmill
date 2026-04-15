import type { NoteName } from "../lib/chordReference";

export type NoteSelectorProps = {
  scale: NoteName[];
  value?: NoteName;
  onChange?: (note: NoteName) => void;
  onClick?: (note: NoteName) => void;
  onDragStart?: (note: NoteName) => void;
  className?: string;
  orientation?: "horizontal" | "vertical";
  prefix?: string;
};

export const NoteSelector = ({
  scale,
  value,
  onChange,
  onClick,
  onDragStart,
  orientation = "horizontal",
  className = "",
  prefix = "",
}: NoteSelectorProps) => {

  return (
    <div className={`button-selector ${orientation} ${className}`}>
      {scale.map((note) => (
        <button
          key={`notesel_${note.name}`}
          className={value?.name === note.name ? "selected" : ""}
          draggable={!!onDragStart}
          onDragStart={onDragStart ? (e) => {
            e.dataTransfer.effectAllowed = "copy";
            onDragStart(note);
          } : undefined}
          onClick={() => {
            onChange?.(note);
            onClick?.(note);
          }}
        >
          {prefix}{note.label}
        </button>
      ))}
    </div>
  );
};
