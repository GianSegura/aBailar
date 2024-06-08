import { initializeApp, getApp } from "firebase/app";
import { initializeAuth, getAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyBBUo9uBaV61xzzzkeIUsUo9mvrmcm8wuI",
  authDomain: "abailar-6017e.firebaseapp.com",
  projectId: "abailar-6017e",
  storageBucket: "abailar-6017e.appspot.com",
  messagingSenderId: "473452662614",
  appId: "1:473452662614:web:06042f08f83597a132d0f7",
  measurementId: "G-B28M428GHQ"
};

// initialize Firebase App
const app = initializeApp(firebaseConfig);
// initialize Firebase Auth for that app immediately
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export { app, auth, getApp, getAuth };