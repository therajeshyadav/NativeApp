import { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
  TextInput,
  Dimensions,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../src/context/AuthContext';
import { userAPI } from '../src/services/api';
import socketService from '../src/services/socket';

const { width, height } = Dimensions.get('window');
const isSmallScreen = width < 375;
const isMediumScreen = width >= 375 && width < 768;
const isLargeScreen = width >= 768;

export default function Home() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState(new Set());
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    loadUsers();
    setupSocketListeners();

    return () => {
      socketService.off('user:status', handleUserStatus);
    };
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(u =>
        u.username.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [searchQuery, users]);

  const setupSocketListeners = () => {
    socketService.on('user:status', handleUserStatus);
  };

  const handleUserStatus = (data) => {
    setOnlineUsers((prev) => {
      const newSet = new Set(prev);
      if (data.isOnline) {
        newSet.add(data.userId);
      } else {
        newSet.delete(data.userId);
      }
      return newSet;
    });
  };

  const loadUsers = async () => {
    try {
      const response = await userAPI.getUsers();
      setUsers(response.data);
      setFilteredUsers(response.data);
      
      const online = new Set(
        response.data.filter(u => u.isOnline).map(u => u._id)
      );
      setOnlineUsers(online);
    } catch (error) {
      console.error('Error loading users:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadUsers();
    setRefreshing(false);
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive',
          onPress: async () => {
            const result = await logout();
            if (result.success) {
              // Use setTimeout to ensure state is cleared before navigation
              setTimeout(() => {
                router.replace('/login');
              }, 100);
            }
          }
        }
      ]
    );
  };

  const formatLastMessage = (lastMessage) => {
    if (!lastMessage) return 'Tap to start chatting';
    const text = lastMessage.content;
    return text.length > 35 ? text.substring(0, 35) + '...' : text;
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    
    if (diff < 60000) return 'now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h`;
    const days = Math.floor(diff / 86400000);
    if (days < 7) return `${days}d`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getAvatarColor = (username) => {
    const colors = ['#3B82F6', '#8B5CF6', '#EC4899', '#F59E0B', '#10B981', '#06B6D4', '#EF4444', '#6366F1'];
    const index = username.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const renderUser = ({ item }) => {
    const isOnline = onlineUsers.has(item._id) || item.isOnline;
    const avatarColor = getAvatarColor(item.username);
    
    return (
      <TouchableOpacity
        style={styles.userItem}
        onPress={() => router.push(`/chat/${item._id}`)}
        activeOpacity={0.7}
      >
        <View style={styles.avatarContainer}>
          <View style={[styles.avatar, { backgroundColor: avatarColor }]}>
            <Text style={styles.avatarText}>
              {item.username.charAt(0).toUpperCase()}
            </Text>
          </View>
          {isOnline && <View style={styles.onlineDot} />}
        </View>
        
        <View style={styles.userDetails}>
          <View style={styles.userHeader}>
            <Text style={styles.username}>{item.username}</Text>
            {item.lastMessage && (
              <Text style={styles.timestamp}>
                {formatTime(item.lastMessage.createdAt)}
              </Text>
            )}
          </View>
          <Text style={styles.lastMessage}>
            {formatLastMessage(item.lastMessage)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.headerTitle}>Messages</Text>
          <View style={styles.headerButtons}>
            <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.searchButton}>
              <Ionicons name="search-outline" size={22} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogout} style={styles.headerLogoutButton}>
              <Ionicons name="log-out-outline" size={22} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
        
        {searchQuery.length > 0 && (
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#6B7280"
              autoFocus
            />
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Text style={styles.clearIcon}>✕</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <FlatList
        data={filteredUsers}
        renderItem={renderUser}
        keyExtractor={(item) => item._id}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh}
            tintColor="#3B82F6"
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyEmoji}>👥</Text>
            <Text style={styles.emptyText}>No users found</Text>
          </View>
        }
      />
      
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={20} color="#FFFFFF" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F2937',
    maxWidth: isLargeScreen ? 600 : '100%',
    alignSelf: 'center',
    width: '100%',
  },
  header: {
    backgroundColor: '#1F2937',
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 20,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  searchButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#374151',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerLogoutButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EF4444',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchIcon: {
    fontSize: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#374151',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 48,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#FFFFFF',
  },
  clearIcon: {
    fontSize: 20,
    color: '#9CA3AF',
    padding: 4,
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  onlineDot: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#10B981',
    borderWidth: 3,
    borderColor: '#1F2937',
  },
  userDetails: {
    flex: 1,
  },
  userHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  username: {
    fontSize: 17,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  timestamp: {
    fontSize: 13,
    color: '#6B7280',
  },
  lastMessage: {
    fontSize: 15,
    color: '#9CA3AF',
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
    color: '#6B7280',
  },
  logoutButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#EF4444',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  logoutText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
});
