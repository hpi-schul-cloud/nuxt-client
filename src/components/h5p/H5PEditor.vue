<template>
	<div>
		<h5p-editor
			ref="h5pEditorRef"
			:content-id="contentId"
			@validation-error="onValidationError"
		/>
	</div>
</template>

<script lang="ts">
import {
	H5PContentParentType,
	H5pEditorApiFactory,
	H5PSaveResponse,
	LanguageType,
	PostH5PContentCreateParams,
} from "@/h5pEditorApi/v3";
import { $axios } from "@/utils/api";
import {
	defineElements,
	H5PEditorComponent,
} from "@lumieducation/h5p-webcomponents";
import { defineComponent, PropType, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

defineElements("h5p-editor");

export default defineComponent({
	name: "H5PEditorComponent",
	props: {
		contentId: {
			type: String,
			default: "new",
		},
		parentType: {
			type: String as PropType<H5PContentParentType>,
			required: true,
		},
		parentId: {
			type: String,
			required: true,
		},
	},
	emits: ["saved", "save-error", "load-error", "validation-error"],
	setup(props, { emit, expose }) {
		const h5pEditorRef = ref<H5PEditorComponent>();

		const h5pEditorApi = H5pEditorApiFactory(undefined, "v3", $axios);
		const i18n = useI18n();
		const language = i18n.locale.value as LanguageType;

		const loadContent = async (id?: string) => {
			try {
				const { data } = id
					? await h5pEditorApi.h5PEditorControllerGetH5PEditor(id, language)
					: await h5pEditorApi.h5PEditorControllerGetNewH5PEditor(language);

				return data;
			} catch (err) {
				emit("load-error", err);
			}
		};

		const saveContent = async (
			contentId: string,
			requestBody: { library: string; params: object }
		): Promise<H5PSaveResponse> => {
			const createParams: PostH5PContentCreateParams = {
				library: requestBody.library,
				params: requestBody.params,
				parentId: props.parentId,
				parentType: props.parentType,
			};

			const { data } = contentId
				? await h5pEditorApi.h5PEditorControllerSaveH5pContent(
						contentId,
						createParams
					)
				: await h5pEditorApi.h5PEditorControllerCreateH5pContent(createParams);

			return data;
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
