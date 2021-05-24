import { LinearGradient } from 'expo-linear-gradient';
import LogRocket from 'logrocket';
import React, { useState } from 'react';
import { Alert } from 'react-native';
import Button from '../components/Button';
import Screen from '../components/Screen';
import TextField from '../components/TextField';
import { AuthContext } from '../context';
import { LOGIN_PASS, USERS } from '../env';

/*
 allow users to sign in with a username and password
*/
export default function AlternateLoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const usernameRef = React.useRef();
  const passwordRef = React.useRef();
  const { setUserSignedIn } = React.useContext(AuthContext);

  function handleLogin() {
    let pw = password.localeCompare(LOGIN_PASS) == 0;
    let user = USERS.includes(username);
    if (user && pw) {
      setUserSignedIn(true);
      LogRocket.identify(user, {
        name: user,
      });
    } else if (!user) {
      Alert.alert(
        `unknown username: ${username}`,
        'Please try again',
        [{ text: 'Close', onPress: () => {} }],
        { cancelable: false },
      );
    } else {
      Alert.alert(
        `Incorrect password for ${username}`,
        'Please try again',
        [{ text: 'Close', onPress: () => {} }],
        { cancelable: false },
      );
    }
  }

  return (
    <Screen>
      <TextField
        label={'Username: '}
        onChangeText={(username) => setUsername(username)}
        value={username}
        reference={usernameRef}
        autoCapitalize={'none'}
      />
      <TextField
        label={'Password: '}
        onChangeText={(password) => setPassword(password)}
        value={password}
        reference={passwordRef}
        autoCapitalize={'none'}
        secureTextEntry={true}
      />
      <Button
        title={'submit'}
        bold={true}
        type={'solid'}
        raised={true}
        onPress={handleLogin}
        ViewComponent={LinearGradient}
        linearGradientProps={{
          colors: ['lime', 'green'],
          start: { x: 0, y: 0 },
          end: { x: 0.8, y: 0.8 },
        }}
      />
    </Screen>
  );
}
