import { computed } from "vue";
import dayjs from "dayjs";

export const useTimePickerState = () => {
	const timesOfDayList = computed(() => {
		type timeItem = {
			value: string;
		};

		const times: timeItem[] = [];
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

	return {
		timesOfDayList,
	};
};
