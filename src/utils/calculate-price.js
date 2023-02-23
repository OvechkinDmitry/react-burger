export const calculatePrice = data => {
	return data && data.length && data.every(el => el !== undefined)
		? data.reduce((acc, el) => {
				if (!el.price) return acc + 0
				if (el.type === 'bun') return acc + el?.price * 2
				return acc + el?.price
		  }, 0)
		: 0
}
