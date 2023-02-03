import { ToolParameter, ToolParameterTypeEnum } from "@store/external-tool";
import VueI18n from "vue-i18n";

export function useExternalToolValidation(
	t: (key: string, values?: VueI18n.Values | undefined) => string
) {
	const validateParameter = (
		param: ToolParameter
	): Array<() => boolean | string> => {
		const rules = [];
		if (!param.isOptional && !param.value) {
			rules.push(() => t("common.validation.required2"));
		}

		validateRegex(param, rules);

		validateType(param, rules);

		return rules;
	};

	const validateRegex = (
		param: ToolParameter,
		rules: Array<() => boolean | string>
	) => {
		if (param.regex) {
			const regex = new RegExp(param.regex);
			rules.push(() => {
				if (param.value) {
					return (
						regex.test(param.value) ||
						t("common.validation.regex", { comment: param.regexComment })
					);
				}
				return true;
			});
		}
	};

	const validateType = (
		param: ToolParameter,
		rules: Array<() => boolean | string>
	): void => {
		if (param.value && param.type === ToolParameterTypeEnum.Number) {
			rules.push(
				() => !isNaN(Number(param.value)) || t("common.validation.number")
			);
		}
	};

	return { validateParameter };
}
