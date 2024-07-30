import React, {useEffect, useState} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {PaperProvider} from 'react-native-paper';
import {useSelector} from 'react-redux';

import {getDogsApi, getUserApi} from '../api/userApi';
import AddDogProfile from '../components/AddDogProfile';
import Comment from '../components/Comment';
import Header from '../components/Header';
import MissFound from '../components/MissFound';
import ProfileCard from '../components/ProfileCard';
import Status from '../components/Status';
import {RootState} from '../store';
import {getAccessToken} from '../storage/auth';
import color from '../styles/color';

function Home() {
  const isProfile = useSelector((state: RootState) => state.profile.isProfile);

  const [ownerName, setOwnerName] = useState('');
  const [ownerIntroduction, setOwnerIntroduction] = useState('');
  const [ownerProfileImage, setOwnerProfileImage] = useState('');
  const [dogName, setDogName] = useState('');
  const [dogGender, setDogGender] = useState('');
  const [dogIntroduction, setDogIntroduction] = useState('');
  const [dogProfileImage, setDogProfileImage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = await getAccessToken();
      const dogsInfo = await getDogsApi(accessToken as string);
      const userInfo = await getUserApi(accessToken as string);

      const userData = userInfo.data;
      const dogData = dogsInfo.data[0];

      setOwnerName(userData.name);
      setOwnerIntroduction(userData.description);
      setOwnerProfileImage(userData.profileUrl);
      setDogName(dogData.name);
      setDogGender(dogData.gender);
      setDogIntroduction(dogData.description);
      setDogProfileImage(dogData.imageUrl);

      setIsLoading(false);
    };

    if (isProfile) {
      fetchData();
    }
  }, [isProfile]);

  return (
    <PaperProvider>
      <ScrollView style={styles.homeContainer}>
        <Header />
        {isProfile ? (
          !isLoading ? (
            <ProfileCard
              ownerName={ownerName}
              ownerIntroduction={ownerIntroduction}
              ownerProfileImage={ownerProfileImage}
              dogName={dogName}
              dogGender={dogGender}
              dogIntroduction={dogIntroduction}
              dogProfileImage={dogProfileImage}
            />
          ) : (
            <></>
          )
        ) : (
          <AddDogProfile />
        )}

        <Status />
        <Comment />
        <MissFound />
      </ScrollView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    display: 'flex',
    backgroundColor: color.gray[50],
  },
  skeletonContainer: {
    flex: 1,
    width: 300,
    backgroundColor: color.gray[200],
  },
});

export default Home;
