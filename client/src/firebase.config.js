
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC_ypWf7np1PIf96IK112oBEX6FP4fcyhY",
  authDomain: "otps-42953.firebaseapp.com",
  projectId: "otps-42953",
  storageBucket: "otps-42953.appspot.com",
  messagingSenderId: "743730952282",
  appId: "1:743730952282:web:78d8d4d9d66773fbdc8063",
  measurementId: "G-MB17SEY8LN"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;