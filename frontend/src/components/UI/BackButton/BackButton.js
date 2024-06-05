import React from "react";
import styles from "./BackButton.module.scss";
import { useNavigate } from "react-router-dom";

function BackButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <button className={styles.backButton} onClick={handleClick}>
      Назад
    </button>
  );
}

export default BackButton;
