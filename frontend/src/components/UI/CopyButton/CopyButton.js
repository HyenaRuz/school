import React from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import styles from "./CopyButton.module.scss";

function CopyButton({ copyText, icon, text }) {
  const messages = useSelector((state) => state.locale.messages);

  const copyToClipboard = () => {
    const textarea = document.createElement("textarea");
    textarea.value = copyText;
    document.body.appendChild(textarea);

    textarea.select();
    textarea.setSelectionRange(0, 99999);

    document.execCommand("copy");

    document.body.removeChild(textarea);

    toast.success(<h6>{messages.LinkCopied}</h6>);
  };

  return (
    <div className={styles.copyButton}>
      <button onClick={copyToClipboard}>
        {icon ? (
          <div className={styles.copyButton_icon}>{icon}</div>
        ) : (
          <h4 className={styles.copyButton_text}>{messages.Copylink}</h4>
        )}
      </button>

      <h5> {text}</h5>
    </div>
  );
}

export default CopyButton;
