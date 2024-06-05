import React, { useEffect, useState } from "react";
import styles from "./Students.module.scss";
import Table from "../../components/Table/Table.js";
import Control from "../../components/Table/Control/Control.js";
import StudentCard from "../../components/Table/Student/StudentCard.js";
import {
  getSearchUsers,
  allConnections,
} from "../../api/services/user.service.js";
import Modal from "../../components/Modal/Modal.js";

function Students() {
  const [student, setStudent] = useState();
  const [tableActivity, setTableActivity] = useState(false);
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState();
  const [input, setInput] = useState();
  const [reload, setReload] = useState();

  const fetcUsers = async () => {
    setLoading(true);

    if (!input) {
      try {
        const { data } = await allConnections();

        setStudents(data);
        setTotal(data.total);
      } catch (error) {
        console.log(error.message);
      }
    } else {
      try {
        const { data } = await getSearchUsers(input, "teacher");
        setStudents(data);
      } catch (error) {
        console.log(error.message);
      }
    }
    setLoading(false);
  };

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    fetcUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, input, reload]);

  // console.log(student);

  return (
    <main>
      <Control setStudents={setStudents} setInput={setInput} />

      <div className={styles.wrapper}>
        <Table
          students={students}
          selectedStudent={setStudent}
          tableActivity={setTableActivity}
          setPage={setPage}
          page={page}
          total={total}
          loading={loading}
        />
        {windowWidth <= 700 ? (
          <Modal
            active={tableActivity}
            setActive={() => setTableActivity(!tableActivity)}
          >
            <StudentCard
              student={student}
              active={tableActivity}
              // setTableActivity={setTableActivity}
              setReload={setReload}
            />
          </Modal>
        ) : (
          <StudentCard
            student={student}
            active={tableActivity}
            setTableActivity={setTableActivity}
            setReload={setReload}
          />
        )}
      </div>
    </main>
  );
}

export default Students;
