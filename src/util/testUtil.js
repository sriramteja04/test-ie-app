export const findByClassName = (wrapper, value) => {
    return wrapper.find(value)
}

export const findById = (wrapper, value) => {
    return wrapper.find(`[id="${value}"]`)
}

export const findByName = (wrapper, value) => {
    return wrapper.find(`[name="${value}"]`)
}
