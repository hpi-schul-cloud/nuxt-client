import { Breadcrumb } from "@/components/templates/default-wireframe.types";
import { BoardElementApiFactory } from "@/serverApi/v3";
import {
	AnyContentElement,
	ContentElementType,
	FileFolderElement,
	ParentNodeInfo,
	ParentNodeType,
} from "@/types/board/ContentElement";
import { $axios, mapAxiosErrorToResponseError } from "@/utils/api";
import { createApplicationError } from "@/utils/create-application-error.factory";
import { computed, ComputedRef, Ref, ref } from "vue";
import { useI18n } from "vue-i18n";

export const useFolderState = () => {
	const boardElementApi = BoardElementApiFactory(undefined, "/v3", $axios);
	const { t } = useI18n();

	const fileFolderElement = ref<FileFolderElement | undefined>(undefined);
	const parentNodeInfos = ref<ParentNodeInfo[]>([]);
	const isLoading = ref(false);

	const fetchFileFolderElement = async (fileFolderElementId: string) => {
		isLoading.value = true;
		try {
			const reponse =
				await boardElementApi.elementControllerGetElementWithParentHierarchy(
					fileFolderElementId
				);

			fileFolderElement.value = castToFileFolderElement(reponse.data.element);
			parentNodeInfos.value = reponse.data.parentHierarchy;
		} catch (error) {
			throwApplicationError(error);
		} finally {
			isLoading.value = false;
		}
	};

	const folderName = computed(() => {
		const title = fileFolderElement.value?.content.title;

		return title ? title : t("pages.folder.untitled");
	});

	const breadcrumbs: ComputedRef<Breadcrumb[]> = computed(() => {
		const breadcrumbItems: Breadcrumb[] = [];

		if (!parentNodeInfos.value || parentNodeInfos.value.length == 0)
			return breadcrumbItems;

		const rootItem = buildRootBreadCrumbItem(parentNodeInfos);
		if (rootItem) breadcrumbItems.push(rootItem);

		parentNodeInfos.value.forEach((item) => {
			breadcrumbItems.push({
				title: item.name,
				to: `/${mapNodeTypeToPathType(item.type)}/${item.id}`,
			});
		});

		return breadcrumbItems;
	});

	const buildRootBreadCrumbItem = (parentNodeInfos: Ref<ParentNodeInfo[]>) => {
		if (!parentNodeInfos.value[0]) return;

		const firstItem = parentNodeInfos.value[0];

		if (firstItem.type === ParentNodeType.Course) {
			return {
				title: t("common.words.courses"),
				to: "/rooms/courses-overview",
			};
		} else if (ParentNodeType.Room) {
			return { title: t("pages.rooms.title"), to: "/rooms" };
		}
	};

	return {
		breadcrumbs,
		fileFolderElement,
		folderName,
		isLoading,
		fetchFileFolderElement,
	};
};

const castToFileFolderElement = (
	element: AnyContentElement
): FileFolderElement => {
	if (element.type === ContentElementType.FileFolder) {
		return element as FileFolderElement;
	} else {
		throw createApplicationError(404);
	}
};

const throwApplicationError = (error: unknown): never => {
	const responseError = mapAxiosErrorToResponseError(error);

	throw createApplicationError(responseError.code);
};

const mapNodeTypeToPathType = (nodeType: string): string => {
	switch (nodeType) {
		case ParentNodeType.Course:
			return "courses";
		case ParentNodeType.Room:
			return "rooms";
		case ParentNodeType.Board:
			return "boards";
		default:
			throw new Error(`Unknown node type: ${nodeType}`);
	}
};
