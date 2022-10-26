// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";
import { initializeAuth } from "firebase/auth";
import { getReactNativePersistence } from "firebase/auth/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDu7hj_qfoP4HHrkHw0EaT1Hm96l4bE6fo",
  authDomain: "couponet-c8c94.firebaseapp.com",
  projectId: "couponet-c8c94",
  storageBucket: "couponet-c8c94.appspot.com",
  messagingSenderId: "940705987429",
  appId: "1:940705987429:web:3e76eff67b23b496ba7f8c",
  measurementId: "G-S254V2136Q",
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app); // TODO: change 'db' to 'firestore'

// Initialize authentication => this way because of async storage warning because RN has removed AsyncStorage from core
export const auth = initializeAuth(app, { persistence: getReactNativePersistence(AsyncStorage) });
