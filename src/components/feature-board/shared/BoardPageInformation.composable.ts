import { useI18n } from "@/composables/i18n.composable";
import { createTestableSharedComposable } from "@/utils/create-shared-composable";
import { buildPageTitle } from "@/utils/pageTitle";
import { ref, Ref } from "vue";
import { useBoardApi } from "./BoardApi.composable";

export type BoardBreadcrumb = {
	text: string | undefined;
	to?: string;
	disabled?: boolean;
};

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
	const breadcrumbs: Ref<BoardBreadcrumb[]> = ref([]);

	function getBreadcrumbs(
		contextInfo: { id: string; name: string } | undefined
	): BoardBreadcrumb[] {
		return contextInfo
			? [
					{
						text: t("common.words.courses"),
						to: "/rooms-overview",
					},
					{
						text: contextInfo.name ?? t("common.labels.course"),
						to: `/rooms/${contextInfo.id}`,
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

export const useSharedBoardPageInformation = createTestableSharedComposable(
	useBoardPageInformation
);
