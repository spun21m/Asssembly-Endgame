import { useState } from "react";
import { languages } from "../languages";
import clsx from "clsx";

export default function AssemblyEndgame() {
  const [currentWord, setCurrentWord] = useState("react");
  const [guessedLetters, setGuessedLetters] = useState([]);

  function guessedLetterHandler(letter) {
    setGuessedLetters((prevLetters) =>
      prevLetters.includes(letter) ? prevLetters : [...prevLetters, letter]
    );
  }

  const alphabet = "abcdefghijklmnopqrstuvwxyz";

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

  const letterElements = currentWord.split("").map((letter, index) => {
    return (
      <span key={index}>
        {guessedLetters.includes(letter) ? letter.toUpperCase() : ""}
      </span>
    );
  });

  const keyboardElements = alphabet.split("").map((letter) => {
    const isGuessed = guessedLetters.includes(letter);
    const isCorrectGuess = (letter) => currentWord.includes(letter);

    const className = clsx({
      correct: isGuessed && isCorrectGuess(letter),
      wrong: isGuessed && !isCorrectGuess(letter),
    });

    return (
      <button
        className={className}
        onClick={() => guessedLetterHandler(letter)}
        key={letter}
      >
        {letter.toUpperCase()}
      </button>
    );
  });

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
      <section className="keyboard">{keyboardElements}</section>
      <button className="new-game">New Game</button>
    </main>
  );
}
