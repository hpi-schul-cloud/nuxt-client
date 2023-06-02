<template>
	<div class="file-content-element-edit">
		<v-icon x-large>{{ mdiFileDocumentOutline }}</v-icon>
		<a
			class="file-content-element-edit-label truncate"
			v-bind:href="fileRecord.url"
			download
		>
			{{ fileRecord.name }}
		</a>
	</div>
</template>

<script lang="ts">
import { useVModel } from "@vueuse/core";
import { defineComponent } from "vue";
import { FileRecordResponse } from "@/fileStorageApi/v3";
import { mdiFileDocumentOutline } from "@mdi/js";

export default defineComponent({
	name: "FileContentElementEdit",
	props: {
		autofocus: {
			type: Boolean,
			required: true,
		},
		caption: {
			type: String,
			required: true,
		},
		fileRecord: {
			type: Object as () => FileRecordResponse,
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

<style lang="scss" scoped>
@import "@/styles/mixins";
@import "~vuetify/src/styles/styles.sass";
.file-content-element-edit {
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 8px;
	flex: none;
	order: 0;
	align-self: stretch;
	flex-grow: 0;
}

.file-content-element-edit-label {
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
