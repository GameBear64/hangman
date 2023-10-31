import { reactive } from 'vue'

const words = [
  "hangman",
  "javascript",
  "programming",
  "developer",
  "computer",
  "giraffe",
  "elephant",
  "keyboard",
  "coffee",
  "pizza",
  "internet",
  "penguin",
  "squirrel",
  "chocolate",
  "banana",
  "pineapple",
  "sunflower",
  "moonlight",
  "paradise",
  "tiger",
  "ocean",
  "beach",
  "mountain",
  "language",
  "cucumber",
  "butterfly",
  "dragon",
  "firework",
  "superhero",
  "watermelon",
  "cappuccino",
  "rainbow",
  "vampire",
  "zombie",
  "mermaid",
  "butterfly",
  "robot",
  "spaceship",
  "wizard",
  "dinosaur",
  "unicorn",
  "library",
  "carousel",
  "jazz",
  "piano",
  "accordion",
];


export const store = reactive({
  username: localStorage.getItem('username'),
  word: '',
  category: '',
  setName(name) {
    localStorage.setItem('username', name)
    this.username = name
  },
  setRandomWord() {
    this.word = words[Math.floor(Math.random() * words.length)]
  }
})