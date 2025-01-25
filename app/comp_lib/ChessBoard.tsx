'use client'
import { Color, PieceSymbol, Square } from "chess.js"
import { useState } from "react";
import { MOVE } from "./messages";

export  const ChessBoard=({chess,board,socket,setBoard,setTurn,turn}:{
        chess:any;
        setBoard:any;
        turn:boolean | null;
        setTurn:boolean | null;
        board:({
                square: Square,
                type: PieceSymbol,
                color: Color,
            } | null)[][];
        socket:WebSocket
    })=>{
        const [from,setFrom]=useState<null | Square>(null)
        return(
            <div className="text-black ">
            {board.map((row,i)=>{
                return <div key={i} className="flex ">
                    {row.map((square,j)=>{
                        const squareRepresentation=String.fromCharCode(97 + (j % 8))+ "" + (8 - i) as Square
                        // console.log(squareRepresentation)
                        console.log(`from before returning div ${from}`)
                        return <div key={j} onClick={()=>{
                            if(!from){
                                console.log(`inside if ${from}`)
                                setFrom(squareRepresentation ?? null);
                            }else{
                                socket.send(JSON.stringify({
                                    type:MOVE,
                                    payload:{
                                        move:{
                                            from,
                                            to:squareRepresentation    
                                        }
                                    }
                                }))
                                console.log(`inside else ${from}`)
                                setFrom(null)
                                chess.move({
                                    from,
                                    to:squareRepresentation
                                })
                                console.log(`after chess move ${from}`)
                                setBoard(chess.board())
                                // setTurn(!turn)
                                console.log({
                                    from,
                                    to:squareRepresentation 
                                })
                            }
                        }} className={`md:w-16 md:h-16 h-8 w-8 ${(i+j)%2===0?'bg-green-500':'bg-white rounded'}`}>
                            <div className="w-full justify-center flex h-full">
                                <div className="h-full justify-center flex flex-col">
                                    {/* <div>{squareRepresentation}</div> */}
                                    {/* <div>{turn ? <div>white's turn </div>:<div>black's turn</div>}</div> */}
                                    {square ? <img className="w-15" src={`/${square?.color==='w'? `${square?.type}_copy`:square?.type}.png`} />:null}
                                </div>
                            </div>
                        </div>
                    })}
                </div>
            })}
            </div>
        )
    }