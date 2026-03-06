import { createTestableGlobaleState } from "@/utils/create-global-state";
import { DATE_REGEX_PATTERNS, getLocaleFormats } from "@/utils/date-time.utils";
import { useAppStore } from "@data-app";
import { storeToRefs } from "pinia";
import { computed } from "vue";

export const useLocalizedDateTime = createTestableGlobaleState(() => {
	const locale = storeToRefs(useAppStore()).locale;

	const formats = computed(() => getLocaleFormats(locale.value));

	const timePlaceHolder = "HH:mm";
	const datePlaceHolder = computed(() => {
		const { placeholder, date } = formats.value;
		return date.replace("DD", placeholder.day).replace("MM", placeholder.month).replace("YYYY", placeholder.year);
	});

	const timeRegex = /^([01]\d|2[0-3]):[0-5]\d$/;
	const dateRegex = computed(() => {
		const dateFormat = formats.value.date;
		const delimiter = dateFormat.replace(/[A-Z]/g, "")[0];
		const escapedDelimiter = delimiter === "." ? "\\." : delimiter;

		const pattern = dateFormat
			.replace("DD", DATE_REGEX_PATTERNS.D)
			.replace("MM", DATE_REGEX_PATTERNS.M)
			.replace("YYYY", DATE_REGEX_PATTERNS.Y);

		return new RegExp(`^${pattern.replace(new RegExp(`\\${delimiter}`, "g"), escapedDelimiter)}$`);
	});

	const timeMask = "##:##";
	const dateMask = computed(() => formats.value.date.replace(/[A-Z]/g, "#"));

	return {
		datePlaceHolder,
		dateMask,
		dateRegex,
		timePlaceHolder,
		timeMask,
		timeRegex,
		locale,
		formats,
	};
});
