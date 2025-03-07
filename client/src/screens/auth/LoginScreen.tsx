import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { setToken } from '../../store/authSlice';
import { AXIOS_INSTANCE } from '../../api/axiosConfig';
import { loginUser } from '../../service';


const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const dispatch = useDispatch();

  const newErrors: { email?: string; password?: string } = {};
  const validateForm = () => {

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

  const handleLogin = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const response = await loginUser({ email, password });
      dispatch(setToken(response));
      navigation.replace('Home');
    } catch (error: any) {
      if (typeof error === 'string') {
        if (error.includes('password')) {
          newErrors.password = error
        }
        if (error.includes('not found')) {
          newErrors.email = error
        }
      }
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: error || 'Something went wrong',
      }));
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      {errors?.email && <Text style={styles?.errorText}>{errors.email}</Text>}
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />


      {errors?.password && <Text style={styles?.errorText}>{errors.password}</Text>}
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />


      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.signupButton} onPress={() => navigation.navigate('Signup')} >
        <Text style={styles.signupButtonText}>Signup</Text>
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
    alignItems: 'center',
    marginBottom: 16,
  },
  signupButtonText: {
    color: 'black', // Black text color
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: 'transparent', // Transparent background
    padding: 10,
    borderRadius: 4,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black', // Optional: Add a border
  },
  loginButtonText: {
    color: 'black', // Black text color
    fontSize: 16,
  },
});


export default LoginScreen;