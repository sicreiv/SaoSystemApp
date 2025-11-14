import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { auth } from '../../firebase';

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'error' | 'success' | ''>('');

  const router = useRouter();

  const handleRegister = async () => {
    const trimmedEmail = email.trim();

    setMessage('');
    setMessageType('');

    if (!trimmedEmail || !password || !confirmPassword) {
      setMessage('Please fill in all fields.');
      setMessageType('error');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setMessage('Please enter a valid email address.');
      setMessageType('error');
      return;
    }

    if (password.length < 8) {
      setMessage('Password must be at least 8 characters long.');
      setMessageType('error');
      return;
    }

    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      setMessageType('error');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, trimmedEmail, password);

      setMessage('Account created successfully! You can now log in.');
      setMessageType('success');

      setTimeout(() => {
        router.push('/');
      }, 1000);

    } catch (error: any) {
      console.error('Register error:', error);
      setMessage(error.message);
      setMessageType('error');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.card}>

        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Fill in your details to continue</Text>

        {/*  Validation Message */}
        {message !== '' && (
          <Text
            style={[
              styles.validationMessage,
              messageType === 'error' ? styles.errorText : styles.successText,
            ]}
          >
            {message}
          </Text>
        )}

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="example@gmail.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#9ca3af"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Minimum 8 characters"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholderTextColor="#9ca3af"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Confirm Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Re-enter your password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            placeholderTextColor="#9ca3af"
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
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
    backgroundColor: '#eef2ff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  card: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 28,
    shadowColor: '#1e3a8a',
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },

  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1e3a8a',
    textAlign: 'center',
    marginBottom: 6,
  },

  subtitle: {
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 8,
    fontSize: 14,
  },

  validationMessage: {
    textAlign: 'center',
    fontSize: 15,
    marginBottom: 18,
    fontWeight: '600',
  },

  errorText: {
    color: '#dc2626',
  },

  successText: {
    color: '#16a34a',
  },

  inputGroup: {
    marginBottom: 18,
  },

  label: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 6,
    color: '#1e3a8a',
  },

  input: {
    height: 48,
    borderWidth: 1.4,
    borderColor: '#c7d2fe',
    borderRadius: 12,
    paddingHorizontal: 14,
    backgroundColor: '#f8fafc',
    fontSize: 16,
  },

  button: {
    backgroundColor: '#1e3a8a',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },

  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
  },

  footerText: {
    textAlign: 'center',
    color: '#475569',
    marginTop: 12,
    fontSize: 15,
  },

  link: {
    color: '#1e3a8a',
    fontWeight: '700',
  },
});
