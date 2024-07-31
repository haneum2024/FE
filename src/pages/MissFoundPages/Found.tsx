import React from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import CustomText from '../../components/CustomText';

function Found() {
  return (
    <View>
      <ScrollView style={styles.missFoundContainer}>
        <CustomText>Miss</CustomText>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  missFoundContainer: {},
});

export default Found;
