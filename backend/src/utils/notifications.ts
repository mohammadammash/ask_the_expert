import { Expo, ExpoPushMessage } from 'expo-server-sdk';

//Create a new Expo SDK Client
let expo = new Expo();

const sendNotification = (push_tokens: string[], title: string, body: string) => {

    const messages = <any>[];
    try {
        for (let pushToken of push_tokens) {

            // Check that all your push tokens appear to be valid Expo push tokens
            if (!Expo.isExpoPushToken(pushToken)) {
                console.error(`Push token ${pushToken} is not a valid Expo push token`);
                continue;
            }

            messages.push({
                to: pushToken,
                sound: 'default',
                title: title,
                body: body,
            })
        }

        let chunks = expo.chunkPushNotifications(messages);
        const tickets = [];
        (async () => {
            for (let chunk of chunks) {
                try {
                    let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
                    console.log(ticketChunk);
                    tickets.push(...ticketChunk);
                } catch (error) {
                    console.error(error);
                }
            }
        })();
    }
    catch (err) {
        console.log(err);
    }
};

export default sendNotification;