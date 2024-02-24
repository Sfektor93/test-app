import style from "./testTaskTwo.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { getList } from "../../redux/slice/listSlice";
import List from "./components/List/List";
import { Button } from "antd";

const TestTaskTwo = () => {
  const { status } = useSelector((state) => state.list);

  const dispatch = useDispatch();
  const updateData = () => dispatch(getList());

  return (
    <div className={style.listWrapper}>
      {status === "rejected" ? (
        <Button type="primary" danger className={style.errorButton} onClick={updateData}>
          Произошла ошибка. Кликай и она пройдёт :)
        </Button>
      ) : (
        <List />
      )}
    </div>
  );
};

export default TestTaskTwo;
