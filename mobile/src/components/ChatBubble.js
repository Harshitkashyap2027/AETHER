import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography, radius, spacing } from '../theme';

/**
 * ChatBubble — renders a single message (user or AI)
 */
export default function ChatBubble({ role, content, toolUsed }) {
  const isUser = role === 'user';

  return (
    <View style={[styles.wrapper, isUser ? styles.wrapperUser : styles.wrapperAI]}>
      {!isUser && (
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>Æ</Text>
        </View>
      )}
      <View style={[styles.bubble, isUser ? styles.bubbleUser : styles.bubbleAI]}>
        <Text style={[styles.text, isUser ? styles.textUser : styles.textAI]}>
          {content}
        </Text>
        {toolUsed && (
          <View style={styles.toolBadge}>
            <Text style={styles.toolBadgeText}>⚙ Tool executed</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    marginVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    alignItems: 'flex-end',
  },
  wrapperUser: {
    justifyContent: 'flex-end',
  },
  wrapperAI: {
    justifyContent: 'flex-start',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
    marginBottom: 2,
  },
  avatarText: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '700',
  },
  bubble: {
    maxWidth: '75%',
    borderRadius: radius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
  },
  bubbleUser: {
    backgroundColor: colors.userBubble,
    borderBottomRightRadius: radius.sm,
  },
  bubbleAI: {
    backgroundColor: colors.aiBubble,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    borderBottomLeftRadius: radius.sm,
  },
  text: {
    ...typography.body,
    lineHeight: 22,
  },
  textUser: {
    color: colors.textPrimary,
  },
  textAI: {
    color: colors.textPrimary,
  },
  toolBadge: {
    marginTop: spacing.xs,
    alignSelf: 'flex-start',
  },
  toolBadgeText: {
    ...typography.micro,
    color: colors.accentLight,
    opacity: 0.8,
  },
});
