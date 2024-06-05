import React, { useEffect, useState } from "react";
import styles from "./AccountSettings.module.scss";
import PersonalDetails from "../../components/Forms/PersonalDetailsForm/PersonalDetailsForm";
import EducationForm from "../../components/Forms/EducationForm";
import { useSelector } from "react-redux";
import { getProfile } from "../../api/services/auth.service";
import Loader from "../../components/Loader/Loader";
import MyButton from "../../components/UI/MyButton/MyButton";
import {
  createUserEducation,
  updateUser,
  updateUserEducation,
} from "../../api/services/user.service";
import { toast } from "react-toastify";

function AccountSettings({ setModal }) {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [education, setEducation] = useState();
  const [personalDetails, setPersonalDetails] = useState();
  const [active, setActive] = useState(false);

  const messages = useSelector((state) => state.locale.messages);

  const fetcEvents = async () => {
    setLoading(true);
    try {
      const data = await getProfile();
      setProfile(data);
    } catch (error) {
      const err = error.response?.data.message;
      console.log("Message: ", err.toString());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetcEvents();
  }, []);

  const submit = async (date) => {
    try {
      await updateUser(date);
      toast.success(<h4>User updated successfully</h4>);
    } catch (error) {
      const err = error.response?.data.message;
      console.log("Message: ", err.toString());
    } finally {
      fetcEvents();
    }
  };

  const updatEducation = async (date, index) => {
    try {
      await updateUserEducation(date, index);
      toast.success(<h4>Education updated successfully</h4>);
    } catch (error) {
      const err = error.response?.data.message;
      console.log("Message: ", err.toString());
    } finally {
      fetcEvents();
    }
  };

  const createEducation = async (date) => {
    try {
      await createUserEducation(date);
      toast.success(<h4>Education successfully added</h4>);
    } catch (error) {
      const err = error.response?.data.message;
      console.log("Message: ", err.toString());
    } finally {
      fetcEvents();
    }
  };

  return (
    <main className={styles.accountSettings}>
      <div className={styles.accountSettings_holder}>
        <div className={styles.accountSettings_holder_title}>
          <h4>{messages.PersonalDetails}</h4>

          <button
            className={styles.accountSettings_holder_title_button}
            onClick={() => submit(personalDetails)}
          >
            <h4>{messages.Confirm}</h4>
          </button>
        </div>
        <div className={styles.accountSettings_holder_form}>
          {loading ? (
            <Loader />
          ) : (
            <>
              <PersonalDetails
                data={profile}
                setPersonalDetails={setPersonalDetails}
              />
            </>
          )}
        </div>
      </div>

      {profile?.educations?.map((item, index) => (
        <div className={styles.accountSettings_holder}>
          <div className={styles.accountSettings_holder_title}>
            <h4>
              {messages.Education} {index + 1}
            </h4>

            <button
              className={styles.accountSettings_holder_title_button}
              onClick={() => updatEducation(education, index)}
            >
              <h4>{messages.Confirm}</h4>
            </button>
          </div>
          <div className={styles.accountSettings_holder_form}>
            <EducationForm data={item} setEducation={setEducation} />
          </div>
        </div>
      ))}

      {active ? (
        <div className={styles.accountSettings_holder}>
          <div className={styles.accountSettings_holder_title}>
            <h4>new {messages.Education}</h4>

            <button
              className={styles.accountSettings_holder_title_button}
              onClick={() => createEducation(education)}
            >
              <h4>{messages.Confirm}</h4>
            </button>
          </div>
          <div className={styles.accountSettings_holder_form}>
            <EducationForm setEducation={setEducation} />
          </div>
        </div>
      ) : (
        <></>
      )}

      <MyButton
        method={() => setActive(!active)}
        title={`new ${messages.Education}`}
      />
    </main>
  );
}

export default AccountSettings;
