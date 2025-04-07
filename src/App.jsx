// App.jsx
import React from 'react';
import GermanyMap from './components/GermanyMap';
import './App.css';

function App() {
  return (
    <div className="app">
      <header>
        <h1>Wer regiert eigentlich in welchem Bundesland?</h1>
        <p>Klicke auf ein Bundesland für mehr Informationen</p>
      </header>
      <main>
        <GermanyMap />
      </main>
      <footer>
        <p>Diese Karte kann Fehler enthalten</p>
        <p>Made by Hendrik Beier, Nikolas Miksiewicz, Marc Wachsmann</p>
      </footer>
    </div>
  );
}

export default App;