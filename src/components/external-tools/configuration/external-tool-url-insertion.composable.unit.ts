import {
	mountComposable,
	schoolExternalToolConfigurationTemplateFactory,
} from "@@/tests/test-utils";
import { useExternalToolUrlInsertion } from "@/components/external-tools/configuration/external-tool-url-insertion.composable";

describe("useExternalToolUrlInsertion", () => {
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
				"https://google",
				"https://g@@gle.de",
				"My Tool",
				"http://unsecure.c12",
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

			it("should return undefined if provided url is not valid", () => {
				const { findMatchingTemplate, templates } = setup();
				expect(findMatchingTemplate("my-tool", templates)).toBeUndefined();
			});
		});
	});
});
