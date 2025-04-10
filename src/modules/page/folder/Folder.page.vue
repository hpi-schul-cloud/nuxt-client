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
import { buildPageTitle } from "@/utils/pageTitle";
import { useFolderState } from "@data-folder";
import { FolderDetails, FolderMenu } from "@feature-folder";
import { mdiPlus } from "@icons/material";
import { useTitle } from "@vueuse/core";
import { computed, ComputedRef, onMounted } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const props = defineProps({
	folderId: {
		type: String,
		required: true,
	},
});

const { breadCrumbs, fileFolderElement, fetchFileFolderElement } =
	useFolderState();

// @TODO: Move to a outside file
class ReferenceNodeMapper {
	static mapNodeTypeToPathType(nodeType: string): string {
		switch (nodeType) {
			case "course":
				return "courses";
			case "room":
				return "rooms";
			case "board":
				return "boards";
			default:
				throw new Error(`Unknown node type: ${nodeType}`);
		}
	}
}
// @TODO: Move to a composable
const breadcrumbs: ComputedRef<Breadcrumb[]> = computed(() => {
	const breadCrumbItems = [];
	if (breadCrumbs.value && breadCrumbs.value.length > 0) {
		const firstItem = breadCrumbs.value[0];
		if (firstItem.type === "course") {
			breadCrumbItems.push({
				title: t("common.words.courses"),
				to: "/rooms/courses-overview",
			});
		} else if (firstItem.type === "room") {
			breadCrumbItems.push({
				title: t("pages.rooms.title"),
				to: "/rooms",
			});
		}

		breadCrumbs.value.forEach((item) => {
			breadCrumbItems.push({
				title: item.name,
				to: `/${ReferenceNodeMapper.mapNodeTypeToPathType(item.type)}/${item.id}`,
			});
		});
	}
	return breadCrumbItems;
});

const folderName = computed(() => {
	const folderName =
		fileFolderElement.value && fileFolderElement.value.title
			? fileFolderElement.value.title
			: t("pages.folder.untitled");
	useTitle(buildPageTitle(`${folderName} - ${t("pages.folder.title")}`));

	return folderName;
});

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
