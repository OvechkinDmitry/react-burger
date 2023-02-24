import PropTypes, { arrayOf, shape } from 'prop-types'

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
	_id: PropTypes.string.isRequired
})

export const ingredientArray = arrayOf(ingredientType)

export const sectionsData = PropTypes.arrayOf(
	PropTypes.shape({
		title: PropTypes.string.isRequired,
		ref: PropTypes.object.isRequired,
		data: ingredientArray
	})
)
