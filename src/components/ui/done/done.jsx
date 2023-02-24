import React from 'react'
import image from '../../../images/modal/done.png'
import PropTypes from 'prop-types'

const Done = ({ extraClass }) => {
	return <img className={extraClass} src={image} alt={'done'} />
}

Done.propTypes = {
	extraClass: PropTypes.string.isRequired
}
export default Done
