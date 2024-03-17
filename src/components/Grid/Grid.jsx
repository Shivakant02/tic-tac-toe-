// import React from 'react'

import { useCallback, useState } from "react"
import Card from "../Card/Card"
import './Grid.css'

import toast,{Toaster} from "react-hot-toast";
 
//  import 'react-toastify/dist/ReactToastify.css';


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

  let play = useCallback(function playCallback(index) {
    console.log("move played", index);
    if (turn == true) {
      board[index] = "O";
    }
    else {
      board[index] = "X";
    }

    const win = isWinner(board, turn ? "O" : "X")
    if (win) {
      setWinner(win);
      toast.success(`Congrotulations ${win} wins the game...`);
    }
    setBoard([...board])
    setTurn(!turn);
      
  }, [turn]);


  function reset() {
    setBoard(Array(numOfcards).fill(""));
    setWinner(null);
    setTurn(true)
    // toast.success(`game reset successfully ....`);
  }
  return (

    <div className="grid-wrapper">
      
      {winner && (
        <>
          <h1>Winner is :{winner}</h1>
          <button className="reset" onClick={reset}>Reset game </button>
         <Toaster
  position="top-center"
  reverseOrder={false}
  gutter={8}
  containerClassName=""
  containerStyle={{}}
  toastOptions={{
    // Define default options
    className: '',
    duration: 5000,
    style: {
      background: '#363636',
      color: '#fff',
    },

    // Default options for specific types
    success: {
      duration: 5000,
      theme: {
        primary: 'green',
        secondary: 'black',
      },
    },
  }}
/>
        </>
      )}
      <h1 className="turn-highlight">Current turn: {(turn)?'O':'X'}   </h1>
    <div className="grid">
      {board.map((value, idx) => {
        return <Card onPlay={play} player={value} key={idx} index={idx} />
    })}
      </div>
      </div>
  )
}

export default Grid