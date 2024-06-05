import styles from "./SideMenuMobile.module.scss";
import React from "react";

import { ReactComponent as IconEvent } from "../../../images/svg/icon-calendar.svg";
import { ReactComponent as IconStudents } from "../../../images/svg/icon-student.svg";
import { ReactComponent as IconTeachers } from "../../../images/svg/icon-teacher.svg";
import { ReactComponent as IconUser } from "../../../images/svg/icon-user.svg";
import { NavLink } from "react-router-dom";
import classNames from "classnames";
// import LanguageSwitch from "../../LanguageSwitch/LanguageSwitch";
// import { useSelector } from "react-redux";

function SideMenuMobile({ student = false }) {
  // const messages = useSelector((state) => state.locale.messages);

  const setActive = ({ isActive }) =>
    isActive
      ? `${styles.sideMenu_nav_button} ${styles.active_link}`
      : styles.sideMenu_nav_button;

  return (
    <div className={classNames(styles.sideMenu)}>
      {/* <div className={styles.sideMenu_header}></div> */}
      {/* <div className={classNames(styles.sideMenu_logo)}>
        <h3>S</h3>
      </div> */}

      <nav className={styles.sideMenu_nav}>
        {student ? (
          <NavLink className={setActive} to="/teachers">
            <IconTeachers className={styles.sideMenu_nav_button_icon} />
          </NavLink>
        ) : (
          <NavLink className={setActive} to="/students">
            <IconStudents className={styles.sideMenu_nav_button_icon} />
          </NavLink>
        )}

        <NavLink className={setActive} to="/event">
          <IconEvent className={styles.sideMenu_nav_button_icon} />
        </NavLink>

        <NavLink className={setActive} to="/user">
          <IconUser className={styles.sideMenu_nav_button_icon} />
        </NavLink>
      </nav>

      {/* <div className={classNames(styles.sideMenu_control)}>
        <LanguageSwitch />
      </div> */}
    </div>
  );
}

export default SideMenuMobile;
