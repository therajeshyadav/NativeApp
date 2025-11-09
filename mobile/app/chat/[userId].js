import { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useAuth } from '../../src/context/AuthContext';
import { conversationAPI } from '../../src/services/api';
import socketService from '../../src/services/socket';

const { width, height } = Dimensions.get('window');
const isSmallScreen = width < 375;
const isMediumScreen = width >= 375 && width < 768;
const isLargeScreen = width >= 768;

export default function Chat() {
  const { userId } = useLocalSearchParams();
  const { user } = useAuth();
  const router = useRouter();
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [otherUser, setOtherUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const flatListRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  // Route protection
  useEffect(() => {
    if (!user) {
      router.replace('/login');
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      loadMessages();
      setupSocketListeners();
    }

    return () => {
      socketService.off('message:new', handleNewMessage);
      socketService.off('message:sent', handleMessageSent);
      socketService.off('message:status', handleMessageStatus);
      socketService.off('typing:start', handleTypingStart);
      socketService.off('typing:stop', handleTypingStop);
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [userId, user]);

  const setupSocketListeners = () => {
    socketService.on('message:new', handleNewMessage);
    socketService.on('message:sent', handleMessageSent);
    socketService.on('message:status', handleMessageStatus);
    socketService.on('typing:start', handleTypingStart);
    socketService.on('typing:stop', handleTypingStop);
  };

  const loadMessages = async () => {
    try {
      setLoading(true);
      const response = await conversationAPI.getMessages(userId);
      setMessages(response.data);
      
      response.data.forEach((msg) => {
        if (msg.recipient._id === user._id && msg.status !== 'read') {
          socketService.markAsRead(msg._id);
        }
      });

      if (response.data.length > 0) {
        const firstMsg = response.data[0];
        const other = firstMsg.sender._id === user._id 
          ? firstMsg.recipient 
          : firstMsg.sender;
        setOtherUser(other);
      }
    } catch (error) {
      console.error('Error loading messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNewMessage = (message) => {
    if (message.sender._id === userId || message.recipient._id === userId) {
      setMessages((prev) => [...prev, message]);
      
      socketService.markAsDelivered(message._id);
      socketService.markAsRead(message._id);
      
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  const handleMessageSent = (message) => {
    setMessages((prev) => [...prev, message]);
    setSending(false);
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const handleMessageStatus = ({ messageId, status }) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg._id === messageId ? { ...msg, status } : msg
      )
    );
  };

  const handleTypingStart = (data) => {
    if (data.userId === userId) {
      setIsTyping(true);
    }
  };

  const handleTypingStop = (data) => {
    if (data.userId === userId) {
      setIsTyping(false);
    }
  };

  const handleInputChange = (text) => {
    setInputText(text);

    if (text.length > 0) {
      socketService.startTyping(userId);
      
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      
      typingTimeoutRef.current = setTimeout(() => {
        socketService.stopTyping(userId);
      }, 2000);
    } else {
      socketService.stopTyping(userId);
    }
  };

  const sendMessage = () => {
    if (inputText.trim().length === 0 || sending) return;

    setSending(true);
    socketService.sendMessage(userId, inputText.trim());
    setInputText('');
    socketService.stopTyping(userId);
    
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'sent':
        return '✓';
      case 'delivered':
        return '✓✓';
      case 'read':
        return '✓✓';
      default:
        return '';
    }
  };

  const getAvatarColor = (username) => {
    const colors = ['#3B82F6', '#8B5CF6', '#EC4899', '#F59E0B', '#10B981', '#06B6D4', '#EF4444', '#6366F1'];
    const index = username.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const renderMessage = ({ item }) => {
    const isMine = item.sender._id === user._id;
    const isRead = item.status === 'read';

    return (
      <View style={[styles.messageContainer, isMine && styles.myMessageContainer]}>
        <View style={[styles.messageBubble, isMine && styles.myMessageBubble]}>
          <Text style={[styles.messageText, isMine && styles.myMessageText]}>
            {item.content}
          </Text>
          <View style={styles.messageFooter}>
            <Text style={[styles.timestamp, isMine && styles.myTimestamp]}>
              {new Date(item.createdAt).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
            {isMine && (
              <Text style={[styles.statusIcon, isRead && styles.readIcon]}>
                {getStatusIcon(item.status)}
              </Text>
            )}
          </View>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3B82F6" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        
        <View style={styles.headerCenter}>
          {otherUser && (
            <View style={[styles.headerAvatar, { backgroundColor: getAvatarColor(otherUser.username) }]}>
              <Text style={styles.headerAvatarText}>
                {otherUser.username.charAt(0).toUpperCase()}
              </Text>
            </View>
          )}
          <View>
            <Text style={styles.headerTitle}>
              {otherUser?.username || 'Chat'}
            </Text>
            {isTyping && <Text style={styles.typingIndicator}>typing...</Text>}
          </View>
        </View>
        
        <TouchableOpacity style={styles.searchButton}>
          <Text style={styles.searchIcon}>🔍</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.messagesList}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyEmoji}>💬</Text>
            <Text style={styles.emptyText}>No messages yet</Text>
            <Text style={styles.emptySubtext}>Start the conversation!</Text>
          </View>
        }
      />

      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.attachButton}>
          <Text style={styles.attachIcon}>📎</Text>
        </TouchableOpacity>
        
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={handleInputChange}
          placeholder="Message"
          placeholderTextColor="#6B7280"
          multiline
          maxLength={1000}
        />
        
        <TouchableOpacity
          style={[styles.sendButton, (!inputText.trim() || sending) && styles.sendButtonDisabled]}
          onPress={sendMessage}
          disabled={!inputText.trim() || sending}
        >
          {sending ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text style={styles.sendButtonText}>➤</Text>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F2937',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1F2937',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    paddingTop: 50,
    backgroundColor: '#1F2937',
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 28,
    color: '#3B82F6',
  },
  headerCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginLeft: 8,
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerAvatarText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  typingIndicator: {
    fontSize: 12,
    color: '#3B82F6',
    fontStyle: 'italic',
    marginTop: 2,
  },
  searchButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#374151',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchIcon: {
    fontSize: 18,
  },
  messagesList: {
    padding: 16,
    flexGrow: 1,
  },
  messageContainer: {
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  myMessageContainer: {
    alignItems: 'flex-end',
  },
  messageBubble: {
    maxWidth: isLargeScreen ? 400 : width * 0.7,
    padding: 12,
    borderRadius: 18,
    backgroundColor: '#374151',
  },
  myMessageBubble: {
    backgroundColor: '#3B82F6',
    borderBottomRightRadius: 4,
  },
  messageText: {
    fontSize: 16,
    color: '#FFFFFF',
    lineHeight: 22,
  },
  myMessageText: {
    color: '#FFFFFF',
  },
  messageFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 4,
  },
  timestamp: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  myTimestamp: {
    color: '#E5E7EB',
  },
  statusIcon: {
    fontSize: 12,
    color: '#E5E7EB',
  },
  readIcon: {
    color: '#10B981',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#9CA3AF',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#6B7280',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#1F2937',
    borderTopWidth: 1,
    borderTopColor: '#374151',
    alignItems: 'center',
  },
  attachButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#374151',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  attachIcon: {
    fontSize: 20,
  },
  input: {
    flex: 1,
    backgroundColor: '#374151',
    borderRadius: 24,
    paddingHorizontal: 18,
    paddingVertical: 10,
    marginRight: 8,
    maxHeight: 100,
    fontSize: 16,
    color: '#FFFFFF',
  },
  sendButton: {
    width: 44,
    height: 44,
    backgroundColor: '#3B82F6',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#4B5563',
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontSize: 24,
  },
});
