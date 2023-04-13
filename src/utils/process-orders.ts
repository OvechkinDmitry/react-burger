export const processOrder = (order: string[]): [string, number][] => {
	const counted = order.reduce((acc: Record<string, number>, v: string) => {
		return { ...acc, [v]: (acc[v] || 0) + 1 }
	}, {})
	return Object.entries(counted)
}
