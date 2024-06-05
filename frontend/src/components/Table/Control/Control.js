import styles from "./Control.module.scss";
import React from "react";
import { ReactComponent as Search } from "../../../images/svg/icon-search.svg";
import MySelect from "../../UI/MySelect/MySelect";

const searchBy = [
  "newest",
  "oldest",
  "by first name",
  "by last name",
  "by date of birth",
];

function Control({ setInput }) {
  return (
    <form className={styles.control}>
      <div className={styles.control_input}>
        <Search className={styles.control_input_img} />
        <input
          placeholder="Search here..."
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
      </div>
      <MySelect array={searchBy} />
    </form>
  );
}

export default Control;
