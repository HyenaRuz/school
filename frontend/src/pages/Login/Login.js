import React from "react";
import styles from "./Login.module.scss";
import LoginForm from "../../components/Forms/LoginForm";
import LanguageSwitch from "../../components/LanguageSwitch/LanguageSwitch";
import { useSelector } from "react-redux";

function Login() {
  const messages = useSelector((state) => state.locale.messages);

  return (
    <main className={styles.login}>
      <div className={styles.login_wrapper}>
        <div className={styles.login_wrapper_title}>
          <h4>{messages.Login}</h4>
          <LanguageSwitch />
        </div>
        <div className={styles.login_wrapper_form}>
          <LoginForm />
        </div>
      </div>
    </main>
  );
}

export default Login;
