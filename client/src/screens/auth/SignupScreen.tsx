import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { setToken } from '../../store/authSlice';
import { AXIOS_INSTANCE } from '../../api/axiosConfig';
import { registerUser } from '../../service';
import { AppDispatch } from '../../store/store';

const SignupScreen = ({ navigation }: any) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string }>({});
  const dispatch = useDispatch<AppDispatch>();

  const newErrors: { name?: string; email?: string; password?: string } = {};
  const validateForm = () => {

    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSignup = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const data = await registerUser({ name, email, password })
      dispatch(setToken(data.token));
      navigation.replace('Home');
    } catch (error: any) {
      newErrors.email = error
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: error || 'Something went wrong',
      }));
      // Alert.alert('Signup Failed', error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <View style={styles.container}>
      {errors?.name && <Text style={styles?.errorText}>{errors.name}</Text>}
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={[styles.input]}
      />

      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={[styles.input]}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={[styles.input]}
      />

      <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
        <Text style={styles.signupButtonText}>Signup</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Login')} >
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    marginBottom: 16,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginBottom: 2,
  },
  signupButton: {
    backgroundColor: 'transparent', // Transparent background
    padding: 10,
    borderRadius: 4,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black', // Optional: Add a border
  },
  signupButtonText: {
    color: 'black', // Black text color
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: 'transparent', // Transparent background
    padding: 10,
    alignItems: 'center',
  },
  loginButtonText: {
    color: 'black', // Black text color
    fontSize: 16,
  },
});

export default SignupScreen;