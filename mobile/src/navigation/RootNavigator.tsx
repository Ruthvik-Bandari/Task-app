import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuthStore } from '../hooks/useAuth';
import {
  TasksListScreen,
  NewTaskScreen,
  TaskDetailScreen,
  LoginScreen,
  RegisterScreen,
} from '../screens';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  TasksList: undefined;
  NewTask: undefined;
  TaskDetail: { taskId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  const { isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) {
    return (
      <LinearGradient colors={['#1a1a2e', '#16213e']} style={styles.loading}>
        <ActivityIndicator size="large" color="#8B5CF6" />
      </LinearGradient>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <>
            <Stack.Screen name="TasksList" component={TasksListScreen} />
            <Stack.Screen
              name="NewTask"
              component={NewTaskScreen}
              options={{ presentation: 'modal' }}
            />
            <Stack.Screen name="TaskDetail" component={TaskDetailScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
