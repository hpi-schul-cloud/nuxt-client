import { FormValidatorFn } from "./validators";
import { useI18nGlobal } from "@/plugins/i18n";
import { useI18n } from "vue-i18n";

const containsOpeningTagFollowedByString = (input: string) => {
	const regex = /<[^<\s]+/;

	return regex.test(input);
};

const hasNoOpeningTagFollowedByString: FormValidatorFn<string> =
	(errMsg = useI18nGlobal().t("common.validation.containsOpeningTag")) =>
	(value) => {
		if (containsOpeningTagFollowedByString(value)) {
			return errMsg;
		}
		return true;
	};

const useOpeningTagValidator = () => {
	const { t } = useI18n();

	const validateOnOpeningTag = (input: string, errorMsg?: string): string | true => {
		const errorMessage = errorMsg ?? t("common.validation.containsOpeningTag");
		const fieldIsValid = true;

		if (containsOpeningTagFollowedByString(input)) return errorMessage;

		return fieldIsValid;
	};

	return {
		validateOnOpeningTag,
	};
};

export { containsOpeningTagFollowedByString, hasNoOpeningTagFollowedByString, useOpeningTagValidator };
