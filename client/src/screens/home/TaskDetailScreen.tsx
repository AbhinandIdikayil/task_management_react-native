// src/screens/TaskDetailScreen.js
import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { TextInput, Button, HelperText } from 'react-native-paper';
import { AXIOS_INSTANCE } from '../../api/axiosConfig';

const TaskDetailScreen = ({ route, navigation }:any) => {
    const { task } = route.params;

    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description || '');
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleUpdate = async () => {
        if (!title.trim()) {
            setError('Title is required');
            return;
        }
        try {
            setLoading(true);
            setError('');

            await AXIOS_INSTANCE.put(`/tasks/${task.id}`, {
                title,
                description,
            });

            setIsEditing(false);
            // You could also navigate back, depending on your UI flow preference
        } catch (err) {
            console.error('Error updating task:', err);
            setError('Failed to update task. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = () => {
        Alert.alert(
            'Delete Task',
        )
    }
    return (
        <View>

        </View>
    )
}