'use client'

import {useState} from "react";
// the css is taken from the react tutorial
import '../app/globals.css';
function calculateWinner(squares:string[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
//starting from here nothing is copied
interface SquareProps{
  value: string;
  onSquareClick: ()=>void;
}
 function Square({value, onSquareClick}:SquareProps) {
  return (
    <button className={"square"} onClick={onSquareClick}>
      {value}
    </button>
  )
}


interface BoardProps{
  squares:string[];
  isXTurn: boolean;
  onPlay: (squares: string[])=> void;
}
function Board({squares,isXTurn, onPlay }:BoardProps){
  function onSquareClick(index: number){
    if(squares[index])
      return;
    const newSquares = [...squares];
    if(isXTurn){
      newSquares[index] = ("X");
    }else{
      newSquares[index] =("O");
    }
    onPlay(newSquares)
  }

  return (
      <div>
      <div className={"board-row"}>
        <Square value={squares[0]} onSquareClick={()=>onSquareClick(0)}/>
        <Square value={squares[1]} onSquareClick={()=>onSquareClick(1)}/>
        <Square value={squares[2]} onSquareClick={()=>onSquareClick(2)}/>
      </div>
        <div className={"board-row"}>
          <Square value={squares[3]} onSquareClick={()=>onSquareClick(3)}/>
          <Square value={squares[4]} onSquareClick={()=>onSquareClick(4)}/>
          <Square value={squares[5]} onSquareClick={()=>onSquareClick(5)}/>
        </div>
        <div className={"board-row"}>
          <Square value={squares[6]} onSquareClick={()=>onSquareClick(6)}/>
          <Square value={squares[7]} onSquareClick={()=>onSquareClick(7)}/>
          <Square value={squares[8]} onSquareClick={()=>onSquareClick(8)}/>
        </div>
      </div>
  )
}

export default function Page(){
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const currentMove = history.length -1;
  const [isXTurn, setIsXTurn] = useState(false);

  function onPlay(newSquares: string[]){
    setIsXTurn(!isXTurn)
    const copySquares = [...history, newSquares];
    setHistory(copySquares)
  }

  function goToMove(moveNr:number){
      const newHistory = [...history.slice(0,moveNr)];
      setHistory(newHistory);
      setIsXTurn(moveNr%2==0)
  }

  const move = history.map((squares, index)=>{
    return <div>
        <button onClick={()=>goToMove(index)}>Go to move {index}</button>
    </div>
  })

  const winner = calculateWinner(history[currentMove]);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (isXTurn ? 'X' : 'O');
  }

  return (<>
    {status}
      <Board squares={history[currentMove]} isXTurn={isXTurn} onPlay={onPlay}/>
    {move}
    </>)
}

