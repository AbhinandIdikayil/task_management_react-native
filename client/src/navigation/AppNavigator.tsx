// src/navigation/AppNavigator.js
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/auth/LoginScreen';
import SignupScreen from '../screens/auth/SignupScreen';
// import TaskDetailScreen from '../screens/home/TaskDetailScreen';
import HomeScreen from '../screens/home/HomeScreen';
import AddTaskScreen from '../screens/home/AddTaskScreen';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { loadToken } from '../store/authSlice';
import { getToken } from '../utils/tokenStorage';

const Stack = createStackNavigator();

const AppNavigator = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        const fn = async () => {
            const token = await getToken('token');
            if (token) {
                dispatch(loadToken(token));
            }
        };
        fn();
    }, []);
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {isAuthenticated ? (
                    <>
                        <Stack.Screen name="Home" component={HomeScreen} />
                        <Stack.Screen name="AddTask" component={AddTaskScreen} />
                        {/* <Stack.Screen name="TaskDetails" component={TaskDetailsScreen} /> */}
                    </>
                ) : (
                    <>
                        <Stack.Screen name="Login" component={LoginScreen} />
                        <Stack.Screen name="Signup" component={SignupScreen} />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
