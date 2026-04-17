import { useSafeAxiosTask } from "@/composables/async-tasks.composable";
import { $axios } from "@/utils/api";
import { SystemsApiFactory } from "@api-server";
import { onMounted, ref } from "vue";

export const useSystem = (systemId: string, fetchImmediate = true) => {
	const systemApi = SystemsApiFactory(undefined, "/v3", $axios);

	const { execute } = useSafeAxiosTask();

	const system = ref();
	const systemName = ref();

	const fetchSystem = async () => {
		const { result } = await execute(() => systemApi.systemControllerGetSystem(systemId));

		// TODO: Should this if be necessary?
		if (result) {
			system.value = {
				id: result.data.id,
				displayName: result.data.displayName ?? "",
				hasEndSessionEndpoint: !!result.data.oauthConfig?.endSessionEndpoint,
			};

			systemName.value = result.data.displayName ?? "";
		}
	};

	if (fetchImmediate) {
		onMounted(fetchSystem);
	}

	return {
		system,
		systemName,
		fetchSystem,
	};
};
