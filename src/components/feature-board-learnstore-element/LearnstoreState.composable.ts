import { BusinessError } from "@/store/types/commons";
import { mapAxiosErrorToResponseError } from "@/utils/api";
import { ref, Ref } from "vue";
import ContentModule from "@/store/content";
import { Resource } from "@/store/types/content";

export const useLearnstoreState = (learnstoreModule: ContentModule) => {
	const resource: Ref<Resource | undefined> = ref();
	const isLoading: Ref<boolean> = ref(false);
	const error: Ref<BusinessError | undefined> = ref(undefined);

	const fetchContent = async (id: string): Promise<void> => {
		isLoading.value = true;
		error.value = undefined;

		try {
			await learnstoreModule.getResourceMetadata(id);
			resource.value = learnstoreModule.getCurrentResource;
		} catch (errorResponse) {
			const apiError = mapAxiosErrorToResponseError(errorResponse);

			error.value = {
				error: apiError,
				statusCode: apiError.code,
				message: apiError.message,
			};
		}

		isLoading.value = false;
	};

	return {
		resource,
		isLoading,
		error,
		fetchContent,
	};
};
