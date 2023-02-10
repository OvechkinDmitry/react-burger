export const processData = (data) => data.reduce((acc, el) => {
    if (el.type in acc)
        acc[el.type].push(el)
    else
        acc[el.type] = [el]
    return acc
}, {})