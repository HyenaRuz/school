import { Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import MyTime from "./FormsComponents/MyTime";
import MyDate from "./FormsComponents/MyDate";
import MySelect from "./FormsComponents/MySelect";
import MyButton from "../UI/MyButton/MyButton.js";
import { Status, useLocalizedStatus } from "../../helpers/enums/status.js";
import styles from "./Form.module.scss";
import { updateEvent } from "../../api/services/events.service.js";
// import { useSelector } from "react-redux";
import { toast } from "react-toastify";


function UpdateEventForm({ eventId, refetch, topic, homework, bookLink }) {
  const [status, setStatus] = useState();
  const [errorMessage, setErrorMessage] = useState(false);

  // const messages = useSelector((state) => state.locale.messages);

  const localizedStatus = useLocalizedStatus();

  const submit = async (values) => {
    const { date, time, status, ...data } = values;

    const [hours, minutes] = time.split(":");

    try {
      if (status === Status.Rescheduled) {
        const newDate = new Date(date);

        newDate.setHours(hours);
        newDate.setMinutes(minutes);
        await updateEvent(eventId, {
          ...data,
          date: newDate,
          status,
        });
        refetch();

      } else {
        await updateEvent(eventId, { ...data, status });
        refetch();
      }
      toast.success(<h6>Event updated successfully</h6>)
    } catch (error) {
      const err = error.response?.data.message;
      console.log("Message: ", err.toString());
      setErrorMessage(err.toString());
    }
  };

  return (
    <Formik
      initialValues={{
        date: "",
        time: "",
        status: status,
        topic,
        homework,
        bookLink,
      }}
      validationSchema={Yup.object({
        // status: Yup.string().required("Required"),
        date: Yup.string().when("status", {
          is: "rescheduled",
          then: (data) => data.required("Required"),
        }),
        time: Yup.string().when("status", {
          is: "rescheduled",
          then: (time) => time.required("Required"),
        }),
      })}
      enableReinitialize={true}
      onSubmit={submit}
    >
      <Form className={styles.updateEventForm}>
        {errorMessage ? (
          <h6
            style={{
              color: "red",
              position: "absolute",
              top: 2,
              left: "50%",
              transform: "translateX(-50%)",
              width: "max-content",
            }}
          >
            {errorMessage}
          </h6>
        ) : (
          <></>
        )}

        <MySelect
          name="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          {Object.keys(localizedStatus).map((value) => {
            return <option value={value}>{localizedStatus[value]}</option>;
          })}
        </MySelect>

        {status === Status.Rescheduled ? (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <MyDate name="date" />
            <MyTime name="time" />
          </div>
        ) : (
          <></>
        )}

        <MyButton type="submit" title="Update" />
      </Form>
    </Formik>
  );
}

export default UpdateEventForm;
