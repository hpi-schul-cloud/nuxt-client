import { useErrorHandler } from "@/components/error-handling/ErrorHandler.composable";
import { ref, Ref } from "vue";
import { Group, useGroupApi } from "@data-group";

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
			// TODO: fix this
			handleError(error, {
				404: undefined,
				500: undefined,
			});
		}

		isLoading.value = false;
	};

	return {
		isLoading,
		group,
		fetchGroup,
	};
};
