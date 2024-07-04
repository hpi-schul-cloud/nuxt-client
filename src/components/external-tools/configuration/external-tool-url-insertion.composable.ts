import { ExternalToolConfigurationTemplate } from "@data-external-tool";
import { Ref } from "vue";

export function useExternalToolUrlInsertion() {
	const isValidUrl = (text: string): boolean => {
		const urlRegex = new RegExp(
			"^(https?:\\/\\/)[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)+.*"
		);
		return urlRegex.test(text);
	};

	const findMatchingTemplate = (
		searchText: string,
		configurationTemplates: Ref<ExternalToolConfigurationTemplate[]>
	): ExternalToolConfigurationTemplate | undefined => {
		if (!isValidUrl(searchText)) {
			return undefined;
		}

		const url = new URL(searchText);
		const matchedTemplate = configurationTemplates.value.find((template) => {
			const baseUrlRegex = new RegExp(
				`^${template.baseUrl.replace(/:\w+/g, "\\w+")}$`
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
		// params aus baseUrl holen
		const urlParts = templateBaseUrl.split("/");
		const templateParamNames = urlParts
			.filter((part) => part.startsWith(":"))
			.map((part) => part.substring(1));

		// regex, um parameter werte aus url holen
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
