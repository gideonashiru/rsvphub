import { NotificationProvider } from "@/components/notifications/NotificationContext";
import { NotificationsContent} from "@/components/notifications/NotificationContent";


export default function Notification() {
  return (
    <div>
      <div className="container flex flex-col sm:flex-row justify-between items-start sm:items-center font-play mt-40 ">
        <h4 className="flex flex-col inline text-3xl font-semibold font-montserrat ml-16 border">
          NOTIFICATIONS
        </h4>
      <NotificationProvider>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl text-center mb-8">Accept / decline invites to events here</h1>
          <NotificationsContent />
        </div>
      </NotificationProvider>

      </div>
    </div>
  );
}
