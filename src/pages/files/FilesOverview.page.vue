<template>
	<default-wireframe :full-width="true">
		<h1>{{ $t("pages.files.overview.headline") }}</h1>
		<base-file-table :items="items" :headers="headers"></base-file-table>
	</default-wireframe>
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/composition-api";
import DefaultWireframe from "@components/templates/DefaultWireframe.vue";
import { i18n } from "../../utils/i18n-util";
import { getFileOverviewItems } from "./data";
import BaseFileTable from "@basecomponents/BaseTable/BaseTable.vue";
import { FileTableItem } from "@pages/files/file-table-item";
import { DataTableHeader } from "vuetify";
import { filesModule } from "@/store";
import { onMounted, Ref, useRoute } from "@nuxtjs/composition-api";
import { File, FileType } from "@store/types/file";

// eslint-disable-next-line vue/require-direct-export
export default defineComponent({
  components: { BaseFileTable, DefaultWireframe },
  setup() {
    const route = useRoute();
    const pathArray = route.value.path.split("/");

    onMounted(async () => {
      if (pathArray.length === 1 && pathArray[0] === 'cfiles') {
        // fetch initial page
      } else if (pathArray.length === 2) {
        //const pageType = pathArray[1];
      } else if (pathArray.length >= 3) {
        //const pageType = pathArray[1];
      }

      await filesModule.fetchFilesMeta();
    });

		const { t } = i18n();

		const serverFileTableItems: FileTableItem[] = filesModule.getFiles.map(
			(file: File) => {
				return {
					name: file.name,
					path: file.path,
					icon: { name: file.icon, colored: FileType.FAVORITES === file.type },
					size: file.size.toString(),
					lastChanged: file.lastChanged,
				};
			}
		);
		const fileOverviewItems: FileTableItem[] = getFileOverviewItems(t);
		const items2 = { ...fileOverviewItems, ...serverFileTableItems };

		const items: Ref<FileTableItem[]> = ref<FileTableItem[]>(items2);

		const headers: DataTableHeader[] = [
			{ text: "", value: "icon", sortable: false, width: 5 },
			{
				text: t("common.labels.name"),
				value: "name",
				class: "primary--text",
				cellClass: "primary--text",
			},
			{
				text: t("common.labels.size"),
				value: "size",
				class: "primary--text",
				width: "94",
			},
			{
				text: t("common.labels.changed"),
				value: "lastChanged",
				class: "primary--text",
				width: "140",
			},
		];

		return { items, headers };
	},
});
</script>
