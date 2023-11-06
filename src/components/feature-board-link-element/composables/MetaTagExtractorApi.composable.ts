import { MetaTagExtractorApiFactory } from "@/serverApi/v3";
import { $axios } from "@/utils/api";

type MetaTagResult = {
	url: string;
	title: string;
	description: string;
	imageUrl?: string;
};

export const useMetaTagExtractorApi = () => {
	const metaTagApi = MetaTagExtractorApiFactory(undefined, "/v3", $axios);

	const extractMetaTags = async (url: string): Promise<MetaTagResult> => {
		try {
			const res = await metaTagApi.metaTagExtractorControllerGetData({
				url,
			});

			return res.data;
		} catch (e) {
			return {
				url,
				title: "",
				description: "",
			};
		}
	};

	return {
		extractMetaTags,
	};
};
