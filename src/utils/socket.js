/* eslint-disable no-console */
import { reactive } from "vue";
import { io } from "socket.io-client";

import { router } from '../main'

import { errorSnackBar, successSnackBar, warningSnackBar } from "./snackbars";

export const socket = io('http://localhost:3030/', {
  autoConnect: false,
  auth: {
    userID: localStorage.getItem('hangman-user')
  }
});

const gameState = reactive({
  state: {
    players: [],
    guessed: [],
    word: '',
    category: ''
  },
  code: ''
});

export { gameState } // so we can edit it here too

socket.on("created-room", ({code, state}) => {
  gameState.code = code
  gameState.state = state

  successSnackBar(`Created game room ${code}`)
});

socket.on("joined-room", (roomState) => {
  gameState.state = roomState;
  successSnackBar('New player joined game room!')
});

socket.on("update-game", (roomState) => {
  gameState.state = roomState;
});

socket.on("nonexistent-room", () => {
  errorSnackBar("Room does not exist!")
  Object.assign(gameState, {code: '', state: {}});
  socket.disconnect();
  router.push(`/game-select`);
});

socket.on("not-your-turn", () => {  
  warningSnackBar("Wait for your turn to come");
});