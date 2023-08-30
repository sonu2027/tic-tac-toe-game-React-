import { useState } from "react";
import Card from "../Card/Card.jsx";
import "./Grid.css"
import isWinner from "../../Helpers/isWinner.js";
function Grid({ numberOfCards }) {
    const [board, setBoard] = useState(Array(numberOfCards).fill(""))
    // const board=[0,1,2,3,4,5,6,7,8]
    const [turn, setTurn] = useState(true)
    const [winner, setWinner] = useState(null)

    function play(index) {
        if (turn == true) {
            board[index] = "O"
        }
        else {
            board[index] = "X"
        }
        const win = isWinner(board, turn ? "O" : "X")
        if (win) {
            setWinner(win)
        }
        setBoard([...board])
        setTurn(!turn)
    }

    function reset() {
        setTurn(true)
        setWinner(null)
        setBoard(Array(numberOfCards).fill(""))
    }

    return (
        <div className="grid-wrapper">
            {
                winner && (
                    <>
                        <h1 className="turn-highlight">winner is : {winner}</h1>
                        <button onClick={reset} className="reset">Reset game</button>
                    </>
                )
            }
            <h1 className="turn-highlight">Current turn : {(turn) ? "O" : "X"}</h1>
            <div className="grid">
                {board.map((e, i) => <Card key={i} gameEnd={winner? true: false} onPlay={play} player={e} index={i} />)}
            </div>
        </div>
    )
}
export default Grid;