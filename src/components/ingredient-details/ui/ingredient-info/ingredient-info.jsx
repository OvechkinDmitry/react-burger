import React from 'react';
import styles from './ingredient-info.module.css'
import PropTypes from "prop-types";

const IngredientInfo = ({title, amount}) => {
    return (<div className={styles.infoCart}>
            <p className="text text_type_main-default text_color_inactive">
                {title}
            </p>
            <p className="text text_type_digits-default text_color_inactive">{amount}</p>
        </div>
    );
};

IngredientInfo.propTypes = {
    title: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
}

export default IngredientInfo;