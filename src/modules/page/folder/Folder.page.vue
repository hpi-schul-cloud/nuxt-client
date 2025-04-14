<template>
	<DefaultWireframe
		max-width="full"
		:breadcrumbs="breadcrumbs"
		:fab-items="fabAction"
		@fab:clicked="fabClickHandler"
	>
		<template #header>
			<div class="d-flex align-items-center">
				<h1 class="text-h3 mb-4" data-testid="folder-title">
					{{ folderName }}
				</h1>
				<FolderMenu :folder-name="folderName" />
			</div>
		</template>
		<FolderDetails />
	</DefaultWireframe>
</template>

<script setup lang="ts">
import { Breadcrumb } from "@/components/templates/default-wireframe.types";
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import { ParentNodeInfo, ParentNodeType } from "@/serverApi/v3";
import { buildPageTitle } from "@/utils/pageTitle";
import { useFolderState } from "@data-folder";
import { FolderDetails, FolderMenu } from "@feature-folder";
import { mdiPlus } from "@icons/material";
import { useTitle } from "@vueuse/core";
import { computed, ComputedRef, onMounted, Ref } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const props = defineProps({
	folderId: {
		type: String,
		required: true,
	},
});

const { parentNodeInfos, fileFolderElement, fetchFileFolderElement } =
	useFolderState();

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
		return { title: t("common.words.courses"), to: "/rooms/courses-overview" };
	} else if (ParentNodeType.Room) {
		return { title: t("pages.rooms.title"), to: "/rooms" };
	}
};

const folderName = computed(() => {
	const title = fileFolderElement.value?.content.title;

	const name = title ? title : t("pages.folder.untitled");

	return name;
});

useTitle(buildPageTitle(`${folderName.value} - ${t("pages.folder.title")}`));

const fabAction = {
	icon: mdiPlus,
	title: t("pages.folder.fab.title"),
	ariaLabel: t("pages.folder.fab.title"),
	dataTestId: "fab-add-files",
};

const fabClickHandler = () => {
	// eslint-disable-next-line no-console
	console.log("Open file picker");
};

onMounted(async () => {
	await fetchFileFolderElement(props.folderId);
});
</script>
