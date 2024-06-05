import React, { useEffect, useState } from "react";
import styles from "./PersonalDetails.module.scss";
import { Form, Formik } from "formik";
import MyTextInput from "../FormsComponents/MyTextInput";
import { useSelector } from "react-redux";
import MyTextArea from "../FormsComponents/MyTextArea";
import { format } from "date-fns";
import MyDate from "../FormsComponents/MyDate";
import * as Yup from "yup";

const submit = (values, set, data) => {
  const changedFields = Object.keys(values).filter(
    (key) => values[key] !== data[key]
  );

  const changedValues = changedFields.reduce((acc, key) => {
    acc[key] = values[key];
    return acc;
  }, {});

  if (Object.keys(changedValues).length > 0) {
    set(changedValues);
  }
};

function PersonalDetails({ data, setPersonalDetails }) {
  const [initialValues, setInitialValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    about: "",
    birthday: "",
  });

  const messages = useSelector((state) => state.locale.messages);

  useEffect(() => {
    if (data) {
      const { birthday: userBirthday, ...otherData } = data;
      const birthday = format(userBirthday, "yyyy-MM-dd");
      setInitialValues({ ...otherData, birthday });
    }
  }, [data]);

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      onSubmit={(values) => submit(values, setPersonalDetails, data)}
      validationSchema={Yup.object({
        firstName: Yup.string().required("Required!"),
        lastName: Yup.string().required("Required!"),
        email: Yup.string().required("Required!"),
        phone: Yup.string().required("Required!"),
        birthday: Yup.string().required("Required!"),
      })}
    >
      {({ handleChange, handleSubmit }) => (
        <Form className={styles.personalDetails} onBlur={() => handleSubmit()}>
          <MyTextInput
            name="firstName"
            label={messages.FirstName}
            onChange={handleChange}
          />
          <MyTextInput
            name="lastName"
            label={messages.LastName}
            onChange={handleChange}
          />
          <MyTextInput
            name="email"
            label={messages.Email}
            onChange={handleChange}
          />

          <div className={styles.personalDetails_big}>
            <MyTextArea
              name="about"
              label={messages.About}
              onChange={handleChange}
            />
          </div>

          <MyTextInput
            name="phone"
            label={messages.Phone}
            onChange={handleChange}
          />
          <MyDate
            name="birthday"
            label={messages.Birthday}
            onChange={handleChange}
          />
        </Form>
      )}
    </Formik>
  );
}

export default PersonalDetails;
