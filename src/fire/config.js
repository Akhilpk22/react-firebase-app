// 
import { initializeApp } from "firebase/app";
import {getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD0myrfmnbqacCzvT7VF_1s45RQVrrg0F0",
  authDomain: "newdemo-369df.firebaseapp.com",
  projectId: "newdemo-369df",
  storageBucket: "newdemo-369df.appspot.com",
  messagingSenderId: "306901227826",
  appId: "1:306901227826:web:e0bacbff4315e0bd7c9f2b",
  measurementId: "G-MY6XT0GZF1"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
