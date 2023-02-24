import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Board from './components/Board'
import Keyboard from './components/Keyboard'
import {words} from '../words.json'

class Letter {
    constructor() {
        this.letter = "";
        this.placement = "";
    }
}

function App() {
    const [guesses, setGuesses] = useState(() => initializeGuesses()); // lazy initialization
    const [currentGuess, setCurrentGuess] = useState(0); // [0, 5]
    const [currentLetterIndex, setCurrentLetterIndex] = useState(0); // [0, 4]
    const [solution, setSolution] = useState(() => 
        words[Math.floor(Math.random()*words.length)].toUpperCase()); // 5 letter word
    const [wordle, setWordle] = useState(false);


    function initializeGuesses() {
        let newArray = Array(6);
        for (let i = 0; i < 6; i++) {
            newArray[i] = Array(5);
            for (let j = 0; j < 5; j++) newArray[i][j] = new Letter();
        }

        return newArray;
    }

    function isLetter(string) {
        return string.length === 1 && (
            ('a'.charCodeAt(0) <= string.charCodeAt(0) && string.charCodeAt(0) <= 'z'.charCodeAt(0))
            || ('A'.charCodeAt(0) <= string.charCodeAt(0) && string.charCodeAt(0) <= 'Z'.charCodeAt(0))
        );
    }

    function checkGuess(guess) {

        // map that contains all the indexes of each letter in the solution
        let letterMap = new Map();

        Array.from(solution).forEach((letter, index) => {
            if (letterMap.has(letter))
                letterMap.set(letter, [...letterMap.get(letter), index]);
            else
                letterMap.set(letter, [index]);
        });

        console.log(letterMap);

        // FIXME: doesn't work with solution = "EVEVE" and guesses like "VEVEV", "EEEVE"
        const checkedGuesses = guess.map((letter, index) => {
            if (!letterMap.has(letter.letter)) {
                letter.placement = "absent";
            }
            else if (letterMap.has(letter.letter)) {
                const solutionIndexes = letterMap.get(letter.letter);
                if (solutionIndexes.length > 1) {  // Has multiple elements
                    if (solutionIndexes.some(value => value === index)) {
                        letter.placement = "correct";
                        // the index has to be popped
                        letterMap.set(letter.letter, solutionIndexes.filter(value => value !== index));
                    } else {
                        letter.placement = "present";
                        letterMap.set(letter.letter, solutionIndexes.filter(value => value > index));
                    }
                } else if (solutionIndexes.length === 1) {  // Has 1 element
                    if (solutionIndexes[0] === index) {
                        // the letter is in the right spot
                        letter.placement = "correct";
                        letterMap.delete(letter.letter);
                    } else if (guess[solutionIndexes[0]].letter === letter.letter) {
                        // this letter isn't in the right spot, but other letter is
                        letter.placement = "absent";
                    } else {
                        // the letter isn't in the right spot, but neither are any other,
                        // so it is marked as present and the solution index is popped
                        letter.placement = "present";
                        letterMap.delete(letter.letter);
                    }
                }
            }

            console.log(letterMap);
            return letter;
        })

        if (letterMap.size === 0)
            setWordle(true);

        return checkedGuesses;
    }

    function keydownHandler(event) {
        console.log(event.key);
        const keyPressed = event.key;

        if (keyPressed === "Enter") {
            if (currentLetterIndex === 5) {
                const guess = guesses[currentGuess].map(letter => letter.letter).join("").toLowerCase();

                // check if word is valid
                if (!words.some(word => word == guess))
                    return;

                setGuesses(oldGuesses => oldGuesses.map((guess, index) => {
                    if (index === currentGuess)
                        return checkGuess(guess);

                    return guess;
                }));

                setCurrentGuess(oldCurrentGuess => oldCurrentGuess + 1);

                setCurrentLetterIndex(0);
                console.log(currentLetterIndex);
            } else {
                alert("Not enough letters!");
            }
        } else if (keyPressed === "Backspace") {
            if (currentLetterIndex > 0) {
                setGuesses(oldGuesses => oldGuesses.map((guess, index) => {
                    if (index === currentGuess) {
                        guess[currentLetterIndex - 1].letter = "";
                        setCurrentLetterIndex(oldValue => oldValue - 1);
                    }
                    return guess;
                }));
            }
        } else if (isLetter(keyPressed)) {
            console.log(keyPressed.charCodeAt(0));
            if (currentLetterIndex < 5) {
                setGuesses(oldGuesses => oldGuesses.map((guess, index) => {
                    console.log("current guess", currentGuess);
                    if (index === currentGuess) {
                        guess[currentLetterIndex].letter = keyPressed.toUpperCase();
                        setCurrentLetterIndex(oldValue => oldValue + 1);
                    }
                    return guess;
                }));
            }
        }
    }

    function endGame() {
        if (wordle) {

        } else {

        }
    }

    useEffect(() => {
        if (currentGuess <= 5 && !wordle)
            addEventListener("keydown", keydownHandler);
        else
            endGame();
        return () => removeEventListener("keydown", keydownHandler);
    }, [currentLetterIndex]);

    console.log(guesses, currentLetterIndex, currentGuess, solution);

    return (
        <div className="App">
            <Navbar />
            <hr />
            <div className="Game-container">
                <div className="Board-container">
                    {currentGuess === 6 && !wordle && <h4>Solution: {solution}</h4>}
                    <Board
                        guesses={guesses}
                    />
                </div>
                <div className="Keyboard-container">
                    <Keyboard
                        guesses={guesses}
                        insertLetter={(event) => {
                            if (currentGuess <= 5 && !wordle)
                                keydownHandler(event);
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default App
