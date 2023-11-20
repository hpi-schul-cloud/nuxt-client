import { useSchoolExternalToolApi } from "./SchoolExternalToolApi.composable";
import { ref, Ref } from "vue";
import { BusinessError } from "@/store/types/commons";
import { mapAxiosErrorToResponseError } from "../../utils/api";
import { SchoolExternalToolMetadata } from "@/store/external-tool";

export const useSchoolExternalToolUsage = () => {
	const { fetchSchoolExternalToolMetadata } = useSchoolExternalToolApi();

	const metadata: Ref<SchoolExternalToolMetadata | undefined> = ref();
	const isLoading: Ref<boolean> = ref(false);
	const error: Ref<BusinessError | undefined> = ref();

	const fetchSchoolExternalToolUsage = async (
		schoolExternalToolId: string
	): Promise<void> => {
		isLoading.value = true;
		error.value = undefined;

		try {
			const schoolExternalToolMetadata =
				await fetchSchoolExternalToolMetadata(schoolExternalToolId);
			metadata.value = schoolExternalToolMetadata;
		} catch (axiosError: unknown) {
			const apiError = mapAxiosErrorToResponseError(axiosError);

			error.value = {
				error: apiError,
				message: apiError.message,
				statusCode: apiError.code,
			};
		}

		isLoading.value = false;
	};

	return {
		isLoading,
		error,
		metadata,
		fetchSchoolExternalToolUsage,
	};
};
