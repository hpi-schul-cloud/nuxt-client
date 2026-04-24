import { SchoolExternalToolSave } from "../../../store/external-tool";
import { SchoolExternalToolMapper } from "../../../store/external-tool/mapper";
import { useSafeAxiosTask } from "@/composables/async-tasks.composable";
import { useI18nGlobal } from "@/plugins/i18n";
import { $axios } from "@/utils/api";
import { ToolApiFactory } from "@api-server";
import { SchoolExternalToolConfigurationTemplate } from "@data-external-tool";
import { ref } from "vue";

export const useSchoolExternalToolConfigurator = () => {
	const { t } = useI18nGlobal();
	const toolApi = ToolApiFactory(undefined, "v3", $axios);

	const schoolExternalToolConfigurationTemplates = ref<SchoolExternalToolConfigurationTemplate[]>([]); // Page

	const { execute: execLoadTool } = useSafeAxiosTask(); // Page
	const { execute: execLoadAvailableTools, isRunning: isLoadingAvailableTools } = useSafeAxiosTask(); // Page
	const { execute: execLoadConfigurationTemplate, isRunning: isLoadingConfigurationTemplate } = useSafeAxiosTask(); // Page
	const { execute: execCreateOrUpdateTool, error: createOrUpdateToolError } = useSafeAxiosTask(); // Page

	// Page
	const loadSchoolExternalTool = async (schoolExternalToolId: string) => {
		const { result } = await execLoadTool(
			() => toolApi.toolSchoolControllerGetSchoolExternalTool(schoolExternalToolId),
			"Fehler beim Laden des externen Tools" // TODO: CHANGE
		);
		return result?.data;
	};

	// Page
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

	// Page
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

	// Page
	const createSchoolExternalTool = async (schoolExternalTool: SchoolExternalToolSave) => {
		await execCreateOrUpdateTool(() => toolApi.toolSchoolControllerCreateSchoolExternalTool(schoolExternalTool));
	};

	// Page
	const updateSchoolExternalTool = async (params: {
		schoolExternalToolId: string;
		schoolExternalTool: SchoolExternalToolSave;
	}) => {
		await execCreateOrUpdateTool(() =>
			toolApi.toolSchoolControllerUpdateSchoolExternalTool(params.schoolExternalToolId, params.schoolExternalTool)
		);
	};

	return {
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
