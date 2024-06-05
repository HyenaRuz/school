import React, { useState } from "react";
import styles from "./SigninForm.module.scss";
import { Form, Formik } from "formik";
import MyTextInput from "../FormsComponents/MyTextInput";
import { useDispatch, useSelector } from "react-redux";
import MyTextArea from "../FormsComponents/MyTextArea";
import MyDate from "../FormsComponents/MyDate";
import * as Yup from "yup";
import MyButton from "../../UI/MyButton/MyButton";
import { useNavigate } from "react-router-dom";
import {
  login,
  registration,
  registrationStudent,
} from "../../../api/services/auth.service";
import { setTokenToLocalStorage } from "../../../helpers/localstorage.helper";
import { toast } from "react-toastify";
import { login as loginAction } from "../../../store/slice/UserSlice";

function SigninForm({ setActive, teacher }) {
  const [errorMessage, setErrorMessage] = useState(false);

  const messages = useSelector((state) => state.locale.messages);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const studentHandler = async (values) => {
    const { passwordConfirmation, ...formData } = values;

    try {
      const data = await registrationStudent(formData, teacher);
      if (data) {
        const { email, password } = formData;

        const dataLogin = await login({ email, password });

        setTokenToLocalStorage(dataLogin);
        dispatch(loginAction(dataLogin));
        navigate("/");
        toast.success("Login Success");
      }
    } catch (error) {
      const err = error.response?.data.message;
      console.log("Message: ", err.toString());
      setErrorMessage(err.toString());
    }
  };

  const loginHandler = async (values) => {
    const { passwordConfirmation, ...formData } = values;

    try {
      const data = await registration(formData);
      if (data) {
        const { email, password } = formData;

        const dataLogin = await login({ email, password });

        setTokenToLocalStorage(dataLogin);
        dispatch(loginAction(dataLogin));
        navigate("/");
        toast.success("Login Success");
      }
    } catch (error) {
      const err = error.response?.data.message;
      console.log("Message: ", err.toString());
      setErrorMessage(err.toString());
    }
  };

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        about: "",
        birthday: "",
        password: "",
        passwordConfirmation: "",
      }}
      enableReinitialize={true}
      onSubmit={teacher ? studentHandler : loginHandler}
      validationSchema={Yup.object({
        firstName: Yup.string().required("Required!"),
        lastName: Yup.string().required("Required!"),
        email: Yup.string().required("Required!"),
        phone: Yup.string().required("Required!"),
        birthday: Yup.string().required("Required!"),

        password: Yup.string()
          .min(6, "At least 6 characters!")
          .required("Required!"),
        passwordConfirmation: Yup.string()
          .oneOf([Yup.ref("password"), null], "Passwords must match!")
          .required("Required!"),
      })}
    >
      <Form className={styles.personalDetails}>
        {errorMessage ? (
          <div style={{ color: "red", gridColumn: "span 2" }}>
            {errorMessage}
          </div>
        ) : (
          <></>
        )}
        <MyTextInput name="firstName" label={messages.FirstName} />
        <MyTextInput name="lastName" label={messages.LastName} />
        <MyTextInput name="email" label={messages.Email} />

        <div className={styles.personalDetails_big}>
          <MyTextArea name="about" label={messages.About} />
        </div>

        <MyTextInput
          type="password"
          name="password"
          label={messages.Password}
        />

        <MyTextInput
          type="password"
          name="passwordConfirmation"
          label={messages.PasswordConfirmation}
        />
        <MyTextInput name="phone" label={messages.Phone} />
        <MyDate name="birthday" label={messages.Birthday} />

        <div
          style={{
            gridColumn: "span 2",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          <MyButton title={"Submit"} type={"submit"} />
        </div>

        <div className={styles.personalDetails_switchToLogin}>
          <h6>Already on CompanyList?</h6>
          <button type="button" onClick={() => navigate("/login")}>
            <h6>Login</h6>
          </button>
        </div>
      </Form>
    </Formik>
  );
}

export default SigninForm;
