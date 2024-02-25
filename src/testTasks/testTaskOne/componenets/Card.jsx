import { useRef, useState, useLayoutEffect } from "react";
import { response } from "../services/response";
import style from "./Card.module.scss";

const Card = () => {
  const componentList = useRef();
  const [height, setHeight] = useState(0);

  console.log(componentList.current.clientHeight);

  useLayoutEffect(() => {
    setHeight(componentList.current.clientHeight);
  }, []);

  return (
    <>
      <div className={style.container}>
        {response.map(({ header, options, text }, index) => (
          <div className={style.card} key={header + index}>
            <h3>{header}</h3>
            <ul ref={componentList} style={{ minHeight: height + "px" }}>
              {options.map((el, index) => (
                <li key={el + index}>{el}</li>
              ))}
            </ul>
            <p>{text}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Card;
