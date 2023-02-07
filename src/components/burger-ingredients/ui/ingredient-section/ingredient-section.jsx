import React from 'react';
import styles from './ingredient-section.module.css'
import IngredientCart from "../indredient-cart/ingredient-cart";

const IngredientSection = ({title,data}) => {
    return (<section>
        <p className="text text_type_main-medium mb-6">
            {title}
        </p>
        <ul className={`${styles.listIngredients} pt-6 pl-4 pb-10 pr-4`}>
            {data.map(ing =>
                <IngredientCart key={ing["_id"]} description={ing.name} count={0} image={ing.image} price={ing.price}/>
            )}
        </ul>
    </section>
    )
}

export default IngredientSection;