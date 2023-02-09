import React, {useEffect} from 'react';
import {createPortal} from "react-dom";
import styles from './modal.module.css'
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

const portal = document.getElementById("modal-portal")


function Modal({handleClose, optionalTitle, children}) {
    useEffect(() => {
        const escClosing = e => e.key === 'Escape' ? handleClose() : null
        document.body.addEventListener("keydown", escClosing);
        return () => {
            document.body.removeEventListener('keydown', escClosing)
        }
    }, [handleClose])
    return createPortal(<div>
            <div className={styles.overlay} onClick={() => handleClose()}></div>
            <div className={`${styles.modal} pt-10 pl-10 pr-10`}>
                <div className={styles.header}>
                    <p className="text text_type_main-large">
                        {optionalTitle}
                    </p>
                    <div className={styles.closeBtn}><CloseIcon onClick={handleClose} type="primary"/></div>
                </div>
                <div className={`${styles.body}`}>
                    {children}
                </div>
            </div>
        </div>
        , portal);
}

Modal.propTypes = {
    handleClose: PropTypes.func.isRequired,
    optionalTitle: PropTypes.string,
    children: PropTypes.element.isRequired,
}

export default Modal;