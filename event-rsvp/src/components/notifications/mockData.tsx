import { Notification } from './types';

// Create a function to generate unique timestamps within the last 24 hours
const getRandomTimestamp = (): Date => {
  const now = new Date();
  const hoursAgo = Math.floor(Math.random() * 24);
  const minutesAgo = Math.floor(Math.random() * 60);
  now.setHours(now.getHours() - hoursAgo);
  now.setMinutes(now.getMinutes() - minutesAgo);
  return now;
};

export const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Sarah Johnson',
    message: 'Sent you a friend request',
    timestamp: getRandomTimestamp(),
    read: false,
    avatarUrl: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
    type: 'info',
  },
  {
    id: '2',
    title: 'Michael Smith',
    message: 'Mentioned you in a comment',
    timestamp: getRandomTimestamp(),
    read: false,
    avatarUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
    type: 'info',
  },
  {
    id: '3',
    title: 'App Update Available',
    message: 'Version 2.0 is ready to install',
    timestamp: getRandomTimestamp(),
    read: true,
    type: 'info',
  },
  {
    id: '4',
    title: 'Jessica Williams',
    message: 'Liked your recent post',
    timestamp: getRandomTimestamp(),
    read: false,
    avatarUrl: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    type: 'success',
  },
  {
    id: '5',
    title: 'David Brown',
    message: 'Shared a document with you',
    timestamp: getRandomTimestamp(),
    read: false,
    avatarUrl: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150',
    type: 'info',
  },
  {
    id: '6',
    title: 'Event Reminder',
    message: 'Team meeting in 30 minutes',
    timestamp: getRandomTimestamp(),
    read: false,
    type: 'warning',
  },
  {
    id: '7',
    title: 'Emily Davis',
    message: 'Sent you a message',
    timestamp: getRandomTimestamp(),
    read: true,
    avatarUrl: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    type: 'info',
  },
  {
    id: '8',
    title: 'Michael Chen',
    message: 'Your account was accessed from a new device',
    timestamp: getRandomTimestamp(),
    read: false,
    avatarUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
    type: 'warning',
  },
  {
    id: '9',
    title: 'Sophie Turner',
    message: 'Upload completed successfully',
    timestamp: getRandomTimestamp(),
    read: true,
    avatarUrl: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150',
    type: 'success',
  },
  {
    id: '10',
    title: 'Daniel Lee',
    message: 'Failed to sync your files',
    timestamp: getRandomTimestamp(),
    read: false,
    avatarUrl: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150',
    type: 'error',
  },
  {
    id: '11',
    title: 'Isabella Garcia',
    message: 'Reminder: Meeting at 3 PM today',
    timestamp: getRandomTimestamp(),
    read: true,
    avatarUrl: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    type: 'info',
  },
  {
    id: '12',
    title: 'Lucas Smith',
    message: 'Your password was changed successfully',
    timestamp: getRandomTimestamp(),
    read: false,
    avatarUrl: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=150',
    type: 'success',
  }
];