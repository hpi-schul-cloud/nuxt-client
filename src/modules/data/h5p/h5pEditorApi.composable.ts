import { H5pEditorApiFactory } from "@/h5pEditorApi/v3";
import { $axios } from "@/utils/api";
import { notifyError } from "@data-app";
import { AxiosResponse } from "axios";
import { useI18n } from "vue-i18n";

export const useH5PEditorApi = () => {
	const h5pEditorApi = H5pEditorApiFactory(undefined, "/v3", $axios);

	const { t } = useI18n();

	const getContentTitle = async (contentId: string): Promise<string | undefined> => {
		let title: string | undefined;

		await h5pEditorApi
			.h5PEditorControllerGetContentParameters(contentId)
			.then((response: AxiosResponse) => {
				title = response?.data?.h5p?.title;
			})
			.catch(() => {
				title = undefined;
			});

		if (!title) {
			notifyError(t("components.cardElement.h5pElement.title.error.load"));
		}

		return title;
	};

	return { getContentTitle };
};
