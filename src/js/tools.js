export function getFormattedDate(dateInstance) {
	dateInstance = new Date(dateInstance);
	if (!dateInstance instanceof Date)
		throw new Error("Given parameter is not instance of Date Class");

	const year = dateInstance.getYear() + 1900;
	const month = ("0" + (dateInstance.getMonth() + 1)).slice(-2);
	const date = ("0" + dateInstance.getDate()).slice(-2);

	const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	const day = days[dateInstance.getDay()];
	const hours = ("0" + dateInstance.getHours()).slice(-2);
	const minutes = ("0" + dateInstance.getMinutes()).slice(-2);
	const seconds = ("0" + dateInstance.getSeconds()).slice(-2);

	return `${year}-${month}-${date} ${day}, ${hours}:${minutes}:${seconds}`;
}
