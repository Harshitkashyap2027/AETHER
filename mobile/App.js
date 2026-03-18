import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ChatScreen from './src/screens/ChatScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import { colors, typography } from './src/theme';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <NavigationContainer
          theme={{
            dark: true,
            colors: {
              primary: colors.accent,
              background: colors.bg,
              card: colors.bg,
              text: colors.textPrimary,
              border: colors.separator,
              notification: colors.accent,
            },
          }}
        >
          <Tab.Navigator
            screenOptions={{
              headerShown: false,
              tabBarStyle: {
                backgroundColor: colors.bg,
                borderTopColor: colors.separator,
                borderTopWidth: 1,
              },
              tabBarActiveTintColor: colors.accent,
              tabBarInactiveTintColor: colors.textMuted,
              tabBarLabelStyle: {
                ...typography.micro,
                marginBottom: 4,
              },
            }}
          >
            <Tab.Screen
              name="Dashboard"
              component={DashboardScreen}
              options={{
                tabBarIcon: ({ color }) => (
                  <Text style={{ fontSize: 20, color }}>⊞</Text>
                ),
                tabBarLabel: 'Dashboard',
              }}
            />
            <Tab.Screen
              name="Chat"
              component={ChatScreen}
              options={{
                tabBarIcon: ({ color }) => (
                  <Text style={{ fontSize: 20, color }}>💬</Text>
                ),
                tabBarLabel: 'Chat',
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
