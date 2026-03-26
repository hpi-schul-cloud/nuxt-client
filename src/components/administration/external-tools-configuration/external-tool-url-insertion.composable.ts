import { ExternalToolConfigurationTemplate } from "@data-external-tool";

export function useExternalToolUrlInsertion() {
	const isValidUrl = (text: string): boolean => {
		try {
			new URL(text);
			return true;
		} catch {
			return false;
		}
	};

	const createBaseUrlRegex = (baseUrl: string) => {
		if (!baseUrl.endsWith("/")) {
			baseUrl += "/";
		}
		const pathParamsReplaced = `^${baseUrl.replace(/:[^/]+/g, "([^/]+)")}$`;
		const baseUrlRegex = new RegExp(pathParamsReplaced);
		return baseUrlRegex;
	};

	const getUrlWithoutQueryParams = (url: string) => {
		let urlWithoutQuery = url.split("?")[0];
		if (!urlWithoutQuery.endsWith("/")) {
			urlWithoutQuery += "/";
		}
		return urlWithoutQuery;
	};

	const findMatchingTemplate = (
		searchText: string,
		configurationTemplates: ExternalToolConfigurationTemplate[]
	): ExternalToolConfigurationTemplate | undefined => {
		if (!isValidUrl(searchText)) {
			return undefined;
		}

		const matchedTemplate = configurationTemplates.find((template) => {
			const baseUrlRegex = createBaseUrlRegex(template.baseUrl);
			const urlWithoutQuery = getUrlWithoutQueryParams(searchText);
			return baseUrlRegex.test(urlWithoutQuery);
		});

		if (matchedTemplate) {
			return matchedTemplate;
		}
		return undefined;
	};

	const extractPathParameters = (inputtedUrl: string, templateBaseUrl: string): Map<string, string> => {
		const paramsNameValueMap: Map<string, string> = new Map<string, string>();
		if (!isValidUrl(inputtedUrl)) {
			return paramsNameValueMap;
		}

		const urlParts = templateBaseUrl.split("/");
		const templateParamNames = urlParts.filter((part) => part.startsWith(":")).map((part) => part.substring(1));

		const baseUrlRegex = createBaseUrlRegex(templateBaseUrl);
		const inputUrlWithoutQuery = getUrlWithoutQueryParams(inputtedUrl);
		const match = inputUrlWithoutQuery.match(baseUrlRegex);

		if (match) {
			const matchedParamValues = match.slice(1);
			matchedParamValues.forEach((value, index) => {
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
