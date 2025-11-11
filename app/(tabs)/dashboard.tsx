import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function DashboardScreen() {
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert('Logged out');
    router.push('/(tabs)'); 
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/CTU_logo.png')} style={styles.logo} />
      <Text style={styles.title}>Student Affairs and Services Offices</Text>
      <Text style={styles.subtitle}>Cebu Technological University - Argao Campus</Text>
      <Text style={styles.welcome}>Welcome to the Homepage!</Text>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#1e3a8a',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#ffffff',
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    color: '#ffffff',
  },
  welcome: {
    fontSize: 16,
    marginBottom: 20,
    color: '#ffffff',
  },
  button: {
    backgroundColor: '#2563eb',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
  },
});
