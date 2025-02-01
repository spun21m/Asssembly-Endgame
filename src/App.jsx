import { useState } from "react";
import { languages } from "../languages";
import clsx from "clsx";

export default function AssemblyEndgame() {
  const [currentWord, setCurrentWord] = useState("react");
  const [guessedLetters, setGuessedLetters] = useState([]);

  const wrongGuessArray = guessedLetters.filter(
    (letter) => !currentWord.includes(letter)
  );
  const wrongGuessCount = wrongGuessArray.length;
  const isGameWon = currentWord
    .split("")
    .every((letter) => guessedLetters.includes(letter));
  const isGameLost = wrongGuessCount >= languages.length - 1;
  const isGameOver = isGameWon || isGameLost;

  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  function guessedLetterHandler(letter) {
    setGuessedLetters((prevLetters) =>
      prevLetters.includes(letter) ? prevLetters : [...prevLetters, letter]
    );
  }

  const languageElements = languages.map((language, index) => {
    const isLostLanguage = index < wrongGuessCount;
    const styles = {
      backgroundColor: language.backgroundColor,
      color: language.color,
    };
    const className = clsx("chip", isLostLanguage && "lost");
    return (
      <span className={className} style={styles} key={language.name}>
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

  const gameStatusClassName = clsx("game-status", {
    won: isGameWon,
    lost: isGameLost,
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
      <section className={gameStatusClassName}>
        {isGameOver ? (
          isGameWon ? (
            <>
              <h2>You win!</h2>
              <p>Well done! 🎉</p>
            </>
          ) : (
            <>
              <h2>Game Over!</h2>
              <p>You lose! Better start learning Assembly 😔</p>
            </>
          )
        ) : null}
      </section>
      <section className="language-chips">{languageElements}</section>
      <section className="word-display">{letterElements}</section>
      <section className="keyboard">{keyboardElements}</section>
      {isGameOver && <button className="new-game">New Game</button>}
    </main>
  );
}
