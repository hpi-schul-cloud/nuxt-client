import VueI18n from "vue-i18n";
import { ToolParameter, ToolParameterType } from "../../../store/external-tool";

export function useExternalToolValidation(
	t: (key: string, values?: VueI18n.Values | undefined) => string
) {
	const validateParameter = (
		param: ToolParameter,
		inputValue: string | undefined
	): Array<() => boolean | string> => {
		const rules = [];
		if (!param.isOptional && !inputValue) {
			rules.push(() => t("common.validation.required2"));
		}

		validateRegex(param, inputValue, rules);

		validateType(param, inputValue, rules);

		return rules;
	};

	const validateRegex = (
		param: ToolParameter,
		inputValue: string | undefined,
		rules: Array<() => boolean | string>
	) => {
		if (param.regex) {
			const regex = new RegExp(param.regex);
			rules.push(() => {
				if (inputValue) {
					return (
						regex.test(inputValue) ||
						t("common.validation.regex", { comment: param.regexComment })
					);
				}
				return true;
			});
		}
	};

	const validateType = (
		param: ToolParameter,
		inputValue: string | undefined,
		rules: Array<() => boolean | string>
	): void => {
		if (inputValue && param.type === ToolParameterType.Number) {
			rules.push(
				() => !isNaN(Number(inputValue)) || t("common.validation.number")
			);
		}
	};

	return { validateParameter };
}
