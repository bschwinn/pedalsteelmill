import { useState } from "react";

import "./App.css";
import "./components/index.css";

import { Modal } from "./components/modal";
import { Header } from "./components/header";
import { About } from "./components/about";
import { Help } from "./components/help";
import { ChordPositions } from "./components/chordPositions";
import { ChordChart } from "./components/chordChart";

function App() {
  const [showAbout, setShowAbout] = useState<boolean>(false);
  const [showHelp, setShowHelp] = useState<boolean>(false);

  return (
    <div className="faceplate">

      <Header onAboutClick={() => setShowAbout(true)} onHelpClick={() => setShowHelp(true)} />

      <div className="main-panel">
        <ChordPositions />

        <ChordChart />
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
