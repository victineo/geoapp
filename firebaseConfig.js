import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyDvGilPRStmfBLfkfQTznJKJaR6h0aJJ3E",
  authDomain: "geoapp-cbdf8.firebaseapp.com",
  projectId: "geoapp-cbdf8",
  storageBucket: "geoapp-cbdf8.firebasestorage.app",
  messagingSenderId: "507708246811",
  appId: "1:507708246811:web:da21aeff0a75c484de21be",
  measurementId: "G-CW0NEW5GYX"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export {db, auth};
