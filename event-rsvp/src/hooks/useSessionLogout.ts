// hooks/useSessionLogout.js
"use client"
import { useEffect, useState, useCallback } from 'react';
import { createClient } from '@/lib/client';
import { useRouter } from 'next/navigation';

export function useSessionLogout() {
  const supabase = createClient();
  const [user, setUser] = useState<import('@supabase/supabase-js').User | null>(null);
  const router = useRouter();
  
  // Session timeout in milliseconds (e.g., 30 minutes)
  const SESSION_TIMEOUT = 30 * 60 * 1000;

  // Update last activity timestamp
  const updateLastActivity = useCallback(() => {
    sessionStorage.setItem('last_activity', Date.now().toString());
  }, []);

  // Get user data properly
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      if (user) {
        updateLastActivity();
      }
    };
    
    getUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        
        if (event === 'SIGNED_IN' && session) {
          updateLastActivity();
        } else if (event === 'SIGNED_OUT') {
          sessionStorage.removeItem('last_activity');
          router.push('/login');
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [supabase, router, updateLastActivity]);

  // Track user activity
  useEffect(() => {
    if (!user) return;

    const activities = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    
    const resetTimeout = () => {
      updateLastActivity();
    };

    // Add event listeners for user activity
    activities.forEach(activity => {
      document.addEventListener(activity, resetTimeout, true);
    });

    return () => {
      activities.forEach(activity => {
        document.removeEventListener(activity, resetTimeout, true);
      });
    };
  }, [user, updateLastActivity]);

  // Check for session timeout
  useEffect(() => {
    if (!user) return;

    const checkSessionTimeout = () => {
      const lastActivity = sessionStorage.getItem('last_activity');
      
      if (!lastActivity) {
        // No last activity recorded, log out
        supabase.auth.signOut();
        return;
      }

      const timeSinceLastActivity = Date.now() - parseInt(lastActivity);
      
      if (timeSinceLastActivity > SESSION_TIMEOUT) {
        // Session expired, log out
        supabase.auth.signOut();
      }
    };

    // Check every 60 seconds
    const interval = setInterval(checkSessionTimeout, 60000);

    return () => {
      clearInterval(interval);
    };
  }, [user, supabase, SESSION_TIMEOUT]);
}