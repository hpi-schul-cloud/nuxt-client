import { computed } from "vue";
import dayjs from "dayjs";

export const useTimePickerState = () => {
	const timesOfDayList = computed(() => {
		type TimeItem = {
			value: string;
		};

		const times: TimeItem[] = [];
		for (let hour = 0; hour < 24; hour++) {
			times.push({
				value: dayjs().hour(hour).minute(0).format("HH:mm"),
			});
			times.push({
				value: dayjs().hour(hour).minute(30).format("HH:mm"),
			});
		}
		return times;
	});

	const getTimeIndex = (givenTime: string | unknown) => {
		if (!givenTime) {
			return timesOfDayList.value.findIndex((time) => time.value === "07:00");
		}

		const timeString = givenTime as string;

		const hours = parseInt(timeString.split(":")[0]);
		const minutes = parseInt(timeString.split(":")[1]);
		if (minutes === 30 || minutes === 0) {
			return timesOfDayList.value.findIndex(
				(time) => time.value === timeString
			);
		}

		let timeProxy = `${hours}:00`;
		if (minutes > 14 && minutes < 45) {
			timeProxy = `${hours}:30`;
		}
		if (minutes >= 45) {
			timeProxy = `${hours + 1}:00`;
		}
		return timesOfDayList.value.findIndex((time) => time.value === timeProxy);
	};

	return {
		timesOfDayList,
		getTimeIndex,
	};
};
