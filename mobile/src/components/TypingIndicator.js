import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { colors, spacing } from '../theme';

const DOT_SIZE = 8;
const DOTS = [0, 1, 2];

/**
 * TypingIndicator — animated bouncing dots shown while AETHER is thinking
 */
export default function TypingIndicator() {
  const animations = useRef(DOTS.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    const sequence = DOTS.map((i) =>
      Animated.sequence([
        Animated.delay(i * 150),
        Animated.loop(
          Animated.sequence([
            Animated.timing(animations[i], {
              toValue: -6,
              duration: 350,
              useNativeDriver: true,
            }),
            Animated.timing(animations[i], {
              toValue: 0,
              duration: 350,
              useNativeDriver: true,
            }),
          ])
        ),
      ])
    );

    const animation = Animated.parallel(sequence);
    animation.start();
    return () => animation.stop();
  }, [animations]);

  return (
    <View style={styles.wrapper}>
      <View style={styles.bubble}>
        {DOTS.map((i) => (
          <Animated.View
            key={i}
            style={[
              styles.dot,
              { transform: [{ translateY: animations[i] }] },
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    marginVertical: spacing.xs,
    alignItems: 'flex-end',
  },
  bubble: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.aiBubble,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    borderRadius: 20,
    borderBottomLeftRadius: 4,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    gap: 6,
  },
  dot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    backgroundColor: colors.textSecondary,
  },
});
