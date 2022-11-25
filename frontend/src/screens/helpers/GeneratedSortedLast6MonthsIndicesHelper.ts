const generateSortedIndices = () => {
    const current_date = new Date();
    let sixmonths_ago = new Date();
    sixmonths_ago.setMonth(current_date.getMonth() - 5)
    const end_month = current_date.getMonth() + 1;
    let start_month = sixmonths_ago.getMonth() + 1;

    //generate indices
    const indices = <any>{};
    let i = 0;
    while (start_month <= end_month) {
        indices[start_month] = i;
        start_month++;
        i++;
        if (start_month === 13) start_month = 1;
    }

    return indices;
}

export default generateSortedIndices;