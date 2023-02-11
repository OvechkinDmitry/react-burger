import React from 'react';
import styles from "../modal-overlay/modal-overlay.module.css";
import PropTypes from "prop-types";

const ModalOvrelay = ({handleClose}) => {
    return (
        <div className={styles.overlay} onClick={() => handleClose()}></div>
    );
};

ModalOvrelay.propTypes = {
    handleClose : PropTypes.func.isRequired
}
export default ModalOvrelay;