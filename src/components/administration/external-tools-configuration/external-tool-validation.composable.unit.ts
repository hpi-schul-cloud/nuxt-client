import { useExternalToolValidation } from "./external-tool-validation.composable";
import { ToolParameter, ToolParameterLocation, ToolParameterScope, ToolParameterType } from "@/store/external-tool";
import { mountComposable } from "@@/tests/test-utils";
import { createTestingI18n } from "@@/tests/test-utils/setup";

describe("useExternalToolValidation", () => {
	const setup = () => {
		const { validateParameter } = mountComposable(useExternalToolValidation, {
			global: {
				plugins: [createTestingI18n()],
			},
		});

		const toolParameter: ToolParameter = {
			name: "ToolParameter",
			displayName: "Tool Parameter",
			isOptional: true,
			isProtected: false,
			type: ToolParameterType.String,
			regexComment: "comment",
			location: ToolParameterLocation.PATH,
			regex: "[x]",
			scope: ToolParameterScope.School,
			defaultValue: undefined,
		};

		return {
			validateParameter,
			toolParameter,
		};
	};

	describe("validateParameter is called", () => {
		it("should return true when validation passed", () => {
			const { validateParameter, toolParameter } = setup();

			const rules: (() => string | boolean)[] = validateParameter(toolParameter, undefined);

			expect(rules[0]()).toBeTruthy();
		});

		it("should add required rule when parameter is required value is missing", () => {
			const { validateParameter, toolParameter } = setup();
			toolParameter.isOptional = false;

			const rules: (() => string | boolean)[] = validateParameter(toolParameter, undefined);

			const requiredRuleExists = rules.some((rule) => rule() === "common.validation.required2");

			expect(requiredRuleExists).toBeTruthy();
		});

		it("should add regex rule when parameter value does not fit the regex", () => {
			const { validateParameter, toolParameter } = setup();
			toolParameter.regex = "[x]";

			const rules: (() => string | boolean)[] = validateParameter(toolParameter, "test");

			const regexRuleExists = rules.some((rule) => rule() === "common.validation.regex");

			expect(regexRuleExists).toBeTruthy();
		});

		it("should add number rule when parameter value does not match the parameter type", () => {
			const { validateParameter, toolParameter } = setup();
			toolParameter.type = ToolParameterType.Number;

			const rules: (() => string | boolean)[] = validateParameter(toolParameter, "noNumber2123");

			const numberRuleExists = rules.some((rule) => rule() === "common.validation.number");

			expect(numberRuleExists).toBeTruthy();
		});
	});
});
