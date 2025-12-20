import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTask, useDeleteTask, useToggleTaskComplete } from '../hooks/useTasks';
import { Button } from '../components';

const priorityColors = {
  LOW: '#10B981',
  MEDIUM: '#F59E0B',
  HIGH: '#EF4444',
};

export const TaskDetailScreen = ({ route, navigation }: any) => {
  const { taskId } = route.params;
  const { data: task, isLoading } = useTask(taskId);
  const deleteTask = useDeleteTask();
  const toggleComplete = useToggleTaskComplete();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteTask.mutateAsync(taskId);
              navigation.goBack();
            } catch (error: any) {
              Alert.alert('Error', 'Failed to delete task');
            }
          },
        },
      ]
    );
  };

  const handleToggleComplete = async () => {
    try {
      await toggleComplete.mutateAsync(taskId);
    } catch (error: any) {
      Alert.alert('Error', 'Failed to update task');
    }
  };

  if (isLoading) {
    return (
      <LinearGradient colors={['#1a1a2e', '#16213e']} style={styles.loading}>
        <ActivityIndicator size="large" color="#8B5CF6" />
      </LinearGradient>
    );
  }

  if (!task) {
    return (
      <LinearGradient colors={['#1a1a2e', '#16213e']} style={styles.loading}>
        <Text style={styles.errorText}>Task not found</Text>
        <Button title="Go Back" onPress={() => navigation.goBack()} />
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={['#1a1a2e', '#16213e']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDelete}>
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content}>
          <View style={styles.titleSection}>
            <TouchableOpacity
              style={[styles.checkbox, task.completed && styles.checkboxChecked]}
              onPress={handleToggleComplete}
            >
              {task.completed && <Text style={styles.checkmark}>✓</Text>}
            </TouchableOpacity>
            <Text style={[styles.title, task.completed && styles.completedTitle]}>
              {task.title}
            </Text>
          </View>

          <View style={styles.badgesRow}>
            <View style={[styles.badge, { backgroundColor: priorityColors[task.priority] + '30' }]}>
              <View style={[styles.badgeDot, { backgroundColor: priorityColors[task.priority] }]} />
              <Text style={[styles.badgeText, { color: priorityColors[task.priority] }]}>
                {task.priority}
              </Text>
            </View>
          </View>

          {task.description && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Description</Text>
              <Text style={styles.description}>{task.description}</Text>
            </View>
          )}

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Created</Text>
            <Text style={styles.dateText}>{formatDate(task.createdAt)}</Text>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <Button
            title={task.completed ? 'Mark Incomplete' : 'Mark Complete'}
            onPress={handleToggleComplete}
            loading={toggleComplete.isPending}
          />
        </View>
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
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  backText: {
    color: '#8B5CF6',
    fontSize: 16,
  },
  deleteText: {
    color: '#EF4444',
    fontSize: 16,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  titleSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  checkboxChecked: {
    backgroundColor: '#8B5CF6',
    borderColor: '#8B5CF6',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  title: {
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  completedTitle: {
    textDecorationLine: 'line-through',
    opacity: 0.6,
  },
  badgesRow: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  badgeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  badgeText: {
    fontSize: 14,
    fontWeight: '600',
  },
  section: {
    marginBottom: 20,
    padding: 16,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#FFFFFF',
    lineHeight: 24,
  },
  dateText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  footer: {
    padding: 20,
  },
});
