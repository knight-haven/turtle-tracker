// Firebase
import * as fb from 'firebase';
export var firebaseConfig = {
  apiKey: "AIzaSyC-x_MunqTNd5O-9V7Psy-FrlcLIdL35v4",
  authDomain: "turtletracker-b9856.firebaseapp.com",
  databaseURL: "https://turtletracker-b9856.firebaseio.com",
  projectId: "turtletracker-b9856",
  storageBucket: "turtletracker-b9856.appspot.com",
  messagingSenderId: "343464631688",
  appId: "1:343464631688:web:c4fc25c5f414faa5e2ee3d",
  measurementId: "G-5MRD8D6V20"
};
fb.initializeApp(firebaseConfig);

// https://stackoverflow.com/questions/48492047/where-do-i-initialize-firebase-app-in-react-application
// Prevent multiple firebase instances.
export let firebase = !fb.apps.length ? fb.initializeApp(config) : fb.app();