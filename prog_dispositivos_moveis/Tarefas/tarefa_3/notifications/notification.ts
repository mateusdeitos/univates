import { Notifications } from "expo";
import axios from 'axios';

interface Message {
    title: string;
    body: string;
    data?: string;
}

const sendNotification = async ({ title, body, data }: Message) => {
    const expoPushToken = await Notifications.getExpoPushTokenAsync();

    const message = {
        to: expoPushToken,
        sound: 'default',
        title,
        body,
        data: { data: data || 'goes here' },
    };

    axios.post('https://exp.host/--/api/v2/push/send',
        JSON.stringify(message),
        {
            headers: {
                'Accept': 'application/json',
                'Accept-encoding': 'gzip, deflate',
                'Content-Type': 'application/json',
            }
        }
    )
        .then(response => console.log({ response }))
        .catch(error => console.log({ error }))
};

export { sendNotification };