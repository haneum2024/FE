import React, {useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import {ActivityIndicator, Button, Checkbox} from 'react-native-paper';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';

import {postFoundDogApi} from '../../api/ownerSearchApi';
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

type FoundNavigationProp = StackNavigationProp<
  ReportDogPageNavigation,
  'Found'
>;

const FoundPost = () => {
  const navigation = useNavigation<FoundNavigationProp>();
  const scrollViewRef = useRef<ScrollView>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [base64Image, setBase64Image] = useState('');
  const [title, setTitle] = useState('');
  const [username, setUsername] = useState('');
  const [contact, setContact] = useState('');
  const [foundLocation, setFoundLocation] = useState('');
  const [foundDate, setFoundDate] = useState(new Date().toString());
  const [foundSituation, setFoundSituation] = useState('');
  const [dogBreed, setDogBreed] = useState('');
  const [dogGender, setDogGender] = useState('FEMALE');
  const [prevDogGender, setPrevDogGender] = useState('FEMALE');
  const [noDogGender, setNoDogGender] = useState(false);
  const [isFoundDateSelected, setIsFoundDateSelected] = useState(false);
  const [appearance, setAppearance] = useState('');
  const [content, setContent] = useState('');

  const isFemale = dogGender === 'FEMALE';
  const isMale = dogGender === 'MALE';

  const disabledCondition =
    base64Image.length === 0 ||
    title.length === 0 ||
    username.length === 0 ||
    contact.length === 0 ||
    foundLocation.length === 0 ||
    !isFoundDateSelected ||
    foundSituation.length === 0 ||
    dogBreed.length === 0 ||
    appearance.length === 0 ||
    content.length === 0;

  const handleTitle = (input: string) => {
    setTitle(input);
  };

  const handleUsername = (input: string) => {
    setUsername(input);
  };

  const handleContact = (input: string) => {
    setContact(input);
  };

  const handleFoundLocation = (input: string) => {
    setFoundLocation(input);
  };

  const handleFoundDate = (input: string) => {
    setFoundDate(input);
    setIsFoundDateSelected(true);
  };

  const handleFoundSituation = (input: string) => {
    setFoundSituation(input);
  };

  const handleDogBreed = (input: string) => {
    setDogBreed(input);
  };

  const handleDogGender = (input: string) => {
    if (dogGender === 'NOT_SURE') {
      return;
    }
    setDogGender(input);
    setPrevDogGender(input);
  };

  const checkDogGender = () => {
    if (noDogGender) {
      setNoDogGender(false);
      setDogGender(prevDogGender);
    } else {
      setNoDogGender(true);
      setDogGender('NOT_SURE');
    }
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

  const postFoundReport = async () => {
    try {
      setIsLoading(true);
      const accessToken = await getAccessToken();

      await postFoundDogApi({
        accessToken: accessToken as string,
        title,
        base64ImageList: [base64Image],
        name: username,
        reporterContact: contact,
        specificLocation: foundLocation,
        latitude: 37.413294,
        longitude: 126.734086,
        foundDateTime: foundDate,
        situation: foundSituation,
        petGender: dogGender,
        petBreed:
          dogBreed === '잘 모르겠어요' || dogBreed === ''
            ? '알 수 없음'
            : dogBreed,
        petDescription: appearance,
        content,
      });
      setIsLoading(false);

      navigation.navigate('MissFoundMain', {routeName: 'Found'});
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
            발견 신고하기
          </CustomText>
        </View>
        <CustomText weight="700" style={styles.title}>
          유기견을 발견했어요
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
            title="연락 수단"
            placeholder="연락 수단을 알려주세요. (카톡 아이디, 전화번호 등)"
            value={contact}
            handleValue={handleContact}
          />
        </View>

        <View style={styles.group}>
          <View style={styles.subTitleContainer}>
            <CustomText weight="600" style={styles.subTitle}>
              발견 일시 및 장소
            </CustomText>
          </View>
          <InputFormat
            title="발견 장소"
            placeholder="발견 위치 찾기"
            value={foundLocation}
            handleValue={handleFoundLocation}
          />
          <DateTimePick
            title="발견 일시"
            placeholder="발견 날짜와 시간을 알려주세요."
            date={foundDate}
            mode="datetime"
            handleValue={handleFoundDate}
          />
          <InputFormat
            title="발견 경위"
            placeholder="발견 당시의 상황을 알려주세요."
            value={foundSituation}
            handleValue={handleFoundSituation}
          />
        </View>

        <View style={styles.group}>
          <View style={styles.subTitleContainer}>
            <CustomText weight="600" style={styles.subTitle}>
              반려견 정보
            </CustomText>
          </View>
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
            <TouchableWithoutFeedback onPress={checkDogGender}>
              <View style={styles.checkBox}>
                <Checkbox
                  status={noDogGender ? 'checked' : 'unchecked'}
                  color={color.blue[600]}
                />
                <CustomText weight="500">잘 모르겠어요</CustomText>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.toggleGroup}>
            <TouchableOpacity
              onPress={() => handleDogGender('FEMALE')}
              activeOpacity={1}
              disabled={noDogGender}
              style={styles.toggleButton}>
              <View
                style={[
                  styles.toggleElement,
                  {
                    backgroundColor: isFemale
                      ? color.blue[600]
                      : isMale
                      ? color.white
                      : color.gray[100],
                    borderColor: isFemale
                      ? color.blue[600]
                      : isMale
                      ? color.gray[200]
                      : color.gray[100],
                  },
                ]}>
                <FemaleIcon
                  width={20}
                  height={20}
                  fill={
                    isFemale
                      ? color.white
                      : isMale
                      ? color.orange[400]
                      : color.gray[500]
                  }
                />
                <CustomText
                  weight="500"
                  style={[
                    styles.genderLabel,
                    {
                      color: isFemale
                        ? color.white
                        : isMale
                        ? color.gray[800]
                        : color.gray[500],
                    },
                  ]}>
                  암컷
                </CustomText>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleDogGender('MALE')}
              activeOpacity={1}
              disabled={noDogGender}
              style={styles.toggleButton}>
              <View
                style={[
                  styles.toggleElement,
                  {
                    backgroundColor: isFemale
                      ? color.white
                      : isMale
                      ? color.blue[600]
                      : color.gray[100],
                    borderColor: isFemale
                      ? color.gray[200]
                      : isMale
                      ? color.blue[600]
                      : color.gray[100],
                  },
                ]}>
                <MaleIcon
                  width={20}
                  height={20}
                  fill={
                    isFemale
                      ? color.blue[400]
                      : isMale
                      ? color.white
                      : color.gray[500]
                  }
                />
                <CustomText
                  weight="500"
                  style={[
                    styles.genderLabel,
                    {
                      color: isFemale
                        ? color.gray[800]
                        : isMale
                        ? color.white
                        : color.gray[500],
                    },
                  ]}>
                  수컷
                </CustomText>
              </View>
            </TouchableOpacity>
          </View>
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
          onPress={postFoundReport}>
          {isLoading ? (
            <ActivityIndicator size={25} color={color.white} />
          ) : (
            '게시글 등록하기'
          )}
        </Button>
        <View style={styles.blank} />
      </ScrollView>
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
  checkBox: {
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
  toggleButton: {
    flex: 1,
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
    height: 30,
  },
});

export default FoundPost;
