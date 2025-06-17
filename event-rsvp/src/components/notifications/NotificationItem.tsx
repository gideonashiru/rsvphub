/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useRef, useState } from 'react';
import { Check, X } from 'lucide-react';
import { NotificationItemProps } from './types';

// Helper function to format date
const formatTime = (date: Date): string => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days}d ago`;
  } else if (hours > 0) {
    return `${hours}h ago`;
  } else if (minutes > 0) {
    return `${minutes}m ago`;
  } else {
    return 'Just now';
  }
};

export const NotificationItem: React.FC<NotificationItemProps> = ({ 
  notification, 
  onAccept, 
  onDismiss 
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const itemRef = useRef<HTMLDivElement>(null);
  
  // Handle swipe gesture
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
    
    if (touchStartX.current && touchEndX.current) {
      const diff = touchStartX.current - touchEndX.current;
      
      // Only apply transform if swiping left
      if (diff > 0 && itemRef.current) {
        const translateX = Math.min(diff, 100);
        itemRef.current.style.transform = `translateX(-${translateX}px)`;
        itemRef.current.style.opacity = `${1 - translateX / 200}`;
      }
    }
  };

  const handleTouchEnd = () => {
    if (touchStartX.current && touchEndX.current) {
      const diff = touchStartX.current - touchEndX.current;
      
      // If swiped more than 100px, dismiss the notification
      if (diff > 100) {
        setIsDeleting(true);
        setTimeout(() => {
          onDismiss(notification.id);
        }, 300);
      } else if (itemRef.current) {
        // Reset position if not dismissed
        itemRef.current.style.transform = 'translateX(0)';
        itemRef.current.style.opacity = '1';
      }
    }
    
    // Reset touch coordinates
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const handleAccept = () => {
    setIsDeleting(true);
    setTimeout(() => {
      onAccept(notification.id);
    }, 300);
  };

  const handleDismiss = () => {
    setIsDeleting(true);
    setTimeout(() => {
      onDismiss(notification.id);
    }, 300);
  };

  return (
    <div 
      ref={itemRef}
      className={`bg-white dark:bg-gray-800 rounded-xl p-6 mb-2 shadow-lg 
                 transition-all duration-300 ease-in-out relative
                 ${notification.read ? 'opacity-70' : 'opacity-100'}
                 ${isDeleting ? 'transform -translate-x-full opacity-0' : ''}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="flex items-center">
        {/* Avatar */}
        <div className="relative mr-4 flex-shrink-0">
          {notification.avatarUrl ? (
            <img 
              src={notification.avatarUrl} 
              alt={notification.title} 
              className="w-12 h-12 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700" 
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
              <span className="text-blue-500 dark:text-blue-300 font-medium text-lg">
                {notification.title.substring(0, 2).toUpperCase()}
              </span>
            </div>
          )}
          
          {!notification.read && (
            <span className="absolute top-0 right-0 block h-3 w-3 rounded-full bg-blue-500 ring-2 ring-white dark:ring-gray-800"></span>
          )}
        </div>
        
        {/* Content */}
        <div className="flex-grow min-w-0">
          <h4 className="font-medium text-gray-900 dark:text-white text-lg truncate">{notification.title}</h4>
          {notification.message && (
            <p className="text-gray-500 dark:text-gray-400 text-base mt-1 line-clamp-2">{notification.message}</p>
          )}
          <span className="text-gray-400 dark:text-gray-500 text-sm mt-2 block">
            {formatTime(notification.timestamp)}
          </span>
        </div>
        
        {/* Action Buttons */}
        <div className="flex ml-4 space-x-2">
          <button 
            onClick={handleAccept}
            className="p-2 rounded-full bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 
                     hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors"
            aria-label="Accept"
          >
            <Check size={20} />
          </button>
          <button 
            onClick={handleDismiss}
            className="p-2 rounded-full bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 
                     hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors"
            aria-label="Dismiss"
          >
            <X size={20} />
          </button>
        </div>
      </div>
      
      {/* Swipe hint */}
      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 dark:text-gray-600 opacity-0 
                    group-hover:opacity-100 transition-opacity pointer-events-none text-sm">
        Swipe left to dismiss
      </div>
    </div>
  );
};