import notifee, { AndroidImportance, TriggerType } from '@notifee/react-native';

async function onDisplayNotification(alarm) {
    console.log('sending notification');
    // Request permissions (required for iOS)
    if (Platform.OS === 'ios') {
        await notifee.requestPermission();
    }

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
        id: 'id1',
        name: 'Med Reminders',
        sound: 'default',
        importance: AndroidImportance.HIGH,
    });

    // Schedule the notification
    const date = new Date(Date.now());
    date.setSeconds(date.getMinutes() + alarm); // Schedule notification to trigger in 10 seconds
    // console.log(date.getMilliseconds()+10);

    const trigger = {
        type: TriggerType.TIMESTAMP,
        timestamp: date.getTime(),
    };

    await notifee.createTriggerNotification(
        {
            title: '<p style="color: #4caf50;"><b>Medicine time</b></p>',
            id:'check',
            subtitle: '&#129395;',
            body: 'Hii user, did you take your medicine with your meal? &#127881;!',
            android: {
                autoCancel: false, // Defaults to true
                largeIcon: require('../assets/img/DocData/d1.jpeg'), // large icon
                channelId,
                color: '#4caf50',
                showTimestamp: true,
            },
        },
        trigger
    );
}

export const notificationPopUp={onDisplayNotification}
