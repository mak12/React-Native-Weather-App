
export const PrintLog = (logs) => {
    if (__DEV__) {
        console.log("Logger ", logs)
    }
}

export const jsCoreDateCreator = (dateString) => {
    // dateString *HAS* to be in this format "YYYY-MM-DD HH:MM:SS"  
    const dateParams = dateString.replace(/ UTC/, '').split(/[\s-:]/)
    dateParams[1] = (parseInt(dateParams[1], 10) - 1).toString()

    return new Date(Date.UTC(...dateParams))
}