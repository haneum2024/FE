import messaging from '@react-native-firebase/messaging';
import axios from './axios';

// 서버로 FCM 토큰을 전송하는 함수
export const sendFcmTokenToServer = ({
    accessToken, fcmToken
}: {
    accessToken: string,  fcmToken: String}) => {
    const sendFcmTokenConfig = {
        method: 'post',
        url: '/notifications/fcm-token',
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        data: {
            fcmToken: fcmToken,
        },
    };

    return axios(sendFcmTokenConfig);
};
