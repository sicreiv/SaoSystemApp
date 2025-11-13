import { useRouter } from 'expo-router';
import React from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';

export default function DashboardScreen() {
  const router = useRouter();
  const { width, height } = useWindowDimensions();

  const handleLogout = () => {
    Alert.alert('Logged out');
    router.push('/(tabs)');
  };

  const isMobile = width < 600;

  return (
    <ImageBackground
      source={require('../../assets/images/CTUAC.jpg')}
      style={[styles.background, { width, height }]}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        {/* Header */}
        <View style={styles.header}>
          <Image
            source={require('../../assets/images/CTU_logo.png')}
            style={[
              styles.logo,
              { width: isMobile ? 80 : 130, height: isMobile ? 80 : 130 },
              ]}
            />

          <Text
            style={[
              styles.title,
              { fontSize: isMobile ? 20 : 28, textAlign: 'center' },
            ]}
          >
            Student Affairs and Services
          </Text>
          <Text
            style={[
              styles.subtitle,
              { fontSize: isMobile ? 14 : 18, textAlign: 'center' },
            ]}
          >
            Cebu Technological University - Argao Campus
          </Text>
        </View>

        {/* Card */}
        <View
          style={[
            styles.card,
            {
              width: isMobile ? '90%' : '60%',
              padding: isMobile ? 20 : 30,
            },
          ]}
        >
          <Text
            style={[
              styles.welcome,
              { fontSize: isMobile ? 16 : 20, textAlign: 'center' },
            ]}
          >
            Welcome to your Dashboard 👋
          </Text>
          <Text
            style={[
              styles.desc,
              { fontSize: isMobile ? 14 : 16, textAlign: 'center' },
            ]}
          >
            Here you can access different services and information easily.
          </Text>

          <TouchableOpacity
            style={[
              styles.button,
              {
                paddingVertical: isMobile ? 10 : 14,
                paddingHorizontal: isMobile ? 25 : 40,
              },
            ]}
            onPress={handleLogout}
          >
            <Text
              style={[styles.buttonText, { fontSize: isMobile ? 15 : 18 }]}
            >
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    ...(Platform.OS === 'web' && {
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    }),
  },
  
  overlay: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: 20,
  },

  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    marginBottom: 12,
    resizeMode: 'contain',
  },
  title: {
    fontWeight: '700',
    color: '#ffffff',
  },
  subtitle: {
    color: '#f3f4f6',
    marginTop: 4,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: Platform.OS === 'web' ? 0.1 : 0.15,
    shadowRadius: 6,
    elevation: 6,
    alignItems: 'center',
  },
  welcome: {
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  desc: {
    color: '#374151',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#1e3a8a',
    borderRadius: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
});
