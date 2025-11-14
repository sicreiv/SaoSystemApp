import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // VALIDATION STATES
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');

  const [emailValid, setEmailValid] = useState<boolean | null>(null);
  const [passwordValid, setPasswordValid] = useState<boolean | null>(null);
  const [confirmValid, setConfirmValid] = useState<boolean | null>(null);

  const router = useRouter();

  // VALIDATE EMAIL
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

  // VALIDATE PASSWORD
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

    // validate confirm password again
    if (confirmPassword) validateConfirm(confirmPassword);
  };

  // VALIDATE CONFIRM PASSWORD
  const validateConfirm = (value: string) => {
    setConfirmPassword(value);

    if (!value) {
      setConfirmError('Please confirm your password');
      setConfirmValid(false);
    } else if (value !== password) {
      setConfirmError('Passwords do not match');
      setConfirmValid(false);
    } else {
      setConfirmError('');
      setConfirmValid(true);
    }
  };

  // ON REGISTER BUTTON
  const handleRegister = () => {
    if (emailValid !== true || passwordValid !== true || confirmValid !== true) return;

    Alert.alert('Success', 'Registered!');
    router.push('/(tabs)/dashboard');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.card}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Join and get started</Text>

        {/* EMAIL FIELD */}
        <View
          style={[
            styles.input,
            emailValid === false && styles.inputError,
            emailValid === true && styles.inputSuccess,
          ]}
        >
          <TextInput
            style={{ flex: 1 }}
            placeholder="Email"
            value={email}
            onChangeText={validateEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#9ca3af"
          />
        </View>
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

        {/* PASSWORD */}
        <View
          style={[
            styles.input,
            passwordValid === false && styles.inputError,
            passwordValid === true && styles.inputSuccess,
          ]}
        >
          <TextInput
            style={{ flex: 1 }}
            placeholder="Password"
            value={password}
            onChangeText={validatePassword}
            secureTextEntry
            placeholderTextColor="#9ca3af"
          />
        </View>
        {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

        {/* CONFIRM PASSWORD */}
        <View
          style={[
            styles.input,
            confirmValid === false && styles.inputError,
            confirmValid === true && styles.inputSuccess,
          ]}
        >
          <TextInput
            style={{ flex: 1 }}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={validateConfirm}
            secureTextEntry
            placeholderTextColor="#9ca3af"
          />
        </View>
        {confirmError ? <Text style={styles.errorText}>{confirmError}</Text> : null}

        {/* BUTTON */}
        <TouchableOpacity
          style={[
            styles.button,
            !(emailValid && passwordValid && confirmValid) && styles.buttonDisabled,
          ]}
          onPress={handleRegister}
          disabled={!(emailValid && passwordValid && confirmValid)}
        >
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/')}>
          <Text style={styles.footerText}>
            Already have an account? <Text style={styles.link}>Login</Text>
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
    backgroundColor: '#f3f4f6',
    padding: 20,
  },
  card: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1e3a8a',
    textAlign: 'center',
  },
  subtitle: {
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 24,
  },

  /* INPUT STYLES */
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 10,
    paddingHorizontal: 14,
    marginBottom: 6,
    backgroundColor: '#f9fafb',
    flexDirection: 'row',
    alignItems: 'center',
  },

  /* VALIDATION COLORS */
  inputError: {
    borderColor: '#dc2626', // red
  },
  inputSuccess: {
    borderColor: '#16a34a', // green
  },

  errorText: {
    color: '#dc2626',
    fontSize: 12,
    marginBottom: 10,
    marginLeft: 4,
  },

  button: {
    backgroundColor: '#1e3a8a',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonDisabled: {
    backgroundColor: '#93c5fd',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '600',
  },
  footerText: {
    textAlign: 'center',
    color: '#6b7280',
    marginTop: 20,
  },
  link: {
    color: '#1e3a8a',
    fontWeight: '600',
  },
});
