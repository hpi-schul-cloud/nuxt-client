import { buildPageTitle } from "@/utils/pageTitle";
import { ref, Ref } from "vue";
import { useBoardApi } from "./BoardApi.composable";
import { useI18n } from "vue-i18n";
import { Breadcrumb } from "../templates/default-wireframe.types";
import { createSharedComposable } from "@vueuse/core";

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
	const breadcrumbs: Ref<Breadcrumb[]> = ref([]);

	function getBreadcrumbs(
		contextInfo: { id: string; name: string } | undefined
	): Breadcrumb[] {
		return contextInfo
			? [
					{
						title: t("common.words.courses"),
						to: "/rooms-overview",
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
	};

	return {
		createPageInformation,
		breadcrumbs,
		pageTitle,
	};
};

export const useSharedBoardPageInformation = createSharedComposable(
	useBoardPageInformation
);
