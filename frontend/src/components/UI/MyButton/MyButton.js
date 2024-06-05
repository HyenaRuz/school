import React from "react";
import styles from "./MyButton.module.scss";

function MyButton({ title, method, type }) {
  return (
    <button className={styles.button} type={type} onClick={method}>
      <h5>{title}</h5>
    </button>
  );
}

export default MyButton;
