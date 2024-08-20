import { Breadcrumb } from "@/components/templates/default-wireframe.types";
import { buildPageTitle } from "@/utils/pageTitle";
import { createSharedComposable } from "@vueuse/core";
import { ref, Ref } from "vue";
import { useI18n } from "vue-i18n";
import { useBoardApi } from "./BoardApi.composable";

const useBoardPageInformation = () => {
	const { t } = useI18n();

	const { getContextInfo } = useBoardApi();

	const getPageTitle = (courseName?: string): string => {
		const courseNameForPageTitle = courseName ? ", " + courseName : "";
		return buildPageTitle(
			`${t("pages.room.boardCard.label.courseBoard")}${courseNameForPageTitle}`
		);
	};

	const pageTitle: Ref<string> = ref(getPageTitle());
	const roomId: Ref<string | undefined> = ref(undefined);
	const breadcrumbs: Ref<Breadcrumb[]> = ref([]);

	function getBreadcrumbs(
		contextInfo: { id: string; name: string } | undefined
	): Breadcrumb[] {
		return contextInfo
			? [
					{
						title: t("common.words.courses"),
						to: "/rooms/courses-overview",
						disabled: false,
					},
					{
						title: contextInfo.name ?? t("common.labels.course"),
						to: `/rooms/${contextInfo.id}`,
						disabled: false,
					},
				]
			: [];
	}

	const createPageInformation = async (id: string): Promise<void> => {
		const contextInfo = await getContextInfo(id);
		pageTitle.value = getPageTitle(contextInfo?.name);
		breadcrumbs.value = getBreadcrumbs(contextInfo);
		roomId.value = contextInfo?.id;
	};

	return {
		createPageInformation,
		breadcrumbs,
		pageTitle,
		roomId,
	};
};

export const useSharedBoardPageInformation = createSharedComposable(
	useBoardPageInformation
);
