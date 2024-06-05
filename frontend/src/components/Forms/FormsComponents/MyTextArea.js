import React from "react";
import style from "./UiStyles.module.scss";
import { useField } from "formik";

function MyTextArea({ label, ...props }) {
  const [field, meta] = useField(props);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        position: "relative",
        height: "100%",
      }}
    >
      <label className={style.label} htmlFor={props.id || props.name}>
        <h5>{label}</h5>
      </label>
      <textarea className={style.textarea} {...field} {...props}></textarea>
      {meta.touched && meta.error ? (
        <div className={style.error}>{meta.error}</div>
      ) : null}
    </div>
  );
}

export default MyTextArea;
