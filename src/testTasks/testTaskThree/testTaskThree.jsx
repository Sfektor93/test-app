import style from "./testTaskThree.module.scss";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Calendar, Button } from "antd";
import { formatDate } from "./utils/formatDateTime";
import NotificationTask from "./components/NotificationTask/NotificationTask";

const TestTaskThree = () => {
  const { calendarTasks } = useSelector((state) => state?.calendar);

  const getListData = (value) => {
    return calendarTasks.reduce((acc, item) => {
      if (formatDate(value) === item.data) {
        acc.push(item);
      }
      return acc;
    }, []);
  };

  const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.id}>{item.content}</li>
        ))}
      </ul>
    );
  };

  const cellRender = (current, info) => {
    if (info.type === "date") return dateCellRender(current);
    return info.originNode;
  };

  return (
    <>
      <NotificationTask />
      <Link to="create-task">
        <Button type="primary" size="large" className={style.addButton}>
          Добавить событие в календарь
        </Button>
      </Link>
      <Link to="task-list">
        <Button type="primary" size="large">
          Открыть список запланированных событий
        </Button>
      </Link>
      <Calendar cellRender={cellRender} />
    </>
  );
};
export default TestTaskThree;
