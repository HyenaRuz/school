import React from "react";
import { Field, useField } from "formik";
import style from "./UiStyles.module.scss";

const MyNumber = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className={style.number}>
      <label className={style.lable} htmlFor={props.id || props.name}>
        <h6>{label}</h6>
      </label>
      <Field className={style.input } {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className={style.error}>{meta.error}</div>
      ) : null}
    </div>
  );
};

export default MyNumber;
