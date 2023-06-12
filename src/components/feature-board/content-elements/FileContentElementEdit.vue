<template>
	<v-list dense flat class="py-0">
		<v-list-item :href="fileRecord.url" download>
			<v-list-item-icon class="mr-2">
				<v-icon>{{ mdiFileDocumentOutline }}</v-icon>
			</v-list-item-icon>

			<v-list-item-content>
				<v-list-item-title style="color: var(--v-primary-base)">{{
					fileRecord.name
				}}</v-list-item-title>
			</v-list-item-content>
		</v-list-item>
		<FileInfoChips :fileRecord="fileRecord" />
	</v-list>
</template>

<script lang="ts">
import { useVModel } from "@vueuse/core";
import { defineComponent, PropType } from "vue";
import { FileRecordResponse } from "@/fileStorageApi/v3";
import { mdiFileDocumentOutline } from "@mdi/js";
import FileInfoChips from "../shared/FileInfoChips.vue";

export default defineComponent({
	name: "FileContentElementEdit",
	components: {
		FileInfoChips,
	},
	props: {
		caption: {
			type: String,
			required: true,
		},
		fileRecord: {
			type: Object as PropType<FileRecordResponse>,
			required: true,
		},
	},
	emits: ["update:caption"],
	setup(props, { emit }) {
		const modelCaption = useVModel(props, "caption", emit);
		return {
			mdiFileDocumentOutline,
			modelCaption,
		};
	},
});
</script>
