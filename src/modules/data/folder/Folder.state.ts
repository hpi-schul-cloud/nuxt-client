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
import { buildPageTitle } from "@/utils/pageTitle";
import { computed, Ref, ref } from "vue";
import { useI18n } from "vue-i18n";

export const useFolderState = () => {
	const boardElementApi = BoardElementApiFactory(undefined, "/v3", $axios);
	const { t } = useI18n();

	const fileFolderElement = ref<FileFolderElement | undefined>(undefined);
	const parentNodeInfos = ref<ParentNodeInfo[]>([]);

	const parent = computed(() => {
		const indexOfDirectParent = parentNodeInfos.value.length - 1;
		const parent = parentNodeInfos.value[indexOfDirectParent];

		return parent;
	});

	const folderName = computed(() => fileFolderElement.value?.content.title ?? t("pages.folder.untitled"));

	const pageTitle = computed(() => buildPageTitle(folderName.value, t("pages.folder.title")));

	const breadcrumbs = computed<Breadcrumb[]>(() => {
		const breadcrumbItems: Breadcrumb[] = [];

		if (!parentNodeInfos.value || parentNodeInfos.value.length == 0) return breadcrumbItems;

		const rootItem = buildRootBreadCrumbItem(parentNodeInfos);
		if (rootItem) breadcrumbItems.push(rootItem);

		parentNodeInfos.value.forEach((item) => {
			breadcrumbItems.push({
				title: item.name,
				to: `/${mapNodeTypeToPathType(item.type)}/${item.id}`,
			});
		});

		breadcrumbItems.push({ title: folderName.value, disabled: true });

		return breadcrumbItems;
	});

	const fetchFileFolderElement = async (fileFolderElementId: string) => {
		try {
			const response = await boardElementApi.elementControllerGetElementWithParentHierarchy(fileFolderElementId);

			fileFolderElement.value = castToFileFolderElement(response.data.element);
			parentNodeInfos.value = response.data.parentHierarchy;
		} catch (error) {
			throwApplicationError(error);
		}
	};

	const renameFolder = async (title: string, fileFolderElementId: string): Promise<void> => {
		try {
			await boardElementApi.elementControllerUpdateElement(fileFolderElementId, {
				data: { content: { title }, type: ContentElementType.FileFolder },
			});
			await fetchFileFolderElement(fileFolderElementId);
		} catch (error) {
			throwApplicationError(error);
		}
	};

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

	const castToFileFolderElement = (element: AnyContentElement): FileFolderElement => {
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

	return {
		breadcrumbs,
		fileFolderElement,
		folderName,
		pageTitle,
		parent,
		fetchFileFolderElement,
		mapNodeTypeToPathType,
		renameFolder,
	};
};
