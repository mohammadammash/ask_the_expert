import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Linking, Platform } from "react-native";

export const useNotifications = () => {
    const registerForPushNotificationsAsync = async () => {
        if (Device.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!');
                return;
            }
            const token = (await Notifications.getExpoPushTokenAsync()).data;
            return token;
        } else {
            alert('Must use physical device for Push Notifications');
        }

        if (Platform.OS === 'android') {
            Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }
    }

    //This listener is fired whenever a notification is received while the app is foregrounded //useful for displaying own toast message
    const handleNotificationReceive = (notification: Notifications.Notification) => {
        console.log({ notification: notification });
    };

    //This listener is fired whenever a user taps on or interact with a notification (works if app is foregrounded, backgrounded..)
    const handleNotificationResponse = (response: Notifications.NotificationResponse) => {
        const data = response.notification.request.content.data;

        return data ? data : "";
    };

    return { registerForPushNotificationsAsync, handleNotificationReceive, handleNotificationResponse };
}