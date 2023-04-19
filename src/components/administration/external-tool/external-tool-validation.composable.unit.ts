import { useExternalToolValidation } from "./external-tool-validation.composable";
import {
	ToolParameter,
	ToolParameterLocation,
	ToolParameterScope,
	ToolParameterType,
} from "@/store/external-tool";

describe("useExternalToolValidation", () => {
	const setup = () => {
		const tMock = jest.fn().mockImplementation((args) => args);

		const { validateParameter } = useExternalToolValidation(tMock);

		const toolParameter: ToolParameter = {
			name: "ToolParameter",
			displayName: "Tool Parameter",
			isOptional: true,
			value: "x",
			type: ToolParameterType.String,
			regexComment: "comment",
			location: ToolParameterLocation.PATH,
			regex: "[x]",
			scope: ToolParameterScope.School,
			default: undefined,
		};

		return {
			validateParameter,
			toolParameter,
		};
	};

	describe("validateParameter is called", () => {
		it("should return true when validation passed", () => {
			const { validateParameter, toolParameter } = setup();

			const rules: (() => string | boolean)[] =
				validateParameter(toolParameter);

			expect(rules[0]()).toBeTruthy();
		});

		it("should add required rule when parameter is required value is missing", () => {
			const { validateParameter, toolParameter } = setup();
			toolParameter.isOptional = false;
			toolParameter.value = undefined;

			const rules: (() => string | boolean)[] =
				validateParameter(toolParameter);

			const requiredRuleExists = rules.some(
				(rule) => rule() === "common.validation.required2"
			);

			expect(requiredRuleExists).toBeTruthy();
		});

		it("should add regex rule when parameter value does not fit the regex", () => {
			const { validateParameter, toolParameter } = setup();
			toolParameter.value = "test";
			toolParameter.regex = "[x]";

			const rules: (() => string | boolean)[] =
				validateParameter(toolParameter);

			const regexRuleExists = rules.some(
				(rule) => rule() === "common.validation.regex"
			);

			expect(regexRuleExists).toBeTruthy();
		});

		it("should add number rule when parameter value does not match the parameter type", () => {
			const { validateParameter, toolParameter } = setup();
			toolParameter.value = "noNumber2123";
			toolParameter.type = ToolParameterType.Number;

			const rules: (() => string | boolean)[] =
				validateParameter(toolParameter);

			const numberRuleExists = rules.some(
				(rule) => rule() === "common.validation.number"
			);

			expect(numberRuleExists).toBeTruthy();
		});
	});
});
