import {
	AnyContentElement,
	ContentElementType,
	FileFolderElement,
	ParentNodeInfo,
	ParentNodeType,
} from "@/types/board/ContentElement";
import { HttpStatusCode } from "@/types/enum/http-status-code.enum";
import { $axios } from "@/utils/api";
import { createApplicationError } from "@/utils/create-application-error.factory";
import { buildPageTitle } from "@/utils/pageTitle";
import { BoardApiFactory, BoardElementApiFactory, BoardResponseAllowedOperations } from "@api-server";
import { useAppStore } from "@data-app";
import { Breadcrumb } from "@ui-layout";
import { isAxiosError } from "axios";
import { computed, Ref, ref } from "vue";
import { useI18n } from "vue-i18n";

export const useFolderState = () => {
	const boardElementApi = BoardElementApiFactory(undefined, "/v3", $axios);
	const boardApi = BoardApiFactory(undefined, "/v3", $axios);
	const { t } = useI18n();

	const fileFolderElement = ref<FileFolderElement | undefined>(undefined);
	const parentNodeInfos = ref<ParentNodeInfo[]>([]);

	const parent = computed(() => {
		const indexOfDirectParent = parentNodeInfos.value.length - 1;
		const parent = parentNodeInfos.value[indexOfDirectParent];

		return parent;
	});

	const allowedOperations = ref<BoardResponseAllowedOperations>(
		new Proxy({} as BoardResponseAllowedOperations, {
			get: () => false,
		})
	);

	const folderName = computed(() => {
		const title = fileFolderElement.value?.content.title;
		return title || t("pages.folder.untitled");
	});

	const pageTitle = computed(() => buildPageTitle(folderName.value, parent.value?.name ?? t("pages.folder.title")));

	const breadcrumbs = computed<Breadcrumb[]>(() => {
		const breadcrumbItems: Breadcrumb[] = [];

		if (parentNodeInfos.value?.length === 0) return breadcrumbItems;

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
			handleApplicationError(error);
		}
	};

	const renameFolder = async (title: string, fileFolderElementId: string): Promise<void> => {
		try {
			await boardElementApi.elementControllerUpdateElement(fileFolderElementId, {
				data: { content: { title }, type: ContentElementType.FILE_FOLDER },
			});
			await fetchFileFolderElement(fileFolderElementId);
		} catch (error) {
			handleApplicationError(error);
		}
	};

	const removeFolder = async (fileFolderElementId: string): Promise<void> => {
		await boardElementApi.elementControllerDeleteElement(fileFolderElementId);
	};

	const fetchAllowedOperations = async (parentId: string) => {
		try {
			const result = await boardApi.boardControllerGetBoardSkeleton(parentId);
			if (result.data.allowedOperations) {
				allowedOperations.value = result.data.allowedOperations;
			}
		} catch (error) {
			handleApplicationError(error);
		}
	};

	const buildRootBreadCrumbItem = (parentNodeInfos: Ref<ParentNodeInfo[]>) => {
		if (!parentNodeInfos.value[0]) return;

		const firstItem = parentNodeInfos.value[0];

		if (firstItem.type === ParentNodeType.COURSE) {
			return {
				title: t("common.words.courses"),
				to: "/rooms/courses-overview",
			};
		} else if (firstItem.type === ParentNodeType.ROOM) {
			return { title: t("pages.rooms.title"), to: "/rooms" };
		}
	};

	const castToFileFolderElement = (element: AnyContentElement): FileFolderElement => {
		if (element.type === ContentElementType.FILE_FOLDER) {
			return element as FileFolderElement;
		} else {
			throw createApplicationError(404);
		}
	};

	const handleApplicationError = (error: unknown) => {
		if (isAxiosError(error)) {
			const statusCode = error.response?.status ?? HttpStatusCode.InternalServerError;
			const errorMessage = statusCode === 404 ? "pages.folder.error.404" : undefined;
			useAppStore().handleApplicationError(statusCode, errorMessage);
		} else {
			useAppStore().handleUnknownError(error);
		}
	};

	const mapNodeTypeToPathType = (nodeType: string): string => {
		switch (nodeType) {
			case ParentNodeType.COURSE:
				return "courses";
			case ParentNodeType.ROOM:
				return "rooms";
			case ParentNodeType.BOARD:
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
		removeFolder,
		fetchAllowedOperations,
		allowedOperations,
	};
};
