import React, { useEffect, useState } from "react";
import styles from "./StudentRegistration.module.scss";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import LanguageSwitch from "../../components/LanguageSwitch/LanguageSwitch";
import SigninForm from "../../components/Forms/SigninForm/SigninForm";
import {
  createConnections,
  findOneByActivationToken,
} from "../../api/services/user.service";
import { getTokenFromLocalStorage } from "../../helpers/localstorage.helper";
import { toast } from "react-toastify";

function StudentRegistration() {
  const [teacher, setTeacher] = useState();

  const navigate = useNavigate();
  const { accessToken } = getTokenFromLocalStorage();

  console.log("accessToken", accessToken);

  const messages = useSelector((state) => state.locale.messages);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const token = params.get("token");

  const encodedToken = encodeURIComponent(token);

  const findeTeacher = async (token) => {
    try {
      const { data } = await findOneByActivationToken(token);
      setTeacher(data);
    } catch (error) {
      const err = error.response?.data.message;
      console.log("Message: ", err.toString());
    }
  };

  const fetchConecations = async (teacher) => {
    try {
      await createConnections(teacher);
      navigate("/");
    } catch (error) {
      const err = error.response?.data.message;
      console.log("Message: ", err.toString());
      navigate("/");
      toast.warning(<h6>{err.toString()}</h6>);
    }
  };

  useEffect(() => {
    findeTeacher(encodedToken);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (accessToken && teacher) {
      fetchConecations(teacher);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken, teacher]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper_title}>
        <h4>{messages.Signup}</h4>
        <h4>
          {teacher?.lastName} {teacher?.firstName}
        </h4>
        <LanguageSwitch />
      </div>
      <div className={styles.wrapper_form}>
        <SigninForm teacher={encodedToken} />
      </div>
    </div>
  );
}

export default StudentRegistration;
