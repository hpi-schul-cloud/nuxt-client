import { useI18n } from "vue-i18n";

export const containsOpeningTagFollowedByString = (input: string) => {
	const regex = /<[^<\s]+/;

	return regex.test(input);
};

export const useOpeningTagValidator = () => {
	const { t } = useI18n();

	const validateOnOpeningTag = (input: string): string | true => {
		const errorMessage = t("common.validation.containsOpeningTag");
		const fieldIsValid = true;

		if (containsOpeningTagFollowedByString(input)) return errorMessage;

		return fieldIsValid;
	};

	return {
		validateOnOpeningTag,
	};
};
