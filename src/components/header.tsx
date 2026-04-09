export type HeaderProps = {
  onAboutClick: () => void;
  onHelpClick: () => void;
}

export const Header = ({ onAboutClick, onHelpClick }: HeaderProps) => {

  return (
    <header className="faceplate-head">
      <div style={{ marginRight: "auto" }}>
        PedalSteelMill - Chords for Pedal Steel Guitar
      </div>
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
