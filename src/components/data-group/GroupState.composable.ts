import { ref, Ref } from "vue";
import { Group, useGroupApi } from "./index";
import { useErrorHandler } from "@/components/error-handling/ErrorHandler.composable";

export const useGroupState = () => {
	const { handleError } = useErrorHandler();
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
