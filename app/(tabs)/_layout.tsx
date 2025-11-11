import { Tabs } from 'expo-router';
import { View } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: () => <View style={{ width: 20, height: 20, backgroundColor: 'orange' }} />, 
        }}
      />
      <Tabs.Screen
        name="index" 
        options={{
          title: 'Login',
          tabBarIcon: () => <View style={{ width: 20, height: 20, backgroundColor: 'blue' }} />,
          tabBarStyle: { display: 'none' },  
        }}
      />
      <Tabs.Screen
        name="register"
        options={{
          title: 'Register',
          tabBarIcon: () => <View style={{ width: 20, height: 20, backgroundColor: 'green' }} />, 
          tabBarStyle: { display: 'none' },  
        }}
      />
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
          tabBarIcon: () => <View style={{ width: 20, height: 20, backgroundColor: 'red' }} />, 
          tabBarStyle: { display: 'none' }, 
        }}
      />
    </Tabs>
  );
}