import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {PaperProvider} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

import {getDogsApi} from '../api/userApi';
import CustomText from '../components/CustomText';
import Comment from '../components/Comment';
import DogCard from '../components/DogCard';
import Header from '../components/Header';
import Status from '../components/Status';
import {getAccessToken} from '../storage/auth';
import {RootState} from '../store';
import {addProfile} from '../store/reducers/profileReducer';
import color from '../styles/color';
import {MainPageNavigation} from '../../types/navigation';
import {StackNavigationProp} from '@react-navigation/stack';
import MonthlyCalendar from '../components/MonthlyCalendar';

type HealthProp = StackNavigationProp<MainPageNavigation, 'Home'>;

function Health() {
  const navigation = useNavigation<HealthProp>();
  const dispatch = useDispatch();
  const isProfile = useSelector((state: RootState) => state.profile.isProfile);

  const [message, setMessage] = useState('');
  const [isShowMessage, setIsShowMessage] = useState(false);
  const [dogName, setDogName] = useState('');
  const [dogGender, setDogGender] = useState('');
  const [dogBreed, setDogBreed] = useState('');
  const [dogBirth, setDogBirth] = useState('');
  const [dogProfileImage, setDogProfileImage] = useState('');
  const [selectedDate, setSeletedDate] = useState('');

  useEffect(() => {
    const fetchDogData = async () => {
      const accessToken = await getAccessToken();
      const dogsInfo = await getDogsApi(accessToken as string);

      const dogData = dogsInfo.data[0];
      setDogName(dogData.name);
      setDogGender(dogData.gender);
      setDogBreed(dogData.breed);
      setDogBirth(dogData.birthDate);
      setDogProfileImage(dogData.imageUrl);

      dispatch(addProfile());
    };

    fetchDogData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNavigateHome = () => {
    navigation.navigate('Home');
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
      <ScrollView
        style={[styles.healthContainer, !isProfile && styles.transparent]}>
        <Header />
        {isProfile ? (
          <DogCard
            image={dogProfileImage}
            dogName={dogName}
            dogGender={dogGender}
            dogBreed={dogBreed}
            dogBirth={dogBirth}
          />
        ) : null}
        <MonthlyCalendar handleDate={handleDate} />
        <Status date={selectedDate} handleMessage={handleMessage} />
        <Comment date={selectedDate} handleMessage={handleMessage} />
      </ScrollView>

      {!isProfile && (
        <Modal transparent={true} animationType="fade" visible={!isProfile}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <CustomText weight="600" style={styles.modalText}>
                건강일지 작성은 프로필 생성 후 이용 가능합니다
              </CustomText>
              <TouchableOpacity
                style={styles.homeButton}
                onPress={handleNavigateHome}
                activeOpacity={0.8}>
                <CustomText weight="600" style={styles.homeButtonText}>
                  홈 화면으로 이동
                </CustomText>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
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
  healthContainer: {
    flex: 1,
  },
  transparent: {
    opacity: 0.3,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    backgroundColor: color.black + '80',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: 'bold',
    color: color.gray[900],
  },
  homeButton: {
    backgroundColor: color.blue[600],
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  homeButtonText: {
    color: 'white',
    fontSize: 16,
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

export default Health;
