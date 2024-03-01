import { useState } from "react"



export default function Gameboard({onSelection , board}) {
       return (
        <ol id="game-board">
            {
                board.map((row, rowIndex) => {
                    return (
                        <li key={rowIndex}>
                            <ol>
                                {
                                    row.map((activePlayerSymbol, colIndex) => {
                                        return (
                                            <li key={colIndex}>
                                                <button onClick={ () => onSelection(rowIndex,colIndex) } disabled={activePlayerSymbol !== null} >{activePlayerSymbol}</button>
                                            </li>
                                        )
                                    })

                                }
                            </ol>
                        </li>
                    )
                })
            }

        </ol>
    )
    }

    
