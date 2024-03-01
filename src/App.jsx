import { useState } from 'react';

import Player from "./components/Player"
import Gameboard from "./components/Gameboard"
import Log from './components/Log';
import GameOver from './components/GameOver';
import { WINNING_COMBINATIONS } from './components/winning Combinations';

const initialGameGrid = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
]

function deriveActivePlayer(turns) {
  let currentActivePlayer = 'X';
  if (turns.length > 0 && turns[0].player == 'X') {
    currentActivePlayer = 'O';
  }
  return currentActivePlayer;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
 

  let currentActivePlayer = deriveActivePlayer(gameTurns);

  let gameboard = [...initialGameGrid.map((innerArray)=>[...innerArray])];

  for (const turn of gameTurns) {
    const { square, player } = turn
    const { row, col } = square;
    gameboard[row][col] = player;
  }

  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquare = gameboard[combination[0].row][combination[0].column];
    const secondSquare = gameboard[combination[1].row][combination[1].column];
    const thirdSquare = gameboard[combination[2].row][combination[2].column];

    if (firstSquare && firstSquare === secondSquare && firstSquare===thirdSquare) {
      winner = firstSquare;
    }
  }

  const hasDraw = gameTurns.length===9 && !winner;

  function onSelection(rowIndex, colIndex) {
    


    setGameTurns((prevTurns) => {
      let currentActivePlayer = deriveActivePlayer(prevTurns);
      const updatedTurns = [{ square: { row: rowIndex, col: colIndex }, player: currentActivePlayer }, ...prevTurns];
      return updatedTurns;
      //This state updating functions updates the state in immutable manner and avoids intersections with other states
    })

  }

  function handleRestart(){
    setGameTurns([]);
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className='highlight-player'>
          <Player player="Player 1" symbol="X" isActive={currentActivePlayer === 'X'} />
          <Player player="Player 2" symbol="O" isActive={currentActivePlayer === 'O'} />

        </ol>
        <Gameboard onSelection={onSelection} board={gameboard} />

        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart}/>}

      </div>
      <Log turns={gameTurns} />
    </main>
  )
}

export default App
