import { useExternalToolUrlInsertion } from "./external-tool-url-insertion.composable";
import { ToolParameterLocation } from "@/store/external-tool";
import {
	mountComposable,
	schoolExternalToolConfigurationTemplateFactory,
	toolParameterFactory,
} from "@@/tests/test-utils";

describe("useExternalToolUrlInsertion", () => {
	const setup = () => {
		const { isValidUrl, findMatchingTemplate, extractPathParameters, extractQueryParameters } =
			mountComposable(useExternalToolUrlInsertion);

		return {
			isValidUrl,
			findMatchingTemplate,
			extractPathParameters,
			extractQueryParameters,
		};
	};

	describe("isValidUrl is called", () => {
		describe("when provided text is a valid url", () => {
			const setupUrls = () => {
				const testUrls = [
					"https://google.de?q=search-1&b=search_1",
					"https://google.de?q=%241%24&r=test.ing~1",
					"https://test.com/search/test-50/",
					"https://classroom.com/start?l=de&t=3600",
					"https://teachers.tool-35.classroom.com/add/",
					"http://unsecure.co",
				];
				return testUrls;
			};

			it.each(setupUrls())("should return true for %s", (url) => {
				const { isValidUrl } = setup();

				const result = isValidUrl(url);

				expect(result).toBeTruthy();
			});
		});

		describe("when the provided text is an invalid", () => {
			const setupUrls = () => {
				const testUrls = ["google.de", "M https://google.de", "My Tool", "Google"];
				return testUrls;
			};

			it.each(setupUrls())("should return false for %s", (url) => {
				const { isValidUrl } = setup();

				const result = isValidUrl(url);

				expect(result).toBeFalsy();
			});
		});
	});

	describe("findMatchingTemplate is called", () => {
		describe("when the provided url has no parameters", () => {
			describe("when the provided url matches the baseUrl of a template", () => {
				const setupTemplates = () => {
					const templates = [
						schoolExternalToolConfigurationTemplateFactory.build({
							baseUrl: "https://test-1.com",
						}),
						schoolExternalToolConfigurationTemplateFactory.build({
							baseUrl: "https://test-2.com",
						}),
					];

					const matchingUrl = "https://test-1.com";

					const expectedMatch = templates[0];

					return { templates, matchingUrl, expectedMatch };
				};

				it("should return the matching template", () => {
					const { findMatchingTemplate } = setup();
					const { templates, matchingUrl, expectedMatch } = setupTemplates();

					const matchedTemplate = findMatchingTemplate(matchingUrl, templates);

					expect(matchedTemplate).toBeDefined();
					expect(matchedTemplate?.externalToolId).toEqual(expectedMatch.externalToolId);
				});
			});

			describe("when the provided url do not match the baseUrl of any template", () => {
				const setupTemplates = () => {
					const templates = [
						schoolExternalToolConfigurationTemplateFactory.build({
							baseUrl: "https://test-1.com",
						}),
						schoolExternalToolConfigurationTemplateFactory.build({
							baseUrl: "https://test-2.com",
						}),
					];

					const nonMatchingUrl = "https://test-3-not-matching.com";

					return { templates, nonMatchingUrl };
				};

				it("should return undefined", () => {
					const { findMatchingTemplate } = setup();
					const { templates, nonMatchingUrl } = setupTemplates();

					const matchedTemplate = findMatchingTemplate(nonMatchingUrl, templates);

					expect(matchedTemplate).toBeUndefined();
				});
			});

			describe("when the provided url is not a valid url", () => {
				const setupTemplates = () => {
					const templates = schoolExternalToolConfigurationTemplateFactory.buildList(2);
					return { templates };
				};

				it("should return undefined", () => {
					const { findMatchingTemplate } = setup();
					const { templates } = setupTemplates();

					const searchText = "Tool";
					const matchedTemplate = findMatchingTemplate(searchText, templates);

					expect(matchedTemplate).toBeUndefined();
				});
			});
		});

		describe("when the provided url has path parameters", () => {
			describe("when the provided url matches the baseUrl and the path parameters of a template", () => {
				const setupTemplates = () => {
					const pathParameters = [
						toolParameterFactory.build({
							name: "parameter-1",
							location: ToolParameterLocation.PATH,
							isOptional: false,
						}),
						toolParameterFactory.build({
							name: "parameter-2",
							location: ToolParameterLocation.PATH,
							isOptional: false,
						}),
					];

					const templates = [
						schoolExternalToolConfigurationTemplateFactory.build({
							baseUrl: "https://test-1.com/:parameter-1/spacer/:parameter-2",
							parameters: pathParameters,
						}),
						schoolExternalToolConfigurationTemplateFactory.build({
							baseUrl: "https://test-2.com/:parameter-1/spacer/:parameter-2",
							parameters: pathParameters,
						}),
					];

					const matchingUrl = "https://test-1.com/test-param-1/spacer/test-param-2";

					const expectedMatch = templates[0];

					return { templates, matchingUrl, expectedMatch };
				};

				it("should return the matching template", () => {
					const { findMatchingTemplate } = setup();
					const { templates, matchingUrl, expectedMatch } = setupTemplates();

					const matchedTemplate = findMatchingTemplate(matchingUrl, templates);

					expect(matchedTemplate).toBeDefined();
					expect(matchedTemplate?.externalToolId).toEqual(expectedMatch.externalToolId);
				});
			});

			describe("when the provided url does not match the baseUrl and path parameters of any template", () => {
				const setupTemplates = () => {
					const pathParameters = [
						toolParameterFactory.build({
							name: "parameter-1",
							location: ToolParameterLocation.PATH,
							isOptional: false,
						}),
						toolParameterFactory.build({
							name: "parameter-2",
							location: ToolParameterLocation.PATH,
							isOptional: false,
						}),
					];

					const templates = [
						schoolExternalToolConfigurationTemplateFactory.build({
							baseUrl: "https://test-1.com/:parameter-1/spacer/:parameter-2",
							parameters: pathParameters,
						}),
						schoolExternalToolConfigurationTemplateFactory.build({
							baseUrl: "https://test-2.com/:parameter-1/spacer/:parameter-2",
							parameters: pathParameters,
						}),
					];

					const nonMatchingUrl = "https://test-1.com/parameter-1";

					return { templates, nonMatchingUrl };
				};

				it("should return undefined", () => {
					const { findMatchingTemplate } = setup();
					const { templates, nonMatchingUrl } = setupTemplates();

					const matchedTemplate = findMatchingTemplate(nonMatchingUrl, templates);

					expect(matchedTemplate).toBeUndefined();
				});
			});
		});

		describe("when the provided url has query parameters", () => {
			describe("when the provided url matches the baseUrl of a template", () => {
				const setupTemplates = () => {
					const queryParameters = [
						toolParameterFactory.build({
							name: "parameter-1",
							location: ToolParameterLocation.QUERY,
						}),
						toolParameterFactory.build({
							name: "parameter-2",
							location: ToolParameterLocation.QUERY,
						}),
					];

					const templates = [
						schoolExternalToolConfigurationTemplateFactory.build({
							baseUrl: "https://test-1.com",
							parameters: queryParameters,
						}),
						schoolExternalToolConfigurationTemplateFactory.build({
							baseUrl: "https://test-2.com",
							parameters: queryParameters,
						}),
					];

					const matchingUrl = "https://test-1.com?parameter-1=test-1&parameter-2=test2";

					const expectedMatch = templates[0];

					return { templates, matchingUrl, expectedMatch };
				};

				it("should return the matching template", () => {
					const { findMatchingTemplate } = setup();
					const { templates, matchingUrl, expectedMatch } = setupTemplates();

					const matchedTemplate = findMatchingTemplate(matchingUrl, templates);

					expect(matchedTemplate).toBeDefined();
					expect(matchedTemplate?.externalToolId).toEqual(expectedMatch.externalToolId);
				});
			});
		});
	});

	describe("extractPathParameters is called", () => {
		describe("when a valid url with path parameters is given", () => {
			const setupParameters = () => {
				const baseUrl = "https://test-1.com/:parameter-1/spacer/:parameter-2";

				const testUrl = "https://test-1.com/test-param-1/spacer/test-param-2";

				const testPathParameters = new Map<string, string>();
				testPathParameters.set("parameter-1", "test-param-1");
				testPathParameters.set("parameter-2", "test-param-2");

				return { baseUrl, testUrl, testPathParameters };
			};

			it("should return all path parameters from the input url based on the template url provided", () => {
				const { extractPathParameters } = setup();
				const { baseUrl, testUrl, testPathParameters } = setupParameters();

				const extractedParameters = extractPathParameters(testUrl, baseUrl);

				testPathParameters.forEach((paramValue, paramName) => {
					expect(extractedParameters.get(paramName)).toEqual(paramValue);
				});
			});
		});

		describe("when a valid url with path and query parameters is given", () => {
			const setupParameters = () => {
				const baseUrl = "https://test-1.com/:parameter-1/spacer/:parameter-2";

				const testUrl = "https://test-1.com/test-param-1/spacer/test-param-2?parameter-3=test-param-3";

				const testPathParameters = new Map<string, string>();
				testPathParameters.set("parameter-1", "test-param-1");
				testPathParameters.set("parameter-2", "test-param-2");

				return { baseUrl, testUrl, testPathParameters };
			};

			it("should return all path parameters from the input url based on the template url provided", () => {
				const { extractPathParameters } = setup();
				const { baseUrl, testUrl, testPathParameters } = setupParameters();

				const extractedParameters = extractPathParameters(testUrl, baseUrl);

				testPathParameters.forEach((paramValue, paramName) => {
					expect(extractedParameters.get(paramName)).toEqual(paramValue);
				});
			});
		});
	});

	describe("extractQueryParameters is called with a valid url", () => {
		describe("when a valid url with query parameters is given", () => {
			const setupParameters = () => {
				const testUrl = "https://test-1.com?parameter-1=test-param-1&parameter-2=test-param-2";

				const testQueryParameters = new Map<string, string>();
				testQueryParameters.set("parameter-1", "test-param-1");
				testQueryParameters.set("parameter-2", "test-param-2");

				return { testUrl, testQueryParameters };
			};

			it("should return all query parameters from the input url based on the template url provided", () => {
				const { extractQueryParameters } = setup();
				const { testUrl, testQueryParameters } = setupParameters();

				const extractedParameters = extractQueryParameters(testUrl);

				testQueryParameters.forEach((paramValue, paramName) => {
					expect(extractedParameters.get(paramName)).toEqual(paramValue);
				});
			});
		});

		describe("when a valid url with path and query parameters is given", () => {
			const setupParameters = () => {
				const testUrl = "https://test-1.com/test-param-3/spacer?parameter-1=test-param-1&parameter-2=test-param-2";

				const testQueryParameters = new Map<string, string>();
				testQueryParameters.set("parameter-1", "test-param-1");
				testQueryParameters.set("parameter-2", "test-param-2");

				return { testUrl, testQueryParameters };
			};

			it("should return all query parameters from the input url based on the template url provided", () => {
				const { extractQueryParameters } = setup();
				const { testUrl, testQueryParameters } = setupParameters();

				const extractedParameters = extractQueryParameters(testUrl);

				testQueryParameters.forEach((paramValue, paramName) => {
					expect(extractedParameters.get(paramName)).toEqual(paramValue);
				});
			});
		});
	});
});
