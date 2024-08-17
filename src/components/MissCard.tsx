import React, {useState} from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {ActivityIndicator, Button, Divider} from 'react-native-paper';

import {deleteMissApi} from '../api/petSearchApi';
import color from '../styles/color';
import CustomText from './CustomText';
import {getAccessToken} from '../storage/auth';
import type {MissDogPageNavigation} from '../../types/navigation';

type MissDogProp = StackNavigationProp<MissDogPageNavigation, 'MissDetail'>;

const MissCard = ({
  isMyPost = false,
  id,
  image,
  title,
  dogGender,
  dogBreed,
  dogAge,
  missingLocation,
  missingDate,
  callback,
}: {
  isMyPost?: boolean;
  id: string;
  image: string;
  title: string;
  dogGender: string;
  dogBreed: string;
  dogAge: number;
  missingLocation: string;
  missingDate: string;
  callback?: () => void;
}) => {
  const navigation = useNavigation<MissDogProp>();

  const [isLoading, setIsLoading] = useState(false);

  const moveToDetailPage = () => {
    navigation.navigate('MissDetail', {id});
  };

  const deleteMissPost = async () => {
    setIsLoading(true);
    try {
      const accessToken = await getAccessToken();
      await deleteMissApi({
        accessToken: accessToken as string,
        petSearchBoardId: id,
      });

      callback && callback();
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  return (
    <TouchableOpacity onPress={moveToDetailPage} activeOpacity={0.8}>
      <View
        style={[styles.foundContainer, isMyPost && styles.noMarginContainer]}>
        <Image source={{uri: image}} style={styles.imageBox} />
        <CustomText weight="700" style={styles.title}>
          {title}
        </CustomText>
        <View style={styles.line}>
          <CustomText weight="600" style={styles.subTitle}>
            견종
          </CustomText>
          <CustomText weight="500">{dogBreed}</CustomText>
        </View>
        <View style={styles.dogInfo}>
          <View style={styles.line}>
            <CustomText weight="600" style={styles.subTitle}>
              성별
            </CustomText>
            <CustomText weight="500">{dogGender}</CustomText>
          </View>
          <View style={styles.line}>
            <CustomText weight="600" style={styles.subTitle}>
              나이
            </CustomText>
            <CustomText weight="500">{dogAge}살</CustomText>
          </View>
        </View>
        <Divider style={styles.divider} />
        <View style={styles.line}>
          <CustomText weight="600" style={styles.subTitle}>
            실종 지역
          </CustomText>
          <CustomText weight="500">{missingLocation}</CustomText>
        </View>
        <View style={styles.line}>
          <CustomText weight="600" style={styles.subTitle}>
            실종 날짜
          </CustomText>
          <CustomText weight="500">{missingDate}</CustomText>
        </View>
        {isMyPost && (
          <Button
            mode="contained"
            disabled={isLoading}
            style={styles.button}
            onPress={deleteMissPost}
            rippleColor="transparent">
            {isLoading ? (
              <ActivityIndicator size={25} color={color.blue[600]} />
            ) : (
              <CustomText weight="500" style={styles.buttonText}>
                실종 공고 내리기
              </CustomText>
            )}
          </Button>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  foundContainer: {
    padding: 20,
    backgroundColor: color.white,
    borderWidth: 1,
    borderColor: color.gray[200],
    borderRadius: 20,
    marginHorizontal: 24,
    marginVertical: 12,
  },
  noMarginContainer: {
    paddingHorizontal: 40,
    marginHorizontal: 0,
  },
  title: {
    fontSize: 22,
    color: color.gray[900],
    marginVertical: 12,
  },
  subTitle: {
    fontSize: 13,
    color: color.blue[500],
  },
  line: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  imageBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 140,
    backgroundColor: color.gray[100],
    borderRadius: 10,
  },
  dogInfo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  divider: {
    marginVertical: 8,
    color: color.gray[100],
  },
  button: {
    borderWidth: 1,
    borderColor: color.gray[200],
    borderRadius: 8,
    marginVertical: 16,
    paddingVertical: 6,
    backgroundColor: color.white,
  },
  buttonText: {
    fontSize: 14,
    color: color.gray[800],
  },
});

export default MissCard;
