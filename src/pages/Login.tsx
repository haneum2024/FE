import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useDispatch} from 'react-redux';
import {StackNavigationProp} from '@react-navigation/stack';
import {authorize} from 'react-native-app-auth';
import {Button} from 'react-native-paper';
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

import {getUserApi, loginApi} from '../api/api';
import CustomText from '../components/CustomText';
import {getAccessToken, saveAccessToken} from '../storage/auth';
import {login} from '../store/reducers/authReducer';

import type {AuthPageNavigation} from '../../types/navigation';
import type {LoginResponse, UserResponse} from '../../types/auth';
import color from '../styles/color';

import GoogleIcon from '../img/GoogleIcon.svg';
import LogoIcon from '../img/LogoIcon.svg';
import NaverIcon from '../img/NaverIcon.svg';

interface LoginProps {
  navigation: StackNavigationProp<AuthPageNavigation, 'TermsOfUse'>;
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

  useEffect(() => {
    const checkLoginStatus = async () => {
      const accessToken = await getAccessToken();
      if (accessToken) {
        try {
          const userResponse = await getUserApi(accessToken);
          const userData: UserResponse = userResponse.data;
          console.log('userData:', userData);

          if (!userData.termsOfServiceAgreement) {
            navigation.navigate('TermsOfUse');
          } else {
            dispatch(login());
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    checkLoginStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const googleLoginButton = async () => {
    try {
      GoogleSignin.configure({
        webClientId: GOOGLE_CLIENT_ID,
        offlineAccess: true,
      });

      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('User Info:', userInfo);

      const loginResponse = await loginApi({
        provider: 'google',
        authorization: userInfo.idToken as string,
      });

      const loginData: LoginResponse = loginResponse.data;
      await saveAccessToken(loginData.accessToken);

      const userResponse = await getUserApi(loginData.accessToken);
      const userData: UserResponse = userResponse.data;
      console.log('userData:', userData);

      if (!userData.termsOfServiceAgreement) {
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
    <View style={styles.loginContainer}>
      <View style={styles.logoContainer}>
        <LogoIcon width={86} height={86} />
        <CustomText style={styles.title}>해피마루</CustomText>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          style={styles.googleButton}
          onPress={googleLoginButton}>
          <View style={styles.iconTextBox}>
            <GoogleIcon width={20} height={20} />
            <CustomText weight="600" style={styles.googleText}>
              구글 계정으로 로그인
            </CustomText>
          </View>
        </Button>
        <Button
          mode="contained"
          style={styles.naverButton}
          onPress={naverLoginButton}>
          <View style={styles.iconTextBox}>
            <NaverIcon width={20} height={20} />
            <CustomText weight="600" style={styles.naverText}>
              네이버 계정으로 로그인
            </CustomText>
          </View>
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    paddingTop: 260,
    paddingBottom: 68,
    paddingHorizontal: 24,
    backgroundColor: color.white,
    gap: 280,
  },
  logoContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontFamily: 'Cafe24OhsquareAir-v2.0',
    color: color.blue[600],
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  googleButton: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: color.gray[200],
    backgroundColor: color.gray[50],
  },
  iconTextBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  googleText: {
    fontSize: 16,
    color: color.gray[950],
  },
  naverButton: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    height: 50,
    borderRadius: 10,
    backgroundColor: '#03C75A',
  },
  naverText: {
    fontSize: 16,
    color: color.white,
  },
});

export default Login;
