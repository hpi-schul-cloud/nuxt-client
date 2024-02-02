<template>
	<default-wireframe
		:headline="title"
		:breadcrumbs="breadcrumbs"
		:full-width="true"
	>
		<v-data-table
			:hide-default-footer="true"
			:items="items"
			:headers="headers"
			@click:row="click"
		>
			<template #[`item.icon`]="{ item }">
				<v-icon
					class="material-icon"
					:color="
						item.icon.colored
							? 'rgba(var(--v-theme-primary))'
							: 'rgba(var(--v-theme-secondary))'
					"
					>{{ item.icon.name }}
				</v-icon>
			</template>
			<template #[`item.lastChanged`]="{ item }"
				>{{ timesAgo(item.lastChanged) }}
			</template>
			<template #bottom />
		</v-data-table>
	</default-wireframe>
</template>

<script lang="ts">
import { Breadcrumb } from "@/components/templates/default-wireframe.types";
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import { FilesPageConfig } from "@/pages/files/file-page-config.type";
import { FileTableItem } from "@/pages/files/file-table-item";
import { useFileTableUtils } from "@/pages/files/file-table-utils.composable";
import { fromNow } from "@/plugins/datetime";
import CollaborativeFilesModule from "@/store/collaborative-files";
import { CollaborativeFile } from "@/store/types/collaborative-file";
import {
	computed,
	ComputedRef,
	defineComponent,
	inject,
	onMounted,
	Ref,
	ref,
} from "vue";
import { useRoute, useRouter } from "vue-router";
import { DataTableHeader } from "@/store/types/data-table-header";
import { useTitle } from "@vueuse/core";
import { buildPageTitle } from "@/utils/pageTitle";
import { useI18n } from "vue-i18n";

export default defineComponent({
	components: { DefaultWireframe },
	setup() {
		const collaborativeFilesModule: CollaborativeFilesModule | undefined =
			inject<CollaborativeFilesModule>("collaborativeFilesModule");
		if (!collaborativeFilesModule) {
			throw new Error("Injection of dependencies failed");
		}

		const { t } = useI18n();

		const { getHeaders, mapFileToFileTableItem, getFilesPageForRoute } =
			useFileTableUtils(collaborativeFilesModule, t);

		const headers: DataTableHeader[] = getHeaders();

		const items: ComputedRef<FileTableItem[]> = computed(() => {
			return collaborativeFilesModule.getFiles.map(
				(file: CollaborativeFile) => {
					return mapFileToFileTableItem(file);
				}
			);
		});

		const route = useRoute();
		const filesPage: FilesPageConfig = getFilesPageForRoute(route);

		const title: Ref<string> = ref(filesPage.title);
		const breadcrumbs: Ref<Breadcrumb[]> = ref(filesPage.breadcrumbs);

		const timesAgo = (value: string): string => {
			return fromNow(value, true);
		};

		const router = useRouter();
		const click = (item: FileTableItem): void => {
			router.push({ path: item.path });
		};

		const pageTitle = buildPageTitle(filesPage.title);
		useTitle(pageTitle);

		onMounted(async () => {
			await filesPage.loadFilesFunction();
		});

		return { items, headers, breadcrumbs, title, click, timesAgo, t };
	},
});
</script>

<style lang="scss" scoped>
$arrow-offset: 8px;

.v-data-table :deep(th i) {
	margin-left: $arrow-offset;
}

.v-data-table :deep(td) {
	cursor: pointer;
}
</style>
