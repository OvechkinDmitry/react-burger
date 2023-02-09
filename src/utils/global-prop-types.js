import PropTypes, {arrayOf, objectOf, shape} from "prop-types";

export const ingredientType = shape({
    calories: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    proteins: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    __v: PropTypes.number.isRequired,
    _id: PropTypes.string.isRequired,
})

export const ingredientArray = arrayOf(ingredientType)

export const dataType = objectOf(ingredientArray)

export const constructorType = {
    data: dataType.isRequired,
    handleOpen: PropTypes.func.isRequired,
    handleClose: PropTypes.func,
}
