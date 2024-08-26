import React, {useCallback, useRef, useState} from 'react';
import {View, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {Menu} from 'react-native-paper';

import {getOtherFoundApi, getUserFoundApi} from '../../api/ownerSearchApi';
import CustomText from '../../components/CustomText';
import FoundCard from '../../components/FoundCard';
import ReportIcon from '../../components/Icons/ReportIcon';
import {getAccessToken} from '../../storage/auth';
import color from '../../styles/color';
import BottomArrowIcon from '../../img/BottomArrowIcon.svg';
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
  const [sortMode, setSortMode] = useState('최신 순');
  const [sortMenuVisible, setSortMenuVisible] = useState(false);

  const sortList = ['최신 순', '오래된 순'];

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

  const handleSortChange = (type: string) => {
    setSortMode(type);
    setSortMenuVisible(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchFoundBoards();
    }, []),
  );

  return (
    <View style={styles.missFoundContainer}>
      <ScrollView
        ref={scrollViewRef}
        onScroll={handleScroll}
        scrollEventThrottle={16}>
        <View style={styles.sort}>
          <Menu
            visible={sortMenuVisible}
            contentStyle={styles.menuContent}
            onDismiss={() => setSortMenuVisible(false)}
            anchor={
              <TouchableOpacity
                style={styles.button}
                activeOpacity={0.8}
                onPress={() => setSortMenuVisible(true)}>
                <View style={styles.buttonView}>
                  <CustomText weight="500" style={styles.text}>
                    {sortMode}
                  </CustomText>
                  <BottomArrowIcon
                    width={12}
                    height={12}
                    fill={color.gray[700]}
                  />
                </View>
              </TouchableOpacity>
            }>
            {sortList.map((type, index) => (
              <Menu.Item
                key={index}
                style={styles.menuItem}
                titleStyle={styles.text}
                onPress={() => handleSortChange(type)}
                title={type}
              />
            ))}
          </Menu>
        </View>
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
        {/* <FoundCard
          id="1"
          image={
            'https://happymaru-bucket.s3.ap-northeast-2.amazonaws.com/random-person/person-1.png'
          }
          title="중앙대학교 정문 앞 푸들 발견"
          dogGender="수컷"
          dogBreed="푸들"
          appearance="말랑말랑하게 생겼고, 파란색 옷을 입고 있음"
          foundLocation="서울특별시 동작구 중앙대학교 정문 앞"
          foundDate="2023-12-23"
        />
        <FoundCard
          id="2"
          image={
            'https://happymaru-bucket.s3.ap-northeast-2.amazonaws.com/random-person/person-2.png'
          }
          title="중앙대학교 정문 앞 푸들 발견"
          dogGender="수컷"
          dogBreed="푸들"
          appearance="말랑말랑하게 생겼고, 파란색 옷을 입고 있음"
          foundLocation="서울특별시 동작구 중앙대학교 정문 앞"
          foundDate="2023-12-23"
        />
        <FoundCard
          id="3"
          image={
            'https://happymaru-bucket.s3.ap-northeast-2.amazonaws.com/random-person/person-3.png'
          }
          title="중앙대학교 정문 앞 푸들 발견"
          dogGender="수컷"
          dogBreed="푸들"
          appearance="말랑말랑하게 생겼고, 파란색 옷을 입고 있음"
          foundLocation="서울특별시 동작구 중앙대학교 정문 앞"
          foundDate="2023-12-23"
        />
        <FoundCard
          id="4"
          image={
            'https://happymaru-bucket.s3.ap-northeast-2.amazonaws.com/random-person/person-4.png'
          }
          title="중앙대학교 정문 앞 푸들 발견"
          dogGender="수컷"
          dogBreed="푸들"
          appearance="말랑말랑하게 생겼고, 파란색 옷을 입고 있음"
          foundLocation="서울특별시 동작구 중앙대학교 정문 앞"
          foundDate="2023-12-23"
        /> */}
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
  missFoundContainer: {
    flex: 1,
  },
  sort: {
    alignItems: 'flex-end',
    marginHorizontal: 24,
    marginTop: 12,
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: color.gray[200],
    backgroundColor: color.gray[50],
  },
  buttonView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  menuContent: {
    borderRadius: 10,
    backgroundColor: color.gray[50],
  },
  menuItem: {
    height: 35,
    backgroundColor: color.gray[50],
  },
  text: {
    fontSize: 12,
    color: color.gray[700],
  },
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
