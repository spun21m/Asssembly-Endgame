import { useState } from "react";
import { languages } from "../languages";
import { getFarewellText, getRandomWord } from "../utils";
import clsx from "clsx";

export default function AssemblyEndgame() {
  // state values
  const [currentWord, setCurrentWord] = useState(() => getRandomWord());
  const [guessedLetters, setGuessedLetters] = useState([]);

  // derived values
  const wrongGuessArray = guessedLetters.filter(
    (letter) => !currentWord.includes(letter)
  );
  const wrongGuessCount = wrongGuessArray.length;
  const isGameWon = currentWord
    .split("")
    .every((letter) => guessedLetters.includes(letter));
  const isGameLost = wrongGuessCount >= languages.length - 1;
  const isGameOver = isGameWon || isGameLost;
  const lastGuessedLetter = guessedLetters[guessedLetters.length - 1];
  const isLastGuessLetterIncorrect =
    lastGuessedLetter && !currentWord.includes(lastGuessedLetter);

  // static value
  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  function addGuessedLetter(letter) {
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
    const revealLetter = isGameLost || guessedLetters.includes(letter);
    const letterClassName = clsx(
      isGameLost && !guessedLetters.includes(letter) && "missed-letter"
    );
    return (
      <span key={index} className={letterClassName}>
        {revealLetter ? letter.toUpperCase() : ""}
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
        onClick={() => addGuessedLetter(letter)}
        key={letter}
        disabled={isGameOver}
      >
        {letter.toUpperCase()}
      </button>
    );
  });

  const gameStatusClassName = clsx("game-status", {
    won: isGameWon,
    lost: isGameLost,
    farewell: !isGameOver && isLastGuessLetterIncorrect,
  });

  function renderGameStatus() {
    function gameover() {
      if (isLastGuessLetterIncorrect) {
        return <p>{getFarewellText(languages[wrongGuessCount - 1].name)}</p>;
      }
    }
    return isGameOver ? (
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
    ) : (
      gameover()
    );
  }

  function resetGame() {
    setCurrentWord(getRandomWord());
    setGuessedLetters([]);
  }

  return (
    <main>
      <header>
        <h1>Assembly: Endgame</h1>
        <p className="description">
          Guess the word in under 8 attempts to keep the programming world safe
          from Assembly!
        </p>
      </header>
      <section className={gameStatusClassName}>{renderGameStatus()}</section>
      <section className="language-chips">{languageElements}</section>
      <section className="word-display">{letterElements}</section>
      <section className="keyboard">{keyboardElements}</section>
      {isGameOver && (
        <button className="new-game" onClick={resetGame}>
          New Game
        </button>
      )}
    </main>
  );
}
