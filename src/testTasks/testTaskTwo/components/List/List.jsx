import style from "./List.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { List as ListAntd } from "antd";
import { getSpecification } from "../../../../redux/slice/specificationSlice";
import { Link } from "react-router-dom";

const List = () => {
  const { list, status } = useSelector((state) => state.list);
  const dispatch = useDispatch();

  const getInfo = (id) => dispatch(getSpecification(id));

  return (
    <ListAntd
      size="small"
      bordered
      loading={status === "loading"}
      dataSource={list}
      pagination={{ defaultPageSize: 4, size: "small" }}
      renderItem={(item) => (
        <ListAntd.Item className={style.list}>
          Вид ремонта: {item.name}
          <br />
          Цена: {item.price} ₽
          <br />
          <Link
            className={style.infoButton}
            onClick={() => getInfo(item.id)}
            to={`/services/${item.id}`}
          >
            Открыть описание услуги
          </Link>
        </ListAntd.Item>
      )}
    />
  );
};

export default List;
