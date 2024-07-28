import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import {Button, Checkbox} from 'react-native-paper';
import {StackNavigationProp} from '@react-navigation/stack';

import color from '../../styles/color';
import AddProfileIcon from '../../img/AddProfileIcon.svg';
import AddInfoTitle from '../../components/AddInfoTitle';
import DateTimePick from '../../components/DateTimePick';
import InputFormat from '../../components/InputFormat';
import FemaleIcon from '../../components/Icons/FemaleIcon';
import MaleIcon from '../../components/Icons/MaleIcon';

import type {AddDogPageNavigation} from '../../../types/navigation';
import CustomText from '../../components/CustomText';
import InputImage from '../../components/InputImage';

interface DogInfoProps {
  navigation: StackNavigationProp<AddDogPageNavigation, 'DogInfo'>;
}

const DogInfo = ({navigation}: DogInfoProps) => {
  const [dogName, setDogName] = useState('');
  const [dogBreed, setDogBreed] = useState('');
  const [dogGender, setDogGender] = useState<'MALE' | 'FEMALE'>('FEMALE');
  const [isNeutered, setIsNeutered] = useState(false);
  const [dogBirth, setDogBirth] = useState(
    new Date().toISOString().split('T')[0],
  );
  const [isDogBirthSelected, setIsDogBirthSelected] = useState(false);
  const [dogIntroduction, setDogIntroduction] = useState('');
  const [dogImage, setDogImage] = useState('');

  const isFemale = dogGender === 'FEMALE';

  const disabledCondition =
    dogName.length === 0 ||
    dogBreed.length === 0 ||
    !isDogBirthSelected ||
    dogIntroduction.length === 0 ||
    dogImage.length === 0;

  const handleDogName = (name: string) => {
    setDogName(name);
  };

  const handleDogBreed = (breed: string) => {
    setDogBreed(breed);
  };

  const handleNuetral = () => {
    setIsNeutered(!isNeutered);
  };

  const handleDogBirth = (birth: string) => {
    setDogBirth(birth);
    setIsDogBirthSelected(true);
  };

  const handleDogIntroduction = (introduction: string) => {
    setDogIntroduction(introduction);
  };

  const handleDogImage = (image: string) => {
    setDogImage(image);
  };

  const moveToNextPage = () => {
    navigation.navigate('ProfileInfo', {
      dogName,
      dogBreed,
      dogGender,
      isNeutered,
      dogBirth,
      dogIntroduction,
      dogImage,
    });
  };

  return (
    <ScrollView style={styles.dogInfoContainer}>
      <AddInfoTitle
        icon={<AddProfileIcon width={75} height={75} />}
        title="반려견 소개"
        page="1/3"
      />

      <InputFormat
        title="이름"
        placeholder="반려견의 이름을 알려주세요."
        value={dogName}
        handleValue={handleDogName}
      />

      <InputFormat
        title="견종"
        placeholder="반려견의 견종을 알려주세요."
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
              fill={isFemale ? color.white : color.blue[400]}
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
        handleValue={handleDogBirth}
      />

      <InputFormat
        title="소개"
        placeholder="반려견을 한 마디로 설명하자면?"
        value={dogIntroduction}
        multiline
        handleValue={handleDogIntroduction}
      />

      <InputImage title="사진" handleImage={handleDogImage} />

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

export default DogInfo;
