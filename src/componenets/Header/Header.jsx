import style from "./Header.module.scss";
import { NavLink, Outlet } from "react-router-dom";

const setActiveColorLink = ({ isActive }) => ({ color: isActive && "white" });

const Header = () => (
  <>
    <header className={style.header}>
      <NavLink className={style.title} style={setActiveColorLink} to="/">
        Task 1
      </NavLink>
      <NavLink className={style.title} style={setActiveColorLink} to="/services">
        Task 2
      </NavLink>
      <NavLink className={style.title} style={setActiveColorLink} to="/calendar">
        Task 3
      </NavLink>
    </header>

    <Outlet />
  </>
);

export default Header;
