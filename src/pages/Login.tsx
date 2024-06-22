import React, {useEffect, useState} from 'react';
import {View, Pressable, StyleSheet, Text} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useDispatch} from 'react-redux';
import {login} from '../store/reducers/authReducer';
import {AppDispatch} from '../store';
import {StackNavigationProp} from '@react-navigation/stack';
import {PageNavigation} from '../../types/navigation';
import {authorize} from 'react-native-app-auth';

interface LoginProps {
  navigation: StackNavigationProp<PageNavigation, 'SignUpFirstStep'>;
}

// 구글 클라우드 콘솔에서 얻은 안드로이드 클라이언트 ID
const ANDROID_CLIENT_ID =
  '54570271712-a2ct0tbftq1gdrnf7p9pk6m8kfs4sbsl.apps.googleusercontent.com';

const googleConfig = {
  issuer: 'https://accounts.google.com',
  clientId: ANDROID_CLIENT_ID,
  redirectUrl: 'com.mypet:/oauth2redirect/google',
  scopes: ['openid', 'profile', 'email'],
};

const googleSignInConfigure = () => {
  GoogleSignin.configure({
    webClientId: ANDROID_CLIENT_ID,
  });
};

const Login: React.FC<LoginProps> = ({navigation}) => {
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(false);

  const googleLoginButton = async () => {
    try {
      const result = await authorize(googleConfig);
      console.log(result);
      // 서버로 result.accessToken을 보내서 JWT 발급
      dispatch(login());
    } catch (error) {
      console.error('Google login error', error);
    }
  };

  const checkLoggedIn = async () => {};

  const handleSignIn = async () => {
    // 회원이 있는지 없는지 로직 필요
    googleLoginButton();
    navigation.navigate('SignUpFirstStep');
  };

  useEffect(() => {
    googleSignInConfigure();
  }, []);

  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={googleLoginButton}>
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
