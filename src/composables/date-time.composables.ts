import { createTestableGlobaleState } from "@/utils/create-global-state";
import { DATE_REGEX_PATTERNS, getLocaleFormats } from "@/utils/date-time.utils";
import { useAppStore } from "@data-app";
import dayjs from "dayjs";
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

export const useDateConversion = () => {
	const { formats } = useLocalizedDateTime();

	/**
	 * Parse a date from local representation to date object.
	 *
	 * @param dateString - The date string in local representation (e.g. "31.12.2024" for German locale)
	 */
	const convertDateStringToDate = (dateString: string | undefined) => {
		if (!dateString) return undefined;
		const parsed = dayjs(dateString, formats.value.date);
		return parsed.isValid() ? parsed.toDate() : undefined;
	};

	/**
	 * Parse a date from local representation to an iso date string. It's not used for date and time representation.
	 *
	 * @param dateString - The date string in local representation (e.g. "31.12.2024" for German locale)
	 */
	const convertDateStringToIso = (dateString: string | undefined) => {
		if (!dateString) return undefined;
		const parsed = dayjs(dateString, formats.value.date);
		return parsed.isValid() ? parsed.format("YYYY-MM-DD") : undefined;
	};

	/**
	 * Converts an ISO date string to a localized date string based on the current locale.
	 *
	 * @param isoString - The ISO date string to convert (e.g. "2024-12-31T00:00:00.000Z" or "2024-12-31")
	 */
	const convertIsoToDateString = (isoString: string | undefined) => {
		if (!isoString) return undefined;
		const parsed = dayjs(isoString);
		return parsed.isValid() ? parsed.format(formats.value.date) : undefined;
	};

	/**
	 * Converts an ISO date string to a localized date-time string based on the current locale.
	 *
	 * @param isoString - The ISO date-time string to convert (e.g. "2024-12-31T14:30:00.000Z")
	 */
	const convertIsoToDateTimeString = (isoString: string | undefined) => {
		if (!isoString) return undefined;
		const parsed = dayjs(isoString);
		return parsed.isValid() ? parsed.format(formats.value.dateTime) : undefined;
	};

	/**
	 * Parse a date from DB representation (DD.MM.YYYY) to a localized date string.
	 * @deprecated - Use convertIsoToDateString() if possible. Only needed for legacy data.
	 *
	 * @param dbDateString - The date string in DB format (e.g. "01.03.2022")
	 */
	const convertDbGermanDateStringToDateString = (dbDateString: string | undefined) => {
		if (!dbDateString) return undefined;
		const parsed = dayjs(dbDateString, "DD.MM.YYYY");
		return parsed.isValid() ? parsed.format(formats.value.date) : undefined;
	};

	/**
	 * Converts a date-only string (YYYY-MM-DD) to an end-of-day ISO timestamp.
	 *
	 * @param dateString - The date string in YYYY-MM-DD format (e.g. "2026-03-04")
	 */
	const convertDateToEndOfDayIso = (dateString: string | undefined) => {
		if (!dateString) return undefined;
		const parsed = dayjs(dateString);
		return parsed.isValid() ? parsed.endOf("day").toISOString() : undefined;
	};

	return {
		convertDbGermanDateStringToDateString,
		convertDateStringToIso,
		convertDateStringToDate,
		convertIsoToDateString,
		convertIsoToDateTimeString,
		convertDateToEndOfDayIso,
	};
};
