export const Help = () => {

  return (
    <div className="help">
      <div className="help-hero">
        <img src="logo-compact.svg" width="120" />
        <p>
          The application is comprised of two sections, each of which look similar 
          but have different uses. The Chord Positions section allows you to see the same
          chord in different positions up and down the neck, while the Chord Chart section 
          allows you to compose a chord change chart.
        </p>
      </div>
      <h4>Chord Positions</h4>
      <p>Use the selectors to show the different fret positions of any chord, major or minor, up and down the fret board.</p>
      <h4>Chord Chart</h4>
      <p>Quickly comprise a chord progression by adding chord-positions to the list.  You can drag chords to re-arrange their order as well as change a chords position or major/minor.</p>
    </div>
  )
}
