import React from 'react';
import {View, StyleSheet} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Button} from 'react-native-paper';

import type {AddDogPageNavigation} from '../../../types/navigation';
import {RouteProp} from '@react-navigation/native';
import CustomText from '../../components/CustomText';

import AddInfoTitle from '../../components/AddInfoTitle';

import SearchNoticeIcon from '../../img/SearchNoticeIcon.svg';
import CautionIcon from '../../img/CautionIcon.svg';
import color from '../../styles/color';

interface CameraGuideProps {
  navigation: StackNavigationProp<AddDogPageNavigation, 'CameraGuide'>;
  route: RouteProp<AddDogPageNavigation, 'CameraGuide'>;
}

const CameraGuide = ({navigation, route}: CameraGuideProps) => {
  const {
    dogName,
    dogBreed,
    dogGender,
    isNeutered,
    dogBirth,
    dogIntroduction,
    dogImage,
    name,
    introduction,
    address,
    profileImage,
  } = route.params;

  const moveToNextPage = () => {
    navigation.navigate('DogNoseCamera', {
      dogName,
      dogBreed,
      dogGender,
      isNeutered,
      dogBirth,
      dogIntroduction,
      dogImage,
      name,
      introduction,
      address,
      profileImage,
    });
  };

  return (
    <View style={styles.cameraGuideContainer}>
      <AddInfoTitle
        icon={<SearchNoticeIcon width={50} height={50} />}
        title="비문 등록"
        page="3/3"
      />
      <View style={styles.textContainer}>
        <View style={styles.cautionContainer}>
          <CustomText weight="600" style={styles.subTitle}>
            비문 촬영 안내
          </CustomText>
          <CustomText weight="500" style={styles.darkText}>
            비문 촬영이 시작되면 폰을 반려견을 향해 들어주세요.
          </CustomText>
          <CustomText weight="500" style={styles.text}>
            촬영이 진행될수록 인식 게이지가 점점 차올라요.
          </CustomText>
        </View>
        <View style={styles.cautionContainer}>
          <CautionIcon width={40} height={40} />
          <CustomText weight="600" style={styles.subTitle}>
            촬영 주의사항
          </CustomText>
          <CustomText weight="500" style={styles.text}>
            1. 손떨림이나 강아지 움직임에 주의해주세요.
          </CustomText>
          <CustomText weight="500" style={styles.text}>
            2. 코에 그림자가 지지 않게 조명을 조절해주세요.
          </CustomText>
          <CustomText weight="500" style={styles.text}>
            3. 이물질이 코를 가리지 않도록 주의해주세요.
          </CustomText>
        </View>
      </View>
      <Button
        mode="contained"
        style={[styles.button, {backgroundColor: color.blue[600]}]}
        onPress={moveToNextPage}>
        비문 촬영하기
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  cameraGuideContainer: {
    paddingHorizontal: 24,
  },
  textContainer: {
    marginBottom: 80,
  },
  cautionContainer: {
    marginVertical: 30,
    alignItems: 'center',
  },
  subTitle: {
    fontSize: 16,
    color: color.blue[600],
    marginTop: 12,
    marginBottom: 10,
  },
  darkText: {
    fontSize: 13,
    color: color.gray[950],
  },
  text: {
    fontSize: 13,
    color: color.gray[700],
  },
  button: {
    borderRadius: 8,
    marginVertical: 16,
    color: color.white,
  },
});

export default CameraGuide;
