import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  Image,
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
import {RootState} from '../store';
import {addProfile} from '../store/reducers/profileReducer';
import {getAccessToken} from '../storage/auth';
import color from '../styles/color';
import BannerImage1 from '../img/BannerImage1.png';
import BannerImage2 from '../img/BannerImage2.png';

import type {MainPageNavigation} from '../../types/navigation';

type MissFoundDogProp = StackNavigationProp<MainPageNavigation, 'Home'>;

function Home() {
  const navigation = useNavigation<MissFoundDogProp>();
  const dispatch = useDispatch();
  const isProfile = useSelector((state: RootState) => state.profile.isProfile);

  const [ownerName, setOwnerName] = useState('');
  const [ownerIntroduction, setOwnerIntroduction] = useState('');
  const [ownerProfileImage, setOwnerProfileImage] = useState('');
  const [dogName, setDogName] = useState('');
  const [dogGender, setDogGender] = useState('');
  const [dogIntroduction, setDogIntroduction] = useState('');
  const [dogProfileImage, setDogProfileImage] = useState('');
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

        setIsLoading(false);
        dispatch(addProfile());
      } catch (error) {
        console.error('Failed to fetch data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleImagePress = (index: number) => {
    if (index === 0) {
      navigation.navigate('MissFound');
    } else if (index === 1) {
      navigation.navigate('MissFound');
    }
  };

  return (
    <PaperProvider>
      <ScrollView style={styles.homeContainer}>
        <Header />
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

        <Status />
        <Comment />
        <MissFound />
      </ScrollView>
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
    backgroundColor: color.gray[200],
  },
});

export default Home;
