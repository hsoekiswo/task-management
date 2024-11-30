import moment from "moment";

export const today = moment().toDate();
const dayNumFmt = Number(moment().format('DD'));
const monthNumFmt = Number(moment().format('MM'));
export const todayString = moment().format('YYYY-MM-DD')
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const monthName = monthNames[monthNumFmt - 1];
export const fullDate: string = `${dayNumFmt} ${monthName}`;
const dayNames: string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
export const dayName: string = dayNames[Number(moment().format('e'))];