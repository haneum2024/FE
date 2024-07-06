import React from 'react';
import {View, Pressable, StyleSheet, Text} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useDispatch} from 'react-redux';
import {StackNavigationProp} from '@react-navigation/stack';
import {authorize} from 'react-native-app-auth';
// import NaverLogin, {
//   NaverLoginResponse,
//   GetProfileResponse,
// } from '@react-native-seoul/naver-login';
import pkceChallenge from 'react-native-pkce-challenge';

import {loginApi} from '../api/api';
import {PageNavigation} from '../../types/navigation';
import {setAccessToken} from '../storage/auth';
import {login} from '../store/reducers/authReducer';

import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI,
  NAVER_CLIENT_ID,
  NAVER_CLIENT_SECRET,
  NAVER_REDIRECT_URI,
} from 'react-native-dotenv';

interface LoginProps {
  navigation: StackNavigationProp<PageNavigation, 'SignUpFirstStep'>;
}

const googleConfig = {
  issuer: 'https://accounts.google.com',
  clientId: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  redirectUrl: GOOGLE_REDIRECT_URI,
  scopes: ['openid', 'profile', 'email'],
  // usePKCE: true,
  // serviceConfiguration: {
  //   authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
  //   tokenEndpoint: 'https://oauth2.googleapis.com/token',
  // },
};

const naverConfig = {
  issuer: 'https://nid.naver.com',
  clientId: NAVER_CLIENT_ID,
  clientSecret: NAVER_CLIENT_SECRET,
  redirectUrl: NAVER_REDIRECT_URI,
  scopes: ['profile', 'email'],
};

const Login: React.FC<LoginProps> = ({navigation}) => {
  const dispatch = useDispatch();

  const googleLoginButton = async () => {
    try {
      const pkce = pkceChallenge();
      console.log('codeVerifier:', pkce.codeVerifier);
      console.log('codeChallenge:', pkce.codeChallenge);

      const result = await authorize({
        ...googleConfig,
        // additionalHeaders: {
        //   code_challenge: pkce.codeChallenge,
        //   code_challenge_method: 'S256',
        // },
      });

      // GoogleSignin.configure({
      //   webClientId: GOOGLE_CLIENT_ID,
      //   offlineAccess: true,
      // });

      // await GoogleSignin.hasPlayServices();
      // const userInfo = await GoogleSignin.signIn();
      // console.log('User Info:', userInfo);

      await setAccessToken(result.accessToken);
      console.log('Google Authorization result:', result);

      // 서버로 code_verifier 및 result.accessToken을 보내서 JWT 발급
      // const response = await loginApi({
      //   provider: 'google',
      //   code: result.accessToken,
      //   codeVerifier: pkce.codeVerifier,
      // });

      // console.log('Server response:', response.data);

      dispatch(login());
    } catch (error) {
      console.error('Google login error', error);
    }
  };

  const naverLoginButton = async () => {
    try {
      const pkce = pkceChallenge();
      console.log('codeVerifier:', pkce.codeVerifier);
      console.log('codeChallenge:', pkce.codeChallenge);

      const result = await authorize({
        ...naverConfig,
        // additionalParameters: {
        //   code_challenge: pkce.codeChallenge,
        //   code_challenge_method: 'S256',
        // },
      });

      console.log('Naver Authorization result:', result);

      // 서버로 code_verifier 및 result.accessToken을 보내서 JWT 발급
      const response = await loginApi({
        provider: 'naver',
        code: result.accessToken,
        codeVerifier: pkce.codeVerifier,
      });

      console.log('Server response:', response.data);

      dispatch(login());
    } catch (error) {
      console.error('Naver login error', error);
    }
  };

  const handleSignIn = async () => {
    // 회원이 있는지 없는지 로직 필요
    googleLoginButton();
    navigation.navigate('SignUpFirstStep');
  };

  // useEffect(() => {
  //   googleSignInConfigure();
  // }, []);

  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={googleLoginButton}>
        <Text>구글로그인</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={naverLoginButton}>
        <Text>네이버로그인</Text>
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
