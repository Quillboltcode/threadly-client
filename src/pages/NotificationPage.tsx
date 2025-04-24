import React, { useState, useEffect } from 'react';
import { FiBell, FiCheckCircle, FiAlertCircle, FiInfo, FiX } from 'react-icons/fi';
import { io, Socket } from 'socket.io-client';
import { useAuth } from '../contexts/AuthContext';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'like' | 'comment' | 'post_edit' | 'post_delete';
  read: boolean;
  timestamp: Date;
  postId?: string;
}
// Map to type notify

const NotificationPage: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  const {  user } = useAuth();
  
  console.log(socket)
  useEffect(() => {
    // Request permission for browser notifications
    if ("Notification" in window) {
      Notification.requestPermission();
    }

    // Connect to socket server
    const socketConnection = io(import.meta.env.VITE_APP_UPLOAD, {
      withCredentials: true, // Required the same as http sever socket io
    });
    setSocket(socketConnection);
    // Get user ID from auth context/local storage
    const userId = user?._id;
    if (userId) {
      socketConnection.emit('user_connected', userId);
    }
    // Listen for notifications
    socketConnection.on('notification', (serverNotification: any) => {
      const clientNotification: Notification = {
        id: serverNotification.id || Math.random().toString(36).substr(2, 9),
        title: serverNotification.title || "New Notification", // Fallback
        message: serverNotification.message,
        type: serverNotification.type,
        read: serverNotification.read,
        timestamp: serverNotification.createdAt || new Date(),
        postId: serverNotification.postId
      };
      addNotification(clientNotification);
    });
    socketConnection.on('connect_error', (err) => {
      console.error('Socket connection error:', err);
    });
    // Clean up socket connection
    return () => {
      socketConnection.disconnect();
    };
  }, []);

  const addNotification = (notification: Notification) => {
    setNotifications(prev => [notification, ...prev]);
  };

  const showBrowserNotification = (notification: Notification) => {
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification(notification.title, {
        body: notification.message
      });
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(n => ({ ...n, read: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const filteredNotifications = showUnreadOnly
    ? notifications.filter(n => !n.read)
    : notifications;

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success': return <FiCheckCircle className="w-5 h-5 text-green-500" />;
      case 'error': return <FiAlertCircle className="w-5 h-5 text-red-500" />;
      case 'info': return <FiInfo className="w-5 h-5 text-blue-500" />;
      default: return <FiInfo className="w-5 h-5 text-blue-500" />;
    }
  };

  const formatTimestamp = (date: Date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // For demo purposes - add a sample notification
  const addSampleNotification = () => {
    const types = ['success', 'error', 'info'];
    const type = types[Math.floor(Math.random() * types.length)] as 'success' | 'error' | 'info';
    const newNotification: Notification = {
      id: Math.random().toString(36).substr(2, 9),
      title: `Sample ${type} notification`,
      message: `This is a sample ${type} notification message for testing purposes.`,
      type,
      read: false,
      timestamp: new Date()
    };
    addNotification(newNotification);
    showBrowserNotification(newNotification);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-gray-900 text-white p-4 shadow-md">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold flex items-center">
            <FiBell className="mr-2" /> Notifications
            {unreadCount > 0 && (
              <span className="ml-2 bg-blue-600 text-white text-xs rounded-full px-2 py-1">
                {unreadCount}
              </span>
            )}
          </h1>
          <div className="flex space-x-4">
            <button
              onClick={markAllAsRead}
              className="text-sm bg-gray-800 hover:bg-gray-700 px-3 py-1 rounded"
            >
              Mark all as read
            </button>
            <button
              onClick={clearAllNotifications}
              className="text-sm bg-gray-800 hover:bg-gray-700 px-3 py-1 rounded"
            >
              Clear all
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto flex-grow p-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={showUnreadOnly}
                  onChange={() => setShowUnreadOnly(!showUnreadOnly)}
                  className="form-checkbox h-4 w-4 text-blue-600 rounded"
                />
                <span className="ml-2 text-gray-700 dark:text-gray-300">Show unread only</span>
              </label>
            </div>
            <button
              onClick={addSampleNotification}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
            >
              Create Test Notification
            </button>
          </div>

          {/* Notifications list */}
          <div className="space-y-4">
            {filteredNotifications.length === 0 ? (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                No notifications to display
              </div>
            ) : (
              filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`border rounded-lg p-4 flex relative ${notification.read
                      ? 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                      : 'bg-white dark:bg-gray-700 border-blue-200 dark:border-blue-800'
                    }`}
                >
                  <div className="mr-4 pt-1">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {notification.title}
                        {!notification.read && (
                          <span className="ml-2 bg-blue-600 text-white text-xs rounded-full px-2 py-0.5">
                            New
                          </span>
                        )}
                      </h3>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {formatTimestamp(notification.timestamp)}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mt-1">
                      {notification.message}
                    </p>
                    <div className="mt-2 flex space-x-2">
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          Mark as read
                        </button>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => deleteNotification(notification.id)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 p-4 text-center text-sm">
        Notification System © 2025
      </footer>
    </div>
  );
};

export default NotificationPage;