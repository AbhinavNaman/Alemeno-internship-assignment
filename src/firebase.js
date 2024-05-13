import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCWb1EP4BHbdBBqvXr78JL6Bf7ULcdNjSk",
  authDomain: "alemeno-course-list.firebaseapp.com",
  projectId: "alemeno-course-list",
  storageBucket: "alemeno-course-list.appspot.com",
  messagingSenderId: "988182766267",
  appId: "1:988182766267:web:242410c64a9a3c7be1bf9e",
  databaseURL: "https://console.firebase.google.com/u/0/project/alemeno-course-list/database/alemeno-course-list-default-rtdb/data/~2F"
};

export const app = initializeApp(firebaseConfig);
