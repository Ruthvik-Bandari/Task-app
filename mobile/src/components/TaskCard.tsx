import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Task } from '../types';
import { GlassCard } from './GlassCard';
import {
  colors,
  spacing,
  typography,
  borderRadius,
  priorityColors,
} from '../theme/tokens';

interface TaskCardProps {
  task: Task;
  onPress: () => void;
  onToggleComplete: () => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onPress,
  onToggleComplete,
}) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <GlassCard preset="light" style={styles.container}>
        <View style={styles.content}>
          <Pressable
            onPress={onToggleComplete}
            style={styles.checkbox}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <View
              style={[
                styles.checkboxInner,
                task.completed && styles.checkboxChecked,
              ]}
            >
              {task.completed && (
                <Ionicons name="checkmark" size={14} color={colors.neutral[0]} />
              )}
            </View>
          </Pressable>

          <View style={styles.textContainer}>
            <Text
              style={[styles.title, task.completed && styles.completedText]}
              numberOfLines={1}
            >
              {task.title}
            </Text>
            
            {task.description && (
              <Text style={styles.description} numberOfLines={2}>
                {task.description}
              </Text>
            )}

            <View style={styles.metaRow}>
              {task.dueDate && (
                <View style={[styles.badge, isOverdue && styles.overdueBadge]}>
                  <Ionicons
                    name="calendar-outline"
                    size={12}
                    color={isOverdue ? colors.error : colors.neutral[500]}
                  />
                  <Text
                    style={[styles.badgeText, isOverdue && styles.overdueText]}
                  >
                    {formatDate(task.dueDate)}
                  </Text>
                </View>
              )}

              <View
                style={[
                  styles.priorityBadge,
                  { backgroundColor: `${priorityColors[task.priority]}20` },
                ]}
              >
                <View
                  style={[
                    styles.priorityDot,
                    { backgroundColor: priorityColors[task.priority] },
                  ]}
                />
                <Text
                  style={[
                    styles.priorityText,
                    { color: priorityColors[task.priority] },
                  ]}
                >
                  {task.priority}
                </Text>
              </View>
            </View>
          </View>

          <Ionicons
            name="chevron-forward"
            size={20}
            color={colors.neutral[400]}
          />
        </View>
      </GlassCard>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing[3],
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    marginRight: spacing[3],
  },
  checkboxInner: {
    width: 24,
    height: 24,
    borderRadius: borderRadius.md,
    borderWidth: 2,
    borderColor: colors.neutral[300],
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: colors.primary[500],
    borderColor: colors.primary[500],
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: typography.fontSizes.base,
    fontWeight: typography.fontWeights.semibold,
    color: colors.neutral[900],
    marginBottom: spacing[1],
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: colors.neutral[400],
  },
  description: {
    fontSize: typography.fontSizes.sm,
    color: colors.neutral[500],
    marginBottom: spacing[2],
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[1],
    paddingHorizontal: spacing[2],
    paddingVertical: spacing[1],
    backgroundColor: colors.neutral[100],
    borderRadius: borderRadius.sm,
  },
  overdueBadge: {
    backgroundColor: `${colors.error}15`,
  },
  badgeText: {
    fontSize: typography.fontSizes.xs,
    color: colors.neutral[500],
  },
  overdueText: {
    color: colors.error,
  },
  priorityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[1],
    paddingHorizontal: spacing[2],
    paddingVertical: spacing[1],
    borderRadius: borderRadius.sm,
  },
  priorityDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  priorityText: {
    fontSize: typography.fontSizes.xs,
    fontWeight: typography.fontWeights.medium,
    textTransform: 'capitalize',
  },
});
