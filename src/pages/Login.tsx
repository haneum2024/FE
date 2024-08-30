import React, {useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useDispatch} from 'react-redux';
import {StackNavigationProp} from '@react-navigation/stack';
import {Button} from 'react-native-paper';
import {GOOGLE_CLIENT_ID} from 'react-native-dotenv';

import {getUserApi, loginApi} from '../api/userApi';
import CustomText from '../components/CustomText';
import GoogleIcon from '../img/GoogleIcon.svg';
import AppIcon from '../img/AppIcon.svg';
import {getAccessToken, saveAccessToken} from '../storage/auth';
import {login} from '../store/reducers/authReducer';
import color from '../styles/color';
import type {AuthPageNavigation} from '../../types/navigation';
import type {LoginResponse, UserResponse} from '../../types/auth';
import {getFCMToken} from '../utils/getFCMToken';
import {postFCMTokenApi} from '../api/fcmAlarmApi';

interface LoginProps {
  navigation: StackNavigationProp<AuthPageNavigation, 'TermsOfUse'>;
}
const Login: React.FC<LoginProps> = ({navigation}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkLoginStatus = async () => {
      const accessToken = await getAccessToken();
      if (accessToken) {
        try {
          const userResponse = await getUserApi(accessToken);
          const fcmToken = await getFCMToken();
          await postFCMTokenApi({
            accessToken: accessToken as string,
            fcmToken: fcmToken,
          });
          const userData: UserResponse = userResponse.data;

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

      const loginResponse = await loginApi({
        provider: 'google',
        authorization: userInfo.idToken as string,
      });

      const loginData: LoginResponse = loginResponse.data;
      await saveAccessToken(loginData.accessToken);

      const userResponse = await getUserApi(loginData.accessToken);
      const fcmToken = await getFCMToken();
      await postFCMTokenApi({
        accessToken: loginData.accessToken,
        fcmToken: fcmToken,
      });
      const userData: UserResponse = userResponse.data;

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

  return (
    <View style={styles.loginContainer}>
      <View style={styles.logoContainer}>
        <AppIcon width={60} height={60} />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Happy Maru</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          style={styles.googleButton}
          onPress={googleLoginButton}>
          <View style={styles.iconTextBox}>
            <GoogleIcon width={20} height={20} />
            <CustomText weight="600" style={styles.googleText}>
              구글 로그인
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
    gap: 320,
  },
  logoContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter_24pt-ExtraBoldItalic',
    color: color.blue[600],
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  googleButton: {
    display: 'flex',
    position: 'absolute',
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
});

export default Login;
