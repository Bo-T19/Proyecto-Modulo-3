// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import * as Firestore from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCFmLzaIgRzm_Gu35ilA3IIhcAifprKplY",
    authDomain: "bim-webapp.firebaseapp.com",
    projectId: "bim-webapp",
    storageBucket: "bim-webapp.firebasestorage.app",
    messagingSenderId: "443452484329",
    appId: "1:443452484329:web:7666ebfecf3c185a771e78"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const firebaseDB = getFirestore()

export function getCollection<T>(path: string){
    return Firestore.collection(firebaseDB,path) as Firestore.CollectionReference<T>
}