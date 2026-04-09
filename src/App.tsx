import { useState } from "react";

import "./App.css";

import { Modal } from "./Modal";
import { Header } from "./components/header";
import { About } from "./components/about";
import { Help } from "./components/help";

function App() {
  const [showAbout, setShowAbout] = useState<boolean>(false);
  const [showHelp, setShowHelp] = useState<boolean>(false);

  return (
    <div className="faceplate">

      <Header onAboutClick={() => setShowAbout(true)} onHelpClick={() => setShowHelp(true)} />

      <div className="main-panel">
        <section className="sub-panel">
          <div>Chord Positions</div>
        </section>

        <section className="sub-panel">
          <div>Chord Chart</div>
        </section>
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
