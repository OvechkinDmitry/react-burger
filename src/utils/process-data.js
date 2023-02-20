export const processData = (data) => {
    if (data.length)
        return data.reduce((acc, el) => {
            if (el.type in acc)
                acc[el.type].push(el)
            else
                acc[el.type] = [el]
            return acc
        }, {})
    else
        return data
}

export const processConstructor = (data) => {
    if (data.length) {
        return data.reduce((acc, el) => {
            el.type === 'bun' ? acc.bun.push(el) : acc.middle.push(el)
            return acc
        }, {'bun': [], 'middle': []})
    }
    else
        return {'bun': [], 'middle': []}
}