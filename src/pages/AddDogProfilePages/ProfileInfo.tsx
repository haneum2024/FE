import React, {useState} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {Button} from 'react-native-paper';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

import color from '../../styles/color';
import AddProfileIcon from '../../img/AddProfileIcon.svg';
import AddInfoTitle from '../../components/AddInfoTitle';
import InputFormat from '../../components/InputFormat';

import type {AddDogPageNavigation} from '../../../types/navigation';
import InputImage from '../../components/InputImage';

interface ProfileInfoProps {
  navigation: StackNavigationProp<AddDogPageNavigation, 'ProfileInfo'>;
  route: RouteProp<AddDogPageNavigation, 'ProfileInfo'>;
}

const ProfileInfo = ({navigation, route}: ProfileInfoProps) => {
  const {
    dogName,
    dogBreed,
    dogGender,
    isNeutered,
    dogBirth,
    dogIntroduction,
    dogImage,
  } = route.params;

  const [name, setName] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [profileImage, setProfileImage] = useState('');

  const disabledCondition =
    name.length === 0 || introduction.length === 0 || profileImage.length === 0;

  const handleName = (value: string) => {
    setName(value);
  };

  const handleIntroduction = (value: string) => {
    setIntroduction(value);
  };

  const handleProfileImage = (value: string) => {
    setProfileImage(value);
  };

  const moveToNextPage = () => {
    navigation.navigate('CameraGuide', {
      dogName,
      dogBreed,
      dogGender,
      isNeutered,
      dogBirth,
      dogIntroduction,
      dogImage,
      name,
      introduction,
      profileImage,
    });
  };

  return (
    <ScrollView style={styles.dogInfoContainer}>
      <AddInfoTitle
        icon={<AddProfileIcon width={75} height={75} />}
        title="주인 프로필"
        page="2/3"
      />

      <InputFormat
        title="이름"
        placeholder="주인의 이름을 알려주세요."
        value={name}
        handleValue={handleName}
      />

      <InputFormat
        title="소개"
        placeholder="자기자신을 소개해주세요."
        value={introduction}
        multiline
        handleValue={handleIntroduction}
      />

      <InputImage title="사진" handleImage={handleProfileImage} />

      <Button
        mode="contained"
        disabled={disabledCondition}
        style={[
          styles.button,
          {
            backgroundColor: disabledCondition
              ? color.gray[100]
              : color.blue[600],
          },
        ]}
        onPress={moveToNextPage}>
        다음 단계로
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  dogInfoContainer: {
    paddingHorizontal: 24,
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
    color: color.white,
  },
});

export default ProfileInfo;
