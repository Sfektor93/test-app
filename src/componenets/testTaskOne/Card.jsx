import { response } from "./response";
import style from "./Card.module.scss";

const Card = () => {
  return (
    <>
      <div className={style.container}>
        {response.map(({ header, options, text }, index) => {
          return (
            <div className={style.card} key={header + index}>
              <h3>{header}</h3>
              <ul>
                {options.map((el, index) => (
                  <li key={el + index}>{el}</li>
                ))}
              </ul>
              <p>{text}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Card;
