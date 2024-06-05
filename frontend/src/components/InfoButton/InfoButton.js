import React, { useState } from "react";
import styles from "./InfoButton.module.scss";
import classNames from "classnames";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

function InfoButton({ text, svg }) {
  const [active, setActive] = useState(false);

  const messages = useSelector((state) => state.locale.messages);

  const handleOn = () => {
    setActive(true);
  };

  const handleOff = () => {
    setActive(false);
  };

  const copyToClipboard = () => {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);

    textarea.select();
    textarea.setSelectionRange(0, 99999);

    document.execCommand("copy");

    document.body.removeChild(textarea);

    toast.success(<h6>{messages.CopyingSucceeded}</h6>);
  };

  return (
    <div
      onMouseOver={handleOn}
      onMouseLeave={handleOff}
      className={styles.InfoButton_holder}
      onClick={copyToClipboard}
    >
      {svg}
      <div
        className={classNames(styles.InfoButton_modal, {
          [styles.active]: active,
        })}
      >
        <h6>{text}</h6>
      </div>
    </div>
  );
}

export default InfoButton;
