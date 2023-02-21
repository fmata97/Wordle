import React from "react";

export default function Board({guesses, solution}) {

    const rowElements = guesses.map((guess, index) => {
        return (
            <div className="row" key={index}>
                <div className={`tile ${guess[0].placement}`}>{guess[0].letter || ""}</div>
                <div className={`tile ${guess[1].placement}`}>{guess[1].letter || ""}</div>
                <div className={`tile ${guess[2].placement}`}>{guess[2].letter || ""}</div>
                <div className={`tile ${guess[3].placement}`}>{guess[3].letter || ""}</div>
                <div className={`tile ${guess[4].placement}`}>{guess[4].letter || ""}</div>
            </div>
        )
    })

    return (
        <div className="Board">
            {rowElements}
            {/* <div className="row">
                <div className="tile absent">D</div>
                <div className="tile absent">A</div>
                <div className="tile present">I</div>
                <div className="tile absent">L</div>
                <div className="tile absent">Y</div>
            </div>
            <div className="row">
                <div className="tile absent">G</div>
                <div className="tile absent">R</div>
                <div className="tile absent">E</div>
                <div className="tile absent">E</div>
                <div className="tile absent">N</div>
            </div>
            <div className="row">
                <div className="tile correct">K</div>
                <div className="tile correct">I</div>
                <div className="tile correct">O</div>
                <div className="tile correct">S</div>
                <div className="tile correct">K</div>
            </div>
            <div className="row">
                <div className="tile"></div>
                <div className="tile"></div>
                <div className="tile"></div>
                <div className="tile"></div>
                <div className="tile"></div>
            </div>
            <div className="row">
                <div className="tile"></div>
                <div className="tile"></div>
                <div className="tile"></div>
                <div className="tile"></div>
                <div className="tile"></div>
            </div>
            <div className="row">
                <div className="tile">1</div>
                <div className="tile">2</div>
                <div className="tile">3</div>
                <div className="tile">4</div>
                <div className="tile">5</div>
            </div> */}
        </div>
    )
}