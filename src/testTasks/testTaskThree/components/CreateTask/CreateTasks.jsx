import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button, Form, Input, TimePicker, DatePicker, Result } from "antd";
import { addTask } from "../../../../redux/slice/calendarSlice";
import { ONE_DAY } from "../../utils/formatDateTime";
import { formatDate, formatTime } from "../../utils/formatDateTime";

const CreateTask = () => {
  const [showModalSuccess, setShowModalSucces] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    let timeout;
    if (showModalSuccess) {
      timeout = setTimeout(() => {
        navigate(-1);
      }, 5000);
    }
    if (!showModalSuccess) {
      clearTimeout(timeout);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [showModalSuccess]);

  const sendForm = ({ newTaskInputText, data, time }) => {
    const objForm = {
      id: formatTime(time[0]) + formatTime(time[0]) + Math.random(),
      content: newTaskInputText,
      data: formatDate(data),
      timeIn: formatTime(time[0]) !== formatTime(time[1]) ? formatTime(time[0]) : null,
      timeOut: formatTime(time[1]) !== formatTime(time[0]) ? formatTime(time[1]) : null,
    };

    if (objForm) {
      dispatch(addTask(objForm));
      setShowModalSucces(true);
    }
  };

  return (
    <>
      {showModalSuccess ? (
        <Result
          status="success"
          title="Задача добавлена, через 5 секунд перенесём вас обратно к календарю ;)"
          subTitle="Или можете добавить ещё одну задачу по кнопке снизу"
          extra={[
            <Button key="button" type="primary" onClick={() => setShowModalSucces(false)}>
              Добавить ещё задачу
            </Button>,
            <Button type="link" onClick={() => navigate(-1)}>
              Вернуться назад
            </Button>,
          ]}
        />
      ) : (
        <>
          <Button type="link" onClick={() => navigate(-1)}>
            Вернуться обратно
          </Button>
          <Form
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
      )}
    </>
  );
};

export default CreateTask;
