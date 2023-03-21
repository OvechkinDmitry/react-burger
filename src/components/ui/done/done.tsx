import React, { FC } from 'react'
import image from '../../../images/modal/done.png'

type TDone = {
	extraClass: string
}
const Done: FC<TDone> = ({ extraClass }) => {
	return <img className={extraClass} src={image} alt={'done'} />
}

export default Done
