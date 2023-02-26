import React from "react";

export default function Board({ guesses }) {

    const rowElements = guesses.map((guess, index) => {
        return (
            <div className="row" key={index}>
                <div className={`tile ${guess[0].placement}`}>
                    <div className={`front-face ${guess[0].placement}`}>{guess[0].letter}</div>
                    <div className={`back-face ${guess[0].placement}`}>{guess[0].letter}</div>
                </div>
                <div className={`tile ${guess[1].placement}`}>
                    <div className={`front-face ${guess[1].placement}`}>{guess[1].letter}</div>
                    <div className={`back-face ${guess[1].placement}`}>{guess[1].letter}</div>
                </div>
                <div className={`tile ${guess[2].placement}`}>
                    <div className={`front-face ${guess[2].placement}`}>{guess[2].letter}</div>
                    <div className={`back-face ${guess[2].placement}`}>{guess[2].letter}</div>
                </div>
                <div className={`tile ${guess[3].placement}`}>
                    <div className={`front-face ${guess[3].placement}`}>{guess[3].letter}</div>
                    <div className={`back-face ${guess[3].placement}`}>{guess[3].letter}</div>
                </div>
                <div className={`tile ${guess[4].placement}`}>
                    <div className={`front-face ${guess[4].placement}`}>{guess[4].letter}</div>
                    <div className={`back-face ${guess[4].placement}`}>{guess[4].letter}</div>
                </div>
            </div>
        )
    })

    return (
        <div className="Board">
            {rowElements}
        </div>
    )
}