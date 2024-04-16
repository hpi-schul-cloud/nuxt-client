import { NOTIFIER_MODULE_KEY, injectStrict } from "@/utils/inject";
import { useI18n } from "vue-i18n";

export const useCollaborativeTextEditorNotifier = () => {
	const { t } = useI18n();
	const notifierModule = injectStrict(NOTIFIER_MODULE_KEY);

	const showFailure = (text: string | undefined) => {
		notifierModule.show({
			text,
			status: "error",
			timeout: 5000,
		});
	};

	const showForbiddenError = () => {
		const message = t("error.403");

		showFailure(message);
	};

	const showUnauthorizedError = () => {
		const message = t("error.401");

		showFailure(message);
	};

	const showInternalServerError = () => {
		const message = t(
			"components.board.notifications.errors.fileServiceNotAvailable"
		);

		showFailure(message);
	};

	return {
		showForbiddenError,
		showUnauthorizedError,
		showInternalServerError,
	};
};
