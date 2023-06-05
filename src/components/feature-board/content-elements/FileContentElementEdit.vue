<template>
	<div class="file-element margin">
		<div class="file-card">
			<v-icon x-large>{{ mdiFileDocumentOutline }}</v-icon>
			<a class="file-card-label truncate" v-bind:href="fileRecord.url" download>
				{{ fileRecord.name }}
			</a>
		</div>
		<div class="file-info">
			<vTextField v-model="modelCaption" label="Caption"></vTextField>
		</div>
	</div>
</template>

<script lang="ts">
import { useVModel } from "@vueuse/core";
import { defineComponent, PropType } from "vue";
import { FileRecordResponse } from "@/fileStorageApi/v3";
import { mdiFileDocumentOutline } from "@mdi/js";

export default defineComponent({
	name: "FileContentElementEdit",
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

<style lang="scss" scoped>
@import "@/styles/mixins";
@import "~vuetify/src/styles/styles.sass";

.file-element {
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 0px;
	border: 1px solid #e0e0e0; //var(--v-gray-lighten2);
	border-radius: 3px;
	flex: none;
	order: 0;
	flex-grow: 1;
}

.file-card {
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 8px;
	gap: 8px;
	flex: none;
	order: 0;
	align-self: stretch;
	flex-grow: 0;
}

.file-card-label {
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

.file-card:hover {
	background-color: #eeeeee; //var(--v-gray-lighten1);
}
.file-info {
	flex-direction: row;
	align-items: center;
	padding: 8px;
	gap: 4px;
	background: #eeeeee; //var(--v-gray-lighten1);
	flex: none;
	order: 2;
	align-self: stretch;
	flex-grow: 0;
}

.margin {
	margin: 0.9em 0;
}

.margin:first-child {
	margin-top: 0;
}
</style>
