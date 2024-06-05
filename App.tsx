import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AppInner from './AppInner';
import Login from './src/pages/Login';
import {Provider} from 'react-redux';
import store from './src/store';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {Pressable, StyleSheet, Text, View} from 'react-native';

// Firebase 콘솔에서 얻은 웹 클라이언트 ID
const WEB_CLIENT_ID =
  '54570271712-f59ukatoig739fk0evvibotcktb5hlrf.apps.googleusercontent.com';

GoogleSignin.configure({
  webClientId: WEB_CLIENT_ID,
});

const onGoogleButtonPress = async () => {
  const {idToken} = await GoogleSignin.signIn();
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  return auth().signInWithCredential(googleCredential);
};

const googleSignInConfigure = () => {
  GoogleSignin.configure({
    webClientId: WEB_CLIENT_ID,
  });
};

function App(): React.JSX.Element {
  const [isLogin, setIsLogin] = useState(false);

  const checkLoggedIn = () => {
    auth().onAuthStateChanged(user => {
      if (user) {
        setIsLogin(true);
        console.log('loggedIn');
      } else {
        setIsLogin(false);
        console.log('loggedOut');
      }
    });
  };
  const handleLogin = () => {
    setIsLogin(true);
  };

  useEffect(() => {
    googleSignInConfigure();
  }, []);

  useEffect(() => {
    checkLoggedIn();
  }, [isLogin]);

  return (
    <Provider store={store}>
      <NavigationContainer>
        {isLogin ? (
          <AppInner />
        ) : (
          <View style={styles.container}>
            <Pressable
              style={styles.button}
              onPress={() => onGoogleButtonPress()}>
              <Text>구글로그인</Text>
            </Pressable>
          </View>
        )}
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: 120,
    alignItems: 'center',
    backgroundColor: 'yellow',
    borderRadius: 5,
    margin: 5,
  },
});

export default App;
