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
		const prefix = getPrefix(response.type);
		const postfix = getSuffix(response.type, response.parentTitle);
		let title = getTitle(response.type, response.title);
		title = `${prefix}${title}${postfix}`;
		return { ...response, title };
	};

	const getPrefix = (type: string) => {
		const typeToLanguageKeyMap: Record<string, string> = {
			course: "common.labels.course",
			lesson: "common.words.topic",
			task: "common.words.task",
			board: "components.board",
		};

		const prefixKey = typeToLanguageKeyMap[type];
		const prefix = prefixKey ? `${t(prefixKey)}: ` : "";
		return prefix;
	};

	const getTitle = (type: string, title: string) => {
		if (type === "board" && title == "") {
			return t("pages.room.boardCard.label.courseBoard");
		}
		return title;
	};

	const getSuffix = (type: string, parentTitle: string) => {
		if (type === "board" && parentTitle.length > 0) {
			return ` (${parentTitle})`;
		}
		return "";
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
