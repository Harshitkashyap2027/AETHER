import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, radius, spacing, typography } from '../theme';

/**
 * BentoCard — a single card in the bento dashboard grid
 */
export default function BentoCard({ icon, title, subtitle, onPress, accent, style }) {
  const accentColor = accent || colors.accent;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.75}
      style={[styles.card, style]}
    >
      <View style={[styles.iconContainer, { backgroundColor: `${accentColor}22` }]}>
        <Text style={[styles.icon, { color: accentColor }]}>{icon}</Text>
      </View>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      <View style={[styles.accentLine, { backgroundColor: accentColor }]} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.bgCard,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    borderRadius: radius.xl,
    padding: spacing.lg,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    minHeight: 140,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
    alignSelf: 'flex-start',
  },
  icon: {
    fontSize: 24,
  },
  title: {
    ...typography.title,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.caption,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  accentLine: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    borderBottomLeftRadius: radius.xl,
    borderBottomRightRadius: radius.xl,
    opacity: 0.6,
  },
});
