import React from "react";
import { useField } from "formik";
import style from "./UiStyles.module.scss";

const MySelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div style={{ position: "relative", width: "100%" }}>
      <label className={style.label} htmlFor={props.id || props.name}>
        {label}
      </label>
      <select
        className={style.input}
        {...field}
        {...props}
        style={{ minWidth: "auto" }}
      />
      {meta.touched && meta.error ? (
        <div className={style.error}>{meta.error}</div>
      ) : null}
    </div>
  );
};

export default MySelect;
