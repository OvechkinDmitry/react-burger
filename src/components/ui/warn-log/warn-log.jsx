import React from 'react';
import styles from './warn-log.module.css'
import PropTypes from "prop-types";

const WarnLog = ({children}) => {
    return (<div className={`${styles.warnLog} text_type_main-large`}>{children}</div>);
};

WarnLog.propTypes = {
    children: PropTypes.string.isRequired,
}
export default WarnLog;