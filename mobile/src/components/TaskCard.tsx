import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { GlassCard } from './GlassCard';
import { Task } from '../types';

interface TaskCardProps {
  task: Task;
  onPress: () => void;
  onToggle: () => void;
}

const priorityColors = {
  LOW: '#10B981',
  MEDIUM: '#F59E0B',
  HIGH: '#EF4444',
};

export const TaskCard: React.FC<TaskCardProps> = ({ task, onPress, onToggle }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <GlassCard style={styles.card}>
        <View style={styles.row}>
          <TouchableOpacity onPress={onToggle} style={styles.checkbox}>
            <View style={[styles.checkboxInner, task.completed && styles.checked]} />
          </TouchableOpacity>
          <View style={styles.content}>
            <Text style={[styles.title, task.completed && styles.completedText]}>
              {task.title}
            </Text>
            {task.description && (
              <Text style={styles.description} numberOfLines={2}>
                {task.description}
              </Text>
            )}
            <View style={styles.footer}>
              <View style={[styles.priority, { backgroundColor: priorityColors[task.priority] }]}>
                <Text style={styles.priorityText}>{task.priority}</Text>
              </View>
            </View>
          </View>
        </View>
      </GlassCard>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  checkboxInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  checked: {
    backgroundColor: '#8B5CF6',
  },
  content: {
    flex: 1,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  completedText: {
    textDecorationLine: 'line-through',
    opacity: 0.6,
  },
  description: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14,
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
  },
  priority: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  priorityText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
});
