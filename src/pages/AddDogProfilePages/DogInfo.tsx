import React, {useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Button} from 'react-native-paper';
import {StackNavigationProp} from '@react-navigation/stack';

import color from '../../styles/color';
import AddProfileIcon from '../../img/AddProfileIcon.svg';
import AddInfoTitle from '../../components/AddInfoTitle';
import InputFormat from '../../components/InputFormat';

import type {AddDogPageNavigation} from '../../../types/navigation';

interface DogInfoProps {
  navigation: StackNavigationProp<AddDogPageNavigation, 'DogInfo'>;
}

const DogInfo = ({navigation}: DogInfoProps) => {
  const [dogName, setDogName] = useState('');
  const [dogBirth, setDogBirth] = useState('');
  const [dogIntroduction, setDogIntroduction] = useState('');

  const disabledCondition =
    dogName.length === 0 ||
    dogBirth.length === 0 ||
    dogIntroduction.length === 0;

  const handleDogName = (name: string) => {
    setDogName(name);
  };

  const handleDogBirth = (birth: string) => {
    setDogBirth(birth);
  };

  const handleDogIntroduction = (introduction: string) => {
    setDogIntroduction(introduction);
  };

  const moveToNextPage = () => {
    navigation.navigate('CameraGuide');
  };

  return (
    <ScrollView style={styles.dogProfileContainer}>
      <AddInfoTitle
        icon={<AddProfileIcon width={75} height={75} />}
        title="반려견 소개"
        page="1/2"
      />
      <InputFormat
        title="이름"
        placeholder="반려견의 이름을 알려주세요."
        value={dogName}
        handleValue={handleDogName}
      />
      <InputFormat
        title="생년월일"
        placeholder="ex) 2003.09.23"
        value={dogBirth}
        handleValue={handleDogBirth}
      />
      <InputFormat
        title="소개"
        placeholder="반려견을 한 마디로 설명한다면?"
        value={dogIntroduction}
        handleValue={handleDogIntroduction}
      />
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
  dogProfileContainer: {
    paddingHorizontal: 24,
    paddingTop: 60,
    backgroundColor: color.white,
  },
  button: {
    borderRadius: 8,
    marginTop: 16,
    color: color.white,
  },
});

export default DogInfo;
