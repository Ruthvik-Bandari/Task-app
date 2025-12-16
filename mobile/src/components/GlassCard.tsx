import React from 'react';
import { View, StyleSheet, Platform, ViewStyle } from 'react-native';
import { BlurView } from 'expo-blur';
import { glass, borderRadius, spacing, shadows } from '../theme/tokens';

interface GlassCardProps {
  children: React.ReactNode;
  preset?: 'light' | 'dark' | 'frosted';
  style?: ViewStyle;
  intensity?: number;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  preset = 'light',
  style,
  intensity = 50,
}) => {
  const glassStyle = glass[preset];

  if (Platform.OS === 'ios') {
    return (
      <BlurView
        intensity={intensity}
        tint={preset === 'dark' ? 'dark' : 'light'}
        style={[styles.container, style]}
      >
        <View style={[styles.content, { borderColor: glassStyle.borderColor }]}>
          {children}
        </View>
      </BlurView>
    );
  }

  return (
    <View
      style={[
        styles.container,
        styles.androidFallback,
        { backgroundColor: glassStyle.backgroundColor },
        style,
      ]}
    >
      <View style={[styles.content, { borderColor: glassStyle.borderColor }]}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    ...shadows.md,
  },
  androidFallback: {
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  content: {
    padding: spacing[4],
    borderWidth: 1,
    borderRadius: borderRadius.xl,
  },
});
