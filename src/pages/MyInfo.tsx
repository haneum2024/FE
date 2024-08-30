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
import {
  createDogInfo,
  getAccount,
  getDogNft,
  getNfts,
} from '../services/web3Service';
import {getFCMToken} from '../utils/getFCMToken';

GoogleSignin.configure({
  webClientId: GOOGLE_CLIENT_ID,
});

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
            onPress={async () => {
              const dogNfts = await getDogNft();
              console.log(dogNfts);
            }}>
            <CustomText weight="500">Dog NFT 확인</CustomText>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={async () => {
              const nfts = await getNfts();
              console.log(nfts);
            }}>
            <CustomText weight="500">전체 NFT 확인</CustomText>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={async () =>
              // 비문 데이터는 S3에 일단 넣는 것으로 진행 있는 api 사용
              await createDogInfo(
                '마루',
                'mix',
                '2023-12-24',
                'M',
                true,
                'description',
                'https://happymaru-bucket.s3.ap-northeast-2.amazonaws.com/18bf77d6-bb99-4718-aac7-56452be931b9.png',
                ['nose data image url1', 'nose data image url2'],
              )
            }>
            <CustomText weight="500">create dog 확인</CustomText>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => googleLogoutButton(dispatch)}>
            <CustomText weight="500">로그아웃</CustomText>
          </Pressable>
          <Pressable style={styles.button} onPress={() => getFCMToken()}>
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
