const getLastSixMonthsNamesHelper = (): string[] => {
    const month_names = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const result = [''];

    const today = new Date();
    for (var i = 6; i > 0; i -= 1) {
        const day = new Date(today.getFullYear(), today.getMonth() - i, 1);
        result.push(month_names[day.getMonth()]);
    }

    return result;
};

export default getLastSixMonthsNamesHelper;