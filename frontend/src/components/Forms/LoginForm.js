import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/services/auth.service";
import { setTokenToLocalStorage } from "../../helpers/localstorage.helper";
import { login as loginAction } from "../../store/slice/UserSlice";
import { toast } from "react-toastify";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import MyTextInput from "./FormsComponents/MyTextInput";
import styles from "./Form.module.scss";
import MyButton from "../UI/MyButton/MyButton";

function LoginForm({ setActive }) {
  const [errorMessage, setErrorMessage] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginHandler = async (values) => {
    try {
      const data = await login(values);
      if (data) {
        setTokenToLocalStorage(data);
        dispatch(loginAction(data));
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
    <>
      <Formik
        initialValues={{ email: "", pasword: "" }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
          password: Yup.string()
            .required("Required")
            .min(6, "Password is too short - should be 6 chars minimum."),
        })}
        onSubmit={loginHandler}
      >
        <Form onClick={() => setErrorMessage(false)} className={styles.login}>
          {errorMessage ? (
            <div style={{ color: "red" }}> {errorMessage}</div>
          ) : (
            <></>
          )}
          <MyTextInput
            label="Email Address"
            name="email"
            type="email"
            placeholder="mail"
          />
          <MyTextInput
            label="Password"
            name="password"
            type="password"
            placeholder="password"
          />
          <MyButton title={"Submit"} type={"submit"} />

          <div className={styles.login_switchToSignup}>
            <h6>Already on CompanyList?</h6>
            <button type="button" onClick={() => navigate('/signup')}>
              <h6>Sign up</h6>
            </button>
          </div>
        </Form>
      </Formik>
    </>
  );
}
export default LoginForm;
