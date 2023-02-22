import React from 'react';
import {Reorder} from "framer-motion";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {ingredientType} from "../../../../utils/global-prop-types";
import PropTypes from "prop-types";

const ConstructorUnit = React.memo(({ingredient, handleClose}) => {
    return (
        <Reorder.Item
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            whileDrag={{
                scale: 1.05,
            }}
            value={ingredient}>
                <div className={"ml-4"}>
                    <DragIcon type="primary"/>
                </div>
                <ConstructorElement extraClass={`ml-2`}
                                    text={ingredient.name}
                                    price={ingredient.price}
                                    thumbnail={ingredient.image}
                                    handleClose={() => handleClose(ingredient.index)}
                />
        </Reorder.Item>
    )
})
ConstructorUnit.propTypes = {
    ingredient: ingredientType.isRequired,
    handleClose: PropTypes.func.isRequired,
}
export default ConstructorUnit;