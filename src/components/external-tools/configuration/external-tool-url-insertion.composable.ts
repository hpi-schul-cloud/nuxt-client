import { ExternalToolConfigurationTemplate } from "@data-external-tool";
import { Ref } from "vue";

export function useExternalToolUrlInsertion() {
	const isValidUrl = (text: string): boolean => {
		const pattern = new RegExp(
			"^(https?:\\/\\/)?" +
				"((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
				"((\\d{1,3}\\.){3}\\d{1,3}))" +
				"(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
				"(\\?[;&a-z\\d%_.~+=-]*)?" +
				"(\\#[-a-z\\d_]*)?$",
			"i"
		);
		return pattern.test(text);
	};

	const findMatchingTemplate = (
		searchText: string,
		configurationTemplates: ExternalToolConfigurationTemplate[]
	): ExternalToolConfigurationTemplate | undefined => {
		if (!isValidUrl(searchText)) {
			return undefined;
		}

		const url = new URL(searchText);
		const matchedTemplate = configurationTemplates.find((template) => {
			let regexString = template.baseUrl;
			if (!regexString.endsWith("/")) {
				regexString += "/";
			}
			const baseUrlRegex = new RegExp(
				`^${regexString.replace(/:\w+/g, "\\w+")}$`
			);
			return baseUrlRegex.test(url.href.split("?")[0]);
		});

		if (matchedTemplate) {
			return matchedTemplate;
		}
		return undefined;
	};

	const extractPathParameters = (
		inputtedUrl: string,
		templateBaseUrl: string
	): Map<string, string> => {
		// TODO: simplify if possible
		const urlParts = templateBaseUrl.split("/");
		const templateParamNames = urlParts
			.filter((part) => part.startsWith(":"))
			.map((part) => part.substring(1));

		const urlRegex = new RegExp(
			`${templateBaseUrl
				.replace(/\\/g, "\\\\")
				.replace(/:\w+/g, "(\\w+)")
				.replace(/\//g, "\\/")}`
		);

		const match = inputtedUrl.match(urlRegex);
		const paramsNameValueMap: Map<string, string> = new Map<string, string>();
		if (match) {
			const parameterValues = match.slice(1);
			parameterValues.forEach((value, index) => {
				const paramName = templateParamNames[index];
				paramsNameValueMap.set(paramName, value);
			});
		}
		return paramsNameValueMap;
	};

	const extractQueryParameters = (inputtedUrl: string): Map<string, string> => {
		const paramsNameValueMap: Map<string, string> = new Map<string, string>();
		if (isValidUrl(inputtedUrl)) {
			const url = new URL(inputtedUrl);
			url.searchParams.forEach((value, name) => {
				paramsNameValueMap.set(name, value);
			});
		}
		return paramsNameValueMap;
	};

	return {
		isValidUrl,
		findMatchingTemplate,
		extractPathParameters,
		extractQueryParameters,
	};
}
