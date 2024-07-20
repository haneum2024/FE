import React from 'react';
import {View, StyleSheet} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {Button} from 'react-native-paper';

import color from '../styles/color';
import CustomText from './CustomText';

import AddProfileIcon from '../img/AddProfileIcon.svg';

import type {AddDogPageNavigation} from '../../types/navigation';

type AddDogProfileNavigationProp = StackNavigationProp<
  AddDogPageNavigation,
  'Home'
>;

const AddDogProfile = ({
  name,
  gender,
  profile,
  introduction,
  
}: {
  name?: string;
  gender?: string;
  profile?: string;
  introduction?: string;
}) => {
  const navigation = useNavigation<AddDogProfileNavigationProp>();

  const addProfile = () => {
    console.log('add profile');
    console.log(navigation);
    navigation.navigate('DogInfo');
  };

  return (
    <View style={styles.dogProfileContainer}>
      {name ? (
        <></>
      ) : (
        <View style={styles.addProfileContainer}>
          <View style={styles.iconContainer}>
            <AddProfileIcon width={75} height={75} />
          </View>
          <View style={styles.addProfileBox}>
            <CustomText weight="700" style={styles.profileText}>
              프로필 생성
            </CustomText>
            <CustomText weight="500">
              건강일지를 작성할 반려견 프로필을 만들어보세요.
            </CustomText>
            <Button mode="contained" style={styles.button} onPress={addProfile}>
              프로필 만들기
            </Button>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dogProfileContainer: {
    marginHorizontal: 24,
    marginVertical: 10,
  },
  title: {
    fontSize: 22,
    marginBottom: 12,
    color: color.gray[950],
  },
  addProfileContainer: {
    display: 'flex',
    flexDirection: 'row',
    padding: 20,
    backgroundColor: color.white,
    borderRadius: 20,
    gap: 18,
  },
  iconContainer: {
    flex: 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    backgroundColor: color.blue[200],
  },
  addProfileBox: {
    flex: 3,
    display: 'flex',
    gap: 8,
  },
  profileText: {
    fontSize: 22,
    color: color.gray[900],
  },
  button: {
    borderRadius: 8,
    color: color.white,
    backgroundColor: color.blue[600],
  },
});

export default AddDogProfile;
