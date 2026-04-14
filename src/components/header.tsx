export type HeaderProps = {
  onAboutClick: () => void;
  onHelpClick: () => void;
}

export const Header = ({ onAboutClick, onHelpClick }: HeaderProps) => {

  return (
    <header className="faceplate-head">
      <h1 style={{ marginRight: "auto" }}>
        PedalSteelMill - Chords for Pedal Steel Guitar
      </h1>
      <div>
        <a href="#" onClick={() => onHelpClick()}>
          Help
        </a>
      </div>
      <div style={{ marginLeft: "16px" }}>
        <a href="#" onClick={() => onAboutClick()}>
          About
        </a>
      </div>
    </header>
  )
}

export default Header
