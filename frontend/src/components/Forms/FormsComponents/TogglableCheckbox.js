import React, { useEffect, useState } from "react";
import styles from "./UiStyles.module.scss";

const TogglableCheckbox = ({ label, children, toggle }) => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    toggle(showContent);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showContent]);

  return (
    <div className={styles.togglableCheckbox}>
      <div className={styles.togglableCheckbox_checkbox}>
        <input
          id="checkbox"
          type="checkbox"
          onChange={() => setShowContent(!showContent)}
          checked={showContent}
        />
        <label htmlFor="checkbox">
          <h6>{label}</h6>
        </label>
      </div>
      {showContent && <div>{children}</div>}
    </div>
  );
};

export default TogglableCheckbox;
