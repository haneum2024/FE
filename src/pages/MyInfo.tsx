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
import {logout} from '../store/reducers/authReducer';
import {AppDispatch} from '../store';
import CustomText from '../components/CustomText';

const ANDROID_CLIENT_ID =
  '54570271712-a2ct0tbftq1gdrnf7p9pk6m8kfs4sbsl.apps.googleusercontent.com';

GoogleSignin.configure({
  webClientId: ANDROID_CLIENT_ID,
});

const googleLogoutButton = async (dispatch: AppDispatch) => {
  try {
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
    dispatch(logout()); // 로그아웃 후 상태 업데이트
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
            onPress={() => googleLogoutButton(dispatch)}>
            <CustomText>로그아웃</CustomText>
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
