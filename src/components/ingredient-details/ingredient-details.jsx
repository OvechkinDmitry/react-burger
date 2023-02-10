import React from 'react';
import styles from './ingredient-details.module.css'
import image from '../../images/modal/done.png'
import PropTypes from "prop-types";

const IngredientDetails = ({id}) => {
    return (<>
            <p className={`${styles.id} text text_type_digits-large`}>{id}</p>
            <p className="text text_type_main-medium mt-8">идентификатор заказа</p>
            {/*в библиотеке компонентов есть лого только шапки, поэтому вставил изображение*/}
            <img className={'mt-15'} src={image} alt={"done"}/>
            <p className="text text_type_main-small mt-15">Ваш заказ начали готовить</p>
            <p className="text text_type_main-small text_color_inactive mt-2 pb-30">Дождитесь готовности на орбитальной
                станции</p>
        </>
    );
};

IngredientDetails.propTypes = {
    id: PropTypes.string.isRequired
}

export default IngredientDetails;