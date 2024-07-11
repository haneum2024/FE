import React, {useState} from 'react';
import {
  View,
  ScrollView,
  TouchableWithoutFeedback,
  Animated,
  StyleSheet,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import {Divider} from 'react-native-paper';

import color from '../styles/color';
import CustomText from './CustomText';

import BottomArrow from '../img/BottomArrow.svg';
import TopArrow from '../img/TopArrow.svg';

const CollapsibleView = ({
  title,
  children,
  height,
  onPress,
}: {
  title: string;
  children: React.ReactNode;
  height: number;
  onPress: (disable: boolean) => void;
}) => {
  const [collapsed, setCollapsed] = useState(true);
  const [animation] = useState(new Animated.Value(0));

  const toggleCollapse = () => {
    if (collapsed) {
      Animated.timing(animation, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(animation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
    setCollapsed(!collapsed);
  };

  const heightInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, height],
  });

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const {contentOffset, contentSize, layoutMeasurement} = event.nativeEvent;
    if (contentOffset.y + layoutMeasurement.height >= contentSize.height - 10) {
      onPress(false);
    }
  };

  return (
    <View>
      <View style={styles.collapsibleContainer}>
        <TouchableWithoutFeedback onPress={toggleCollapse}>
          <View style={styles.title}>
            <CustomText style={styles.label}>{title}</CustomText>
            {collapsed ? (
              <BottomArrow width={15} height={15} />
            ) : (
              <TopArrow width={15} height={15} />
            )}
          </View>
        </TouchableWithoutFeedback>
        <Animated.View
          style={[styles.statusContainer, {height: heightInterpolate}]}>
          <Divider style={styles.divider} />
          <ScrollView onScroll={handleScroll}>{children}</ScrollView>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  collapsibleContainer: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: color.gray[200],
    backgroundColor: color.gray[50],
    color: color.gray[500],
    padding: 15,
  },
  title: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    color: color.gray[500],
  },
  statusContainer: {
    overflow: 'hidden',
  },
  divider: {
    marginVertical: 15,
  },
});

export default CollapsibleView;
