export const daysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
};

export const firstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
};

export const generateDates = (year: number, month: number) => {
    const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

    const days: number = daysInMonth(year, month);
    const firstDay: number = firstDayOfMonth(year, month);
    const dates: { date: number, month: string }[][] = [];
    let dateCounter: number = 1;

    for (let week: number = 0; week < 6; week++) {
        dates[week] = [];
        for (let day: number = 0; day < 7; day++) {
            if (week === 0 && day < firstDay) {
                const prevMonthDays: number = daysInMonth(year, month - 1);
                dates[week][day] = { date: prevMonthDays - firstDay + day + 1, month: 'prev' };
            } else if (dateCounter <= days) {
                dates[week][day] = { date: dateCounter++, month: 'this' };
            } else {
                dates[week][day] = { date: dateCounter++ - days, month: 'next' };
            }
        }
    }
    return dates;
};

export const dateToString = (date: Date): string => {
    const day: string = String(date.getDate()).padStart(2, '0');
    const month: string = String(date.getMonth() + 1).padStart(2, '0');
    const year: number = date.getFullYear();

    return `${month}.${day}.${year}`;
}

export const stringToDate = (stringedDate: string): Date | false => {
    const date: Date = new Date()
    const dateArr: string[] = stringedDate.split(".")
    if (dateArr.length !== 3 ||
        Number(dateArr[0]) > 31 || Number(dateArr[0]) < 1 ||
        Number(dateArr[1]) > 11 || Number(dateArr[1]) < 0 ||
        dateArr[2].length !== 4
    ) {
        return false
    }
    date.setDate(+dateArr[0])
    date.setMonth(Number(dateArr[1]) - 1)
    date.setFullYear(Number(dateArr[2]))

    return date
}