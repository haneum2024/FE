import React, {useState, useEffect} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {PaperProvider} from 'react-native-paper';

import Comment from '../components/Comment';
import DogCard from '../components/DogCard';
import Header from '../components/Header';
import Status from '../components/Status';
import {getDogsApi} from '../api/userApi';
import {getAccessToken} from '../storage/auth';
import color from '../styles/color';

function Health() {
  const [dogName, setDogName] = useState('');
  const [dogGender, setDogGender] = useState('');
  const [dogBreed, setDogBreed] = useState('');
  const [dogBirth, setDogBirth] = useState('');
  const [dogProfileImage, setDogProfileImage] = useState('');

  useEffect(() => {
    const fetchDogData = async () => {
      const accessToken = await getAccessToken();
      const dogsInfo = await getDogsApi(accessToken as string);

      const dogData = dogsInfo.data[0];
      setDogName(dogData.name);
      setDogGender(dogData.gender);
      setDogBreed(dogData.breed);
      setDogBirth(dogData.birthDate);
      setDogProfileImage(dogData.imageUrl);
    };

    fetchDogData();
  }, []);

  return (
    <PaperProvider>
      <ScrollView style={styles.healthContainer}>
        <Header />
        <DogCard
          image={dogProfileImage}
          dogName={dogName}
          dogGender={dogGender}
          dogBreed={dogBreed}
          dogBirth={dogBirth}
        />
        <Status />
        <Comment />
      </ScrollView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  healthContainer: {
    display: 'flex',
  },
});

export default Health;
