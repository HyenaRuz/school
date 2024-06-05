import React, { useState } from "react";
import styles from "./CardNewEnent.module.scss";
import { format } from "date-fns";
import { Form, Formik } from "formik";
import MySelect from "../../Forms/FormsComponents/MySelect";
import {
  createEventsForMonth,
  createSingleEvent,
} from "../../../api/services/events.service";
import * as Yup from "yup";
import MyTime from "../../Forms/FormsComponents/MyTime";
import TogglableCheckbox from "../../Forms/FormsComponents/TogglableCheckbox";
import MyNumber from "../../Forms/FormsComponents/MyNumber";
import MyButton from "../../UI/MyButton/MyButton";

const WEEKDAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function CardNewEnent({ day, students, refetch }) {
  const [showNumberInput, setShowNumberInput] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const singleEvent = async (value) => {
    const { time, date, studentID } = value;

    const [hours, minutes] = time.split(":");

    const eventDate = new Date(date);
    eventDate.setHours(hours);
    eventDate.setMinutes(minutes);

    try {
      await createSingleEvent({ date: eventDate, studentID });
      refetch();
    } catch (error) {
      const err = error.response?.data.message;
      console.log("Message: ", err.toString());
      setErrorMessage(err.toString());
    }
  };

  const eventsForMonth = async (value) => {
    const { time, date, studentID, dayOfWeek, monthsAhead } = value;

    const [hours, minutes] = time.split(":");

    const eventDate = new Date(date);
    eventDate.setHours(hours);
    eventDate.setMinutes(minutes);

    try {
      await createEventsForMonth({
        dayOfWeek,
        date: eventDate,
        monthsAhead: monthsAhead - 1,
        studentID,
      });
      refetch();
    } catch (error) {
      const err = error.response?.data.message;
      console.log("Message: ", err.toString());
      setErrorMessage(err.toString());
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          dayOfWeek: `${format(day, "c") - 1}`,
          date: day,
          monthsAhead: "1",
          studentID: "",
          time: "",
        }}
        enableReinitialize={true}
        validationSchema={Yup.object({
          studentID: Yup.number().required("Student is required"),
          time: Yup.string()
            .required("Time is required")
            .test(
              "valid-time",
              "Office hours are from 9am to 7pm",
              function (value) {
                if (!value) return false;
                const selectedTime = new Date(`2000-01-01T${value}`);
                const startTime = new Date(`2000-01-01T09:00:00`);
                const endTime = new Date(`2000-01-01T19:00:00`);
                return selectedTime >= startTime && selectedTime <= endTime;
              }
            ),
        })}
        onSubmit={showNumberInput ? eventsForMonth : singleEvent}
      >
        <div className={styles.cardNewEnent}>
          <h4>{format(day, "MMMM dd yyyy")}</h4>

          <Form
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 20,
              position: "relative",
            }}
          >
            {errorMessage ? (
              <h6
                style={{
                  color: "red",
                  position: "absolute",
                  top: 40,
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

            <TogglableCheckbox
              label="Months Ahead: "
              toggle={setShowNumberInput}
            >
              <div>
                <MyNumber
                  type="number"
                  id="monthsAhead"
                  name="monthsAhead"
                  style={{ fontSize: "1.4rem" }}
                  label={"Number - "}
                />
              </div>
            </TogglableCheckbox>

            <MyTime
              name="time"
              type="time"
              label="Office hours are 9am to 7pm"
            />

            <MySelect label="Day Of Week" name="dayOfWeek">
              {WEEKDAYS.map((day, index) => (
                <option value={index} key={day}>
                  {day}
                </option>
              ))}
            </MySelect>

            <MySelect label="Student" name="studentID">
              <option value="">Please select a student</option>
              {students.map((student, index) => (
                <option value={student.id} key={index}>
                  {student.firstName} {student.lastName}
                </option>
              ))}
            </MySelect>
            <MyButton type="submit" title="Submit" />
          </Form>
        </div>
      </Formik>
    </>
  );
}

export default CardNewEnent;