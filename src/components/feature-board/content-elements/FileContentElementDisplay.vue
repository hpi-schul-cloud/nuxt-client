<template>
	<div class="file-content-element-display">
		<v-icon x-large>{{ mdiFileDocumentOutline }}</v-icon>
		<a
			class="file-content-element-display-label truncate"
			v-bind:href="fileRecord.url"
			download
		>
			{{ fileRecord.name }}
		</a>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { FileRecordResponse } from "@/fileStorageApi/v3";
import { mdiFileDocumentOutline } from "@mdi/js";

export default defineComponent({
	name: "FileContentElementDisplay",
	props: {
		caption: {
			type: String,
			required: true,
		},
		fileRecord: {
			type: Object as () => FileRecordResponse,
			required: true,
		},
	},

	setup() {
		return {
			mdiFileDocumentOutline,
		};
	},
});
</script>

<style lang="scss" scoped>
@import "@/styles/mixins";
@import "~vuetify/src/styles/styles.sass";
.file-content-element-display {
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 8px;
	flex: none;
	order: 0;
	align-self: stretch;
	flex-grow: 0;
}

.file-content-element-display-label {
	font-family: "PT Sans";
	font-style: normal;
	font-weight: 400;
	font-size: 14px;
	line-height: 20px;
	display: flex;
	align-items: center;
	letter-spacing: 0.02px;
	color: var(--v-primary-base);
	text-decoration: none;
}
</style>
