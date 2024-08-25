import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  Image,
  PermissionsAndroid,
  Linking,
} from 'react-native';
import {ActivityIndicator, Button, PaperProvider} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import Swiper from 'react-native-swiper';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import Modal from 'react-native-modal';

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
import CertificateImage from '../img/CertificateImage.png';
import CloseIcon from '../img/CloseIcon.svg';
import SafeMarkReverseIcon from '../img/SafeMarkReverseIcon.svg';
import {RootState} from '../store';
import {addProfile} from '../store/reducers/profileReducer';
import {getAccessToken} from '../storage/auth';
import color from '../styles/color';

import type {ReportDogPageNavigation} from '../../types/navigation';
import CustomText from '../components/CustomText';
import FemaleIcon from '../components/Icons/FemaleIcon';
import MaleIcon from '../components/Icons/MaleIcon';
import {getDogNft} from '../services/web3Service';

type MissFoundDogProp = StackNavigationProp<ReportDogPageNavigation>;

interface NftInfo {
  openseaAddress?: string;
}

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
  const [dogBirth, setDogBirth] = useState('');
  const [dogGender, setDogGender] = useState('');
  const [dogIntroduction, setDogIntroduction] = useState('');
  const [dogProfileImage, setDogProfileImage] = useState('');
  const [selectedDate, setSeletedDate] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [certificateModalOpen, setCertificateModalOpen] = useState(false);

  const [nftInfo, setNftInfo] = useState<NftInfo | null>(null);

  const modalOpen = async () => {
    const nftObject: any = await getDogNft();
    setNftInfo(nftObject);
    console.log('nftObject', nftObject);
    setCertificateModalOpen(true);
  };

  const modalClose = () => {
    setCertificateModalOpen(false);
  };

  const moveToNFTPage = () => {
    const url = nftInfo?.openseaAddress;
    if (url) {
      Linking.openURL(url).catch(err =>
        console.error('An error occurred', err),
      );
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = await getAccessToken();
        const dogsInfo = await getDogsApi(accessToken as string);
        const userInfo = await getUserApi(accessToken as string);

        const userData = userInfo.data;
        const dogData = dogsInfo.data[0];
        console.log('dogData', dogData);
        setOwnerName(userData.name);
        setOwnerIntroduction(userData.description);
        setOwnerProfileImage(userData.profileImageUrl);
        setDogName(dogData.name);
        setDogBirth(dogData.birthDate);
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
            <TouchableOpacity onPress={modalOpen} activeOpacity={0.8}>
              <ProfileCard
                ownerName={ownerName}
                ownerIntroduction={ownerIntroduction}
                ownerProfileImage={ownerProfileImage}
                dogName={dogName}
                dogGender={dogGender}
                dogIntroduction={dogIntroduction}
                dogProfileImage={dogProfileImage}
              />
            </TouchableOpacity>
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

        <Modal
          isVisible={certificateModalOpen}
          onBackdropPress={modalClose}
          onBackButtonPress={modalClose}
          useNativeDriver={true}
          hideModalContentWhileAnimating={true}
          backdropOpacity={0.3}
          style={styles.modal}>
          <View style={styles.modalContent}>
            <Image
              source={CertificateImage}
              style={styles.certificate}
              resizeMode="cover"
            />
            <TouchableOpacity
              onPress={modalClose}
              activeOpacity={0.8}
              style={styles.closeButton}>
              <CloseIcon width={15} height={15} fill={color.white} />
            </TouchableOpacity>
            <View style={styles.modalInner}>
              <View style={styles.infoContainer}>
                <View style={styles.line}>
                  <CustomText weight="600" style={styles.item}>
                    반려견 이름
                  </CustomText>
                  <CustomText weight="500">{dogName}</CustomText>
                </View>
                <View style={styles.line}>
                  <CustomText weight="600" style={styles.item}>
                    반려견 성별
                  </CustomText>
                  {dogGender === 'FEMALE' ? (
                    <FemaleIcon
                      width={20}
                      height={20}
                      fill={color.orange[400]}
                    />
                  ) : (
                    <MaleIcon width={20} height={20} fill={color.blue[400]} />
                  )}
                </View>
                <View style={styles.line}>
                  <CustomText weight="600" style={styles.item}>
                    반려견 생년월일
                  </CustomText>
                  <CustomText weight="500">{dogBirth}</CustomText>
                </View>
              </View>

              <View style={styles.line}>
                <SafeMarkReverseIcon />
                <CustomText weight="500" style={styles.wallet}>
                  전자지갑 주소
                </CustomText>
                <CustomText
                  weight="500"
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={styles.address}>
                  {nftInfo?.openseaAddress}
                </CustomText>
              </View>

              <Button
                mode="contained"
                style={styles.button}
                onPress={moveToNFTPage}>
                {isLoading ? (
                  <ActivityIndicator size={25} color={color.white} />
                ) : (
                  '내 NFT 확인하기'
                )}
              </Button>
              <View style={styles.guide}>
                <CustomText weight="500" style={styles.guideText}>
                  [내 정보] 탭에서도 확인이 가능해요.
                </CustomText>
              </View>
            </View>
          </View>
        </Modal>
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
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
  },
  modalContent: {
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: color.white,
  },
  modalInner: {
    padding: 20,
  },
  modalText: {
    fontSize: 16,
    color: color.gray[900],
    marginBottom: 20,
    textAlign: 'center',
  },
  infoContainer: {
    marginTop: 4,
    marginBottom: 16,
    padding: 10,
    borderRadius: 8,
    gap: 6,
    backgroundColor: color.blue[50],
  },
  line: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    overflow: 'hidden',
  },
  item: {
    fontSize: 13,
    color: color.blue[500],
  },
  wallet: {
    fontSize: 12,
    color: color.blue[500],
  },
  address: {
    fontSize: 12,
    color: color.gray[600],
  },
  certificate: {
    width: '100%',
  },
  button: {
    marginTop: 24,
    marginBottom: 8,
    paddingVertical: 6,
    borderRadius: 10,
    color: color.white,
    backgroundColor: color.blue[600],
  },
  guide: {
    display: 'flex',
    alignItems: 'center',
  },
  guideText: {
    fontSize: 12,
    lineHeight: 16,
    marginBottom: 12,
    color: color.blue[400],
  },
  closeButton: {
    position: 'absolute',
    top: 25,
    right: 25,
  },
});

export default Home;
