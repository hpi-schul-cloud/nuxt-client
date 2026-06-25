import { useLocalStorage } from "@vueuse/core";
import { computed, getCurrentScope, onUnmounted, watch } from "vue";

enum ScrollModeEnum {
	COLUMNS = "columns",
	PAGE = "page",
}
export type BoardScrollMode = ScrollModeEnum;

const STORAGE_KEY = "board-column-scroll-mode";

const applyScrollMode = (isPageScroll: boolean) => {
	const htmlTag = document.documentElement;
	if (isPageScroll) {
		htmlTag.classList.add("board-page-scroll");
		htmlTag.style.removeProperty("max-height");
		htmlTag.style.setProperty("--v-layout-top", "0px");
	} else {
		htmlTag.classList.remove("board-page-scroll");
		htmlTag.style.setProperty("max-height", "100vh");
		htmlTag.style.removeProperty("--v-layout-top");
	}
};

export const useBoardScrollMode = () => {
	const scrollMode = useLocalStorage<BoardScrollMode>(STORAGE_KEY, ScrollModeEnum.COLUMNS);

	const isPageScrollMode = computed(() => scrollMode.value === ScrollModeEnum.PAGE);

	if (getCurrentScope()) {
		watch(isPageScrollMode, applyScrollMode, { immediate: true });
		onUnmounted(() => applyScrollMode(false));
	} else {
		applyScrollMode(isPageScrollMode.value);
	}

	const toggleScrollMode = () => {
		scrollMode.value = isPageScrollMode.value ? ScrollModeEnum.COLUMNS : ScrollModeEnum.PAGE;
		applyScrollMode(isPageScrollMode.value);
	};

	return {
		scrollMode,
		isPageScrollMode,
		toggleScrollMode,
	};
};
