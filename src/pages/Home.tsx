import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  Image,
  PermissionsAndroid,
} from 'react-native';
import {PaperProvider} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import Swiper from 'react-native-swiper';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';

import {getDogsApi, getUserApi} from '../api/userApi';
import AddDogProfile from '../components/AddDogProfile';
import Comment from '../components/Comment';
import Header from '../components/Header';
import MissFound from '../components/MissFound';
import ProfileCard from '../components/ProfileCard';
import Status from '../components/Status';
import WeeklyCalendar from '../components/WeeklyCalendar';
import BannerImage1 from '../img/BannerImage1.png';
import BannerImage2 from '../img/BannerImage2.png';
import {RootState} from '../store';
import {addProfile} from '../store/reducers/profileReducer';
import {getAccessToken} from '../storage/auth';
import color from '../styles/color';

import type {ReportDogPageNavigation} from '../../types/navigation';
import CustomText from '../components/CustomText';

type MissFoundDogProp = StackNavigationProp<ReportDogPageNavigation>;

function Home() {
  const navigation = useNavigation<MissFoundDogProp>();
  const dispatch = useDispatch();
  const isProfile = useSelector((state: RootState) => state.profile.isProfile);

  const [message, setMessage] = useState('');
  const [isShowMessage, setIsShowMessage] = useState(false);
  const [ownerName, setOwnerName] = useState('');
  const [ownerIntroduction, setOwnerIntroduction] = useState('');
  const [ownerProfileImage, setOwnerProfileImage] = useState('');
  const [dogName, setDogName] = useState('');
  const [dogGender, setDogGender] = useState('');
  const [dogIntroduction, setDogIntroduction] = useState('');
  const [dogProfileImage, setDogProfileImage] = useState('');
  const [selectedDate, setSeletedDate] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = await getAccessToken();
        const dogsInfo = await getDogsApi(accessToken as string);
        const userInfo = await getUserApi(accessToken as string);

        const userData = userInfo.data;
        const dogData = dogsInfo.data[0];

        setOwnerName(userData.name);
        setOwnerIntroduction(userData.description);
        setOwnerProfileImage(userData.profileImageUrl);
        setDogName(dogData.name);
        setDogGender(dogData.gender);
        setDogIntroduction(dogData.description);
        setDogProfileImage(dogData.imageUrl);

        dispatch(addProfile());
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [dispatch, isProfile]);

  useEffect(() => {
    requestNotificationPermission();
  }, []);

  async function requestNotificationPermission() {
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
  }

  const handleImagePress = (index: number) => {
    if (index === 0) {
      navigation.navigate('MissFoundMain', {routeName: 'Found'});
    } else if (index === 1) {
      navigation.navigate('MissFoundMain', {routeName: 'Miss'});
    }
  };

  const handleDate = (date: string) => {
    setSeletedDate(date);
  };

  const handleMessage = (text: string) => {
    setMessage(text);
    setIsShowMessage(true);
    setTimeout(() => {
      setIsShowMessage(false);
    }, 3000);
  };

  return (
    <PaperProvider>
      <ScrollView style={styles.homeContainer}>
        <Header navigation={navigation} />
        <View style={styles.swiperContainer}>
          <Swiper loop={true} showsPagination={false}>
            <TouchableOpacity
              onPress={() => handleImagePress(0)}
              activeOpacity={1}
              style={styles.slide}>
              <Image
                source={BannerImage1}
                style={styles.image}
                resizeMode="cover"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleImagePress(1)}
              activeOpacity={1}
              style={styles.slide}>
              <Image
                source={BannerImage2}
                style={styles.image}
                resizeMode="cover"
              />
            </TouchableOpacity>
          </Swiper>
        </View>
        {!isLoading ? (
          isProfile ? (
            <ProfileCard
              ownerName={ownerName}
              ownerIntroduction={ownerIntroduction}
              ownerProfileImage={ownerProfileImage}
              dogName={dogName}
              dogGender={dogGender}
              dogIntroduction={dogIntroduction}
              dogProfileImage={dogProfileImage}
            />
          ) : (
            <AddDogProfile />
          )
        ) : (
          <View style={styles.skeletonContainer} />
        )}
        <CustomText weight="700" style={styles.title}>
          건강 일지
        </CustomText>
        {isProfile ? (
          <>
            <WeeklyCalendar handleDate={handleDate} />
            <Status date={selectedDate} handleMessage={handleMessage} />
            <Comment date={selectedDate} handleMessage={handleMessage} />
          </>
        ) : (
          <View style={styles.noticeContainer}>
            <CustomText weight="700" style={styles.noticeTitle}>
              건강일지 작성은 프로필 생성 후 이용 가능합니다
            </CustomText>
          </View>
        )}

        <MissFound />
      </ScrollView>
      {isShowMessage && (
        <View style={styles.noticeTooltip}>
          <CustomText weight="500" style={styles.noticeText}>
            {message}
          </CustomText>
        </View>
      )}
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    display: 'flex',
    backgroundColor: color.gray[50],
  },
  swiperContainer: {
    height: 175,
    marginBottom: 22,
  },
  slide: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  skeletonContainer: {
    marginHorizontal: 24,
    marginVertical: 8,
    height: 200,
    borderRadius: 20,
    backgroundColor: color.gray[100],
  },
  noticeContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 24,
    marginVertical: 8,
    height: 200,
    borderRadius: 20,
    backgroundColor: color.gray[100],
  },
  noticeTitle: {
    fontSize: 16,
    color: color.gray[500],
  },
  title: {
    fontSize: 22,
    color: color.gray[950],
    marginHorizontal: 24,
    marginTop: 22,
    marginBottom: 4,
  },
  noticeTooltip: {
    position: 'absolute',
    bottom: 30,
    left: '35%',
    backgroundColor: color.blue[900],
    borderRadius: 4,
    paddingVertical: 6,
    paddingHorizontal: 14,
  },
  noticeText: {
    fontSize: 12,
    color: color.white,
    textAlign: 'center',
  },
});

export default Home;
