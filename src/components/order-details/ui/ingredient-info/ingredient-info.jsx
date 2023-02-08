import React from 'react';
import styles from './ingredient-info.module.css'

const IngredientInfo = ({title, amount}) => {
    return (<div className={styles.infoCart}>
            <p className="text text_type_main-default text_color_inactive">
                {title}
            </p>
            <p className="text text_type_digits-default text_color_inactive">{amount}</p>
        </div>
    );
};

export default IngredientInfo;