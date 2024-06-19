import React, {useEffect, useState} from 'react';
import {View, Pressable, StyleSheet, Text} from 'react-native';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useDispatch} from 'react-redux';
import {login} from '../store/reducers/authReducer';
import {AppDispatch} from '../store';
import {StackNavigationProp} from '@react-navigation/stack';
import {PageNavigation} from '../../types/navigation';

interface LoginProps {
  navigation: StackNavigationProp<PageNavigation, 'SignUpFirstStep'>;
}

// Firebase 콘솔에서 얻은 웹 클라이언트 ID
const WEB_CLIENT_ID =
  '54570271712-f59ukatoig739fk0evvibotcktb5hlrf.apps.googleusercontent.com';

GoogleSignin.configure({
  webClientId: WEB_CLIENT_ID,
});

const googleLoginButton = async (dispatch: AppDispatch) => {
  const {idToken} = await GoogleSignin.signIn();
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  await auth().signInWithCredential(googleCredential);
  dispatch(login());
};

const googleSignInConfigure = () => {
  GoogleSignin.configure({
    webClientId: WEB_CLIENT_ID,
  });
};

const Login: React.FC<LoginProps> = ({navigation}) => {
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(false);

  const checkLoggedIn = () => {
    auth().onAuthStateChanged(user => {
      if (user) {
        setIsLogin(true);
        console.log('userData', auth().currentUser);
        console.log('loggedIn');
      } else {
        setIsLogin(false);
        console.log('loggedOut');
      }
    });
  };

  const handleSignIn = async () => {
    // 회원이 있는지 없는지 로직 필요
    googleLoginButton(dispatch);
    navigation.navigate('SignUpFirstStep');
  };

  useEffect(() => {
    googleSignInConfigure();
  }, []);

  useEffect(() => {
    checkLoggedIn();
  }, [isLogin]);

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.button}
        onPress={() => googleLoginButton(dispatch)}>
        <Text>구글로그인</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={handleSignIn}>
        <Text>회원 가입</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: 150,
    alignItems: 'center',
    backgroundColor: 'yellow',
    borderRadius: 5,
    margin: 5,
  },
});

export default Login;
