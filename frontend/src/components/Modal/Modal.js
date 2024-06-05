import React from "react";
import style from "./Modal.module.scss";
import classNames from "classnames";
import { ReactComponent as Cancel } from "../../images/svg/icon-cancel.svg";

function Modal({ active, setActive, children, rightTop, background }) {
  return (
    <div
      className={classNames(style.modal, { [style.active]: active })}
      onClick={setActive}
    >
      <div className={style.modal_cancel} onClick={setActive}>
        <Cancel />
      </div>

      <div
        className={classNames(style.modal_content, {
          [style.active]: active,
          [style.rightTop]: rightTop,
          [style.background]: background,
        })}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export default Modal;
