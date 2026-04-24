import { $axios } from "@/utils/api";
import { H5pEditorApiFactory } from "@api-h5p";
import { notifyError } from "@data-app";
import { AxiosResponse } from "axios";
import { useI18n } from "vue-i18n";

export const useH5PEditorApi = () => {
	const h5pEditorApi = H5pEditorApiFactory(undefined, "/v3", $axios);

	const { t } = useI18n();

	const getContentTitle = async (contentId: string): Promise<string | undefined> => {
		let title: string | undefined;

		await h5pEditorApi
			.getContentParameters(contentId)
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

	const downloadContentFile = async (contentId: string, filename?: string): Promise<void> => {
		try {
			const response = (await h5pEditorApi.downloadH5pContent(contentId, {
				responseType: "blob",
			})) as unknown as AxiosResponse<Blob>;

			const url = window.URL.createObjectURL(response.data);
			const link = document.createElement("a");
			link.href = url;
			link.download = filename ?? `h5p-content-${contentId}.h5p`;
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
			window.URL.revokeObjectURL(url);
		} catch {
			notifyError(t("components.cardElement.h5pElement.download.error"));
		}
	};

	return { getContentTitle, downloadContentFile };
};
