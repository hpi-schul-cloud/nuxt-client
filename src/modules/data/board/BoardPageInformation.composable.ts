import { Breadcrumb } from "@/components/templates/default-wireframe.types";
import { BoardContextType } from "@/types/board/BoardContext";
import { buildPageTitle } from "@/utils/pageTitle";
import { createSharedComposable } from "@vueuse/core";
import { computed, ref, unref } from "vue";
import { useI18n } from "vue-i18n";
import { useBoardApi } from "./BoardApi.composable";

const useBoardPageInformation = () => {
	const { t } = useI18n();

	const { getContextInfo } = useBoardApi();

	const contextInfo = ref<Awaited<ReturnType<typeof getContextInfo>>>();

	const pageTitle = computed(() => {
		const courseName = contextInfo.value?.name;
		const courseNameForPageTitle = courseName ? ", " + courseName : "";

		return buildPageTitle(
			`${t("pages.room.boardCard.label.courseBoard")}${courseNameForPageTitle}`
		);
	});

	const roomId = computed(() => contextInfo.value?.id);
	const contextType = computed(() => contextInfo.value?.type);

	const breadcrumbs = computed((): Breadcrumb[] => {
		const id = unref(contextInfo)?.id;
		const type = unref(contextInfo)?.type;
		const name = unref(contextInfo)?.name;

		if (!id || !type) {
			return [];
		}

		if (type === BoardContextType.Course) {
			return [
				{
					title: t("common.words.courses"),
					to: "/rooms/courses-overview",
					disabled: false,
				},
				{
					title: name ?? t("common.labels.course"),
					to: `/rooms/${id}`,
					disabled: false,
				},
			];
		}
		if (type === BoardContextType.Room) {
			return [
				{
					title: t("pages.rooms.title"),
					to: "/rooms",
					disabled: false,
				},
				{
					title: name ?? t("common.labels.room"),
					to: `/rooms/${id}`,
					disabled: false,
				},
			];
		}
		return [];
	});

	const createPageInformation = async (id: string): Promise<void> => {
		contextInfo.value = await getContextInfo(id);
	};

	return {
		createPageInformation,
		breadcrumbs,
		contextType,
		pageTitle,
		roomId,
	};
};

export const useSharedBoardPageInformation = createSharedComposable(
	useBoardPageInformation
);
