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

	const getTimeIndex = (givenTime: string) => {
		if (!givenTime) {
			return timesOfDayList.value.findIndex((time) => time.value === "07:00");
		}

		return timesOfDayList.value.findIndex((time) => time.value === givenTime);
	};

	return {
		timesOfDayList,
		getTimeIndex,
	};
};
