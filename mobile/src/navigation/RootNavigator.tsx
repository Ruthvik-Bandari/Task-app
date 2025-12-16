import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
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
    return null;
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
