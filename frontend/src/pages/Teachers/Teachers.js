import React, { useEffect, useState } from "react";
import { allConnections } from "../../api/services/user.service";
import InfoButton from "../../components/InfoButton/InfoButton";
import { ReactComponent as Email } from "../../images/svg/icon-email.svg";
import { ReactComponent as Call } from "../../images/svg/icon-call.svg";
import Loader from "../../components/Loader/Loader";
import styles from "./Teachers.module.scss";
import { Link } from "react-router-dom";
// import ProfileCard from "../../components/ProfileCard/ProfileCard";

function TeachersCard({ teacher }) {
  return (
    <div className={styles.teachersCard}>
      <div className={styles.teachersCard_wrapper}>
        <Link
          to={`/teachers/${teacher.id}`}
          className={styles.teachersCard_wrapper_avatar}
        >
          <h3>
            {teacher.firstName[0]}.{teacher.lastName[0]}
          </h3>
        </Link>

        <h4 className={styles.teachersCard_wrapper_name}>
          {teacher.firstName} {teacher.lastName}
        </h4>
      </div>
      <div className={styles.teachersCard_contacts}>
        <InfoButton svg={<Call />} text={teacher.phone} />
        <InfoButton svg={<Email />} text={teacher.email} />
      </div>
    </div>
  );
}

function Teachers() {
  const [loading, setLoading] = useState(false);
  const [teachers, setTeachers] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [errorMessage, setErrorMessage] = useState(false);

  const fetcTeachers = async () => {
    try {
      setLoading(true);
      const { data } = await allConnections();

      setTeachers(data);
    } catch (error) {
      const err = error.response?.data.message;
      console.log("Message: ", err.toString());
      setErrorMessage(err.toString());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetcTeachers();
  }, []);

  return (
    <main>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className={styles.page_grid}>
            {teachers.map((item, index) => (
              <TeachersCard teacher={item} key={index} />
            ))}
          </div>
        </>
      )}
    </main>
  );
}

export default Teachers;
