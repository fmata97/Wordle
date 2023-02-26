import React from "react";

export default function Keyboard({guesses, insertLetter}) {

    function keyPress(event) {
        let keyPressed = event.target.textContent;
        if (keyPressed === "ENTER")
            keyPressed = "Enter";
        else if (keyPressed === "DEL")
            keyPressed = "Backspace";
         
        const eventObject = {
            key: keyPressed
        }

        insertLetter(eventObject);
    }


    let placementsMap = new Map();

    for (let guess of guesses) {
        guess.forEach(letter => {
            // if the letter has already been correctly guessed, it can't go back to yellow
            if (placementsMap.has(letter.letter) && placementsMap.get(letter.letter) === "correct"
            && (letter.placement === "present" || letter.placement === "absent"))
                return;

            // being inserted doesn't match a placement on the keyboard
            if (letter.placement === "inserted")
                return;

            if (letter.letter !== "" && letter.placement !== "")
                placementsMap.set(letter.letter, letter.placement);
        })
    }

    return (
        <div className="Keyboard">
            <div className="KeyboardRow row1">
                <div className={`key ${placementsMap.get("Q")}`} onClick={keyPress}>Q</div>
                <div className={`key ${placementsMap.get("W")}`} onClick={keyPress}>W</div>
                <div className={`key ${placementsMap.get("E")}`} onClick={keyPress}>E</div>
                <div className={`key ${placementsMap.get("R")}`} onClick={keyPress}>R</div>
                <div className={`key ${placementsMap.get("T")}`} onClick={keyPress}>T</div>
                <div className={`key ${placementsMap.get("Y")}`} onClick={keyPress}>Y</div>
                <div className={`key ${placementsMap.get("U")}`} onClick={keyPress}>U</div>
                <div className={`key ${placementsMap.get("I")}`} onClick={keyPress}>I</div>
                <div className={`key ${placementsMap.get("O")}`} onClick={keyPress}>O</div>
                <div className={`key ${placementsMap.get("P")}`} onClick={keyPress}>P</div>
            </div>
            <div className="KeyboardRow row2">
                <div className={`key ${placementsMap.get("A")}`} onClick={keyPress}>A</div>
                <div className={`key ${placementsMap.get("S")}`} onClick={keyPress}>S</div>
                <div className={`key ${placementsMap.get("D")}`} onClick={keyPress}>D</div>
                <div className={`key ${placementsMap.get("F")}`} onClick={keyPress}>F</div>
                <div className={`key ${placementsMap.get("G")}`} onClick={keyPress}>G</div>
                <div className={`key ${placementsMap.get("H")}`} onClick={keyPress}>H</div>
                <div className={`key ${placementsMap.get("J")}`} onClick={keyPress}>J</div>
                <div className={`key ${placementsMap.get("K")}`} onClick={keyPress}>K</div>
                <div className={`key ${placementsMap.get("L")}`} onClick={keyPress}>L</div>
            </div>
            <div className="KeyboardRow row3">
                <div className={`key enter-key`} onClick={keyPress}>ENTER</div>
                <div className={`key ${placementsMap.get("Z")}`} onClick={keyPress}>Z</div>
                <div className={`key ${placementsMap.get("X")}`} onClick={keyPress}>X</div>
                <div className={`key ${placementsMap.get("C")}`} onClick={keyPress}>C</div>
                <div className={`key ${placementsMap.get("V")}`} onClick={keyPress}>V</div>
                <div className={`key ${placementsMap.get("B")}`} onClick={keyPress}>B</div>
                <div className={`key ${placementsMap.get("N")}`} onClick={keyPress}>N</div>
                <div className={`key ${placementsMap.get("M")}`} onClick={keyPress}>M</div>
                <div className={`key delete-key`} onClick={keyPress}>DEL</div>
            </div>
        </div>
    )
}