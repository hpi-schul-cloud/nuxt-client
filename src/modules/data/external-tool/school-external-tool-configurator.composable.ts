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

	const schoolExternalToolConfigurationTemplates = ref<SchoolExternalToolConfigurationTemplate[]>([]);

	const { execute: execLoadTool } = useSafeAxiosTask();
	const { execute: execLoadAvailableTools, isRunning: isLoadingAvailableTools } = useSafeAxiosTask();
	const { execute: execLoadConfigurationTemplate, isRunning: isLoadingConfigurationTemplate } = useSafeAxiosTask();
	const { execute: execCreateOrUpdateTool, error: createOrUpdateToolError } = useSafeAxiosTask();

	const loadSchoolExternalTool = async (schoolExternalToolId: string) => {
		const { result } = await execLoadTool(
			() => toolApi.toolSchoolControllerGetSchoolExternalTool(schoolExternalToolId),
			t("error.load")
		);
		return result?.data;
	};

	const loadAvailableToolsForSchool = async (schoolId: string) => {
		const { result, success } = await execLoadAvailableTools(
			() => toolApi.toolConfigurationControllerGetAvailableToolsForSchool(schoolId),
			t("error.load")
		);
		if (success && result) {
			schoolExternalToolConfigurationTemplates.value =
				SchoolExternalToolMapper.mapToSchoolExternalToolConfigurationTemplateList(result.data);
		}
	};

	const loadConfigurationTemplateForSchoolExternalTool = async (schoolExternalToolId: string) => {
		const { result, success } = await execLoadConfigurationTemplate(
			() => toolApi.toolConfigurationControllerGetConfigurationTemplateForSchool(schoolExternalToolId),
			t("error.load")
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
