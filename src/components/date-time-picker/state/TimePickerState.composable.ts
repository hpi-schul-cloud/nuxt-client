import { computed, Ref } from "vue";
import dayjs from "dayjs";

export const useTimePickerState = (allowPast: Ref<boolean>) => {
	const timesOfDayList = computed(() => {
		type timeItem = {
			value: string;
			disabled: boolean;
		};

		const times: timeItem[] = [];
		for (let hour = 0; hour < 24; hour++) {
			times.push({
				value: dayjs().hour(hour).minute(0).format("HH:mm"),
				disabled: !allowPast.value && timeInPast(hour, 0),
			});
			times.push({
				value: dayjs().hour(hour).minute(30).format("HH:mm"),
				disabled: !allowPast.value && timeInPast(hour, 30),
			});
		}
		return times;
	});

	const timeInPast = (hour: number, minute: number): boolean => {
		const date = new Date();
		const currentHour = date.getHours();
		const currentMinute = date.getMinutes();
		if (hour < currentHour) {
			return true;
		}
		if (hour === currentHour && minute < currentMinute) {
			return true;
		}
		return false;
	};

	return {
		timesOfDayList,
		timeInPast,
	};
};
