import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type NotificationStore = {
  id?: string;
  alarmTitle: string;
  alarmDescription: string;
  alarmType?: string;
  boardId?: string;
  location?: string;
  read: boolean;
};

interface NotificationsState {
  notifications: NotificationStore[];
}

const initialState: NotificationsState = {
  notifications: [],
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setNotifications(state, action: PayloadAction<NotificationStore[]>) {
      state.notifications = action.payload;
    },
    addNotification(state, action: PayloadAction<NotificationStore>) {
      state.notifications.push(action.payload);
    },
    markNotificationAsRead(state, action: PayloadAction<string>) {
      const notification = state.notifications.find(
        n => n.id === action.payload,
      );
      if (notification) {
        notification.read = true;
      }
    },
  },
});

export const {setNotifications, addNotification, markNotificationAsRead} =
  notificationsSlice.actions;

export default notificationsSlice.reducer;
