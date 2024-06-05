import { useLocation, useOutlet } from "react-router-dom";
import React, { useEffect, useState } from "react";
import styles from "./DefaultLayout.module.scss";
import Header from "../../Header/Header";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import "./PageAnimation.css";
import { routes } from "../../../router/router";
import SideMenu from "../../SideMenu/SideMenu";
import SideMenuMobile from "../../SideMenu/SideMenuMobile/SideMenuMobile";

function AdminLayout() {
  const location = useLocation();
  const currentOutlet = useOutlet();

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const { nodeRef } =
    routes.find((route) => route.path === location.pathname) ?? {};

  return (
    <div className={styles.wrapper}>
      {windowWidth <= 770 ? <SideMenuMobile /> : <SideMenu />}
      <div className={styles.holder}>
        <Header />

        <SwitchTransition mode="out-in">
          <CSSTransition
            key={location.pathname}
            classNames="page"
            timeout={300}
            unmountOnExit
            nodeRef={nodeRef}
          >
            <div ref={nodeRef}>{currentOutlet}</div>
          </CSSTransition>
        </SwitchTransition>
      </div>
    </div>
  );
}

export default AdminLayout;
