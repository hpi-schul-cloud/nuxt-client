import {
	CollaborativeTextEditorApiFactory,
	CollaborativeTextEditorApiInterface,
	CollaborativeTextEditorParentType,
} from "@/serverApi/v3";
import { $axios, mapAxiosErrorToResponseError } from "@/utils/api";
import { createTestableGlobaleState } from "@/utils/create-global-state";
import { notifyError } from "@data-app";
import { useI18n } from "vue-i18n";

export enum ErrorType {
	Unauthorized = "Unauthorized",
	Forbidden = "Forbidden",
}

const collaborativeTextEditorApi = () => {
	const { t } = useI18n();
	const collaborativeTextEditorApi: CollaborativeTextEditorApiInterface = CollaborativeTextEditorApiFactory(
		undefined,
		"/v3",
		$axios
	);

	const getUrl = async (
		parentId: string,
		parentType: CollaborativeTextEditorParentType
	): Promise<string | undefined> => {
		try {
			const response =
				await collaborativeTextEditorApi.collaborativeTextEditorControllerGetOrCreateCollaborativeTextEditorForParent(
					parentId,
					parentType
				);

			return response.data.url;
		} catch (error) {
			const { message } = mapAxiosErrorToResponseError(error);
			showMessageByType(message);
		}
	};

	const showMessageByType = (message: ErrorType | string) => {
		switch (message) {
			case ErrorType.Unauthorized:
				notifyError(t("error.401"));
				break;
			case ErrorType.Forbidden:
				notifyError(t("error.403"));
				break;
			default:
				notifyError(
					t("components.board.notifications.errors.notCreated", {
						type: t("components.cardElement.collaborativeTextEditorElement"),
					})
				);
				break;
		}
	};

	return {
		getUrl,
	};
};

export const useCollaborativeTextEditorApi = createTestableGlobaleState(collaborativeTextEditorApi);
