import { MetaTagExtractorApiFactory } from "@/serverApi/v3";
import { $axios } from "@/utils/api";

type Result = {
	url: string;
	title: string;
	description: string;
	imageUrl?: string;
};

export const useMetaTagExtractorApi = () => {
	const metaTagApi = MetaTagExtractorApiFactory(undefined, "/v3", $axios);

	const getData = async (url: string): Promise<Result> => {
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
		getData,
	};
};
