import React, { useEffect, useState } from "react";
import styles from "./ProfileCard.module.scss";
import { useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import { ReactComponent as Location } from "../../images/svg/icon-location.svg";
import { ReactComponent as Email } from "../../images/svg/icon-email.svg";
import { ReactComponent as Phone } from "../../images/svg/icon-call.svg";
import CopyButton from "../UI/CopyButton/CopyButton";
import { Role } from "../../helpers/enums/roles";
import { useParams } from "react-router-dom";
import { findOneById } from "../../api/services/user.service";

function ProfileCard({ id }) {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);

  const messages = useSelector((state) => state.locale.messages);
  const { contactId } = useParams();

  const fetchUser = async (id) => {
    setLoading(true);
    try {
      const { data } = await findOneById(id);

      setProfile(data);
    } catch (error) {
      const err = error.response?.data.message;
      console.log("Message: ", err.toString());
    } finally {
      setLoading(false);
    }
  };

  const currentUrl = window.location.href;
  const parts = currentUrl.split("/");
  parts.pop();
  const newUrl = parts.join("/");
  const encodedToken = encodeURIComponent(profile?.activationToken);

  const registrationLink = `${newUrl}/student-egistration?token=${encodedToken}`;

  useEffect(() => {
    if (contactId) {
      fetchUser(contactId);
    } else {
      fetchUser(id);
    }
  }, [contactId, id]);

  return (
    <main className={styles.user}>
      <div className={styles.user_decorHeader}></div>

      <div className={styles.user_avatar}>
        {profile?.avatar ? (
          <img src={profile.avatar} alt="" />
        ) : (
          <h1>
            {profile?.firstName[0].toUpperCase()}.
            {profile?.lastName[0].toUpperCase()}.
          </h1>
        )}
      </div>
      {loading ? (
        <Loader />
      ) : (
        <div className={styles.user_info}>
          <div className={styles.user_info_title}>
            <h3>
              {profile.firstName[0].toUpperCase() + profile.firstName.slice(1)}{" "}
              {profile?.lastName[0].toUpperCase() + profile.lastName.slice(1)}
            </h3>
            <h5> {profile.role[0].toUpperCase() + profile.role.slice(1)}</h5>
          </div>

          <div className={styles.user_info_contacts}>
            <CopyButton
              text={profile ? "undefined" : profile.location}
              icon={<Location />}
              copyText={profile ? "undefined" : profile.location}
            />
            <CopyButton
              text={profile.phone}
              icon={<Phone />}
              copyText={profile.phone}
            />
            <CopyButton
              text={profile.email}
              icon={<Email />}
              copyText={profile.email}
            />
          </div>

          {profile?.role === Role.teacher ? (
            <div className={styles.user_info_link}>
              <h4>{messages.Studentlink}: </h4>
              <CopyButton copyText={registrationLink} />
            </div>
          ) : (
            <></>
          )}

          <div className={styles.user_info_about}>
            <h4>{messages.About}:</h4>
            <h5>{profile?.about}</h5>
          </div>

          <div className={styles.user_info_education}>
            <h4 className={styles.user_info_education_title}>
              {messages.Education}:
            </h4>

            <ul>
              {profile?.educations?.map((item, index) => (
                <li className={styles.user_info_education_holder} key={index}>
                  <h5 className={styles.user_info_education_holder_title}>
                    {item.degree}, {item.university}
                  </h5>
                  <h5 className={styles.user_info_education_holder_year}>
                    {item.year}
                  </h5>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.user_info_expertise}>
            <h4>{messages.Expertise}:</h4>
          </div>
        </div>
      )}
    </main>
  );
}

export default ProfileCard;
