import { useEffect, useState } from "react";
import cn from "classnames";

const notifications = [
  {
    key: "dev-survey-2022",
    html: (
      <div>
        Make your voice heard in our{" "}
        <b>
          <a href="https://bit.ly/axelar-developer-2022">1 minute survey</a>
        </b>
        !
      </div>
    ),
    start: "2022-12-12T08:00:00Z",
    end: "2023-01-12T08:00:00Z",
  },
];

const notificationKey = "dev-survey-2022";

export const Notification = () => {
  const [notification, setNotification] = useState();

  // load notification by key on component mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    loadNotification(notificationKey);
  }, []);

  function loadNotification(_notificationKey) {
    const notif = notifications.find((n) => n.key === _notificationKey);
    if (!notif) return;
    const notifIsAcknowledged = window?.localStorage?.getItem(notificationKey);
    if (notifIsAcknowledged) return;
    setNotification(notif);
  }

  function handleOnNotificationClose() {
    setNotification(null);
    window?.localStorage?.setItem(notificationKey, true);
  }

  return (
    <div
      className={cn("transition-all duration-500 max-h-0 overflow-hidden", {
        "max-h-[100px]": !!notification,
      })}
    >
      <div className="notification-info">
        <span id="notification-close" onClick={handleOnNotificationClose}>
          X
        </span>
        <span className="notification-text">{notification?.html}</span>
      </div>
    </div>
  );
};
