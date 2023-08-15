<template>
	<div>
		<h5p-editor
			ref="h5pEditorRef"
			:content-id="contentId"
			@validation-error="onValidationError"
		></h5p-editor>
	</div>
</template>

<script lang="ts">
import {
	defineElements,
	H5PEditorComponent,
} from "@lumieducation/h5p-webcomponents";
import { I18N_KEY, injectStrict } from "@/utils/inject";

defineElements("h5p-editor");

import { defineComponent, ref, watch } from "vue";
import {
	H5pEditorApiFactory,
	PostH5PContentCreateParams,
} from "@/h5pEditorApi/v3";
import { $axios } from "@/utils/api";

export default defineComponent({
	name: "H5PEditorComponent",
	props: {
		contentId: {
			type: String,
			default: "new",
		},
	},
	emits: ["saved", "save-error", "load-error", "validation-error"],
	setup(props, { emit, expose }) {
		const h5pEditorRef = ref<H5PEditorComponent>();

		const h5pEditorApi = H5pEditorApiFactory(undefined, "v3", $axios);
		const i18n = injectStrict(I18N_KEY);
		const language = i18n.locale;

		const loadContent = async (id?: string) => {
			try {
				if (id) {
					// Load content
					const { data } = await h5pEditorApi.h5PEditorControllerGetH5PEditor(
						id,
						language
					);

					return data;
				} else {
					// Create new editor
					const { data } =
						await h5pEditorApi.h5PEditorControllerGetNewH5PEditor(language);

					return data;
				}
			} catch (err) {
				emit("load-error", err);
			}
		};

		const saveContent = async (
			contentId: string,
			requestBody: PostH5PContentCreateParams
		) => {
			if (contentId) {
				// Modify existing content
				const { data } = await h5pEditorApi.h5PEditorControllerSaveH5pContent(
					contentId,
					requestBody
				);

				return data;
			} else {
				// Save new content
				const { data } = await h5pEditorApi.h5PEditorControllerCreateH5pContent(
					requestBody
				);

				return data;
			}
		};

		watch(h5pEditorRef, (editor) => {
			if (editor) {
				// Attach callbacks to H5P Editor
				editor.loadContentCallback = loadContent;
				editor.saveContentCallback = saveContent;
			}
		});

		const save = () => {
			if (h5pEditorRef.value) {
				return h5pEditorRef.value.save();
			} else {
				throw new Error("Editor not loaded");
			}
		};

		const onValidationError = (error: unknown) => {
			emit("validation-error", error);
		};

		expose({ save });

		return {
			h5pEditorRef,
			onValidationError,
		};
	},
});
</script>
