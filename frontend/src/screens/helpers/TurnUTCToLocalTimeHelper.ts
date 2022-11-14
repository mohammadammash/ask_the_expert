const TurnUTCToLocateTimeHelper = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
        // en-US can be set to 'default' to use user's browser settings
        hour: "2-digit",
        minute: "2-digit",
    });
};

export default TurnUTCToLocateTimeHelper;