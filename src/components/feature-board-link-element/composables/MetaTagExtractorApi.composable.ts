import {
	MetaTagExtractorApiFactory,
	MetaTagExtractorResponse,
} from "@/serverApi/v3";
import { $axios } from "@/utils/api";
import { useI18n } from "@/composables/i18n.composable";

type MetaTagResult = {
	url: string;
	title: string;
	description: string;
	imageUrl?: string;
};

export const useMetaTagExtractorApi = () => {
	const { t } = useI18n();
	const metaTagApi = MetaTagExtractorApiFactory(undefined, "/v3", $axios);

	const mapMetaTagResponse = (
		response: MetaTagExtractorResponse
	): MetaTagResult => {
		console.log("response", response);
		let title;
		console.log("response.type", response.type);
		console.log('response.type === "board"', response.type === "board");
		if (response.type === "board") {
			const prefix = prefixTitle(response.parentTitle, response.parentType);
			console.log("prefix", prefix);
			const boardTitle =
				response.title !== ""
					? response.title
					: t("pages.room.boardCard.label.courseBoard");
			console.log("boardTitle", boardTitle);
			title = `${prefix} - ${boardTitle}`;
			console.log("title", title);
		} else {
			title = prefixTitle(response.title, response.type);
		}

		return { ...response, title };
	};

	const prefixTitle = (title: string, type: string) => {
		const typeToLanguageKeyMap: Record<string, string> = {
			course: "common.labels.course",
			lesson: "common.words.topic",
			task: "common.words.task",
		};

		const prefixKey = typeToLanguageKeyMap[type];
		console.log("prefixKey", prefixKey);
		const prefix = prefixKey ? `${t(prefixKey)}: ` : "";
		console.log("prefix", prefix);
		return `${prefix}${title}`;
	};

	const getMetaTags = async (url: string): Promise<MetaTagResult> => {
		try {
			const res = await metaTagApi.metaTagExtractorControllerGetMetaTags({
				url,
			});
			return mapMetaTagResponse(res.data);
		} catch (e) {
			return {
				url,
				title: "",
				description: "",
			};
		}
	};

	return {
		getMetaTags,
	};
};
