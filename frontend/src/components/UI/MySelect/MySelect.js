import React from "react";
import styles from "./MySelect.module.scss";

function MySelect({ method, value, children}) {
  return (
    <select onChange={method} className={styles.select} value={value}>
      {children}
    </select>
  );
}

export default MySelect;
