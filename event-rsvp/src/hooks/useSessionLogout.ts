// hooks/useSessionLogout.js
"use client"
import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  username: string;
  email?: string;
}

export function useSessionLogout() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  
  // Session timeout in milliseconds (e.g., 30 minutes of inactivity)
  const SESSION_INACTIVITY_TIMEOUT = 30 * 60 * 1000;

  // Update last activity timestamp
  const updateLastActivity = useCallback(() => {
    sessionStorage.setItem('last_activity', Date.now().toString());
  }, []);

  // Check if user has a valid session cookie
  const checkSession = useCallback(async () => {
    try {
      // Check if the dummy_auth_session cookie exists by attempting to fetch protected content
      // If it fails, user is not authenticated
      const response = await fetch('/api/auth/session', {
        method: 'GET',
        credentials: 'include',
      }).catch(() => null);

      if (!response || !response.ok) {
        setUser(null);
        sessionStorage.removeItem('last_activity');
        router.push('/auth/login');
        return;
      }

      const sessionData = await response.json();
      if (sessionData.user) {
        setUser(sessionData.user);
        updateLastActivity();
      }
    } catch (error) {
      console.error('Session check error:', error);
    }
  }, [router, updateLastActivity]);

  // Initialize session check
  useEffect(() => {
    checkSession();
  }, [checkSession]);

  // Track user activity
  useEffect(() => {
    if (!user) return;

    const handleActivity = () => {
      updateLastActivity();
    };

    // Listen for user activity
    window.addEventListener('mousedown', handleActivity);
    window.addEventListener('keydown', handleActivity);
    window.addEventListener('scroll', handleActivity);
    window.addEventListener('touchstart', handleActivity);

    return () => {
      window.removeEventListener('mousedown', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      window.removeEventListener('scroll', handleActivity);
      window.removeEventListener('touchstart', handleActivity);
    };
  }, [user, updateLastActivity]);

  // Check for inactivity timeout
  useEffect(() => {
    if (!user) return;

    const checkTimeout = setInterval(() => {
      const lastActivity = sessionStorage.getItem('last_activity');
      if (lastActivity) {
        const timeSinceLastActivity = Date.now() - parseInt(lastActivity);
        if (timeSinceLastActivity > SESSION_INACTIVITY_TIMEOUT) {
          // Session expired due to inactivity
          sessionStorage.removeItem('last_activity');
          setUser(null);
          router.push('/auth/login');
        }
      }
    }, 60000); // Check every minute

    return () => clearInterval(checkTimeout);
  }, [user, router, SESSION_INACTIVITY_TIMEOUT]);
}