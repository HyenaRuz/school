import React from "react";
import style from "./Loader.module.scss";

function Loader() {
  return (
    <div className={style.holder}>
      <div className={style.custom_loader}></div>{" "}
    </div>
  );
}

export default Loader;
