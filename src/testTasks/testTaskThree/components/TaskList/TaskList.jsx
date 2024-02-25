import style from "./TaskList.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { List as ListAntd, Button, Form, Input, DatePicker, TimePicker } from "antd";
import { removeTask, editTask as edit } from "../../../../redux/slice/calendarSlice";
import { useRef, useState } from "react";
import { ONE_DAY } from "../../utils/formatDateTime";
import { formatDate, formatTime } from "../../utils/formatDateTime";
import dayjs from "dayjs";

const TaskList = () => {
  const [editTask, setEditTask] = useState(false);
  const idTask = useRef("0");
  const { calendarTasks } = useSelector((state) => state?.calendar);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleteTask = (id) => dispatch(removeTask(id));

  const [editObj] = calendarTasks.filter((item) => item.id === idTask.current);
  const fields = [
    {
      name: "newTaskInputText",
      value: editObj?.content,
    },
    {
      name: "data",
      value: dayjs(editObj?.data),
    },
    {
      name: "time",
      value: [
        dayjs(`${editObj?.data} ${editObj?.timeIn || ""}`),
        dayjs(`${editObj?.data} ${editObj?.timeOut || ""}`),
      ],
    },
  ];

  const sendForm = ({ newTaskInputText, data, time }) => {
    const objForm = {
      id: formatTime(time[0]),
      content: newTaskInputText,
      data: formatDate(data),
      timeIn: formatTime(time[0]) !== formatTime(time[1]) ? formatTime(time[0]) : null,
      timeOut: formatTime(time[1]) !== formatTime(time[0]) ? formatTime(time[1]) : null,
    };

    if (objForm) {
      dispatch(edit(objForm));
      setEditTask(false);
    }
  };

  return (
    <>
      <Link to="/calendar/create-task">
        <Button type="primary" size="large" style={{ marginBottom: 40 }}>
          Добавить событие в календарь
        </Button>
      </Link>
      <Button type="link" onClick={() => navigate(-1)}>
        Вернуться к календарю назад
      </Button>
      {editTask ? (
        <>
          <Button type="link" onClick={() => setEditTask(false)}>
            Вернуться обратно
          </Button>
          <Form
            fields={fields}
            name="newTaskForm"
            onFinish={sendForm}
            style={{ maxWidth: 600, marginTop: "50px", marginLeft: "150px" }}
            validateMessages={{
              required: "Это поле обязательно к заполнению",
            }}
          >
            <Form.Item
              name={"newTaskInputText"}
              label="Задача"
              rules={[{ required: true }]}
            >
              <Input autoFocus placeholder="Task" />
            </Form.Item>
            <Form.Item name={"data"} label="Дата" rules={[{ required: true }]}>
              <DatePicker
                type="data"
                disabledDate={(current) =>
                  current && current?.valueOf() < Date.now() - ONE_DAY
                }
              />
            </Form.Item>
            <Form.Item name={"time"} label="Время выполнения задачи">
              <TimePicker.RangePicker showTime={{ format: "HH:mm" }} type="time" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Сохранить задачу
              </Button>
            </Form.Item>
          </Form>
        </>
      ) : (
        <ListAntd
          size="small"
          bordered
          dataSource={calendarTasks}
          pagination={{ defaultPageSize: 5, size: "small" }}
          renderItem={(item) => (
            <ListAntd.Item className={style.list} key={item.id}>
              Задача: {item.content}
              <br />
              Дата: {item.data}
              <br />
              {item.timeIn ? `Начало в ${item.timeIn}` : null}
              {item.timeOut ? `. Надо успеть закончить в ${item.timeOut}` : null}
              <div className={style.blockButton}>
                <Button
                  className={style.deleteButton}
                  onClick={() => deleteTask(item.id)}
                >
                  Удалить
                </Button>
                <Button
                  onClick={() => {
                    idTask.current = item.id;
                    return setEditTask(true);
                  }}
                >
                  Редактировать
                </Button>
              </div>
            </ListAntd.Item>
          )}
        />
      )}
    </>
  );
};

export default TaskList;
