import { Breadcrumb } from "@/components/templates/default-wireframe.types";
import { BoardContextType } from "@/types/board/BoardContext";
import { createTestableSharedComposable } from "@/utils/create-shared-composable";
import { buildPageTitle } from "@/utils/pageTitle";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useBoardApi } from "./BoardApi.composable";
import { useBoardStore } from "./Board.store";

const useBoardPageInformation = () => {
	const { t } = useI18n();

	const { getContextInfo } = useBoardApi();
	const boardStore = useBoardStore();

	const boardContext = ref<Awaited<ReturnType<typeof getContextInfo>>>();
	const roomId = computed(() => boardContext.value?.id);
	const contextType = computed(() => boardContext.value?.type);

	const isCourse = computed(
		() => contextType.value === BoardContextType.Course
	);
	const isRoom = computed(() => contextType.value === BoardContextType.Room);

	const roomName = computed(() => {
		const roomNameFallback = isCourse.value
			? t("common.labels.course")
			: t("common.labels.room");

		return boardContext.value?.name ?? roomNameFallback;
	});

	const boardTitle = computed(() => {
		let fallback = t("common.words.board");

		if (isCourse.value) {
			fallback = t("pages.room.boardCard.label.courseBoard");
		}
		if (isRoom.value) {
			fallback = t("pages.roomDetails.board.defaultName");
		}

		return boardStore.board?.title ?? fallback;
	});

	const pageTitle = computed(() =>
		buildPageTitle(boardTitle.value, roomName.value)
	);

	const breadcrumbs = computed<Breadcrumb[]>(() => {
		if (!roomId.value) return [];

		const crumbs: Breadcrumb[] = [
			{
				title: roomName.value,
				to: `/rooms/${roomId.value}`,
			},
			{
				title: boardTitle.value,
				disabled: true,
			},
		];

		if (isCourse.value) {
			crumbs.unshift({
				title: t("common.words.courses"),
				to: "/rooms/courses-overview",
			});
		}

		if (isRoom.value) {
			crumbs.unshift({
				title: t("pages.rooms.title"),
				to: "/rooms",
			});
		}

		return crumbs;
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
