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
import {removeAccessToken} from '../storage/auth';
import {createDogInfo, getAccount, getNfts} from "../services/web3Service";

const ANDROID_CLIENT_ID =
    '54570271712-a2ct0tbftq1gdrnf7p9pk6m8kfs4sbsl.apps.googleusercontent.com';

GoogleSignin.configure({
    webClientId: ANDROID_CLIENT_ID,
});

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
                        onPress={() =>
                            console.log(getAccount())}>
                        <CustomText weight="500">address 확인</CustomText>
                    </Pressable>

                    <Pressable
                        style={styles.button}
                        onPress={async ()  =>
                            await createDogInfo("해피",
                                "mix",
                                "2021-10-01",
                                "M", true, "귀여움","image URL", "tokenURI")}>
                        <CustomText weight="500">create dog 확인</CustomText>
                    </Pressable>
                    <Pressable
                        style={styles.button}
                        onPress={() => googleLogoutButton(dispatch)}>
                        <CustomText weight="500">로그아웃</CustomText>
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
