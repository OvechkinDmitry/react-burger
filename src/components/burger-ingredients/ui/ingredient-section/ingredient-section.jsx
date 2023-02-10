import React, {forwardRef} from 'react';
import styles from './ingredient-section.module.css'
import IngredientCart from "../indredient-cart/ingredient-cart";
import {string} from "prop-types";
import {ingredientArray} from "../../../../utils/global-prop-types";

const IngredientSection = ({title, data}, ref) => {
    return (<section ref={ref}>
            <p className="text text_type_main-medium mb-6">
                {title}
            </p>
            <ul className={`${styles.listIngredients} pt-6 pl-4 pb-10 pr-4`}>
                {data.map(ing => {
                        return (<IngredientCart key={ing["_id"]} ing={ing}
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
export default forwardRef(IngredientSection);