export const filterObject = (obj, cb) =>
	Object.fromEntries(Object.entries(obj).filter(([value]) => cb(value)))
