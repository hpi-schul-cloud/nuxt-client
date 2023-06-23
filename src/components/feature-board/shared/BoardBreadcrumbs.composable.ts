import { $axios } from "@/utils/api";
import { I18N_KEY, injectStrict } from "@/utils/inject";
import { createSharedComposable } from "@vueuse/core";
import { ref, Ref } from "vue";
import VueI18n from "vue-i18n";
import {
	AncestorEntityType,
	AncestorListApiFactory,
	AncestorResponse,
	AncestorResponseTypeEnum,
} from "../../../serverApi/v3/api";

type BoardBreadcrumb = {
	text: string | undefined;
	to?: string;
	disabled?: boolean;
};

const useBoardBreadcrumbs = () => {
	const i18n: VueI18n = injectStrict<VueI18n>(I18N_KEY);
	const ancestorListApi = AncestorListApiFactory(undefined, "/v3", $axios);
	const breadcrumbs: Ref<BoardBreadcrumb[]> = ref([]);

	const createBreadcrumbsFor = async (id: string, type: AncestorEntityType) => {
		const response = await ancestorListApi.ancestorListControllerGetAncestorsOf(
			id,
			type
		);
		if (response.data) {
			const ancestors = response.data;
			breadcrumbs.value = convertAncestorsToBreadCrumbs(ancestors);
		}
	};

	const convertAncestorsToBreadCrumbs = (ancestors: AncestorResponse[]) => {
		ancestors.pop(); // remove child-entity itself from answer
		const breadcrumbs = ancestors.flatMap(mapToBreadCrumb);
		return breadcrumbs;
	};

	const mapToBreadCrumb = (ancestor: AncestorResponse): BoardBreadcrumb[] => {
		switch (ancestor.type) {
			case AncestorResponseTypeEnum.Columnboard:
				return mapColumnBoard(ancestor);
			case AncestorResponseTypeEnum.Course:
				return mapCourse(ancestor);
			default:
				return [];
		}
	};

	const mapColumnBoard = (ancestor: AncestorResponse): BoardBreadcrumb[] => {
		return [
			{
				text: ancestor.text ?? i18n.t("components.board").toString(),
				to: `/rooms/${ancestor.id}/board`,
			},
		];
	};

	const mapCourse = (ancestor: AncestorResponse): BoardBreadcrumb[] => {
		return [
			{
				text: i18n.t("pages.courses.index.title").toString(),
				to: "/rooms-overview",
			},
			{
				text: ancestor.text ?? i18n.t("common.labels.course").toString(),
				to: `/rooms/${ancestor.id}`,
			},
		];
	};

	return {
		createBreadcrumbsFor,
		breadcrumbs,
	};
};

export const useSharedBoardBreadcrumbs =
	createSharedComposable(useBoardBreadcrumbs);
