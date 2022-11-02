<template>
	<default-wireframe :full-width="true">
		<h1>{{ $t("pages.files.overview.headline") }}</h1>
		<base-file-table :items="items"></base-file-table>
	</default-wireframe>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import DefaultWireframe from "@components/templates/DefaultWireframe.vue";
import { i18n } from "../../utils/i18n-util";
import { FileTableItem, getFileOverviewItems } from "./data";
import BaseFileTable from "@pages/files/BaseFileTable.vue";

// eslint-disable-next-line vue/require-direct-export
export default defineComponent({
	components: { BaseFileTable, DefaultWireframe },
	setup() {
		const { t } = i18n();

		const items: FileTableItem[] = getFileOverviewItems(t);

		return { items };
	},
});
</script>
