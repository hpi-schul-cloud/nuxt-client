import { useCollaborativeTextEditorNotifier } from "./CollaborativeTextEditorNotifications.composable";
import {
	CollaborativeTextEditorApiFactory,
	CollaborativeTextEditorApiInterface,
	CollaborativeTextEditorParentType,
} from "@/serverApi/v3";
import { $axios, mapAxiosErrorToResponseError } from "@/utils/api";
import { createTestableGlobaleState } from "@/utils/create-global-state";

export enum ErrorType {
	Unauthorized = "Unauthorized",
	Forbidden = "Forbidden",
}

const collaborativeTextEditorApi = () => {
	const collaborativeTextEditorApi: CollaborativeTextEditorApiInterface = CollaborativeTextEditorApiFactory(
		undefined,
		"/v3",
		$axios
	);

	const { showForbiddenError, showUnauthorizedError, showInternalServerError } = useCollaborativeTextEditorNotifier();

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
			showError(error);
		}
	};

	const showError = (error: unknown) => {
		const responseError = mapAxiosErrorToResponseError(error);
		const { message } = responseError;

		showMessageByType(message);
	};

	const showMessageByType = (message: ErrorType | string) => {
		switch (message) {
			case ErrorType.Unauthorized:
				showUnauthorizedError();
				break;
			case ErrorType.Forbidden:
				showForbiddenError();
				break;
			default:
				showInternalServerError();
				break;
		}
	};

	return {
		getUrl,
	};
};

export const useCollaborativeTextEditorApi = createTestableGlobaleState(collaborativeTextEditorApi);
