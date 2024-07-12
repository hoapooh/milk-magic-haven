export function convertSQLDate(sqlDate) {
    const date = new Date(sqlDate);
    const options = { year: "numeric", month: "short", day: "2-digit" };
    return date.toLocaleDateString("en-US", options);
}
