import { createSharedComposable } from "@vueuse/core";
import { ref } from "vue";

export const useBoardMenu = createSharedComposable(() => {
	const isMenuOpen = ref<boolean>(false);

	return {
		isMenuOpen,
	};
});
