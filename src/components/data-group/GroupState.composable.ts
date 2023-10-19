import { useErrorHandler } from "@/components/error-handling/ErrorHandler.composable";
import { ref, Ref } from "vue";
import { Group, useGroupApi } from "./index";

export const useGroupState = () => {
	const { handleError } = useErrorHandler(); // TODO: This error handler is board specific
	const { getGroup } = useGroupApi();

	const isLoading: Ref<boolean> = ref(false);
	const group: Ref<Group | undefined> = ref();

	const fetchGroup = async (groupId: string): Promise<void> => {
		isLoading.value = true;

		try {
			const fetchedGroup: Group = await getGroup(groupId);
			group.value = fetchedGroup;
		} catch (error) {
			handleError(error);
		}

		isLoading.value = false;
	};

	return {
		isLoading,
		group,
		fetchGroup,
	};
};
