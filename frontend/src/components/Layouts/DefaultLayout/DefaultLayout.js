import { Outlet } from "react-router-dom";
import React from "react";
import styles from "./DefaultLayout.module.scss";

import Header from "../../Header/Header";
import SideMenu from "../../SideMenu/SideMenu";

function DefaultLayout() {
  return (
    <div className={styles.wrapper}>
      <SideMenu />
      <div className={styles.holder}>
        <Header />

        <Outlet />
      </div>
    </div>
  );
}

export default DefaultLayout;
