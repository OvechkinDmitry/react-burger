export const filterObject = (
	obj: { [key: string]: string },
	cb: (value: string) => boolean
) => Object.fromEntries(Object.entries(obj).filter(([value]) => cb(value)))
