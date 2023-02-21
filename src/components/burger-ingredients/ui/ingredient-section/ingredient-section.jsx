import React, {forwardRef} from 'react';
import styles from './ingredient-section.module.css'
import IngredientCart from "../indredient-cart/ingredient-cart";

const IngredientSection = forwardRef(({title, data, handleOpen}, ref) => {
    return (<section id={title} ref={ref}>
                <p className="text text_type_main-medium mb-6">
                    {title}
                </p>
                <ul className={`${styles.listIngredients} pt-6 pl-4 pb-10 pr-4`}>
                    {data.map((ing,i) => (<IngredientCart key={i} ingredient={ing} handleOpen={handleOpen}/>))}
                </ul>
        </section>
    )
})

export default IngredientSection;