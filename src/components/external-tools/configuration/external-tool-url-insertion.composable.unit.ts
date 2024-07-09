import {
	mountComposable,
	schoolExternalToolConfigurationTemplateFactory,
	toolParameterFactory,
} from "@@/tests/test-utils";
import { useExternalToolUrlInsertion } from "@/components/external-tools/configuration/external-tool-url-insertion.composable";
import { ExternalToolConfigurationTemplate } from "@data-external-tool";
import { DeepPartial } from "fishery";
import { ToolParameter, ToolParameterLocation } from "@/store/external-tool";

describe("useExternalToolUrlInsertion", () => {
	const addPathParamsToTemplate = (
		template: ExternalToolConfigurationTemplate
	) => {
		const pathParamConfig: DeepPartial<ToolParameter> = {
			location: ToolParameterLocation.PATH,
		};

		const pathParams: ToolParameter[] = [];
		pathParams.push(toolParameterFactory.build(pathParamConfig));
		pathParams.push(toolParameterFactory.build(pathParamConfig));
		template.parameters.push(...pathParams);

		template.parameters.forEach((parameter) => {
			if (parameter.location !== ToolParameterLocation.PATH) {
				return;
			}
			template.baseUrl += `/:${parameter.name}`;
		});
	};

	const addQueryParamsToTemplate = (
		template: ExternalToolConfigurationTemplate
	) => {
		const pathParamConfig: DeepPartial<ToolParameter> = {
			location: ToolParameterLocation.QUERY,
		};

		const queryParams: ToolParameter[] = [];
		queryParams.push(toolParameterFactory.build(pathParamConfig));
		queryParams.push(toolParameterFactory.build(pathParamConfig));
		template.parameters.push(...queryParams);
	};

	const generateTestParamValue = (parameterName: string) => {
		return `test-${parameterName}`;
	};

	const generateTestUrlFromTemplate = (
		template: ExternalToolConfigurationTemplate
	) => {
		let testUrl = template.baseUrl;
		template.parameters.forEach((parameter) => {
			const testValue = generateTestParamValue(parameter.name);
			switch (parameter.location) {
				case ToolParameterLocation.PATH:
					testUrl = testUrl.replace(`:${parameter.name}`, testValue);
					break;
				case ToolParameterLocation.QUERY:
					if (testUrl.includes("?")) {
						testUrl += "&";
					} else {
						testUrl += "?";
					}
					testUrl += `${parameter.name}=${testValue}`;
			}
		});
		return testUrl;
	};

	const setup = () => {
		const {
			isValidUrl,
			findMatchingTemplate,
			extractPathParameters,
			extractQueryParameters,
		} = mountComposable(useExternalToolUrlInsertion);

		const templates = [];
		templates.push(schoolExternalToolConfigurationTemplateFactory.build());
		templates.push(schoolExternalToolConfigurationTemplateFactory.build());
		templates.push(schoolExternalToolConfigurationTemplateFactory.build());
		templates.push(schoolExternalToolConfigurationTemplateFactory.build());

		return {
			isValidUrl,
			findMatchingTemplate,
			extractPathParameters,
			extractQueryParameters,
			templates,
		};
	};

	describe("isValidUrl is called", () => {
		it("should return true when provided text is a valid url for an external tool", () => {
			const { isValidUrl } = setup();
			const testUrls = [
				"https://google.de?q=search-1&b=search_1",
				"https://google.de?q=%241%24&r=test.ing~1",
				"https://test.com/search/test-50/",
				"https://classroom.com/start?l=de&t=3600",
				"https://teachers.tool-35.classroom.com/add/",
				"http://unsecure.co",
			];
			for (const url of testUrls) {
				expect(isValidUrl(url)).toBeTruthy();
			}
		});

		it("should return false when provided text is an invalid url for an external tool", () => {
			const { isValidUrl } = setup();
			const testUrls = [
				"google.de",
				"M https://google.de",
				"My Tool",
				"Google",
			];
			for (const url of testUrls) {
				expect(isValidUrl(url)).toBeFalsy();
			}
		});
	});

	describe("findMatchingTemplate is called", () => {
		describe("when the provided url has no parameters", () => {
			it("should return the template which its baseUrl matches the inputted url", () => {
				const { findMatchingTemplate, templates } = setup();
				expect(
					findMatchingTemplate(templates[0].baseUrl, templates)
				).toBeDefined();
			});

			it("should return undefined if no matches are found", () => {
				const { findMatchingTemplate, templates } = setup();
				expect(
					findMatchingTemplate(templates[0].baseUrl + "-not---lkf", templates)
				).toBeUndefined();
			});

			it("should return undefined if provided text is not a valid url", () => {
				const { findMatchingTemplate, templates } = setup();
				expect(findMatchingTemplate("my-tool", templates)).toBeUndefined();
			});
		});

		describe("when the provided url has path parameters", () => {
			it("should return the template which its baseUrl matches the inputted url", () => {
				const { findMatchingTemplate, templates } = setup();
				const templateWithPathParams = templates[0];
				addPathParamsToTemplate(templateWithPathParams);

				let testUrl = generateTestUrlFromTemplate(templateWithPathParams);
				expect(findMatchingTemplate(testUrl, templates)).toBeDefined();

				const templateWithBothParams = templates[1];
				addPathParamsToTemplate(templateWithBothParams);
				addQueryParamsToTemplate(templateWithBothParams);

				testUrl = generateTestUrlFromTemplate(templateWithBothParams);
				expect(findMatchingTemplate(testUrl, templates)).toBeDefined();
			});

			it("should return undefined if the url does not match completely", () => {
				const { findMatchingTemplate, templates } = setup();
				const templateWithPathParam = templates[0];
				addPathParamsToTemplate(templateWithPathParam);

				let testUrl = generateTestUrlFromTemplate(templateWithPathParam);
				testUrl += "/test-add-fault/";

				expect(findMatchingTemplate(testUrl, templates)).toBeUndefined();
			});
		});

		describe("when the provided url has query parameters", () => {
			it("should return the template which its baseUrl matches the inputted url", () => {
				const { findMatchingTemplate, templates } = setup();
				const templateWithQuery = templates[0];
				addQueryParamsToTemplate(templateWithQuery);

				let testUrl = generateTestUrlFromTemplate(templateWithQuery);
				expect(findMatchingTemplate(testUrl, templates)).toBeDefined();

				const templateWithBothParams = templates[1];
				addPathParamsToTemplate(templateWithBothParams);
				addQueryParamsToTemplate(templateWithBothParams);

				testUrl = generateTestUrlFromTemplate(templateWithBothParams);
				expect(findMatchingTemplate(testUrl, templates)).toBeDefined();
			});
		});
	});

	describe("extractPathParameters is called with a valid url with path parameters", () => {
		it("should return all path parameters from the input url based on the template url provided", () => {
			const { extractPathParameters, templates } = setup();
			const templateWithPathParams = templates[0];
			addPathParamsToTemplate(templateWithPathParams);

			const extractedParams = extractPathParameters(
				generateTestUrlFromTemplate(templateWithPathParams),
				templateWithPathParams.baseUrl + "/"
			);

			templateWithPathParams.parameters.forEach((parameter) => {
				const expectedValue = generateTestParamValue(parameter.name);
				expect(extractedParams.get(parameter.name)).toEqual(expectedValue);
			});
		});

		it("should return all path parameters from the input url that also has query parameters", () => {
			const { extractPathParameters, templates } = setup();
			const templateWithBothParams = templates[0];
			addQueryParamsToTemplate(templateWithBothParams);
			addPathParamsToTemplate(templateWithBothParams);

			const extractedParams = extractPathParameters(
				generateTestUrlFromTemplate(templateWithBothParams),
				templateWithBothParams.baseUrl
			);

			templateWithBothParams.parameters.forEach((parameter) => {
				if (parameter.location !== ToolParameterLocation.PATH) {
					return;
				}

				const expectedValue = generateTestParamValue(parameter.name);
				expect(extractedParams.get(parameter.name)).toEqual(expectedValue);
			});
		});
	});

	describe("extractQueryParameters is called with a valid url", () => {
		it("should return all query parameters from the input url with query parameters", () => {
			const { extractQueryParameters, templates } = setup();
			const templateWithQueryParams = templates[0];
			addQueryParamsToTemplate(templateWithQueryParams);

			const extractedParams = extractQueryParameters(
				generateTestUrlFromTemplate(templateWithQueryParams)
			);

			templateWithQueryParams.parameters.forEach((parameter) => {
				const expectedValue = generateTestParamValue(parameter.name);
				expect(extractedParams.get(parameter.name)).toEqual(expectedValue);
			});
		});

		it("should return all query parameters from the input url with path & query parameters", () => {
			const { extractQueryParameters, templates } = setup();
			const templateWithBothParams = templates[0];
			addPathParamsToTemplate(templateWithBothParams);
			addQueryParamsToTemplate(templateWithBothParams);

			const extractedParams = extractQueryParameters(
				generateTestUrlFromTemplate(templateWithBothParams)
			);

			templateWithBothParams.parameters.forEach((parameter) => {
				if (parameter.location !== ToolParameterLocation.QUERY) {
					return;
				}

				const expectedValue = generateTestParamValue(parameter.name);
				expect(extractedParams.get(parameter.name)).toEqual(expectedValue);
			});
		});
	});
});
