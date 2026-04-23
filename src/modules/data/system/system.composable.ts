import { useSafeAxiosTask } from "@/composables/async-tasks.composable";
import { $axios } from "@/utils/api";
import { SystemsApiFactory } from "@api-server";
import { computed, Ref, ref, watch } from "vue";

export const useSystem = (systemId: Ref<string | undefined>) => {
	const systemApi = SystemsApiFactory(undefined, "/v3", $axios);

	const { execute } = useSafeAxiosTask();

	const system = ref();
	const systemName = computed(() => system.value?.displayName);

	const fetchSystem = async (id: string) => {
		const { result, success } = await execute(() => systemApi.systemControllerGetSystem(id));

		if (success) {
			system.value = {
				id: result.data.id,
				displayName: result.data.displayName,
				hasEndSessionEndpoint: !!result.data.oauthConfig?.endSessionEndpoint,
			};
		}
	};

	watch(
		systemId,
		(newId) => {
			if (newId) {
				fetchSystem(newId);
			}
		},
		{ immediate: true }
	);

	return {
		system,
		systemName,
	};
};
