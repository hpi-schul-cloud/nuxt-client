export class OpeningTagValidator {
	static containsOpeningTagFollowedByString(input: string): boolean {
		const regex = /<\S+(?<!<)/;
		return regex.test(input);
	}

	static getValidationMessage(
		input: string,
		t: (key: string) => string
	): string | boolean {
		const errorMessage = t("common.validation.containsOpeningTag");
		const fieldIsValid = true;

		if (this.containsOpeningTagFollowedByString(input)) return errorMessage;

		return fieldIsValid;
	}
}
