# Hangman

[![Vue.js](https://img.shields.io/badge/vuejs-%2335495e.svg?style=for-the-badge&logo=vuedotjs&logoColor=%234FC08D)](https://vuejs.org/) [![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)](https://socket.io/)  [![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/) [![Glob](https://img.shields.io/badge/GLOB-774AB7?style=for-the-badge&logoColor=white)](https://www.npmjs.com/package/glob)

This was a practice project to play around and learn vue and to practice socket.io on the client side *(I had done only server-side until now)*

## Installation and running

Running this project requires 2 commands
```bash
npm i
npm run dev
```
This starts both the front end and the back end (socket.io handler), you should see something like this: 
![concurrently](https://github.com/GameBear64/hangman/assets/33098072/041f3fb9-1010-4589-88da-b68048fe5162)

## Menu
The game menu is super minimalistic, after you chose your username (which is saved in local storage) you are presented with 3 options
![image](https://github.com/GameBear64/hangman/assets/33098072/d03518e7-4970-4e37-b0ff-202f7365aba5)

## The game
The singleplayer and multiplayer modes are almost identical in design, but in functionality, multiplayer has a lot more to offer with turn and score tracking
![image](https://github.com/GameBear64/hangman/assets/33098072/45b538a1-b6e7-4d1c-a186-7579bdf1afd1)
<details> 
  <summary>Can you guess the word?</summary>
   watermelon
</details>
