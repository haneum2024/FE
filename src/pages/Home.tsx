import React from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {PaperProvider} from 'react-native-paper';

import Comment from '../components/Comment';
import AddDogProfile from '../components/AddDogProfile';
import MissFound from '../components/MissFound';
import Status from '../components/Status';
import color from '../styles/color';

function Home() {
  return (
    <PaperProvider>
      <ScrollView style={styles.HomeContainer}>
        {true ? <AddDogProfile /> : <></>}

        <Status />
        <Comment />
        <MissFound />
      </ScrollView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  HomeContainer: {
    display: 'flex',
    backgroundColor: color.gray[50],
  },
});

export default Home;
