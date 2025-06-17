import { ReactNode } from 'react';

export interface Notification {
  id: string;
  title: string;
  message?: string;
  timestamp: Date;
  read: boolean;
  avatarUrl?: string;
  // Optional additional properties
  type?: 'info' | 'warning' | 'error' | 'success';
  actionUrl?: string;
}

export interface NotificationContextType {
  notifications: Notification[];
  markAsRead: (id: string) => void;
  removeNotification: (id: string) => void;
  clearAllNotifications: () => void;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
}

export interface NotificationProviderProps {
  children: ReactNode;
  initialNotifications?: Notification[];
}

export interface NotificationsPanelProps {
  className?: string;
  maxHeight?: string;
  onClose?: () => void;
  title?: string;
}

export interface NotificationItemProps {
  notification: Notification;
  onAccept: (id: string) => void;
  onDismiss: (id: string) => void;
}