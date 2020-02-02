import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyBF4RI4mdFiZd5CaD69cS_DN7zAqKv5vYg",
  authDomain: "test-58af5.firebaseapp.com",
  databaseURL: "https://test-58af5.firebaseio.com",
  projectId: "test-58af5",
  storageBucket: "test-58af5.appspot.com",
  messagingSenderId: "543207644126",
  appId: "1:543207644126:web:8359bb8f39b46c37365b4f"
}

firebase.initializeApp(firebaseConfig)

export const db = firebase.firestore()
export const storage = firebase.storage()
export const corsFirebase = 'https://cors-anywhere.herokuapp.com/'
