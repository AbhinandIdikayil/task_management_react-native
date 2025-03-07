import React, { useCallback, useEffect, useLayoutEffect } from 'react';
import { View, FlatList, StyleSheet, RefreshControl, Button, TouchableOpacity, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setTasks } from '../../store/taskSlice';
import { AXIOS_INSTANCE } from '../../api/axiosConfig';
import TaskCard from '../../components/TaskCard';
import { RootState } from '../../store/store';
import { logout } from '../../store/authSlice';
import { removeToken } from '../../utils/tokenStorage';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const navigate = useNavigation();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const [refreshing, setRefreshing] = React.useState(false);

  const handleLogout = async () => {
    dispatch(logout());
    await removeToken('token');
    navigation.replace('Login');
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    });
  }, [navigation]);


  const fetchTasks = async () => {
    try {
      const response = await axios.get('https://your-api-url/tasks');
      dispatch(setTasks(response.data));
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchTasks().finally(() => setRefreshing(false));
  }, []);




  return (
    <View style={styles.container}>
      {/* <FlatList
        data={tasks}
        renderItem={({ item }) => <TaskCard task={item} navigation={navigation} />}
        keyExtractor={(item) => item.id}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutButton: {
    marginRight: 15,  // Adds some space from the right
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: '#ff4d4d',  // Red logout button
    borderRadius: 5,
  },
  logoutText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default HomeScreen;