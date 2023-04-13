export type TOrderItem = {
	_id: string
	ingredients: string[]
	status: string
	name: string
	createdAt: string
	updatedAt: string
	number: number
}

export type TOrders = {
	success: boolean
	orders: TOrderItem[]
	total: number
	totalToday: number
}
