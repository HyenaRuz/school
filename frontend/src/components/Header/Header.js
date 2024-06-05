import React, { useState } from "react";
import style from "./Header.module.scss";
import { useMatches, useNavigate } from "react-router-dom";
// import { ReactComponent as Bell } from "../../images/svg/icon-bell.svg";
import { ReactComponent as Gear } from "../../images/svg/icon-gear.svg";
// import { ReactComponent as Ellipse } from "../../images/svg/icon-ellipse.svg";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../Modal/Modal";
import MyButton from "../UI/MyButton/MyButton";
import { logout } from "../../store/slice/UserSlice";
import { removeTokenFromLocalStorage } from "../../helpers/localstorage.helper";
import classNames from "classnames";
import LanguageSwitch from "../LanguageSwitch/LanguageSwitch";

const PageTitle = () => {
  const messages = useSelector((state) => state.locale.messages);

  const matches = useMatches();
  const currentMatch = matches.length ? matches[matches.length - 1] : null;
  const pageTitle = currentMatch?.handle?.title || "Default Title";

  return <h3>{messages[pageTitle]}</h3>;
};

function Header() {
  const [active, setActive] = useState(false);

  const messages = useSelector((state) => state.locale.messages);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { firstName = "", lastName = "", role = "" } = user;

  const toggleModal = () => {
    setActive(!active);
  };

  const logoutHandler = () => {
    dispatch(logout());
    removeTokenFromLocalStorage("token");
    navigate("/login");
  };

  return (
    <div className={style.header}>
      <h3 className={style.header_title}>
        {" "}
        <PageTitle />
      </h3>

      <div className={style.wrapper}>
        <div style={{ gap: 20, display: "flex" }}>
          {/* <button className={style.wrapper_circle}>
            <Bell className={style.wrapper_icon} />
            <Ellipse className={style.wrapper_indicator} />
          </button> */}
          <button
            className={classNames(style.wrapper_circle, {
              [style.active]: active,
            })}
            onClick={() => toggleModal()}
          >
            <Gear
              className={style.wrapper_icon}
              onClick={() => toggleModal()}
            />
          </button>
        </div>

        <div className={style.wrapper_user}>
          <div className={style.wrapper_user_text}>
            <h6 className={style.wrapper_user_text_name}>
              {firstName} {lastName ? `${lastName[0]}.` : ""}
            </h6>
            <h6 className={style.wrapper_user_text_role}>
              {role ? `${role[0].toUpperCase()}${role.substring(1)}` : ""}
            </h6>
          </div>
          <div className={style.wrapper_circle}>
            <h4>
              {firstName ? `${firstName[0].toUpperCase()}.` : ""}{" "}
              {lastName ? `${lastName[0].toUpperCase()}.` : ""}
            </h4>
          </div>
        </div>
      </div>

      <Modal active={active} setActive={() => toggleModal()} rightTop={true}>
        <div className={style.modalContent}>
          <MyButton
            title={messages.Logout}
            method={() => {
              logoutHandler();
              toggleModal();
            }}
          />
          <MyButton
            title={messages.AccountSettings}
            method={() => {
              navigate("user/account-settings");
              toggleModal();
            }}
          />
          <LanguageSwitch />
        </div>
      </Modal>
    </div>
  );
}

export default Header;
