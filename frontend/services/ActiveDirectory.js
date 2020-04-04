import React from 'react';
import { ReactNativeAD } from 'react-native-azure-ad'

// Initalize AD object for after sign in.
const CLIENT_ID = '1cc5ab7b-ae5c-40d7-b267-4f1302adcd86'
let AD = new ReactNativeAD({
  client_id: CLIENT_ID,
  resources: [
    'https://outlook.office365.com'
  ]
})
export const ADContext = React.createContext(AD);
// console.log(AD)
// console.log(ADContext)