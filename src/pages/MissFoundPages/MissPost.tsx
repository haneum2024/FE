import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import {ActivityIndicator, Button, Checkbox} from 'react-native-paper';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';

import {postAlarmApi} from '../../api/fcmAlarmApi';
import {postMissDogApi} from '../../api/petSearchApi';
import {getUserApi} from '../../api/userApi';
import DateTimePick from '../../components/DateTimePick';
import InputFormat from '../../components/InputFormat';
import BornIcon from '../../components/Icons/BornIcon';
import FemaleIcon from '../../components/Icons/FemaleIcon';
import MaleIcon from '../../components/Icons/MaleIcon';
import CustomText from '../../components/CustomText';
import InputImage from '../../components/InputImage';
import PickFormat from '../../components/PickFormat';
import color from '../../styles/color';
import {getAccessToken} from '../../storage/auth';
import dogBreeds from '../../utils/dogBreeds';
import type {ReportDogPageNavigation} from '../../../types/navigation';

type MissNavigationProp = StackNavigationProp<ReportDogPageNavigation, 'Miss'>;

const MissPost = () => {
  const navigation = useNavigation<MissNavigationProp>();
  const scrollViewRef = useRef<ScrollView>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [base64Image, setBase64Image] = useState('');
  const [title, setTitle] = useState('');
  const [username, setUsername] = useState('');
  const [contact, setContact] = useState('');
  const [missLocation, setMissLocation] = useState('');
  const [missDate, setMissDate] = useState(new Date().toString());
  const [missSituation, setMissSituation] = useState('');
  const [dogName, setDogName] = useState('');
  const [dogBreed, setDogBreed] = useState('');
  const [dogGender, setDogGender] = useState<'MALE' | 'FEMALE'>('FEMALE');
  const [isNeutered, setIsNeutered] = useState(false);
  const [dogBirth, setDogBirth] = useState(new Date().toString());
  const [isMissDateSelected, setIsMissDateSelected] = useState(false);
  const [isDogBirthSelected, setIsDogBirthSelected] = useState(false);
  const [appearance, setAppearance] = useState('');
  const [content, setContent] = useState('');

  const isFemale = dogGender === 'FEMALE';

  const disabledCondition =
    base64Image.length === 0 ||
    title.length === 0 ||
    username.length === 0 ||
    contact.length === 0 ||
    missLocation.length === 0 ||
    !isMissDateSelected ||
    missSituation.length === 0 ||
    dogName.length === 0 ||
    dogBreed.length === 0 ||
    !isDogBirthSelected ||
    appearance.length === 0 ||
    content.length === 0;

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setShowButton(false),
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setShowButton(true),
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleTitle = (input: string) => {
    setTitle(input);
  };

  const handleUsername = (input: string) => {
    setUsername(input);
  };

  const handleContact = (input: string) => {
    setContact(input);
  };

  const handleMissLocation = (input: string) => {
    setMissLocation(input);
  };

  const handleMissDate = (input: string) => {
    setMissDate(input);
    setIsMissDateSelected(true);
  };

  const handleMissSituation = (input: string) => {
    setMissSituation(input);
  };

  const handleDogName = (input: string) => {
    setDogName(input);
  };

  const handleDogBreed = (input: string) => {
    setDogBreed(input);
  };

  const handleNuetral = () => {
    setIsNeutered(!isNeutered);
  };

  const handleDogBirth = (input: string) => {
    setDogBirth(input);
    setIsDogBirthSelected(true);
  };

  const handleAppearance = (input: string) => {
    setAppearance(input);
  };

  const handleBase64Image = (input: string) => {
    setBase64Image(input);
  };

  const handleContent = (input: string) => {
    setContent(input);
  };

  const loadDogInfo = async () => {
    try {
      setIsLoading(true);
      const accessToken = await getAccessToken();

      const userDogInfo = await getUserApi(accessToken as string);
      const userDogData = userDogInfo.data.pets[0];

      handleDogName(userDogData.name);
      handleDogBreed(userDogData.breed);
      handleDogBirth(userDogData.birthDate);
      setDogGender(userDogData.gender);
      setIsNeutered(userDogData.neutered);

      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const postMissReport = async () => {
    try {
      setIsLoading(true);
      const accessToken = await getAccessToken();

      const missData = await postMissDogApi({
        accessToken: accessToken as string,
        title,
        base64ImageList: [base64Image],
        name: username,
        contact,
        specificLocation: missLocation,
        latitude: 37.413294,
        longitude: 126.734086,
        lostDateTime: missDate,
        situation: missSituation,
        petGender: dogGender,
        isNeutered,
        petBreed: dogBreed === '잘 모르겠어요' ? '' : dogBreed,
        birthDate: dogBirth,
        petDescription: appearance,
        content,
      });
      setIsLoading(false);

      await postAlarmApi({
        accessToken: accessToken as string,
        boardId: missData.data.id,
      });

      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <ScrollView style={styles.dogInfoContainer} ref={scrollViewRef}>
        <View style={styles.category}>
          <BornIcon width={20} height={20} fill={color.blue[600]} />
          <CustomText weight="500" style={styles.foundText}>
            실종 신고하기
          </CustomText>
        </View>
        <CustomText weight="700" style={styles.title}>
          반려견을 찾아요
        </CustomText>

        <View style={styles.group}>
          <View style={styles.subTitleContainer}>
            <CustomText weight="600" style={styles.subTitle}>
              게시글 대표 이미지
            </CustomText>
          </View>
          <InputImage
            text={'반려견 사진 업로드'}
            handleImage={handleBase64Image}
          />
          <InputFormat
            placeholder="게시글의 제목을 입력해주세요."
            value={title}
            handleValue={handleTitle}
          />
        </View>

        <View style={styles.group}>
          <View style={styles.subTitleContainer}>
            <CustomText weight="600" style={styles.subTitle}>
              신고자 정보
            </CustomText>
          </View>
          <InputFormat
            title="이름"
            placeholder="신고자의 이름을 알려주세요."
            value={username}
            handleValue={handleUsername}
          />
          <InputFormat
            title="연락처"
            placeholder="연락처를 알려주세요."
            value={contact}
            handleValue={handleContact}
          />
        </View>

        <View style={styles.group}>
          <View style={styles.subTitleContainer}>
            <CustomText weight="600" style={styles.subTitle}>
              실종 일시 및 장소
            </CustomText>
          </View>
          <InputFormat
            title="실종 장소"
            placeholder="실종 위치 찾기"
            value={missLocation}
            handleValue={handleMissLocation}
          />
          <DateTimePick
            title="실종 일시"
            placeholder="실종 날짜와 시간을 알려주세요."
            date={missDate}
            mode="datetime"
            handleValue={handleMissDate}
          />
          <InputFormat
            title="실종 경위"
            placeholder="실종 당시의 상황을 알려주세요."
            value={missSituation}
            handleValue={handleMissSituation}
          />
        </View>

        <View style={styles.group}>
          <View style={styles.subTitleContainer}>
            <CustomText weight="600" style={styles.subTitle}>
              반려견 정보
            </CustomText>
          </View>
          <InputFormat
            title="반려견 이름"
            placeholder="반려견의 이름을 알려주세요."
            value={dogName}
            handleValue={handleDogName}
          />
          <PickFormat
            datas={dogBreeds}
            title="견종"
            placeholder="견종 선택"
            value={dogBreed}
            handleValue={handleDogBreed}
          />
          <View style={styles.genderContainer}>
            <CustomText weight="600" style={styles.label}>
              성별
            </CustomText>
            <TouchableWithoutFeedback onPress={handleNuetral}>
              <View style={styles.neutralBox}>
                <Checkbox
                  status={isNeutered ? 'checked' : 'unchecked'}
                  color={color.blue[600]}
                />
                <CustomText weight="500">중성화 여부</CustomText>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.toggleGroup}>
            <TouchableWithoutFeedback onPress={() => setDogGender('FEMALE')}>
              <View
                style={[
                  styles.toggleElement,
                  {backgroundColor: isFemale ? color.blue[600] : color.white},
                  {borderColor: isFemale ? color.blue[600] : color.gray[200]},
                ]}>
                <FemaleIcon
                  width={20}
                  height={20}
                  fill={isFemale ? color.white : color.orange[400]}
                />
                <CustomText
                  weight="500"
                  style={[
                    styles.genderLabel,
                    {color: isFemale ? color.white : color.gray[800]},
                  ]}>
                  암컷
                </CustomText>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => setDogGender('MALE')}>
              <View
                style={[
                  styles.toggleElement,
                  {backgroundColor: isFemale ? color.white : color.blue[600]},
                  {borderColor: isFemale ? color.gray[200] : color.blue[600]},
                ]}>
                <MaleIcon
                  width={20}
                  height={20}
                  fill={isFemale ? color.blue[400] : color.white}
                />
                <CustomText
                  weight="500"
                  style={[
                    styles.genderLabel,
                    {color: isFemale ? color.gray[800] : color.white},
                  ]}>
                  수컷
                </CustomText>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <DateTimePick
            title="생년월일"
            placeholder="생년월일을 선택해주세요."
            date={dogBirth}
            inputDate={isDogBirthSelected ? dogBirth : ''}
            mode="date"
            handleValue={handleDogBirth}
          />
          <InputFormat
            title="외형"
            placeholder="반려견을 쉽게 알아볼 수 있는 특징을 알려주세요."
            value={appearance}
            multiline
            handleValue={handleAppearance}
          />
          <InputFormat
            title="기타"
            placeholder="추가할 말이 있다면 입력해주세요."
            value={content}
            multiline
            handleValue={handleContent}
          />
        </View>

        <Button
          mode="contained"
          disabled={disabledCondition || isLoading}
          style={[
            styles.button,
            {
              backgroundColor: disabledCondition
                ? color.gray[100]
                : color.blue[600],
            },
          ]}
          onPress={postMissReport}>
          {isLoading ? (
            <ActivityIndicator size={25} color={color.white} />
          ) : (
            '게시글 등록하기'
          )}
        </Button>
        <View style={styles.blank} />
      </ScrollView>
      {showButton && (
        <TouchableOpacity
          style={styles.absoluteButton}
          disabled={isLoading}
          onPress={loadDogInfo}
          activeOpacity={0.8}>
          {isLoading ? (
            <ActivityIndicator
              size={25}
              style={styles.loading}
              color={color.white}
            />
          ) : (
            <CustomText weight="500" style={styles.bottomText}>
              강아지 정보 불러오기
            </CustomText>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dogInfoContainer: {
    paddingHorizontal: 24,
  },
  group: {
    marginBottom: 35,
  },
  category: {
    display: 'flex',
    flexDirection: 'row',
    gap: 6,
    marginTop: 25,
    marginBottom: 6,
  },
  imageBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 250,
    backgroundColor: color.gray[100],
    borderRadius: 10,
    marginBottom: 20,
  },
  foundText: {
    fontSize: 14,
    color: color.blue[600],
  },
  title: {
    fontSize: 24,
    color: color.gray[950],
    marginBottom: 6,
  },
  subTitleContainer: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginTop: 24,
    marginBottom: 12,
    borderRadius: 4,
    backgroundColor: color.blue[100],
  },
  subTitle: {
    fontSize: 16,
    color: color.blue[900],
  },
  label: {
    fontSize: 16,
    color: color.gray[950],
  },
  genderContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  neutralBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggleGroup: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },
  toggleElement: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    padding: 10,
    borderRadius: 7,
    gap: 8,
  },
  genderLabel: {
    fontSize: 14,
  },
  button: {
    borderRadius: 8,
    marginVertical: 16,
    paddingVertical: 6,
    color: color.white,
  },
  absoluteButton: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: color.blue[600],
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {
    paddingVertical: 18,
  },
  bottomText: {
    color: color.white,
    paddingVertical: 20,
  },
  blank: {
    height: 60,
  },
});

export default MissPost;
