import { MetaDataEntityType, MetaTagExtractorApiFactory, MetaTagExtractorResponse } from "@/generated/serverApi/v3";
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

	const mapMetaTagResponse = (response: MetaTagExtractorResponse): MetaTagResult => {
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
			[MetaDataEntityType.COURSE]: "common.labels.course",
			[MetaDataEntityType.LESSON]: "common.words.topic",
			[MetaDataEntityType.TASK]: "common.words.task",
			[MetaDataEntityType.BOARD]: "common.words.board",
			[MetaDataEntityType.BOARD_CARD]: "components.boardCard",
		};

		const prefixKey: string | undefined = typeToLanguageKeyMap[type];

		return prefixKey ? `${t(prefixKey)}:` : "";
	};

	const getTitle = (type: MetaDataEntityType, title: string): string => {
		if (type === MetaDataEntityType.BOARD && !title) {
			return t("pages.room.boardCard.label.courseBoard");
		}

		return title;
	};

	const getSuffix = (type: MetaDataEntityType, parentTitle: string | undefined): string => {
		if (type === MetaDataEntityType.BOARD && parentTitle) {
			return `(${parentTitle})`;
		}

		return "";
	};

	const getMetaTags = async (url: string): Promise<MetaTagResult> => {
		try {
			const res: AxiosResponse<MetaTagExtractorResponse> = await metaTagApi.metaTagExtractorControllerGetMetaTags({
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
