import { WebSocketServer } from 'ws';
import GameManager  from '@/app/comp_lib/GameManager';
const wss = new WebSocketServer({ port:8080 });

const gameManager=new GameManager();
wss.on('connection', function connection(ws) {
  gameManager.addUser(ws);
  ws.on('disconnect',()=>gameManager.removeUser(ws))  
});

