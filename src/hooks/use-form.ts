import { SyntheticEvent, useState } from 'react'

export const useForm = <T extends object = {}>(inputValues: T) => {
	const [values, setValues] = useState<T>(inputValues)
	const handleChange = (e: SyntheticEvent) => {
		const { value, name } = e.target as HTMLInputElement
		setValues({ ...values, [name]: value })
	}
	return { values, handleChange, setValues }
}
