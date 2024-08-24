import React, {useCallback, useRef, useState} from 'react';
import {View, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

import {getOtherFoundApi, getUserFoundApi} from '../../api/ownerSearchApi';
import FoundCard from '../../components/FoundCard';
import ReportIcon from '../../components/Icons/ReportIcon';
import {getAccessToken} from '../../storage/auth';
import color from '../../styles/color';
import TopArrowIcon2 from '../../img/TopArrowIcon2.svg';
import type {ReportDogPageNavigation} from '../../../types/navigation';

type FoundNavigationProp = StackNavigationProp<
  ReportDogPageNavigation,
  'Found'
>;

function Found() {
  const navigation = useNavigation<FoundNavigationProp>();

  const scrollViewRef = useRef<ScrollView>(null);
  const [userFoundBoard, setUserFoundBoard] = useState<any[]>([]);
  const [otherFoundBoard, setOtherFoundBoard] = useState<any[]>([]);
  const [showButton, setShowButton] = useState(false);

  const scrollToTop = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({y: 0, animated: true});
    }
  };

  const handleScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setShowButton(offsetY > 200);
  };

  const moveToPostPage = () => {
    navigation.navigate('FoundCameraGuide');
  };

  const callbackFunction = () => {
    fetchFoundBoards();
  };

  const fetchFoundBoards = async () => {
    try {
      const accessToken = await getAccessToken();
      const userFoundPost = await getUserFoundApi({
        accessToken: accessToken as string,
      });
      const otherFoundPost = await getOtherFoundApi({
        accessToken: accessToken as string,
        page: 0,
        size: 100,
      });
      setUserFoundBoard(userFoundPost.data);
      setOtherFoundBoard(otherFoundPost.data.content);
    } catch (error) {
      console.log(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchFoundBoards();
    }, []),
  );

  return (
    <View>
      <ScrollView
        ref={scrollViewRef}
        style={styles.missFoundContainer}
        onScroll={handleScroll}
        scrollEventThrottle={16}>
        {userFoundBoard.length > 0 &&
          userFoundBoard.map(post => (
            <FoundCard
              key={post.id}
              id={post.id}
              isMyPost={true}
              image={post.imageUrlList[0] || ''}
              title={post.title}
              dogGender={post.petGender === 'MALE' ? '수컷' : '암컷'}
              dogBreed={post.petBreed}
              appearance={post.petDescription}
              foundLocation={post.specificLocation}
              foundDate={post.foundDateTime.replace('T', ' ').slice(0, 16)}
              callback={callbackFunction}
            />
          ))}
        {otherFoundBoard.length > 0 &&
          otherFoundBoard.map(post => (
            <FoundCard
              key={post.id}
              id={post.id}
              image={post.imageUrlList[0] || ''}
              title={post.title}
              dogGender={post.petGender === 'MALE' ? '수컷' : '암컷'}
              dogBreed={post.petBreed}
              appearance={post.petDescription}
              foundLocation={post.specificLocation}
              foundDate={post.foundDateTime.replace('T', ' ').slice(0, 16)}
            />
          ))}
        <FoundCard
          id="1"
          image={
            'https://happymaru-bucket.s3.ap-northeast-2.amazonaws.com/random-person/person-1.png'
          }
          title="주인을 찾습니다!!"
          dogGender="수컷"
          dogBreed="푸들"
          appearance="잘생김 어쩌구저쩌구 어쩌구저쩌구2 어쩌구저쩌구3ㄴㄴㄴㄴㄴㄴㄴㄴ"
          foundLocation="동작구"
          foundDate="2023년 12월 23일"
        />
        <FoundCard
          id="2"
          image={
            'https://happymaru-bucket.s3.ap-northeast-2.amazonaws.com/random-person/person-2.png'
          }
          title="주인을 찾습니다!!"
          dogGender="수컷"
          dogBreed="푸들"
          appearance="잘생김 어쩌구저쩌구 어쩌구저쩌구2 어쩌구저쩌구3ㄴㄴㄴㄴㄴㄴㄴㄴ"
          foundLocation="동작구"
          foundDate="2023년 12월 23일"
        />
        <FoundCard
          id="3"
          image={
            'https://happymaru-bucket.s3.ap-northeast-2.amazonaws.com/random-person/person-3.png'
          }
          title="주인을 찾습니다!!"
          dogGender="수컷"
          dogBreed="푸들"
          appearance="잘생김 어쩌구저쩌구 어쩌구저쩌구2 어쩌구저쩌구3ㄴㄴㄴㄴㄴㄴㄴㄴ"
          foundLocation="동작구"
          foundDate="2023년 12월 23일"
        />
        <FoundCard
          id="4"
          image={
            'https://happymaru-bucket.s3.ap-northeast-2.amazonaws.com/random-person/person-4.png'
          }
          title="주인을 찾습니다!!"
          dogGender="수컷"
          dogBreed="푸들"
          appearance="잘생김 어쩌구저쩌구 어쩌구저쩌구2 어쩌구저쩌구3ㄴㄴㄴㄴㄴㄴㄴㄴ"
          foundLocation="동작구"
          foundDate="2023년 12월 23일"
        />
      </ScrollView>
      {showButton && (
        <TouchableOpacity style={styles.arrowButton} onPress={scrollToTop}>
          <TopArrowIcon2 />
        </TouchableOpacity>
      )}
      <TouchableOpacity
        style={styles.reportButton}
        onPress={moveToPostPage}
        activeOpacity={0.8}>
        <ReportIcon fill={color.white} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  missFoundContainer: {},
  reportButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: color.blue[600],
    borderRadius: 100,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowButton: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    backgroundColor: color.white,
    borderWidth: 1,
    borderColor: color.gray[200],
    borderRadius: 100,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Found;
