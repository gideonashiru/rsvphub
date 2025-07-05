"use client";

import React, { useEffect, useState } from "react";
import {
  Check,
  X,
  Calendar,
  Clock,
  MapPin,
  User as UserIcon,
  Bell,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { EventNotification } from "@/types/types_all";
import { acceptInvite, declineInvite, getUserInvites, getUserNamefromId } from "@/lib/actions/client-events";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function NotisPage({ user }: any) {
  const [notifications, setNotifications] = useState<EventNotification[]>([]);
  const [username, setUsername] = useState<string | null>("Unknown User");


  useEffect(() => {
  const fetchNotifications = async () => {
    try {
      const fresh = await getUserInvites(user?.id);
      const userName = await getUserNamefromId(user?.id);
      setUsername(userName);

      // Load existing session-stored notifications
      const cachedRaw = sessionStorage.getItem("cached-notifications");
      const cached: EventNotification[] = cachedRaw ? JSON.parse(cachedRaw) : [];

      // Merge fresh ones only if they're new (based on ID)
      const combined = [...cached];
      for (const notif of fresh) {
        if (!combined.find((n) => n.id === notif.id)) {
          combined.push(notif);
        }
      }

      setNotifications(combined);
      sessionStorage.setItem("cached-notifications", JSON.stringify(combined));
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    }
  };

  fetchNotifications();
}, [user?.id]);


  const handleAccept = async (notificationId: string) => {
  setNotifications((prev) => {
    const updated = prev.map((notification) =>
      notification.id === notificationId
        ? { ...notification, status: "accepted" as const }
        : notification
    );

    // Update sessionStorage
    sessionStorage.setItem("cached-notifications", JSON.stringify(updated));
    return updated;
  });

  const notification = notifications.find((n) => n.id === notificationId);
  if (notification) {
    await acceptInvite(user?.id, notification);
  }
};

const handleDecline = async (notificationId: string) => {
  setNotifications((prev) => {
    const updated = prev.map((notification) =>
      notification.id === notificationId
        ? { ...notification, status: "declined" as const }
        : notification
    );

    // Update sessionStorage
    sessionStorage.setItem("cached-notifications", JSON.stringify(updated));
    return updated;
  });

  const notification = notifications.find((n) => n.id === notificationId);
  if (notification) {
    await declineInvite(user?.id, notification.id);
  }
};


  const getStatusBadge = (status: string) => {
    switch (status) {
      case "accepted":
        return (
          <Badge className="gap-1 bg-green-100 text-green-800 hover:bg-green-100/80">
            <CheckCircle2 className="w-3 h-3" />
            Accepted
          </Badge>
        );
      case "declined":
        return (
          <Badge variant="destructive" className="gap-1">
            <XCircle className="w-3 h-3" />
            Declined
          </Badge>
        );
      default:
        return (
          <Badge className="gap-1 bg-yellow-100 text-yellow-800 hover:bg-yellow-100/80">
            <Clock className="w-3 h-3" />
            Pending
          </Badge>
        );
    }
  };

  const getOrganizerInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };


  const getFormatedDate = (dateString: string) => {
    const [startStr, endStr] = dateString.split(" - ");
    const start = new Date(startStr);
    const end = new Date(endStr);

    const formatOpts: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    };

    const startFormatted = start.toLocaleString("en-US", formatOpts);
    const endFormatted = end.toLocaleString("en-US", formatOpts);

    return `${startFormatted} – ${endFormatted}`;
  };

  const pendingNotifications = notifications.filter(
    (n) => n.status === "pending"
  );
  const respondedNotifications = notifications.filter(
    (n) => n.status !== "pending"
  );

  return (
    <div className="min-h-screen mt-50">
      <div className="container max-w-4xl mx-auto px-4 py-8">
        {/* Header */}

        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-primary rounded-xl shadow-lg">
            <Bell className="w-8 h-8 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-foreground">
              Event Notifications
            </h1>
            <p className="text-muted-foreground text-lg">
              Welcome back, {username}! You have {pendingNotifications.length}{" "}
              pending invitations.
            </p>
          </div>
        </div>

        {/* Pending Notifications */}
        {pendingNotifications.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 bg-accent rounded-full animate-pulse"></div>
              <h2 className="text-2xl font-semibold text-foreground">
                Pending Invitations
              </h2>
              <Badge variant="secondary">{pendingNotifications.length}</Badge>
            </div>

            <div className="space-y-4">
              {pendingNotifications.map((notification) => (
                <Card
                  key={notification.id}
                  className="hover:shadow-lg transition-all duration-300 border-l-4"
                >
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2">
                          {notification.title}
                        </CardTitle>
                        <CardDescription className="text-base leading-relaxed">
                          {notification.description}
                        </CardDescription>
                      </div>
                      {getStatusBadge(notification.status)}
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="w-6 h-6 text-primary" />

                        <span className="font-medium">
                          {getFormatedDate(notification.eventDate)}
                        </span>
                      </div>
                      {notification.location && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="w-4 h-4 text-primary" />
                          <span className="font-medium">
                            {notification.location}
                          </span>
                        </div>
                      )}
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <Avatar className="w-7 h-7">
                          <AvatarFallback className="text-xs bg-primary/10 text-primary">
                            {getOrganizerInitials(notification.organizer)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">
                          Organized by {notification.organizer}
                        </span>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex gap-3 pt-2">
                      <Button
                        onClick={() => handleAccept(notification.id)}
                        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 cursor-pointer"
                        size="sm"
                      >
                        <Check className="w-4 h-4" />
                        Accept
                      </Button>
                      <Button
                        onClick={() => handleDecline(notification.id)}
                        variant="destructive"
                        className="flex items-center gap-2 cursor-pointer"
                        size="sm"
                      >
                        <X className="w-4 h-4" />
                        Decline
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Responded Notifications */}
        {respondedNotifications.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-2xl font-semibold text-foreground">
                Recent Responses
              </h2>
              <Badge variant="outline">{respondedNotifications.length}</Badge>
            </div>

            <div className="space-y-4">
              {respondedNotifications.map((notification) => (
                <Card
                  key={notification.id}
                  className="opacity-75 hover:opacity-100 transition-opacity duration-200"
                >
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-1">
                          {notification.title}
                        </CardTitle>
                        <CardDescription className="text-sm">
                          {notification.description}
                        </CardDescription>
                      </div>
                      {getStatusBadge(notification.status)}
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3 h-3" />
                        <span>{notification.eventDate}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Avatar className="w-7 h-7">
                          <AvatarFallback className="text-xs bg-muted">
                            {getOrganizerInitials(notification.organizer)}
                          </AvatarFallback>
                        </Avatar>
                        <span>{notification.organizer}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {notifications.length === 0 && (
          <Card className="text-center py-12">
            <CardContent className="pt-6">
              <Bell className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <CardTitle className="text-xl mb-2">
                No notifications yet
              </CardTitle>
              <CardDescription>
                When you receive event invitations, they&apos;ll appear here.
              </CardDescription>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
