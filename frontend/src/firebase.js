import firebase from "firebase/app";
import "firebase/messaging";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDAtxtln-2NXFrQY913KyamQV9zcq2gnYM",
  authDomain: "event-management-system-377e1.firebaseapp.com",
  projectId: "event-management-system-377e1",
  storageBucket: "event-management-system-377e1.appspot.com",
  messagingSenderId: "71622628834",
  appId: "1:71622628834:web:22cd19915b2c68f4bf95bb",
  measurementId: "G-JVPXL5W1EF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Cloud Messaging
const messaging = firebase.messaging();

export const getToken = async () => {
  try {
    const currentToken = await messaging.getToken({
      vapidKey: "YOUR_VAPID_KEY",
    });
    if (currentToken) {
      console.log("FCM Token:", currentToken);
      return currentToken;
    } else {
      console.error("No FCM token retrieved");
    }
  } catch (error) {
    console.error("Error retrieving FCM token", error);
  }
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      resolve(payload);
    });
  });
