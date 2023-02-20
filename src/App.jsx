import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Board from './components/Board'
import Keyboard from './components/Keyboard'

// Possible letter placements
const CORRECT = 0;
const PRESENT = 1;
const ABSENT = 2;

class Letter {
    constructor() {
        this.letter = "";
        this.placement = undefined;
    }
}

const SOLUTION = "KIOSK";

function App() {
    const [guesses, setGuesses] = useState(() => initializeGuesses()); // lazy initialization
    const [currentGuess, setCurrentGuess] = useState(0); // [0, 5]
    const [solution, setSolution] = useState(""); // 5 letter word

    let currentLetterIndex = 0; // [0, 4]

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

    function keydownHandler(event) {
        console.log(event.key);
        const keyPressed = event.key;

        if (keyPressed === "Enter") {
            if (currentLetterIndex === 5) {
                // TODO: evaluate word
                setCurrentGuess(oldCurrentGuess => oldCurrentGuess < 5
                    ? oldCurrentGuess + 1
                    : oldCurrentGuess);
            } else {
                alert("Fill all 5 letters!");
            }
        } else if (keyPressed === "Backspace") {
            if (currentLetterIndex > 0) {
                setGuesses(oldGuesses => oldGuesses.map((guess, index) => {
                    if (index === currentGuess)
                        guess[--currentLetterIndex].letter = "";
                    return guess;
                }));
            }
        } else if (isLetter(keyPressed)) {
            console.log(keyPressed.charCodeAt(0));
            if (currentLetterIndex < 5) {
                setGuesses(oldGuesses => oldGuesses.map((guess, index) => {
                    if (index === currentGuess)
                        guess[currentLetterIndex++].letter = keyPressed.toUpperCase();
                    return guess;
                }));
            }
        }
    }

    useEffect(() => {
        addEventListener("keyup", keydownHandler);
        return () => removeEventListener("keyup", keydownHandler);
    }, []);

    console.log(guesses, currentLetterIndex, currentGuess);

    return (
        <div className="App">
            <Navbar />
            <hr />
            <div className="Game-container">
                <div className="Board-container">
                    <Board
                        solution={SOLUTION}
                        guesses={guesses}
                    />
                </div>
                <div className="Keyboard-container">
                    <Keyboard
                        solution={SOLUTION}
                        guesses={guesses}
                    />
                </div>
            </div>
        </div>
    )
}

export default App
