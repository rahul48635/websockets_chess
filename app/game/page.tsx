'use client'
import { Button } from "@/components/ui/button";
import { ChessBoard } from "../comp_lib/ChessBoard";
import { useSocket } from "../hooks/useSockets";
import { useEffect, useState } from "react";
import { GAME_OVER, INIT_GAME, MOVE } from "../comp_lib/messages";
import { Chess } from "chess.js";


export default function Game(){
    const [chess,setChess]=useState(new Chess())
    const [board,setBoard]=useState(chess.board())
    const [started,setStarted]=useState(false)
    const [turn,setTurn]=useState<boolean | null>(null);
    const [color,setColor]=useState<boolean | null>(null)
    const socket=useSocket();
    useEffect(()=>{
        if(!socket){
            return;
        }
        socket.onmessage=(event)=>{
            const message=JSON.parse(event.data);
            console.log(message.toString())
            switch(message.type){
                case INIT_GAME: 
                    setBoard(chess.board());
                    setStarted(true)
                    console.log('Game Initiated')
                    if(message.payload.color==='white'){
                        setColor(true)
                    }
                    else{
                        setColor(false)
                    }
                    break
                case MOVE:
                    const move=message.payload
                    chess.move(move)
                    setBoard(chess.board())
                    console.log('Move made')
                    break
                case GAME_OVER:
                    console.log('Game Over')
                    break
            }
                
        }
    },[socket])
    // console.log(board)
    if(!socket) return <div>Connecting...</div>
        return (
            <div className="bg-gray h-screen">
                <div className="container flex justify-center  gap-2">
                        <div className=" sm:mr-20 border-none sm:border-4 sm:w-[500px] sm:basis-1/3 flex justify-center ">
                            <ChessBoard chess={chess} setBoard={setBoard} socket={socket} board={board} setTurn={setTurn} turn={turn}/>  
                        </div>
                        <div className=" bg-green-200 sm:basis-1/3 w-1/3 ">
                            {!started && <Button  variant='default' className="sm:px-10 lg:px-20 relative sm:top-16 sm:left-1/4 top-10 left-1/3  " onClick={async () => await socket.send(JSON.stringify({
                                type:INIT_GAME
                            }))}><h3> Play </h3></Button>}
                        <div  className="text-black font-semibold p-5 justify-self-center bg-blue-500 rounded-2xl w-full text-center top-40 relative">{turn ? <div>black's turn </div>:<div>white's turn</div>}</div>
                        <div className="absolute top-20">{color ? <div>you are white</div>: <div> you are black</div>}</div>
                        </div>

                </div>
            </div>
        )
}