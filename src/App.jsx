import { useState } from "react";
import { languages } from "../languages";

export default function AssemblyEndgame() {
  const [currentWord, setCurrentWord] = useState("react");

  const languageElements = languages.map((language) => {
    return (
      <span
        className="chip"
        style={{
          backgroundColor: language.backgroundColor,
          color: language.color,
        }}
        key={language.name}
      >
        {language.name}
      </span>
    );
  });

  const letterElements = currentWord
    .split("")
    .map((letter, index) => <span key={index}>{letter.toUpperCase()}</span>);

  return (
    <main>
      <header>
        <h1>Assembly: Endgame</h1>
        <p className="description">
          Guess the word in under 8 attempts to keep the programming world safe
          from Assembly!
        </p>
      </header>
      <section className="game-status">
        <h2>You win!</h2>
        <p>Well done! 🎉</p>
      </section>
      <section className="language-chips">{languageElements}</section>
      <section className="word-display">{letterElements}</section>
    </main>
  );
}
