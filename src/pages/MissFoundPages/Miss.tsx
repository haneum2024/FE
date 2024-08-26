import React, {useCallback, useRef, useState} from 'react';
import {View, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {Menu} from 'react-native-paper';

import {getOtherMissApi, getUserMissApi} from '../../api/petSearchApi';
import CustomText from '../../components/CustomText';
import MissCard from '../../components/MissCard';
import ReportIcon from '../../components/Icons/ReportIcon';
import {getAccessToken} from '../../storage/auth';
import {RootState} from '../../store';
import color from '../../styles/color';
import BottomArrowIcon from '../../img/BottomArrowIcon.svg';
import TopArrowIcon2 from '../../img/TopArrowIcon2.svg';
import type {ReportDogPageNavigation} from '../../../types/navigation';

type MissNavigationProp = StackNavigationProp<
  ReportDogPageNavigation,
  'MissPost'
>;

function Miss() {
  const navigation = useNavigation<MissNavigationProp>();
  const isProfile = useSelector((state: RootState) => state.profile.isProfile);

  const scrollViewRef = useRef<ScrollView>(null);
  const [userMissBoard, setUserMissBoard] = useState<any[]>([]);
  const [otherMissBoard, setOtherMissBoard] = useState<any[]>([]);
  const [showButton, setShowButton] = useState(false);
  const [isShowNotice, setIsShowNotice] = useState(false);
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
    if (isProfile) {
      navigation.navigate('MissPost');
    } else {
      setIsShowNotice(true);
      setTimeout(() => {
        setIsShowNotice(false);
      }, 3000);
    }
  };

  const callbackFunction = () => {
    fetchMissBoards();
  };

  const fetchMissBoards = async () => {
    try {
      const accessToken = await getAccessToken();
      const userMissPost = await getUserMissApi({
        accessToken: accessToken as string,
      });
      const otherMissPost = await getOtherMissApi({
        accessToken: accessToken as string,
        page: 0,
        size: 100,
      });
      setUserMissBoard(userMissPost.data);
      setOtherMissBoard(otherMissPost.data.content);
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
      fetchMissBoards();
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
        {userMissBoard.length > 0 &&
          userMissBoard.map(post => (
            <MissCard
              key={post.id}
              id={post.id}
              isMyPost={true}
              image={post.imageUrlList[0] || ''}
              title={post.title}
              dogGender={post.petGender === 'MALE' ? '수컷' : '암컷'}
              dogBreed={post.petBreed}
              dogAge={post.age}
              missingLocation={post.specificLocation}
              missingDate={post.lostDateTime.replace('T', ' ').slice(0, 16)}
              callback={callbackFunction}
            />
          ))}
        {otherMissBoard.length > 0 &&
          otherMissBoard.map(post => (
            <MissCard
              key={post.id}
              id={post.id}
              image={post.imageUrlList[0] || ''}
              title={post.title}
              dogGender={post.petGender === 'MALE' ? '수컷' : '암컷'}
              dogBreed={post.petBreed}
              dogAge={post.age}
              missingLocation={post.specificLocation}
              missingDate={post.lostDateTime.replace('T', ' ').slice(0, 16)}
            />
          ))}
        {/* <MissCard
          id="1"
          image={
            'https://happymaru-bucket.s3.ap-northeast-2.amazonaws.com/random-person/person-4.png'
          }
          title="강아지를 찾습니다!!"
          dogGender="수컷"
          dogBreed="푸들"
          dogAge={8}
          missingLocation="동작구"
          missingDate="2023년 12월 23일"
        />
        <MissCard
          id="2"
          image={
            'https://happymaru-bucket.s3.ap-northeast-2.amazonaws.com/random-person/person-5.png'
          }
          title="강아지를 찾습니다!!"
          dogGender="수컷"
          dogBreed="푸들"
          dogAge={8}
          missingLocation="동작구"
          missingDate="2023년 12월 23일"
        />
        <MissCard
          id="3"
          image={
            'https://happymaru-bucket.s3.ap-northeast-2.amazonaws.com/random-person/person-6.png'
          }
          title="강아지를 찾습니다!!"
          dogGender="수컷"
          dogBreed="푸들"
          dogAge={8}
          missingLocation="동작구"
          missingDate="2023년 12월 23일"
        />
        <MissCard
          id="4"
          image={
            'https://happymaru-bucket.s3.ap-northeast-2.amazonaws.com/random-person/person-1.png'
          }
          title="강아지를 찾습니다!!"
          dogGender="수컷"
          dogBreed="푸들"
          dogAge={8}
          missingLocation="동작구"
          missingDate="2023년 12월 23일"
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
      {isShowNotice && (
        <View style={styles.noticeTooltip}>
          <CustomText weight="500" style={styles.noticeText}>
            프로필 생성 후 작성이 가능해요
          </CustomText>
        </View>
      )}
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
  noticeTooltip: {
    position: 'absolute',
    bottom: 30,
    right: 80,
    backgroundColor: color.orange[600],
    borderRadius: 4,
    paddingVertical: 6,
    paddingHorizontal: 14,
  },
  noticeText: {
    fontSize: 12,
    color: color.white,
    textAlign: 'center',
  },
});

export default Miss;
