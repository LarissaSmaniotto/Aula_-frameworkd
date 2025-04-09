import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyB9V6NSiMSA3ECxoDezYttbIQF61XPWwpM",
  authDomain: "fmds-aula10.firebaseapp.com",
  projectId: "fmds-aula10",
  storageBucket: "fmds-aula10.appspot.com",
  messagingSenderId: "696692724061",
  appId: "1:696692724061:web:27ea45782f6106ed7098b4"
};
const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp;