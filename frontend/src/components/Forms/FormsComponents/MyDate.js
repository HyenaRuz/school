import React from "react";
import { Field, useField } from "formik";
import style from "./UiStyles.module.scss";

const MyDate = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className={style.myTime}>
      <Field className={style.myTime_time} type="date" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className={style.error}>{meta.error}</div>
      ) : null}

      <label className={style.myTime_lable} htmlFor={props.id || props.name}>
        <h6>{label}</h6>
      </label>
    </div>
  );
};

export default MyDate;
