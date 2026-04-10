import { useState } from "react";

import "./App.css";
import "./components/index.css";

import { Modal } from "./components/modal";
import { Header } from "./components/header";
import { About } from "./components/about";
import { Help } from "./components/help";
import { ChordPositions } from "./components/chords/chordPositions";
import { ChordChart } from "./components/chords/chordChart";
import { ChordReference } from "./lib/chordReference";

function App() {
  const [showAbout, setShowAbout] = useState<boolean>(false);
  const [showHelp, setShowHelp] = useState<boolean>(false);

  const chordReference = new ChordReference();
  chordReference.setTuning('E9');

  return (
    <div className="faceplate">

      <Header onAboutClick={() => setShowAbout(true)} onHelpClick={() => setShowHelp(true)} />

      <div className="main-panel">
        <ChordPositions chordRef={chordReference} />

        <ChordChart chordRef={chordReference} />
      </div>

      <Modal
        title="About Pedal Steel Mill"
        show={showAbout}
        onClose={() => setShowAbout(false)}
        onClickAway={() => setShowAbout(false)}
      >
        <div>
          <About />
        </div>
      </Modal>

      <Modal
        title="Pedal Steel Mill Help"
        show={showHelp}
        onClose={() => setShowHelp(false)}
      >
        <Help />
      </Modal>
    </div>
  );
}

export default App;
