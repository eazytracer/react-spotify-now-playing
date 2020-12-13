export function timeConversion(millisec: number) {
    let seconds = millisec / 1000;
    const hours = seconds / 3600;
    seconds = seconds % 3600;
    const minutes = seconds / 60;
    seconds = seconds % 60;

    if (hours < 1) {
        return new Date(millisec).toISOString().slice(14,19);
    } else {
        return hours + ":" + minutes + ":" + String(seconds).padStart(2, '0');
    }
}