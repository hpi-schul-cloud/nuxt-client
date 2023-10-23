import { useImageUrlAccessor } from "./imageUrlAccessor.composable";
import { FileRecordParentType } from "@/fileStorageApi/v3";
import { MetaTagExtractorApiFactory } from "@/serverApi/v3";
import { $axios } from "@/utils/api";
import { useFileStorageApi } from "@feature-board-file-element";

type Result = {
	url: string;
	title: string;
	description: string;
	imageUrl?: string;
};

export const useMetaTagExtractorApi = (elementId: string) => {
	const metaTagApi = MetaTagExtractorApiFactory(undefined, "/v3", $axios);

	const { uploadFromUrl } = useFileStorageApi(
		elementId,
		FileRecordParentType.BOARDNODES
	);

	const { getPreviewImageUrl } = useImageUrlAccessor(elementId);

	const getData = async (url: string): Promise<Result> => {
		// WIP: handle server not reachable exception
		const res = await metaTagApi.metaTagExtractorControllerGetData({
			url,
		});
		const { title, description, imageUrl } = res.data;

		const result: Result = {
			url,
			title,
			description,
		};

		if (imageUrl) {
			await uploadFromUrl(imageUrl);
			result.imageUrl = await getPreviewImageUrl();
		}

		return result;
	};

	return {
		getData,
	};
};
