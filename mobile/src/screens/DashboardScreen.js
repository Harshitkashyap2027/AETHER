import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  StatusBar,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BentoCard from '../components/BentoCard';
import { colors, spacing, typography } from '../theme';

const BENTO_ITEMS = [
  {
    id: 'chat',
    icon: '💬',
    title: 'AI Chat',
    subtitle: 'Converse with AETHER intelligence',
    accent: '#7C6DF8',
    flex: 1,
    screen: 'Chat',
  },
  {
    id: 'actions',
    icon: '⚙️',
    title: 'Actions',
    subtitle: 'Execute tasks & automate workflows',
    accent: '#30D158',
    flex: 1,
    screen: 'Chat',
  },
  {
    id: 'insights',
    icon: '📊',
    title: 'Insights',
    subtitle: 'Analytics & performance metrics',
    accent: '#FF9F0A',
    flex: 2,
    screen: 'Chat',
  },
  {
    id: 'memory',
    icon: '🧠',
    title: 'Memory',
    subtitle: 'Persistent context & history',
    accent: '#64D2FF',
    flex: 1,
    screen: 'Chat',
  },
  {
    id: 'tools',
    icon: '🛠',
    title: 'Tools',
    subtitle: 'System commands & integrations',
    accent: '#FF375F',
    flex: 1,
    screen: 'Chat',
  },
];

export default function DashboardScreen({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Animated.View
          style={[
            styles.header,
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
          ]}
        >
          <View>
            <Text style={styles.greeting}>Good morning</Text>
            <Text style={styles.title}>AETHER</Text>
            <Text style={styles.subtitle}>AI Operating System</Text>
          </View>
          <View style={styles.statusBadge}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>Online</Text>
          </View>
        </Animated.View>

        {/* Bento Grid */}
        <Animated.View
          style={[
            styles.bentoGrid,
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
          ]}
        >
          {/* Row 1 */}
          <View style={styles.row}>
            <BentoCard
              icon={BENTO_ITEMS[0].icon}
              title={BENTO_ITEMS[0].title}
              subtitle={BENTO_ITEMS[0].subtitle}
              accent={BENTO_ITEMS[0].accent}
              style={styles.cardHalf}
              onPress={() => navigation?.navigate(BENTO_ITEMS[0].screen)}
            />
            <BentoCard
              icon={BENTO_ITEMS[1].icon}
              title={BENTO_ITEMS[1].title}
              subtitle={BENTO_ITEMS[1].subtitle}
              accent={BENTO_ITEMS[1].accent}
              style={styles.cardHalf}
              onPress={() => navigation?.navigate(BENTO_ITEMS[1].screen)}
            />
          </View>

          {/* Row 2 - full width */}
          <BentoCard
            icon={BENTO_ITEMS[2].icon}
            title={BENTO_ITEMS[2].title}
            subtitle={BENTO_ITEMS[2].subtitle}
            accent={BENTO_ITEMS[2].accent}
            style={styles.cardFull}
            onPress={() => navigation?.navigate(BENTO_ITEMS[2].screen)}
          />

          {/* Row 3 */}
          <View style={styles.row}>
            <BentoCard
              icon={BENTO_ITEMS[3].icon}
              title={BENTO_ITEMS[3].title}
              subtitle={BENTO_ITEMS[3].subtitle}
              accent={BENTO_ITEMS[3].accent}
              style={styles.cardHalf}
              onPress={() => navigation?.navigate(BENTO_ITEMS[3].screen)}
            />
            <BentoCard
              icon={BENTO_ITEMS[4].icon}
              title={BENTO_ITEMS[4].title}
              subtitle={BENTO_ITEMS[4].subtitle}
              accent={BENTO_ITEMS[4].accent}
              style={styles.cardHalf}
              onPress={() => navigation?.navigate(BENTO_ITEMS[4].screen)}
            />
          </View>
        </Animated.View>

        {/* Footer tagline */}
        <Text style={styles.tagline}>Think. Execute. Evolve.</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  scrollContent: {
    paddingBottom: spacing.xxl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.xl,
  },
  greeting: {
    ...typography.caption,
    color: colors.textMuted,
    letterSpacing: 0.5,
    marginBottom: spacing.xs,
  },
  title: {
    ...typography.h2,
    color: colors.textPrimary,
    letterSpacing: 3,
  },
  subtitle: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.bgCard,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    borderRadius: 20,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
    gap: spacing.xs,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.success,
  },
  statusText: {
    ...typography.micro,
    color: colors.textSecondary,
  },
  bentoGrid: {
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  cardHalf: {
    flex: 1,
  },
  cardFull: {
    width: '100%',
  },
  tagline: {
    ...typography.caption,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: spacing.xl,
    letterSpacing: 2,
  },
});
