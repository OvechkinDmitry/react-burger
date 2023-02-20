import React from 'react';
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import {ingredientType} from "../../../../utils/global-prop-types";

const Bun = ({type, data, isLocked}) => {
    const place = type === "top" ? "верх" : "низ";
    const extraClass = type === "top" ? "mb-4 mr-4" : "mt-4 mr-4"
    return (data && data.length ? <ConstructorElement extraClass={extraClass}
                        type={type} isLocked={isLocked}
                        text={`${data[0].name} (${place})`}
                        price={data[0].price}
                        thumbnail={data[0].image}/> : null)
}

Bun.propTypes={
    type: PropTypes.string.isRequired,
    data: ingredientType.isRequired,
    isLocked: PropTypes.bool.isRequired,
}


export default Bun;