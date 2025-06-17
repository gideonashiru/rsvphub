"use client";
import React, { createContext, useContext, useState, useCallback } from 'react';
import { Notification, NotificationContextType, NotificationProviderProps } from './types';
import { mockNotifications } from './mockData';

// Create context with a default value
const NotificationContext = createContext<NotificationContextType>({
  notifications: [],
  markAsRead: () => {},
  removeNotification: () => {},
  clearAllNotifications: () => {},
  addNotification: () => {},
});

// Create a provider component
export const NotificationProvider: React.FC<NotificationProviderProps> = ({ 
  children, 
  initialNotifications = mockNotifications 
}) => {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);

  // Mark a notification as read
  const markAsRead = useCallback((id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true } 
          : notification
      )
    );
  }, []);

  // Remove a notification
  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  }, []);

  // Clear all notifications
  const clearAllNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  // Add a new notification
  const addNotification = useCallback((notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Math.random().toString(36).substring(2, 11),
      timestamp: new Date(),
      read: false,
    };
    
    setNotifications(prev => [newNotification, ...prev]);
  }, []);

  return (
    <NotificationContext.Provider 
      value={{ 
        notifications, 
        markAsRead, 
        removeNotification, 
        clearAllNotifications,
        addNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

// Create a custom hook for using the notification context
export const useNotifications = () => useContext(NotificationContext);