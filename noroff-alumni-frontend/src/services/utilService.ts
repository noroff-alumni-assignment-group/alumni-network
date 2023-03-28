
export function setTimeSince(date: Date) {
    let minutes = date.getMinutes();
    return date.getDate() + " " + date.toLocaleString('default', { month: 'short' })
        + " - " + date.getHours() + ":" + (minutes > 9 ? minutes: "0" + minutes);
}