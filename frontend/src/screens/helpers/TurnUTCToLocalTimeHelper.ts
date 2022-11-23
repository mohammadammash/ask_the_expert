
const padTo2Digits = (num: number) => {
    return num.toString().padStart(2, '0');
}
const TurnUTCToLocateTimeHelper = (date: Date) => {
    return (
        [
            padTo2Digits(date.getHours()),
            padTo2Digits(date.getMinutes()),
        ].join(':')
    );
}

export default TurnUTCToLocateTimeHelper;