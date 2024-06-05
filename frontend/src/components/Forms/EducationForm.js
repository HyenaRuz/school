import React, { useEffect, useState } from "react";
import styles from "./Form.module.scss";
import { useSelector } from "react-redux";
import { Formik } from "formik";
import { Form } from "react-router-dom";
import MyTextInput from "./FormsComponents/MyTextInput";
import MySelect from "./FormsComponents/MySelect";
import * as Yup from "yup";

const years = (currentYear) =>
  Array.from({ length: 40 }, (_, index) => currentYear - index);

const submit = (value, set) => {
  const { start, endDate, ...otherValues } = value;

  const year = `${start}-${endDate}`;

  set({ year: year, ...otherValues });
};

function EducationForm({ data, setEducation }) {
  const messages = useSelector((state) => state.locale.messages);
  const [initialValues, setInitialValues] = useState({
    city: "",
    degree: "",
    university: "",
    start: "",
    endDate: "",
  });

  useEffect(() => {
    if (data) {
      const { year, ...otherDate } = data;
      const [start, endDate] = year.split("-");
      setInitialValues({ ...otherDate, start, endDate });
    }
  }, [data]);

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      onSubmit={(values) => submit(values, setEducation)}
      validationSchema={Yup.object({
        city: Yup.string().required("Required!"),
        degree: Yup.string().required("Required!"),
        university: Yup.string().required("Required!"),
        start: Yup.number().required("Required!"),
        endDate: Yup.number().required("Required!"),
      })}
    >
      {({ handleChange, handleSubmit }) => (
        <Form className={styles.personalDetails} onBlur={() => handleSubmit()}>
          <MyTextInput
            name="city"
            label={messages.City}
            onChange={handleChange}
          />
          <MyTextInput
            name="degree"
            label={messages.Degree}
            onChange={handleChange}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <h5>Start & End Date</h5>
            <div className={styles.personalDetails_year}>
              <MySelect name="start" as="select" onChange={handleChange}>
                {years(2024).map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </MySelect>

              <MySelect name="endDate" as="select" onChange={handleChange}>
                {years(2024).map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </MySelect>
            </div>
          </div>
          <MyTextInput
            name="university"
            label={messages.University}
            onChange={handleChange}
          />
        </Form>
      )}
    </Formik>
  );
}

export default EducationForm;
