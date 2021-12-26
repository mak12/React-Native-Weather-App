
export const PrintLog = (logs) => {
    if (__DEV__) {
        console.log("Logger ", logs)
    }
}

// to format date in android devices, as toLocaleString wasnt working as expected
export const jsCoreDateCreator = (dateString) => {
    // dateString *HAS* to be in this format "YYYY-MM-DD HH:MM:SS"  
    const dateParams = dateString.replace(/ UTC/, '').split(/[\s-:]/)
    dateParams[1] = (parseInt(dateParams[1], 10) - 1).toString()

    return new Date(Date.UTC(...dateParams))
}