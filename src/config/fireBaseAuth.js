
import { initializeApp } from "firebase/app";
import { getAuth , GoogleAuthProvider } from "firebase/auth";
// import {  } from "firebase/auth/web-extension";
console.log(process.env.REACT_APP_BASE_URL);
console.log(process.env);

const firebaseConfig = JSON.parse(process.env.REACT_APP_KEY)

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 const auth = getAuth(app);

 const provider = new GoogleAuthProvider();

 export {auth , provider}