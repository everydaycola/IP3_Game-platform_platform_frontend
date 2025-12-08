import {useNotificationStore} from "../stores/notificationStore.ts";
import {NotificationElement} from "./NotificationElement.tsx";

export function NotificationStack() {
    const notifications = useNotificationStore((state) => state.notifications);
    return (
        notifications.map((notification) => <NotificationElement message={notification.message}/> )
    )
}