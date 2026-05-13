import { ContextExternalToolConfigurationTemplate } from "./types";
import { defineStore } from "pinia";
import { ref } from "vue";

export const usePreferredExternalToolStore = defineStore("preferred-external-tool-store", () => {
	const preferredExternalTool = ref<ContextExternalToolConfigurationTemplate | undefined>(undefined);

	return {
		preferredExternalTool,
	};
});
