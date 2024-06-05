import styles from "./SideMenu.module.scss";
import React, { useState } from "react";

import { ReactComponent as IconHome } from "../../images/svg/icon-home.svg";
import { ReactComponent as IconEvent } from "../../images/svg/icon-calendar.svg";
// import { ReactComponent as IconStudents } from "../../images/svg/icon-student.svg";
import { ReactComponent as IconTeachers } from "../../images/svg/icon-teacher.svg";
import { ReactComponent as IconUser } from "../../images/svg/icon-user.svg";
import { NavLink } from "react-router-dom";
import classNames from "classnames";
import LanguageSwitch from "../LanguageSwitch/LanguageSwitch";
import { useSelector } from "react-redux";

function SideMenuStudent() {
  const [isCross, setIsCross] = useState(true);

  const messages = useSelector((state) => state.locale.messages);

  const setActive = ({ isActive }) =>
    isActive
      ? `${styles.sideMenu_nav_button} ${styles.active_link}`
      : styles.sideMenu_nav_button;

  const handleClick = () => {
    setIsCross(!isCross);
  };

  return (
    <div
      className={classNames(styles.sideMenu, { [styles.deactivate]: isCross })}
    >
      <div
        className={classNames(styles.sideMenu_menuIcon, {
          [styles.cross]: !isCross,
        })}
        onClick={handleClick}
      >
        <div className={styles.sideMenu_menuIcon_bar}></div>
        <div className={styles.sideMenu_menuIcon_bar}></div>
        <div className={styles.sideMenu_menuIcon_bar}></div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 50 }}>
        <div className={styles.sideMenu_header}>
          <div
            className={classNames(styles.sideMenu_header_logo, {
              [styles.active]: !isCross,
            })}
          >
            <h3>S</h3>
          </div>
          <h3
            className={classNames(styles.sideMenu_header_title, {
              [styles.active]: !isCross,
            })}
          >
            Alina School
          </h3>
        </div>
        <nav className={styles.sideMenu_nav}>
          {/* <NavLink className={setActive} to="/dashboard">
            <IconHome className={styles.sideMenu_nav_button_icon} />
            <h5>{messages.Dashboard}</h5>
          </NavLink> */}

          {/* <NavLink className={setActive} to="/students">
            <IconStudents className={styles.sideMenu_nav_button_icon} />
            <h5>{messages.Students}</h5>
          </NavLink> */}

          <NavLink className={setActive} to="/teachers">
            <IconTeachers className={styles.sideMenu_nav_button_icon} />
            <h5>{messages.Teachers}</h5>
          </NavLink>

          <NavLink className={setActive} to="/event">
            <IconEvent className={styles.sideMenu_nav_button_icon} />
            <h5>{messages.Events}</h5>
          </NavLink>

          <NavLink className={setActive} to="/user">
            <IconUser className={styles.sideMenu_nav_button_icon} />
            <h5>{messages.User}</h5>
          </NavLink>
        </nav>
      </div>

      <div
        className={classNames(styles.sideMenu_control, {
          [styles.active]: isCross,
        })}
      >
        <LanguageSwitch />
      </div>
    </div>
  );
}

export default SideMenuStudent;
