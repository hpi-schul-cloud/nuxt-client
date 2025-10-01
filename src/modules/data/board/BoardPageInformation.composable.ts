import { Breadcrumb } from "@/components/templates/default-wireframe.types";
import { BoardContextType } from "@/types/board/BoardContext";
import { createTestableSharedComposable } from "@/utils/create-shared-composable";
import { buildPageTitle } from "@/utils/pageTitle";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useBoardApi } from "./BoardApi.composable";

const useBoardPageInformation = (boardTitle?: string) => {
	const { t } = useI18n();

	const { getContextInfo } = useBoardApi();

	const boardContext = ref<Awaited<ReturnType<typeof getContextInfo>>>();
	const roomId = computed(() => boardContext.value?.id);
	const contextType = computed(() => boardContext.value?.type);

	const roomName = computed(() => {
		let roomNameFallback = t("common.labels.room");

		if (contextType.value === BoardContextType.Course) {
			roomNameFallback = t("common.labels.course");
		}

		return boardContext.value?.name ?? roomNameFallback;
	});

	const boardTitleFallback = computed(() => {
		let fallback = t("common.labels.board");

		if (contextType.value === BoardContextType.Course) {
			fallback = t("pages.room.boardCard.label.courseBoard");
		}
		if (contextType.value === BoardContextType.Room) {
			fallback = t("pages.roomDetails.board.defaultName");
		}

		return fallback;
	});

	const pageTitle = computed(() => {
		const boardTitleForPageTitle = boardTitle ?? boardTitleFallback.value;

		return buildPageTitle(`${boardTitleForPageTitle} - ${roomName.value}`);
	});

	const breadcrumbs = computed<Breadcrumb[]>(() => {
		if (!roomId.value || !contextType.value) return [];

		if (contextType.value === BoardContextType.Course) {
			return [
				{
					title: t("common.words.courses"),
					to: "/rooms/courses-overview",
					disabled: false,
				},
				{
					title: roomName.value,
					to: `/rooms/${roomId.value}`,
					disabled: false,
				},
				{
					title: boardTitle ?? boardTitleFallback.value,
					disabled: true,
				},
			];
		}

		if (contextType.value === BoardContextType.Room) {
			return [
				{
					title: t("pages.rooms.title"),
					to: "/rooms",
					disabled: false,
				},
				{
					title: roomName.value,
					to: `/rooms/${roomId.value}`,
					disabled: false,
				},
				{
					title: boardTitle ?? boardTitleFallback.value,
					disabled: true,
				},
			];
		}

		return [];
	});

	const createPageInformation = async (id: string) => {
		boardContext.value = await getContextInfo(id);
	};

	const resetPageInformation = (): void => {
		boardContext.value = undefined;
	};

	return {
		createPageInformation,
		breadcrumbs,
		contextType,
		pageTitle,
		roomId,
		resetPageInformation,
	};
};

export const useSharedBoardPageInformation = createTestableSharedComposable(
	useBoardPageInformation
);
