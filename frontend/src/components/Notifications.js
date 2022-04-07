import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform, StyleSheet } from 'react-native';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    })
})

export default() => {
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notifications, setNotification] = useState(false);
    const notificationsListener = useRef();
    const responseListener = useRef()

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token))

        notificationsListener.current = Notifications.addNotificationReceivedListener(notifications => {
            setNotification(notifications);
        });

        responseListener.current = Notifications.addNotificationReceivedListener(response => {
            console.log(response)
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationsListener.current);
            Notifications.removeNotificationSubscription(responseListener.current)
        }
    }, [])

    return <>
        <View style={style.view_01}>
            <Text>You expo push token: {expoPushToken}</Text>
            <View style={style.view_02}>
                <Text>Title: {notifications && notifications.request.content.title}</Text>
                <Text>Body: {notifications && notifications.request.content.body}</Text>
                <Text>Data: {notifications && JSON.stringify(notifications.request.content.data)}</Text>
            </View>
            <Button
                title='Press to schedule a notification'
                onPress={async () => {
                    await schedulePushNotification();
                }}
            />
        </View>
    </>
}

async function schedulePushNotification(){
    await Notifications.scheduleNotificationAsync({
        content: {
            title: "You've got mail",
            body: 'Here is the notification body',
            data: {data: 'goes here'}
        },
        trigger: { seconds: 2 }
    })
} 

async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
        const {status: existingStatus} = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if(existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!')
            return;
        }

        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log(token)
    } else {
        alert('Must use physical device fro Push Notifications')
    }

    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C'
        })
    }
    return token
}

const style = StyleSheet.create({
    view_01: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    view_02: {
        alignItems: 'center',
        justifyContent: 'center'
    }
})