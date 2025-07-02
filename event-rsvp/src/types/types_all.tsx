export type EventType = {
  ownerId?: string;
  title: string;
  description?: string;
  location: string;
  date: string;
  card: string;
  capacity: number;
  href: string;
  slug?: string;
  attendees?: number[];
};

export type UserType = {
  id: string;
  fir_name: string;
  last_name: string;
  email: string;
  image?: string;
};

export interface EventNotification {
  id: string;
  title: string;
  description?: string;
  eventDate: string;
  location?: string;
  organizer: string;
  status: 'pending' | 'accepted' | 'declined';
}

export interface Attendee {
  id: number;
  name: string;
  avatarText: string;
}