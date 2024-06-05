import React from "react";
import { useField } from "formik";
import style from "./UiStyles.module.scss";

const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div
      style={{ display: "flex", flexDirection: "column", position: "relative" }}
    >
      <label className={style.label} htmlFor={props.id || props.name}>
        <h5>{label}</h5>
      </label>
      <input className={style.input} {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className={style.error}>{meta.error}</div>
      ) : null}
    </div>
  );
};

export default MyTextInput;
