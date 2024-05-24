<template>
	<div>
		<FileDisplay
			:file-properties="fileProperties"
			:is-edit-mode="isEditMode"
			@add:alert="onAddAlert"
		>
			<slot />
		</FileDisplay>
		<FileInputs
			:file-properties="fileProperties"
			:is-edit-mode="isEditMode"
			@update:alternativeText="onUpdateText"
			@update:caption="onUpdateCaption"
		/>
		<ContentElementFooter :fileProperties="fileProperties" />
		<FileAlerts :alerts="alerts" @on-status-reload="onFetchFile" />
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import FileAlerts from "./alert/FileAlerts.vue";
import FileDisplay from "../content/display/FileDisplay.vue";
import { FileProperties } from "../shared/types/file-properties";
import FileInputs from "././inputs/FileInputs.vue";
import ContentElementFooter from "./footer/ContentElementFooter.vue";
import { FileAlert } from "../shared/types/FileAlert.enum";
import { useDebounceFn } from "@vueuse/core";

export default defineComponent({
	components: {
		FileInputs,
		FileDisplay,
		ContentElementFooter,
		FileAlerts,
	},
	props: {
		fileProperties: {
			type: Object as PropType<FileProperties>,
			required: true,
		},
		isEditMode: { type: Boolean, required: true },
		alerts: { type: Array as PropType<FileAlert[]>, required: true },
	},
	emits: [
		"fetch:file",
		"update:alternativeText",
		"update:caption",
		"add:alert",
	],
	setup(props, { emit }) {
		const onFetchFile = () => {
			emit("fetch:file");
		};
		const onUpdateCaption = useDebounceFn((value: string) => {
			emit("update:caption", value);
		}, 600);

		const onUpdateText = useDebounceFn((value: string) => {
			emit("update:alternativeText", value);
		}, 600);

		const onAddAlert = (alert: FileAlert) => {
			emit("add:alert", alert);
		};

		return {
			onFetchFile,
			onUpdateText,
			onUpdateCaption,
			onAddAlert,
		};
	},
});
</script>
