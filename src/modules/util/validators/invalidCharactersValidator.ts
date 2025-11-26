import { useI18n } from "vue-i18n";

export const containsInvalidCharacters = (input: string, invalidChars: string[]) =>
	invalidChars.some((char) => input.includes(char));

export const useInvalidCharactersValidator = () => {
	const { t } = useI18n();

	const validateInvalidCharacters = (input: string, invalidChars: string[]): string | true => {
		const errorMessage = t("pages.folder.rename-file-dialog.validation.invalid-characters");
		const fieldIsValid = true;

		if (containsInvalidCharacters(input, invalidChars)) return errorMessage;

		return fieldIsValid;
	};

	return {
		validateInvalidCharacters,
	};
};
