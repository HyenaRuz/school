import React, { useEffect, useState } from "react";
import styles from "./StudentCard.module.scss";
import { format } from "date-fns";
import DateCalendarServerRequestCopy from "./DateCalendarServerRequestCopy";
import {
  // createConnections,
  // deleteConnection as Delete,
  findOneById,
} from "../../../api/services/user.service";
// import { ReactComponent as StudentPlus } from "../../../images/svg/icon-student_plus.svg";
// import { useSelector } from "react-redux";
import classNames from "classnames";
import Loader from "../../Loader/Loader";
import CopyButton from "../../UI/CopyButton/CopyButton";
import { ReactComponent as Email } from "../../../images/svg/icon-email.svg";
import { ReactComponent as Phone } from "../../../images/svg/icon-call.svg";

function StudentCard({ student, active, setReload }) {
  // const user = useSelector((state) => state.user);

  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState();

  // const messages = useSelector((state) => state.locale.messages);

  const fetchUser = async (id) => {
    setLoading(true);
    try {
      const { data } = await findOneById(id);
      setProfile(data);
      setLoading(false);
    } catch (error) {
      const err = error.response?.data.message;
      console.log("Message: ", err.toString());
    } finally {
      setLoading(false);
    }
  };

  // const connectionExists = (connections) => {
  //   if (!connections || !Array.isArray(connections)) {
  //     return false;
  //   }
  //   const exist = connections.some((connection) => connection.id === user.id);
  //   return exist;
  // };

  // const deleteConnectio = async (data) => {
  //   try {
  //     setReload(await Delete(data));
  //   } catch (error) {
  //     const err = error.response?.data.message;
  //     console.log("Message: ", err.toString());
  //     return false;
  //   }
  // };

  useEffect(() => {
    student && fetchUser(student.id);
  }, [student]);

  return (
    <>
      <div
        className={classNames(styles.studentCard, {
          [styles.deactivate]: !active,
        })}
      >
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className={styles.studentCard_headerDecoration}></div>
            <div className={styles.studentCard_avatar}></div>
            <div className={styles.studentCard_info}>
              <div className={styles.studentCard_info_name}>
                <h4>{`${profile?.firstName} ${profile?.lastName}`}</h4>
                <h4>
                  Birthday:{" "}
                  {profile && profile.birthday
                    ? format(profile.birthday, "MMMM dd, yyyy")
                    : "No birthday available"}
                </h4>
              </div>

              <div className={styles.studentCard_info_contact}>
                <CopyButton
                  copyText={profile?.phone}
                  icon={<Phone />}
                  text={profile?.phone}
                />
                <CopyButton
                  copyText={profile?.email}
                  icon={<Email />}
                  text={profile?.email}
                />
              </div>

              {/* <div className={styles.studentCard_info_contact}>
                {connectionExists(student.connections) ? (
                  <button onClick={() => deleteConnectio(student.id)}>
                    deleteConnection
                  </button>
                ) : (
                  <button
                    // className={styles.table_button}
                    onClick={() => createConnection({ id: student.id })}
                  >
                    <StudentPlus />
                  </button>
                )}
                <h6>
                  Parent Name: {student.parent.firstName}{" "}
                  {student.parent.lastName}
                </h6>
                <h6>Phone: {student.parent.phone}</h6>
              </div> */}

              <DateCalendarServerRequestCopy user={profile} />
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default StudentCard;
