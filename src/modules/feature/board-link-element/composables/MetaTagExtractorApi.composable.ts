import {
	MetaDataEntityType,
	MetaTagExtractorApiFactory,
	MetaTagExtractorResponse,
} from "@/serverApi/v3";
import { $axios } from "@/utils/api";
import { AxiosResponse } from "axios";
import { useI18n } from "vue-i18n";

export type MetaTagResult = {
	url: string;
	title: string;
	description: string;
	imageUrl?: string;
	originalImageUrl?: string;
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

		return {
			...response,
			title,
		};
	};

	const getPrefix = (type: MetaDataEntityType): string => {
		const typeToLanguageKeyMap: Partial<Record<MetaDataEntityType, string>> = {
			[MetaDataEntityType.Course]: "common.labels.course",
			[MetaDataEntityType.Lesson]: "common.words.topic",
			[MetaDataEntityType.Task]: "common.words.task",
			[MetaDataEntityType.Board]: "components.board",
			[MetaDataEntityType.BoardCard]: "components.boardCard",
		};

		const prefixKey: string | undefined = typeToLanguageKeyMap[type];

		return prefixKey ? `${t(prefixKey)}:` : "";
	};

	const getTitle = (type: MetaDataEntityType, title: string): string => {
		if (type === MetaDataEntityType.Board && !title) {
			return t("pages.room.boardCard.label.courseBoard");
		}

		return title;
	};

	const getSuffix = (
		type: MetaDataEntityType,
		parentTitle: string | undefined
	): string => {
		if (type === MetaDataEntityType.Board && parentTitle) {
			return `(${parentTitle})`;
		}

		return "";
	};

	const getMetaTags = async (url: string): Promise<MetaTagResult> => {
		try {
			const res: AxiosResponse<MetaTagExtractorResponse> =
				await metaTagApi.metaTagExtractorControllerGetMetaTags({
					url,
				});

			const metaTagResult: MetaTagResult = mapMetaTagResponse(res.data);

			return metaTagResult;
		} catch {
			return {
				url: "",
				title: "",
				description: "",
			};
		}
	};

	return {
		getMetaTags,
	};
};
