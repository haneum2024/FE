import {useEffect} from 'react';
import {useDispatch} from 'react-redux';

import {getAlarmApi} from '../api/fcmAlarmApi';
import {getAccessToken} from '../storage/auth';
import {setNotifications} from '../store/reducers/notificationReducer';

const AppInitialization = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchNotifications = async () => {
      const accessToken = await getAccessToken();
      const alarmData = await getAlarmApi({accessToken: accessToken as string});
      const alarmList = alarmData.data;
      dispatch(setNotifications(alarmList));
    };

    fetchNotifications();
  }, [dispatch]);

  return null;
};

export default AppInitialization;
