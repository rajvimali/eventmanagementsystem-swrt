import React, { useEffect, useState } from "react";
import { onMessageListener } from "../firebase";

const NotificationHandler = () => {
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    onMessageListener().then((payload) => {
      setNotification({
        title: payload.notification.title,
        body: payload.notification.body,
      });
    });
  }, []);

  return (
    <div>
      {notification && (
        <div className="notification">
          <h4>{notification.title}</h4>
          <p>{notification.body}</p>
        </div>
      )}
    </div>
  );
};

export default NotificationHandler;
