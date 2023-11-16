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
		let title;
		if (response.type === "board") {
			const prefix = prefixTitle(response.parentTitle, response.parentType);
			const boardTitle =
				response.title !== ""
					? response.title
					: t("pages.room.boardCard.label.courseBoard");
			title = `${prefix} - ${boardTitle}`;
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
		const prefix = prefixKey ? `${t(prefixKey)}: ` : "";
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
