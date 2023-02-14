import {initializeApp} from 'firebase/app'
import {getFirestore, } from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyD5NatWNhTqJPfNz1SPs7SWxg0FpuB4ymM",
  authDomain: "legon-project.firebaseapp.com",
  projectId: "legon-project",
  storageBucket: "legon-project.appspot.com",
  messagingSenderId: "769238797134",
  appId: "1:769238797134:web:b6d65a59011be98215ec1f",
  measurementId: "G-HK31ZN36TH"
};

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)

export {auth, db, storage}