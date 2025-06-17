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

export type NotificationType = {
  id: string;
  title: string;
  content: string;
  date: string;
  read: boolean;
  userId: string;
};
