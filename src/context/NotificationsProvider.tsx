import { InfoCircleTwoTone, WarningTwoTone } from "@ant-design/icons";
import { notification } from "antd";
import React, { ReactNode } from "react";

const NotificationContext = React.createContext<{
   info: (message: string, description?: string, duration?: number) => void;
   warning: (message: string, description?: string, duration?: number) => void;
   error: (message: string, description?: string, duration?: number) => void;
}>({
   info: () => {},
   warning: () => {},
   error: () => {},
});

export const NotificationsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
   const [api, contextHolder] = notification.useNotification();

   const info = (message: string, description?: string, duration: number = 3) => {
      api.open({
         icon: <InfoCircleTwoTone />,
         message,
         description,
         duration,
      });
   };

   const warning = (message: string, description?: string, duration: number = 3) => {
      api.open({
         icon: <WarningTwoTone twoToneColor="yellow" />,
         message,
         description,
         duration,
      });
   };

   const error = (message: string, description?: string, duration: number = 3) => {
      api.open({
         icon: <WarningTwoTone twoToneColor="red" />,
         message,
         description,
         duration,
      });
   };

   return (
      <NotificationContext.Provider
         value={{
            info,
            warning,
            error,
         }}
      >
         {contextHolder}
         {children}
      </NotificationContext.Provider>
   );
};

export const useNotifications = () => React.useContext(NotificationContext);
