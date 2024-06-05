import React from "react";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import { useSelector } from "react-redux";

function User() {
  const id = useSelector((state) => state.user.id);
  console.log(id);

  return <ProfileCard id={id} />;
}

export default User;
