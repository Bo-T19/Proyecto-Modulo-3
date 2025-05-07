// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import * as Firestore from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDaw_QI2lHm1CJMETsXZyidlMq2QRTExPQ",
    authDomain: "bim-module3.firebaseapp.com",
    projectId: "bim-module3",
    storageBucket: "bim-module3.firebasestorage.app",
    messagingSenderId: "414829144727",
    appId: "1:414829144727:web:6a5a7040caceb1ac0517d2"
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const firebaseDB = getFirestore()

export function getCollection<T>(path: string){
    return Firestore.collection(firebaseDB,path) as Firestore.CollectionReference<T>
}

export async function deleteDocument(path: string, id: string)
{
    const doc = Firestore.doc(firebaseDB, `${path}/${id}`)
    await Firestore.deleteDoc(doc)
}


export async function updateDocument<T extends Record <string, any>>(path: string, id: string, data: T)
{
    const doc = Firestore.doc(firebaseDB, `${path}/${id}`)
    await Firestore.updateDoc(doc, data)
}