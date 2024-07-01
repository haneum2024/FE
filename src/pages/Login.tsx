import React from 'react';
import {View, Pressable, StyleSheet, Text} from 'react-native';
// import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useDispatch} from 'react-redux';
import {login} from '../store/reducers/authReducer';
import {StackNavigationProp} from '@react-navigation/stack';
import {PageNavigation} from '../../types/navigation';
import {authorize} from 'react-native-app-auth';
import {loginApi} from '../api/api';
// import NaverLogin, {
//   NaverLoginResponse,
//   GetProfileResponse,
// } from '@react-native-seoul/naver-login';
import pkceChallenge from 'react-native-pkce-challenge';

interface LoginProps {
  navigation: StackNavigationProp<PageNavigation, 'SignUpFirstStep'>;
}

// 구글 클라우드 콘솔에서 얻은 안드로이드 클라이언트 ID
const GOOGLE_CLIENT_ID =
  '54570271712-a2ct0tbftq1gdrnf7p9pk6m8kfs4sbsl.apps.googleusercontent.com';
const GOOGLE_REDIRECT_URI = 'com.mypet:/oauth2redirect/google';

// 네이버 클라이언트 정보
const NAVER_CLIENT_ID = 'aRtsZ5tiPboW41G3a8iO';
const NAVER_CLIENT_SECRET = 'UKEFaAtLbo';
const NAVER_REDIRECT_URI = 'com.mypet:/oauth2redirect/naver';

const googleConfig = {
  issuer: 'https://accounts.google.com',
  clientId: GOOGLE_CLIENT_ID,
  redirectUrl: GOOGLE_REDIRECT_URI,
  scopes: ['openid', 'profile', 'email'],
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
        // additionalParameters: {
        //   code_challenge: pkce.codeChallenge,
        //   code_challenge_method: 'S256',
        // },
      });

      console.log('Google Authorization result:', result);

      // 서버로 code_verifier 및 result.accessToken을 보내서 JWT 발급
      const response = await loginApi({
        provider: 'google',
        code: result.accessToken,
        codeVerifier: pkce.codeVerifier,
      });

      console.log('Server response:', response.data);

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
