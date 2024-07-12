import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Provider, useSelector} from 'react-redux';
import store, {RootState} from './src/store';
import AppInner from './AppInner';
import AppSignIn from './AppSignIn';
import Splash from './src/pages/Splash';

function MainApp() {
  const isLogin = useSelector((state: RootState) => state.auth.isLogin);

  return (
    <NavigationContainer>
      {isLogin ? <AppInner /> : <AppSignIn />}
    </NavigationContainer>
  );
}

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Provider store={store}>
      {showSplash && <Splash onFinish={() => setShowSplash(false)} />}
      <View style={showSplash ? styles.hidden : styles.visible}>
        <MainApp />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  hidden: {
    display: 'none',
  },
  visible: {
    display: 'flex',
    flex: 1,
  },
});

export default App;
