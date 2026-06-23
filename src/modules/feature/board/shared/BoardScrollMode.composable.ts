import { useLocalStorage } from "@vueuse/core";
import { computed } from "vue";

export type BoardScrollMode = "columns" | "page";

const STORAGE_KEY = "board-column-scroll-mode";

export const useBoardScrollMode = () => {
	const scrollMode = useLocalStorage<BoardScrollMode>(STORAGE_KEY, "columns");

	const isPageScrollMode = computed(() => scrollMode.value === "page");

	const toggleScrollMode = () => {
		scrollMode.value = scrollMode.value === "columns" ? "page" : "columns";
	};

	return {
		scrollMode,
		isPageScrollMode,
		toggleScrollMode,
	};
};
