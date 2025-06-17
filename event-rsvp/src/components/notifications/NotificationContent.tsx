"use client";
import React from 'react';
import { Bell, BellOff } from 'lucide-react';
import { NotificationItem } from './NotificationItem';
import { useNotifications } from './NotificationContext';

export const NotificationsContent: React.FC = () => {
  const { notifications, markAsRead, removeNotification } = useNotifications();
  const hasNotifications = notifications.length > 0;

  return (
    <div className="max-w-4xl mx-auto w-full px-4">
      {hasNotifications ? (
        <div className="space-y-4">
          {notifications.map(notification => (
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
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center bg-white dark:bg-gray-800 rounded-xl p-12 text-gray-500 dark:text-gray-400">
          <BellOff size={40} className="mb-4 opacity-50" />
          <p className="text-center">No notifications yet</p>
          <p className="text-center text-sm mt-1">When you get notifications, they&apos;ll appear here</p>
        </div>
      )}
    </div>
  );
};