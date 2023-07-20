<template>
	<div>
		<h5p-editor
			ref="h5pEditorRef"
			:content-id="contentId"
			@saved="log"
			@editorloaded="log"
			@save-error="log"
			@validation-error="log"
		></h5p-editor>
		<button @click="save">Save</button>
	</div>
</template>

<script lang="ts">
import {
	defineElements,
	H5PEditorComponent,
} from "@lumieducation/h5p-webcomponents";

defineElements("h5p-editor");

import { defineComponent, ref, watch } from "vue";
import { H5pEditorApiFactory } from "@/h5pEditorApi/v3";
import { $axios } from "@/utils/api";

export default defineComponent({
	name: "H5PEditorComponent",
	props: {
		contentId: {
			type: String,
			default: "new",
		},
	},
	setup() {
		const h5pEditorRef = ref<H5PEditorComponent>();

		const h5pEditorApi = H5pEditorApiFactory(undefined, "v3", $axios);

		const loadContent = async (id?: string) => {
			if (id) {
				const { data } = await h5pEditorApi.h5PEditorControllerGetH5PEditor(id);
				return data;
			} else {
				const { data } =
					await h5pEditorApi.h5PEditorControllerGetNewH5PEditor();
				return data;
			}
		};

		const saveContent = async (
			contentId: string,
			requestBody: { library: string; params: any }
		) => {
			if (contentId) {
				const { data } = await h5pEditorApi.h5PEditorControllerSaveH5pContent(
					contentId,
					requestBody
				);

				return data;
			} else {
				const { data } = await h5pEditorApi.h5PEditorControllerCreateH5pContent(
					requestBody
				);

				return data;
			}
		};

		watch(h5pEditorRef, (editor) => {
			if (editor) {
				editor.loadContentCallback = loadContent;
				editor.saveContentCallback = saveContent;
			}
		});

		function log(data: CustomEvent) {
			console.log(`Event: ${data.type}`);
			console.log(data.detail);
		}

		const save = () => {
			h5pEditorRef.value?.save().then(console.log).catch(console.log);
		};

		return {
			h5pEditorRef,
			log,
			save,
		};
	},
});
</script>
