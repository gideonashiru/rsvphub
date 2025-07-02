import { EventNotification } from "@/types/types_all";

// Mock data for demonstration
export const mockNotifications: EventNotification[] = [
  {
    id: '1',
    title: 'Team Building Workshop',
    description: 'Join us for an interactive team building session designed to enhance collaboration and communication skills. We\'ll have fun activities, games, and networking opportunities.',
    eventDate: '2025-01-25',
    location: 'Conference Room A, 15th Floor',
    organizer: 'Sarah Johnson',
    status: 'pending'
  },
  {
    id: '2',
    title: 'Product Launch Meeting',
    description: 'Important meeting to discuss the upcoming product launch strategy, marketing initiatives, and timeline coordination.',
    eventDate: '2025-01-28',
    location: 'Main Auditorium',
    organizer: 'Michael Chen',
    status: 'pending'
  },
  {
    id: '3',
    title: 'Monthly All-Hands',
    description: 'Monthly company-wide meeting featuring updates from all departments, Q&A session, and announcements about upcoming initiatives.',
    eventDate: '2025-01-30',
    location: 'Virtual Meeting (Zoom)',
    organizer: 'Emma Wilson',
    status: 'pending'
  }
];