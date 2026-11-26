'use client';

import { useSessionLogout } from '@/hooks/useSessionLogout';
import { useEffect } from 'react';

export function SessionLogoutWrapper() {
  useSessionLogout();
  
  return null; // This component doesn't render anything
}