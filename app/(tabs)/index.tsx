import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { auth } from '../../firebase';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // NEW VALIDATION STATES
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailValid, setEmailValid] = useState<boolean | null>(null);
  const [passwordValid, setPasswordValid] = useState<boolean | null>(null);

  const router = useRouter();

  const validateEmail = (value: string) => {
    setEmail(value);
    const trimmed = value.trim();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!trimmed) {
      setEmailError('Email is required');
      setEmailValid(false);
    } else if (!regex.test(trimmed)) {
      setEmailError('Invalid email format');
      setEmailValid(false);
    } else {
      setEmailError('');
      setEmailValid(true);
    }
  };

  const validatePassword = (value: string) => {
    setPassword(value);

    if (!value) {
      setPasswordError('Password is required');
      setPasswordValid(false);
    } else if (value.length < 8) {
      setPasswordError('Must be at least 8 characters');
      setPasswordValid(false);
    } else if (value.includes(' ')) {
      setPasswordError('Password cannot contain spaces');
      setPasswordValid(false);
    } else {
      setPasswordError('');
      setPasswordValid(true);
    }
  };

  const handleLogin = async () => {
    if (emailValid !== true || passwordValid !== true) return;

    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      router.push('/(tabs)/dashboard');
    } catch (error: any) {
      setPasswordError('Incorrect email or password');
      setPasswordValid(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.card}>
        <Text style={styles.title}>Cebu Technological University</Text>
        <Text style={styles.subtitle}>Sign in</Text>

        {/* EMAIL FIELD */}
        <View
          style={[
            styles.inputWrapper,
            emailValid === false && styles.inputError,
            emailValid === true && styles.inputSuccess,
          ]}
        >
          <Ionicons name="mail-outline" size={20} color="#6b7280" />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#9ca3af"
            value={email}
            onChangeText={validateEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

        {/* PASSWORD FIELD */}
        <View
          style={[
            styles.inputWrapper,
            passwordValid === false && styles.inputError,
            passwordValid === true && styles.inputSuccess,
          ]}
        >
          <Ionicons name="lock-closed-outline" size={20} color="#6b7280" />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#9ca3af"
            value={password}
            onChangeText={validatePassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              name={showPassword ? "eye-outline" : "eye-off-outline"}
              size={20}
              color="#6b7280"
            />
          </TouchableOpacity>
        </View>
        {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

        {/* LOGIN BUTTON */}
        <Pressable
          style={[styles.button, !(emailValid && passwordValid) && styles.buttonDisabled]}
          onPress={handleLogin}
          disabled={!(emailValid && passwordValid)}
        >
          <Text style={styles.buttonText}>Sign In</Text>
        </Pressable>

        <TouchableOpacity onPress={() => router.push('/register')}>
          <Text style={styles.footerText}>
            Don’t have an account? Contact your administrator.<Text style={styles.link}>Register</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eef2ff',
    padding: 20,
  },
  card: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 28,
    shadowColor: '#000',
    shadowOpacity: 0.09,
    shadowRadius: 6,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#363636ff',
    textAlign: 'center',
  },
  subtitle: {
    color: '#6b7280',
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 28,
    fontSize: 15,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    paddingHorizontal: 14,
    marginBottom: 6,
    height: 50,
  },

  /* VALIDATION COLORS */
  inputError: {
    borderColor: '#dc2626', // red
  },
  inputSuccess: {
    borderColor: '#16a34a', // green
  },

  input: {
    flex: 1,
    fontSize: 16,
    marginLeft: 8,
  },
  errorText: {
    color: '#dc2626',
    fontSize: 12,
    marginBottom: 12,
    marginLeft: 4,
  },
  button: {
    backgroundColor: '#1e3a8a',
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 14,
  },
  buttonDisabled: {
    backgroundColor: '#93c5fd',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '700',
  },
  footerText: {
    textAlign: 'center',
    color: '#6b7280',
    marginTop: 22,
    fontSize: 14,
  },
  link: {
    color: '#1e3a8a',
    fontWeight: '700',
  },
});
