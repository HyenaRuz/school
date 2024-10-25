import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLocale } from "../../store/slice/LocalizationSlice";
import styles from "./LanguageSwitch.module.scss";
import classNames from "classnames";

const LanguageSwitch = ({ column }) => {
  const [active, setActive] = useState(true);

  const dispatch = useDispatch();
  const currentLocale = useSelector((state) => state.locale.currentLocale);

  const setDefaultLocale = () => {
    const userLanguage = navigator.language || navigator.userLanguage;
    const defaultLocale =
      userLanguage === "en" || userLanguage === "ua" ? userLanguage : "en";
    dispatch(setLocale(defaultLocale));
  };

  useEffect(() => {
    setDefaultLocale();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangeLanguage = (newLocale) => {
    dispatch(setLocale(newLocale));
  };

  return (
    <div
      className={styles.switch}
      style={{ flexDirection: column ? "column" : "row" }}
    >
      <button
        className={classNames(styles.switch_button, {
          [styles.active]: active,
        })}
        onClick={() => {
          handleChangeLanguage("en");
          setActive(true);
        }}
        disabled={currentLocale === "en"}
      >
        <img src="Flag_of_the_United_Kingdom_(3-5).svg.png" alt="" />
      </button>
      <button
        className={classNames(styles.switch_button, {
          [styles.active]: !active,
        })}
        onClick={() => {
          handleChangeLanguage("ua");
          setActive(false);
        }}
        disabled={currentLocale === "ua"}
      >
        <img src="ukraina.png" alt="" />
      </button>
    </div>
  );
};

export default LanguageSwitch;
