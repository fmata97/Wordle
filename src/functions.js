/* 
 *  Aux functions and definitions
 */

import { words } from '../words.json'

class Letter {
    constructor() {
        this.letter = "";
        this.placement = "";
    }
}

export function pickRandomWord() {
    const pickedWord = words[Math.floor(Math.random() * words.length)].toUpperCase();
    console.log("solution:", pickedWord);
    return pickedWord;
}

export function initializeGuesses() {
    let newArray = Array(6);
    for (let i = 0; i < 6; i++) {
        newArray[i] = Array(5);
        for (let j = 0; j < 5; j++) newArray[i][j] = new Letter();
    }

    return newArray;
}

export function isLetter(string) {
    return string.length === 1 && (
        ('a'.charCodeAt(0) <= string.charCodeAt(0) && string.charCodeAt(0) <= 'z'.charCodeAt(0))
        || ('A'.charCodeAt(0) <= string.charCodeAt(0) && string.charCodeAt(0) <= 'Z'.charCodeAt(0))
    );
}

export function winText(guessNumber) {
    switch (guessNumber) {
        case 0:
            return "Genius!";
        case 1:
            return "Magnificent!";
        case 2:
            return "Impressive!";
        case 3:
            return "Splendid!";
        case 4:
            return "Great";
        case 5:
            return "Phew!";
        default:
            return "";
    }
}