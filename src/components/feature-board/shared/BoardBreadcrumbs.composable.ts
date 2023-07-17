import { I18N_KEY, injectStrict } from "@/utils/inject";
import { createSharedComposable } from "@vueuse/core";
import { ref, Ref } from "vue";
import VueI18n from "vue-i18n";
import { useBoardApi } from "./BoardApi.composable";

export type BoardBreadcrumb = {
	text: string | undefined;
	to?: string;
	disabled?: boolean;
};

const useBoardBreadcrumbs = () => {
	const i18n: VueI18n = injectStrict(I18N_KEY);

	const { getContextInfo } = useBoardApi();

	const breadcrumbs: Ref<BoardBreadcrumb[]> = ref([]);

	const createBreadcrumbs = async (
		id: string
	): Promise<Ref<BoardBreadcrumb[]>> => {
		const contextInfo = await getContextInfo(id);

		breadcrumbs.value = contextInfo
			? [
					{
						text: i18n.t("common.words.courses").toString(),
						to: "/rooms-overview",
					},
					{
						text: contextInfo.name ?? i18n.t("common.labels.course").toString(),
						to: `/rooms/${contextInfo.id}`,
					},
			  ]
			: [];

		return breadcrumbs;
	};

	return {
		createBreadcrumbs,
		breadcrumbs,
	};
};

export const useSharedBoardBreadcrumbs =
	createSharedComposable(useBoardBreadcrumbs);
