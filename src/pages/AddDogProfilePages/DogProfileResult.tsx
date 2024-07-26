import React, {useEffect, useState, useRef} from 'react';
import {View, StyleSheet, ActivityIndicator, Animated} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import color from '../../styles/color';
import CustomText from '../../components/CustomText';
import LogoIcon from '../../img/LogoIcon.svg';
import {AddDogPageNavigation} from '../../../types/navigation';

interface DogProfileResultType {
  navigation: StackNavigationProp<AddDogPageNavigation, 'DogProfileResult'>;
  route: RouteProp<AddDogPageNavigation, 'DogProfileResult'>;
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const DogProfileResult = ({navigation, route}: DogProfileResultType) => {
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

  const [loading, setLoading] = useState(true);
  const scaleAnim = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 서버로 API 요청 보내기
        await delay(5000);
        setLoading(false);

        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }).start();
        await delay(1500);
        navigation.navigate('HomeMain');
      } catch (error) {
        setLoading(false);
        console.error(error);
      }
    };

    fetchData();
  }, [navigation, scaleAnim]);

  return (
    <View style={styles.dogProfileContainer}>
      {loading ? (
        <>
          <ActivityIndicator
            style={styles.loading}
            size={80}
            color={color.blue[600]}
          />
          <CustomText weight="600" style={styles.label}>
            반려견 프로필 생성 중...
          </CustomText>
        </>
      ) : (
        <>
          <Animated.View
            style={[styles.loading, {transform: [{scale: scaleAnim}]}]}>
            <LogoIcon width={100} height={100} fill={color.blue[600]} />
          </Animated.View>
          <CustomText weight="600" style={styles.label}>
            반려견 프로필 생성 완료!
          </CustomText>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dogProfileContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 24,
    marginVertical: 32,
  },
  loading: {
    marginBottom: 20,
  },
  label: {
    color: color.black,
    fontSize: 16,
  },
});

export default DogProfileResult;
