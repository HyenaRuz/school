import React from "react";
import styles from "./SignUp.module.scss";
import LanguageSwitch from "../../components/LanguageSwitch/LanguageSwitch";
import SigninForm from "../../components/Forms/SigninForm/SigninForm";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

function SignUp() {
  const messages = useSelector((state) => state.locale.messages);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const token = params.get("token");

  console.log(token);

  return (
    <main className={styles.signup}>
      <div className={styles.signup_wrapper}>
        <div className={styles.signup_wrapper_title}>
          <h4>{messages.Signup}</h4>
          <LanguageSwitch />
        </div>
        <div className={styles.signup_wrapper_form}>
          <SigninForm />
        </div>
      </div>
    </main>
  );
}

export default SignUp;
