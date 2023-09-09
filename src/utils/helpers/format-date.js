export const formatDate = (e) => {
    const date = new Date(e);
    const [month, day, year] = [
        date.getMonth(),
        date.getDate(),
        date.getFullYear(),
    ];
    return [year, month + 1, day]
}