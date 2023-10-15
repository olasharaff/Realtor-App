// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCMgbnItplA4D6bPpGxiYUmdYYZgiuATzw",
    authDomain: "realtor-clone-react-app-e56f4.firebaseapp.com",
    projectId: "realtor-clone-react-app-e56f4",
    storageBucket: "realtor-clone-react-app-e56f4.appspot.com",
    messagingSenderId: "864415133916",
    appId: "1:864415133916:web:381c5e388f68395ed00419"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();

