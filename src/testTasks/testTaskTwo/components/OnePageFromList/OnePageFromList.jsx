import style from "./OnePageFromList.module.scss";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getSpecification } from "../../../../redux/slice/specificationSlice";
import { Card, Button } from "antd";

const OnePageFromList = () => {
  const { status, specification } = useSelector((state) => state.specification);
  const { id } = useParams();
  const dispatch = useDispatch();
  const getInfo = (id) => dispatch(getSpecification(id));
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  useEffect(() => {
    if (!status) {
      getInfo(id);
    }
  }, []);

  return (
    <>
      {status === "rejected" ? (
        <Button
          type="primary"
          danger
          className={style.errorButton}
          onClick={() => getInfo(id)}
        >
          Ой ошибка. Кликай и она пройдёт :)
        </Button>
      ) : (
        <Card
          type="inner"
          title={specification?.name}
          size="small"
          className={style.card}
          loading={status === "loading"}
        >
          {specification?.content}
          <br />
          Стоимость работы под ключ: {specification?.price} ₽
          <br />
          <Button type="primary" onClick={goBack} className={style.backButton}>
            Вернуться к списку
          </Button>
        </Card>
      )}
    </>
  );
};

export default OnePageFromList;
