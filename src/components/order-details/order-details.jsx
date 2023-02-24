import React from 'react';
import styles from './order-details.module.css'
import PropTypes from "prop-types";
import Done from "../ui/done/done";
import Loader from "../ui/loader/loader";

const OrderDetails = ({id}) => {
    return (<>
            {id ?
                <p className={`${styles.id} text text_type_digits-large`}>{id}</p> :
                <Loader/>
            }
                <p className="text text_type_main-medium mt-8">идентификатор заказа</p>
                <Done extraClass={"mt-15"}/>
                <p className="text text_type_main-small mt-15">Ваш заказ начали готовить</p>
                <p className="text text_type_main-small text_color_inactive mt-2 pb-30">
                    Дождитесь готовности на орбитальной станции</p>
        </>
    );
};

OrderDetails.propTypes = {
    id: PropTypes.string.isRequired
}

export default OrderDetails;