"use client";
import React, { useState, useEffect } from 'react';
import { X, Bell, BellOff } from 'lucide-react';
import { NotificationItem } from './NotificationItem';
import { useNotifications } from './NotificationContext';
import { NotificationsPanelProps } from './types';

export const NotificationsPanel: React.FC<NotificationsPanelProps> = ({ 
  className = '', 
  maxHeight = '70vh',
  onClose,
  title = 'Notifications'
}) => {
  const { notifications, markAsRead, removeNotification, clearAllNotifications } = useNotifications();
  const [isVisible, setIsVisible] = useState(true);
  const hasNotifications = notifications.length > 0;

  // Close animation before actual unmounting
  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      if (onClose) onClose();
    }, 300);
  };

  // Mark all as read when opened
  useEffect(() => {
    const unreadNotifications = notifications.filter(n => !n.read);
    if (unreadNotifications.length > 0) {
      // Delay marking as read for visual effect
      const timer = setTimeout(() => {
        unreadNotifications.forEach(n => markAsRead(n.id));
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [notifications, markAsRead]);

  return (
    <div 
      className={`fixed inset-0 z-50 md:relative md:inset-auto
                 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}
                 transition-opacity duration-300 ease-in-out ${className}`}
    >
      {/* Backdrop overlay (only on mobile) */}
      <div 
        className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      {/* Main panel */}
      <div 
        className={`absolute top-0 right-0 w-full md:w-96 h-full md:h-auto md:max-h-${maxHeight}
                   bg-gray-50 dark:bg-gray-900 backdrop-blur-lg bg-opacity-95 dark:bg-opacity-95
                   shadow-2xl rounded-l-2xl md:rounded-2xl md:m-2 overflow-hidden
                   flex flex-col transform transition-transform duration-300 ease-in-out
                   ${isVisible ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
            <Bell size={18} className="mr-2" />
            {title}
          </h2>
          <div className="flex gap-2">
            {hasNotifications && (
              <button 
                onClick={clearAllNotifications}
                className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              >
                Clear all
              </button>
            )}
            <button 
              onClick={handleClose}
              className="p-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400
                       hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>
        </div>
        
        {/* Notification list */}
        <div className="flex-1 overflow-y-auto p-4 overscroll-contain">
          {hasNotifications ? (
            notifications.map(notification => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onAccept={(id) => {
                  markAsRead(id);
                  removeNotification(id);
                }}
                onDismiss={(id) => {
                  removeNotification(id);
                }}
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400 py-12">
              <BellOff size={40} className="mb-4 opacity-50" />
              <p className="text-center">No notifications yet</p>
              <p className="text-center text-sm mt-1">When you get notifications, they&apos;ll appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};