import React from 'react';
import styles from './ingredient-section.module.css'
import IngredientCart from "../indredient-cart/ingredient-cart";
import {string} from "prop-types";
import {ingredientArray} from "../../../../utils/global-prop-types";
import OrderDetailes from "../../../order-details/order-detailes";
import Modal from "../../../modal/modal";
import IngredientDetails from "../../../ingredient-details/ingredient-details";

const IngredientSection = ({title, data, handleOpen, handleClose}) => {
    return (<section>
            <p className="text text_type_main-medium mb-6">
                {title}
            </p>
            <ul className={`${styles.listIngredients} pt-6 pl-4 pb-10 pr-4`}>
                {data.map(ing =>{
                    const modalContent = (<Modal optionalTitle={"Детали ингредиента"} handleClose={handleClose}>
                        <OrderDetailes data={ing} />
                    </Modal>)
                    return (<IngredientCart handleOpen={() => handleOpen(modalContent)}
                                            modalContent={modalContent}
                                            key={ing["_id"]} ing={ing}
                                            description={ing.name}
                                            count={0} image={ing.image}
                                            price={ing.price}/>)
                }
                )}
            </ul>
        </section>
    )
}

IngredientSection.propType = {
    title: string.isRequired,
    data: ingredientArray.isRequired,
}
export default IngredientSection;