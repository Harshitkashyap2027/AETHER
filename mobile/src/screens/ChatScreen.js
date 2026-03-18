import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { v4 as uuidv4 } from 'uuid';
import ChatBubble from '../components/ChatBubble';
import TypingIndicator from '../components/TypingIndicator';
import { sendMessage } from '../services/api';
import { colors, spacing, radius, typography } from '../theme';

export default function ChatScreen() {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      content: "Hello, I'm AETHER — your AI Operating System. I think, execute, and evolve. What shall we accomplish today?",
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId] = useState(() => uuidv4());
  const flatListRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
  }, []);

  const handleSend = useCallback(async () => {
    const text = inputText.trim();
    if (!text || isTyping) return;

    const userMessage = { id: uuidv4(), role: 'user', content: text };
    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    try {
      const response = await sendMessage(text, sessionId);
      const aiMessage = {
        id: uuidv4(),
        role: 'assistant',
        content: response.message,
        toolUsed: response.toolUsed,
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      const errorMessage = {
        id: uuidv4(),
        role: 'assistant',
        content: `⚠️ Error: ${err.message}. Please check your connection.`,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
      setTimeout(scrollToBottom, 100);
    }
  }, [inputText, isTyping, sessionId, scrollToBottom]);

  const renderItem = useCallback(
    ({ item }) => (
      <ChatBubble role={item.role} content={item.content} toolUsed={item.toolUsed} />
    ),
    []
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.statusDot} />
          <View>
            <Text style={styles.headerTitle}>AETHER</Text>
            <Text style={styles.headerSub}>AI Operating System</Text>
          </View>
        </View>
      </View>

      {/* Message list */}
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.messageList}
          onContentSizeChange={scrollToBottom}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={isTyping ? <TypingIndicator /> : null}
        />

        {/* Input bar */}
        <View style={styles.inputBar}>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Message AETHER..."
            placeholderTextColor={colors.textMuted}
            multiline
            maxLength={2000}
            returnKeyType="default"
            onSubmitEditing={Platform.OS === 'ios' ? undefined : handleSend}
          />
          <TouchableOpacity
            onPress={handleSend}
            disabled={!inputText.trim() || isTyping}
            style={[
              styles.sendButton,
              (!inputText.trim() || isTyping) && styles.sendButtonDisabled,
            ]}
            activeOpacity={0.7}
          >
            {isTyping ? (
              <ActivityIndicator size="small" color={colors.textPrimary} />
            ) : (
              <Text style={styles.sendIcon}>↑</Text>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.separator,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.success,
    marginRight: spacing.xs,
  },
  headerTitle: {
    ...typography.title,
    color: colors.textPrimary,
    letterSpacing: 2,
  },
  headerSub: {
    ...typography.micro,
    color: colors.textSecondary,
    letterSpacing: 0.5,
    marginTop: 1,
  },
  messageList: {
    paddingVertical: spacing.md,
    paddingBottom: spacing.lg,
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.separator,
    gap: spacing.sm,
    backgroundColor: colors.bg,
  },
  input: {
    flex: 1,
    backgroundColor: colors.bgInput,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    borderRadius: radius.xl,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    ...typography.body,
    color: colors.textPrimary,
    maxHeight: 120,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: colors.bgCardHover,
  },
  sendIcon: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '700',
  },
});
