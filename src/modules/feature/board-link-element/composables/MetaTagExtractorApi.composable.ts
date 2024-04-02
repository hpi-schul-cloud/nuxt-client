import {
	MetaTagExtractorApiFactory,
	MetaTagExtractorResponse,
} from "@/serverApi/v3";
import { $axios } from "@/utils/api";
import { useI18n } from "vue-i18n";

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
		const titleParts = [
			getPrefix(response.type),
			getTitle(response.type, response.title),
			getSuffix(response.type, response.parentTitle),
		];
		const title = titleParts.join(" ").trim();
		return { ...response, title };
	};

	const getPrefix = (type: string): string => {
		const typeToLanguageKeyMap: Record<string, string> = {
			course: "common.labels.course",
			lesson: "common.words.topic",
			task: "common.words.task",
			board: "components.board",
		};

		const prefixKey = typeToLanguageKeyMap[type];
		return prefixKey ? `${t(prefixKey)}:` : "";
	};

	const getTitle = (type: string, title: string) => {
		if (type === "board" && title == "") {
			return t("pages.room.boardCard.label.courseBoard");
		}
		return title;
	};

	const getSuffix = (type: string, parentTitle: string): string => {
		if (type === "board" && parentTitle !== "") {
			return `(${parentTitle})`;
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
