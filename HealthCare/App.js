import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import Navigation from './src/screens/Navigation/Navigation'
import { NavigationContainer } from '@react-navigation/native'
import { Provider } from 'react-redux'
import store from './src/store'
import { navigationRef } from './src/services/navRef'
import 'react-native-gesture-handler'
import { notificationPopUp } from './src/components/NotificationPopUp'


export default function App() {
    // useEffect(() => {
    //   async function initNotification() {
    //     setInterval(async() => {
    //      notificationPopUp.notification()
    //         console.log('hello');
    //     }, 10000);
    //   }
    //   initNotification()
    // }, [])
    
    return (
        <Provider store={store}>
            <NavigationContainer ref={navigationRef}>
                <Navigation />
            </NavigationContainer>
        </Provider>
    )
}

const styles = StyleSheet.create({})