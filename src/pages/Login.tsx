import React from 'react';
import {View, Pressable, StyleSheet} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useDispatch} from 'react-redux';
import {StackNavigationProp} from '@react-navigation/stack';
import {authorize} from 'react-native-app-auth';
import {
  GOOGLE_CLIENT_ID,
  NAVER_CLIENT_ID,
  NAVER_CLIENT_SECRET,
  NAVER_REDIRECT_URI,
} from 'react-native-dotenv';
// import NaverLogin, {
//   NaverLoginResponse,
//   GetProfileResponse,
// } from '@react-native-seoul/naver-login';

import {loginApi} from '../api/api';
import CustomText from '../components/CustomText';
import {setAccessToken} from '../storage/auth';
import {login} from '../store/reducers/authReducer';

import type {PageNavigation} from '../../types/navigation';
import type {LoginResponse} from '../../types/auth';
import color from '../styles/color';

interface LoginProps {
  navigation: StackNavigationProp<PageNavigation, 'TermsOfUse'>;
}

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
      GoogleSignin.configure({
        webClientId: GOOGLE_CLIENT_ID,
        offlineAccess: true,
      });

      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('User Info:', userInfo);

      const response = await loginApi({
        provider: 'google',
        authorization: userInfo.idToken as string,
      });

      const responseData: LoginResponse = response.data;

      await setAccessToken(responseData.accessToken);

      console.log('Server response:', responseData);
      if (!responseData.isAgreeTerms) {
        navigation.navigate('TermsOfUse');
        return;
      } else {
        dispatch(login());
      }
    } catch (error) {
      console.error('Google login error', error);
    }
  };

  const naverLoginButton = async () => {
    try {
      const result = await authorize({
        ...naverConfig,
      });

      console.log('Naver Authorization result:', result);

      // 서버로 code_verifier 및 result.accessToken을 보내서 JWT 발급
      // const response = await loginApi({
      //   provider: 'naver',
      //   authorization: result.accessToken,
      // });

      // console.log('Server response:', response.data);

      dispatch(login());
    } catch (error) {
      console.error('Naver login error', error);
    }
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={googleLoginButton}>
        <CustomText>구글로그인</CustomText>
      </Pressable>
      <Pressable style={styles.button} onPress={naverLoginButton}>
        <CustomText>네이버로그인</CustomText>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.white,
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
