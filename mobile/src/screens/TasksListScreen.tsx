import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTasks, useToggleTaskComplete } from '../hooks/useTasks';
import { useAuthStore } from '../hooks/useAuth';
import { TaskCard } from '../components';

export const TasksListScreen = ({ navigation }: any) => {
  const { data, isLoading, refetch, isError } = useTasks();
  const toggleTask = useToggleTaskComplete();
  const { logout, user } = useAuthStore();

  const tasks = Array.isArray(data?.data) ? data.data : Array.isArray(data) ? data : [];

  const handleToggle = (id: string) => {
    toggleTask.mutate(id);
  };

  if (isLoading) {
    return (
      <LinearGradient colors={['#1a1a2e', '#16213e']} style={styles.container}>
        <SafeAreaView style={styles.centered}>
          <ActivityIndicator size="large" color="#8B5CF6" />
        </SafeAreaView>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={['#1a1a2e', '#16213e']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello, {user?.name || 'User'}!</Text>
            <Text style={styles.subtitle}>{tasks.length} tasks</Text>
          </View>
          <TouchableOpacity onPress={logout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>

        {isError ? (
          <View style={styles.empty}>
            <Text style={styles.emptyText}>Failed to load tasks</Text>
            <TouchableOpacity onPress={() => refetch()}>
              <Text style={styles.retryText}>Tap to retry</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={tasks}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.list}
            refreshControl={
              <RefreshControl refreshing={isLoading} onRefresh={refetch} tintColor="#8B5CF6" />
            }
            renderItem={({ item }) => (
              <TaskCard
                task={item}
                onPress={() => navigation.navigate('TaskDetail', { taskId: item.id })}
                onToggle={() => handleToggle(item.id)}
              />
            )}
            ListEmptyComponent={
              <View style={styles.empty}>
                <Text style={styles.emptyText}>No tasks yet</Text>
                <Text style={styles.emptySubtext}>Tap + to create your first task</Text>
              </View>
            }
          />
        )}

        <TouchableOpacity
          style={styles.fab}
          onPress={() => navigation.navigate('NewTask')}
        >
          <LinearGradient
            colors={['#8B5CF6', '#6366F1']}
            style={styles.fabGradient}
          >
            <Text style={styles.fabText}>+</Text>
          </LinearGradient>
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.6)',
    marginTop: 4,
  },
  logoutText: {
    fontSize: 14,
    color: '#8B5CF6',
  },
  list: {
    padding: 20,
    paddingBottom: 100,
  },
  empty: {
    alignItems: 'center',
    marginTop: 60,
  },
  emptyText: {
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.6)',
  },
  retryText: {
    fontSize: 14,
    color: '#8B5CF6',
    marginTop: 12,
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 20,
  },
  fabGradient: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fabText: {
    fontSize: 28,
    color: '#FFFFFF',
  },
});
