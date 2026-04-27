import { SchoolExternalTool } from "../../../store/external-tool";
import { notifySuccess } from "../application/notification-store";
import { useSafeAxiosTask } from "@/composables/async-tasks.composable";
import { useI18nGlobal } from "@/plugins/i18n";
import { $axios } from "@/utils/api";
import { ToolApiFactory } from "@api-server";
import { ref } from "vue";

export const useSchoolExternalTools = () => {
	const { t } = useI18nGlobal();
	const toolApi = ToolApiFactory(undefined, "v3", $axios);

	const schoolExternalTools = ref<SchoolExternalTool[]>([]);

	const { execute: execLoadTools, isRunning: isLoadingExternalTools } = useSafeAxiosTask();
	const { execute: execDeleteTool } = useSafeAxiosTask();

	const loadSchoolExternalTools = async (schoolId: string) => {
		const { result, success } = await execLoadTools(() => toolApi.toolSchoolControllerGetSchoolExternalTools(schoolId));

		if (success && result) {
			schoolExternalTools.value = result.data.data;
		}
	};

	const deleteSchoolExternalTool = async (schoolExternalToolId: string) => {
		const { success } = await execDeleteTool(
			() => toolApi.toolSchoolControllerDeleteSchoolExternalTool(schoolExternalToolId),
			t("common.notifications.errors.notDeleted", { type: t("components.cardElement.externalToolElement") })
		);

		if (success) {
			schoolExternalTools.value = schoolExternalTools.value.filter(
				(tool: SchoolExternalTool) => tool.id !== schoolExternalToolId
			);
			notifySuccess(t("components.administration.externalToolsSection.notification.deleted"));
		}
	};

	return {
		loadSchoolExternalTools,
		schoolExternalTools,
		isLoadingExternalTools,
		deleteSchoolExternalTool,
	};
};
