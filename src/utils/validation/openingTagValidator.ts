import { useI18n } from "vue-i18n";

export class OpeningTagValidator {
	static containsOpeningTagFollowedByString(input: string): boolean {
		const regex = /<\S+(?<!<)/;
		return regex.test(input);
	}

	static validate(input: string): string | true {
		const { t } = useI18n();
		const errorMessage = t("common.validation.containsOpeningTag");
		const fieldIsValid = true;

		if (this.containsOpeningTagFollowedByString(input)) return errorMessage;

		return fieldIsValid;
	}
}
