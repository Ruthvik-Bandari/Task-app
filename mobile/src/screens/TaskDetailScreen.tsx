import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTask, useDeleteTask, useToggleTaskComplete } from '../hooks/useTasks';
import { GlassCard, Button } from '../components';
import {
  colors,
  spacing,
  typography,
  borderRadius,
  priorityColors,
  statusColors,
} from '../theme/tokens';

export const TaskDetailScreen = ({ route, navigation }: any) => {
  const { taskId } = route.params;
  const { data: task, isLoading } = useTask(taskId);
  const deleteTask = useDeleteTask();
  const toggleComplete = useToggleTaskComplete();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task? This action cannot be undone.',
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
              Alert.alert('Error', error.message || 'Failed to delete task');
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
      Alert.alert('Error', error.message || 'Failed to update task');
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary[500]} />
      </View>
    );
  }

  if (!task) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Task not found</Text>
        <Button title="Go Back" onPress={() => navigation.goBack()} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={colors.neutral[900]} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Task Details</Text>
        <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
          <Ionicons name="trash-outline" size={22} color={colors.error} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
        <View style={styles.titleSection}>
          <TouchableOpacity
            style={[
              styles.checkbox,
              task.completed && styles.checkboxChecked,
            ]}
            onPress={handleToggleComplete}
          >
            {task.completed && (
              <Ionicons name="checkmark" size={18} color={colors.neutral[0]} />
            )}
          </TouchableOpacity>
          <Text
            style={[styles.title, task.completed && styles.completedTitle]}
          >
            {task.title}
          </Text>
        </View>

        <View style={styles.badgesRow}>
          <View
            style={[
              styles.badge,
              { backgroundColor: `${priorityColors[task.priority]}20` },
            ]}
          >
            <View
              style={[
                styles.badgeDot,
                { backgroundColor: priorityColors[task.priority] },
              ]}
            />
            <Text
              style={[styles.badgeText, { color: priorityColors[task.priority] }]}
            >
              {task.priority} Priority
            </Text>
          </View>

          <View
            style={[
              styles.badge,
              { backgroundColor: `${statusColors[task.status]}20` },
            ]}
          >
            <Text
              style={[styles.badgeText, { color: statusColors[task.status] }]}
            >
              {task.status.replace('_', ' ')}
            </Text>
          </View>
        </View>

        {task.description && (
          <GlassCard preset="light" style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons
                name="document-text-outline"
                size={18}
                color={colors.neutral[500]}
              />
              <Text style={styles.sectionTitle}>Description</Text>
            </View>
            <Text style={styles.description}>{task.description}</Text>
          </GlassCard>
        )}

        {task.dueDate && (
          <GlassCard preset="light" style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons
                name="calendar-outline"
                size={18}
                color={colors.neutral[500]}
              />
              <Text style={styles.sectionTitle}>Due Date</Text>
            </View>
            <Text style={styles.dateText}>{formatDate(task.dueDate)}</Text>
          </GlassCard>
        )}

        <GlassCard preset="light" style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons
              name="time-outline"
              size={18}
              color={colors.neutral[500]}
            />
            <Text style={styles.sectionTitle}>Activity</Text>
          </View>
          <View style={styles.activityItem}>
            <Text style={styles.activityLabel}>Created</Text>
            <Text style={styles.activityValue}>{formatDate(task.createdAt)}</Text>
          </View>
          <View style={styles.activityItem}>
            <Text style={styles.activityLabel}>Last Updated</Text>
            <Text style={styles.activityValue}>{formatDate(task.updatedAt)}</Text>
          </View>
        </GlassCard>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title={task.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
          onPress={handleToggleComplete}
          variant={task.completed ? 'outline' : 'primary'}
          loading={toggleComplete.isPending}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral[50],
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.neutral[0],
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing[4],
    backgroundColor: colors.neutral[0],
  },
  errorText: {
    fontSize: typography.fontSizes.lg,
    color: colors.neutral[500],
    marginBottom: spacing[4],
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing[4],
    paddingTop: spacing[16],
    paddingBottom: spacing[4],
    backgroundColor: colors.neutral[0],
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[100],
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.semibold,
    color: colors.neutral[900],
  },
  deleteButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing[4],
  },
  titleSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing[4],
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: borderRadius.md,
    borderWidth: 2,
    borderColor: colors.neutral[300],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing[3],
    marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: colors.primary[500],
    borderColor: colors.primary[500],
  },
  title: {
    flex: 1,
    fontSize: typography.fontSizes['2xl'],
    fontWeight: typography.fontWeights.bold,
    color: colors.neutral[900],
  },
  completedTitle: {
    textDecorationLine: 'line-through',
    color: colors.neutral[400],
  },
  badgesRow: {
    flexDirection: 'row',
    gap: spacing[2],
    marginBottom: spacing[4],
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
    borderRadius: borderRadius.full,
    gap: spacing[2],
  },
  badgeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  badgeText: {
    fontSize: typography.fontSizes.sm,
    fontWeight: typography.fontWeights.medium,
  },
  section: {
    marginBottom: spacing[3],
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
    marginBottom: spacing[2],
  },
  sectionTitle: {
    fontSize: typography.fontSizes.sm,
    fontWeight: typography.fontWeights.semibold,
    color: colors.neutral[600],
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  description: {
    fontSize: typography.fontSizes.base,
    color: colors.neutral[700],
    lineHeight: 24,
  },
  dateText: {
    fontSize: typography.fontSizes.base,
    color: colors.neutral[700],
  },
  activityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing[2],
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[100],
  },
  activityLabel: {
    fontSize: typography.fontSizes.sm,
    color: colors.neutral[500],
  },
  activityValue: {
    fontSize: typography.fontSizes.sm,
    color: colors.neutral[700],
    fontWeight: typography.fontWeights.medium,
  },
  footer: {
    padding: spacing[4],
    backgroundColor: colors.neutral[0],
    borderTopWidth: 1,
    borderTopColor: colors.neutral[100],
  },
});
