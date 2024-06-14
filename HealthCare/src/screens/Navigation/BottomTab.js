import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../Home/Home'
import Appointment from '../AppointMents/Appointment'
import Profile from '../Profile/Profile'
import Search from '../Search/Search'
import Chat from '../Chat/Chat';
import { colorTheme } from '../../constant';
import Medicine from '../Medicine/Medicine';


const Tab = createBottomTabNavigator();

export default function BottomTab() {
    return (
        <Tab.Navigator
            initialRouteName='Home'
            screenOptions={{
                tabBarInactiveTintColor: '#929CAD',
                tabBarActiveTintColor: colorTheme.primaryColor,
                tabBarHideOnKeyboard: true
            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="home" color={color} size={size} />
                    ),

                }}
            />
            <Tab.Screen
                name="Medicine"
                component={Medicine}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Medicine',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="search" color={color} size={size} />
                    ),

                }}
            />
            <Tab.Screen
                name="Appointment"
                component={Appointment}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Appointment',
                    tabBarIcon: ({ color, size }) => (
                        <Fontisto name="date" size={size} color={color} />
                    )
                }}
            />
            <Tab.Screen
                name="Chat"
                component={Chat}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Chat',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="chat-processing-outline" color={color} size={size} />
                    ),

                }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="user" color={color} size={size} />
                    )
                }}
            />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({

})