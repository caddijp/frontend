import antdNotification from "antd/lib/notification";
import React from "react";

type NotificationType = "success" | "info" | "warning" | "error" | "default";
type NotificationProps = {
  type: NotificationType;
  message: React.ReactNode;
  description?: React.ReactNode;
  duration?: number;
};

const notification = {
  open: (props: NotificationProps): void => {
    const attr = {
      message: props.message,
      description: props.description,
      duration: props.duration,
    };
    switch (props.type) {
      case "success":
        antdNotification.success(attr);
        return;
      case "info":
        antdNotification.info(attr);
        return;
      case "warning":
        antdNotification.warning(attr);
        return;
      case "error":
        antdNotification.error(attr);
        return;
      case "default":
      default:
        antdNotification.open(attr);
    }
  },
};

export default notification;
export { notification };
export type { NotificationProps };
