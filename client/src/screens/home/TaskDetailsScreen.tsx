import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { AXIOS_INSTANCE } from '../../api/axiosConfig';
import { deleteTask, updateTask } from '../../store/taskSlice';

const TaskDetailsScreen = ({ route, navigation }:any) => {
  const { task } = route.params;
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const dispatch = useDispatch();

  const handleUpdateTask = async () => {
    try {
      const response = await AXIOS_INSTANCE.put(`/tasks/${task.id}`, { title, description });
      dispatch(updateTask(response.data));
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteTask = async () => {
    try {
      await AXIOS_INSTANCE.delete(`/tasks/${task.id}`);
      dispatch(deleteTask(task.id));
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />
      <Button title="Update Task" onPress={handleUpdateTask} />
      <Button title="Delete Task" onPress={handleDeleteTask} color="red" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    marginBottom: 16,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});

export default TaskDetailsScreen;