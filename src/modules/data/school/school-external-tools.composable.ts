import { SchoolExternalTool, SchoolExternalToolSave } from "../../../store/external-tool";
import { SchoolExternalToolMapper } from "../../../store/external-tool/mapper";
import { notifySuccess } from "../application/notification-store";
import { useSafeAxiosTask } from "@/composables/async-tasks.composable";
import { useI18nGlobal } from "@/plugins/i18n";
import { $axios } from "@/utils/api";
import { ToolApiFactory } from "@api-server";
import { ContextExternalToolConfigurationTemplate, SchoolExternalToolConfigurationTemplate } from "@data-external-tool";
import { ref } from "vue";

export const useSchoolExternalTools = () => {
	const { t } = useI18nGlobal();
	const schoolExternalTools = ref<SchoolExternalTool[]>([]);
	const schoolExternalToolConfigurationTemplates = ref<SchoolExternalToolConfigurationTemplate[]>([]);
	const contextExternalToolConfigurationTemplate = ref<ContextExternalToolConfigurationTemplate | undefined>(undefined);

	const toolApi = ToolApiFactory(undefined, "v3", $axios);

	const { execute: execLoadTools, isRunning: isLoadingExternalTools, error: loadToolsError } = useSafeAxiosTask();
	const { execute: execLoadTool, isRunning: isLoadingExternalTool, error: loadToolError } = useSafeAxiosTask();
	const { execute: execDeleteTool, isRunning: isDeletingTool, error: deleteToolError } = useSafeAxiosTask();
	const {
		execute: execLoadAvailableTools,
		isRunning: isLoadingAvailableTools,
		error: loadAvailableToolsError,
	} = useSafeAxiosTask();
	const {
		execute: execLoadConfigurationTemplate,
		isRunning: isLoadingConfigurationTemplate,
		error: loadConfigurationTemplateError,
	} = useSafeAxiosTask();
	const {
		execute: execCreateOrUpdateTool,
		isRunning: isCreatingOrUpdatingTool,
		error: createOrUpdateToolError,
	} = useSafeAxiosTask();

	const loadSchoolExternalTools = async (schoolId: string) => {
		// maybe add error message here
		const { result, success } = await execLoadTools(() => toolApi.toolSchoolControllerGetSchoolExternalTools(schoolId));

		if (success && result) {
			schoolExternalTools.value = result.data.data;
		}
	};

	const loadSchoolExternalTool = async (schoolExternalToolId: string) => {
		const { result } = await execLoadTool(
			() => toolApi.toolSchoolControllerGetSchoolExternalTool(schoolExternalToolId),
			"Fehler beim Laden des externen Tools" // TODO: CHANGE
		);
		return result?.data;
	};

	const deleteSchoolExternalTool = async (schoolExternalToolId: string) => {
		const { success } = await execDeleteTool(() =>
			toolApi.toolSchoolControllerDeleteSchoolExternalTool(schoolExternalToolId)
		);

		if (success) {
			schoolExternalTools.value = schoolExternalTools.value.filter(
				(tool: SchoolExternalTool) => tool.id !== schoolExternalToolId
			);
			notifySuccess(t("components.administration.externalToolsSection.notification.deleted"));
		}
	};

	const loadAvailableToolsForSchool = async (schoolId: string) => {
		const { result, success } = await execLoadAvailableTools(
			() => toolApi.toolConfigurationControllerGetAvailableToolsForSchool(schoolId),
			"Fehler beim Laden der verfügbaren Tools für die Schule" // TODO: CHANGE
		);
		if (success && result) {
			schoolExternalToolConfigurationTemplates.value =
				SchoolExternalToolMapper.mapToSchoolExternalToolConfigurationTemplateList(result.data);
		}
	};

	const loadConfigurationTemplateForSchoolExternalTool = async (schoolExternalToolId: string) => {
		const { result, success } = await execLoadConfigurationTemplate(
			() => toolApi.toolConfigurationControllerGetConfigurationTemplateForSchool(schoolExternalToolId),
			"Fehler beim Laden der Konfiguration für das externe Tool" // TODO: CHANGE
		);

		if (success && result) {
			schoolExternalToolConfigurationTemplates.value = [
				SchoolExternalToolMapper.mapToSchoolExternalToolConfigurationTemplate(result.data),
			];
		}
	};

	const createSchoolExternalTool = async (schoolExternalTool: SchoolExternalToolSave) => {
		await execCreateOrUpdateTool(() => toolApi.toolSchoolControllerCreateSchoolExternalTool(schoolExternalTool));
	};

	const updateSchoolExternalTool = async (params: {
		schoolExternalToolId: string;
		schoolExternalTool: SchoolExternalToolSave;
	}) => {
		await execCreateOrUpdateTool(() =>
			toolApi.toolSchoolControllerUpdateSchoolExternalTool(params.schoolExternalToolId, params.schoolExternalTool)
		);
	};

	return {
		loadSchoolExternalTools,
		schoolExternalTools,
		isLoadingExternalTools,
		deleteSchoolExternalTool,
		loadConfigurationTemplateForSchoolExternalTool,
		loadSchoolExternalTool,
		loadAvailableToolsForSchool,
		updateSchoolExternalTool,
		createSchoolExternalTool,
		schoolExternalToolConfigurationTemplates,
		createOrUpdateToolError,
		isLoadingAvailableTools,
		isLoadingConfigurationTemplate,
	};
};
