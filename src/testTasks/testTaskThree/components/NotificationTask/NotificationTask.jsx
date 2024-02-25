import { notification } from "antd";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { nowTime } from "../../utils/formatDateTime";

const NotificationTask = () => {
  const [api, contextHolder] = notification.useNotification();
  const { calendarTasks } = useSelector((state) => state.calendar);

  useEffect(() => {
    const interval = setInterval(() => {
      for (let value of calendarTasks) {
        if (nowTime() === value.timeIn) {
          openNotification(value.content, value.timeIn, value.timeOut);
        }
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const openNotification = (content, timeIn, timeOut) => {
    api.open({
      message: "Напоминание",
      description: `У вас запланированна задача: "${content}" с ${timeIn} до ${timeOut}`,
      duration: 10,
    });
  };
  return <>{contextHolder}</>;
};
export default NotificationTask;
