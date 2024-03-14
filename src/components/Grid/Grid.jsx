// import React from 'react'

import { useState } from "react"
import Card from "../Card/Card"
import './Grid.css'

function isWinner(board, symbol) {
  if (board[0] == board[1]&& board[1] == board[2]&&board[2] == symbol) return symbol;
  if (board[3] == board[4]&& board[4] == board[5]&&board[5] == symbol) return symbol;
  if (board[6] == board[7]&& board[7] == board[8]&&board[8] == symbol) return symbol
  if (board[0] == board[3]&& board[3] == board[6]&&board[6] == symbol) return symbol;
  if (board[1] == board[4]&& board[4] == board[7]&&board[7] == symbol) return symbol;
  if (board[2] == board[5]&& board[5] == board[8]&&board[8] == symbol) return symbol
  if (board[0] == board[4]&& board[4] == board[8]&&board[8] == symbol) return symbol;
  if (board[2] == board[4]&& board[4] == board[6]&&board[6] == symbol) return symbol;
  
  return ""
  
}

function Grid({ numOfcards }) {
  const [turn, setTurn] = useState(true) //true=>0 false=>X
  const [board, setBoard] = useState(Array(numOfcards).fill(""))
  const [winner, setWinner] = useState("")
  // console.log(turn)

  function play(index) {
    console.log("move played",index);
    if (turn==true) {
      board[index] = "O";
    }
    else {
      board[index] = "X";
    }

    const win = isWinner(board, turn ? "O" : "X")
    if (win) {
      setWinner(win);
    }
    setBoard([...board])
    setTurn(!turn);

  }
  return (

    <>
      {winner && <h1>Winner is :{winner }</h1>}
      <h1 className="turn-highlight">Current turn: {(turn)?'O':'X'}   </h1>
    <div className="grid">
      {board.map((value, idx) => {
        return <Card onPlay={play} player={value} key={idx} index={idx} />
    })}
      </div>
      </>
  )
}

export default Grid