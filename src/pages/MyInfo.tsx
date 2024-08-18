import React from 'react';
import {
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  useColorScheme,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useDispatch} from 'react-redux';
import {GOOGLE_CLIENT_ID} from 'react-native-dotenv';

import {logout} from '../store/reducers/authReducer';
import {AppDispatch} from '../store';
import CustomText from '../components/CustomText';
import {getAccessToken, removeAccessToken} from '../storage/auth';
import {createDogInfo, getAccount, getNfts} from '../services/web3Service';
import messaging from '@react-native-firebase/messaging';

GoogleSignin.configure({
  webClientId: GOOGLE_CLIENT_ID,
});



const getToken = async () => {
  const fcmToken = await messaging().getToken();
  if (fcmToken) {
    console.log('FCM Token:', fcmToken);
    // 이 토큰을 서버로 전송하거나 사용자가 로그인을 했을 때 서버에 저장할 수 있습니다.
  } else {
    console.log('Failed to get FCM token');
  }
};

const getAccessTokenButton = async () => {
  const accessToken = await getAccessToken();
  console.log('Access Token:', accessToken);
};

const googleLogoutButton = async (dispatch: AppDispatch) => {
  try {
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
    removeAccessToken();
    dispatch(logout());
    console.log('로그아웃 성공');
  } catch (error) {
    console.error('로그아웃 실패:', error);
  }
};

function MyInfo() {
  const dispatch = useDispatch();
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View>
          <Pressable
            style={styles.button}
            onPress={() => console.log(getAccount())}>
            <CustomText weight="500">address 확인</CustomText>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={async () => await getNfts()}>
            <CustomText weight="500">NFT 확인</CustomText>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={async () =>
              await createDogInfo(
                '해피',
                'mix',
                '2021-10-01',
                'M',
                true,
                '귀여움',
                'image URL',
                'tokenURI',
              )
            }>
            <CustomText weight="500">create dog 확인</CustomText>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => googleLogoutButton(dispatch)}>
            <CustomText weight="500">로그아웃</CustomText>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => getToken()}>
            <CustomText weight="500">GET FCM TOKEN</CustomText>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => getAccessTokenButton()}>
            <CustomText weight="500">GET ACCESS TOKEN</CustomText>
          </Pressable>


        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  buttonWrapper: {flexDirection: 'row', justifyContent: 'center'},
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: 120,
    alignItems: 'center',
    backgroundColor: 'yellow',
    borderRadius: 5,
    margin: 5,
  },
  buttonText: {
    color: 'black',
  },
  buttonDisabled: {
    backgroundColor: 'gray',
  },
});

export default MyInfo;
