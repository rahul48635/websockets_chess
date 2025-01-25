import { WebSocket } from "ws";
import { INIT_GAME, MOVE } from "./messages";
import { Game } from "./Game";

export default class GameManager{
    private games:Game[];
    private pendingUser:WebSocket | null;
    private users:WebSocket[];

    constructor(){
        this.games=[];
        this.pendingUser=null;
        this.users=[];
    }

    addUser(socket:WebSocket){
        this.users.push(socket);
        this.addHandler(socket);
    }

    removeUser(socket:WebSocket){
        this.users=this.users.filter(user => user !== socket);
    }
    private addHandler(socket: WebSocket) {
        socket.on('message', (data) => {
            let message;
            try {
                message = JSON.parse(data.toString());
                console.log(message)
            } catch (error) {
                console.error('Failed to parse message:', error);
                return;
            }
    
            if (message.type === INIT_GAME) {
                if (this.pendingUser) {
                    // start game
                    const game = new Game(this.pendingUser, socket);
                    this.games.push(game);
                    this.pendingUser = null;
                } else {
                    this.pendingUser = socket;
                }
            }
    
            if (message.type === MOVE) {
                const game = this.games.find(game => game.player1 === socket || game.player2 === socket);
                if (game) {
                    game.makeMove(socket, message.payload.move);
                }
            }
        });
    }
}