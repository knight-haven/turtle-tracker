import React from 'react';
// import { ReactNativeAD } from 'react-native-azure-ad'
import { createAppContainer } from 'react-navigation';
import * as firebase from 'firebase';
import MainNavigator from './AppNavigator';
import { ADContext } from './services/ActiveDirectory';

const AppContainer = createAppContainer(MainNavigator);

var firebaseConfig = {
  apiKey: "AIzaSyC-x_MunqTNd5O-9V7Psy-FrlcLIdL35v4",
  authDomain: "turtletracker-b9856.firebaseapp.com",
  databaseURL: "https://turtletracker-b9856.firebaseio.com",
  projectId: "turtletracker-b9856",
  storageBucket: "turtletracker-b9856.appspot.com",
  messagingSenderId: "343464631688",
  appId: "1:343464631688:web:c4fc25c5f414faa5e2ee3d",
  measurementId: "G-5MRD8D6V20"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default function App() {
  return (
    <ADContext.Provider>
      <AppContainer />
    </ADContext.Provider>
  )
}
