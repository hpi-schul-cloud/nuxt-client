<template>
	<section>
		<div class="content">
			<div class="column-layout">
				<H5PEditorComponent
					ref="editorRef"
					class="editor"
					:content-id="contentId"
					:parent-type="parentType"
					:parent-id="parentId"
					@load-error="loadError"
				/>
				<v-btn class="mt-4" color="primary" data-testid="editor-save-button" @click="save">
					{{ t("common.actions.save") }}
				</v-btn>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import { useH5pEditorBoardHooks } from "./h5pEditorBoardHooks.composable";
import { H5pEditorHooks } from "./types/h5pEditorHooks";
import H5PEditorComponent from "@/components/h5p/H5PEditor.vue";
import { useApplicationError } from "@/composables/application-error.composable";
import { H5PContentParentType, H5PSaveResponse } from "@/h5pEditorApi/v3";
import type ApplicationErrorModule from "@/store/application-error";
import { mapAxiosErrorToResponseError } from "@/utils/api";
import { APPLICATION_ERROR_KEY, injectStrict } from "@/utils/inject";
import { notifyError, notifySuccess } from "@data-app";
import { onMounted, Ref, ref } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps<{
	parentType: H5PContentParentType;
	parentId: string;
	contentId?: string;
}>();

const applicationErrorModule: ApplicationErrorModule = injectStrict(APPLICATION_ERROR_KEY);

const { t } = useI18n();

const { createApplicationError } = useApplicationError();

const editorRef: Ref<typeof H5PEditorComponent | undefined> = ref();

const notifyParent = (event: CustomEvent) => {
	window.dispatchEvent(event);
};

const loadError = (error: unknown) => {
	const responseError = mapAxiosErrorToResponseError(error);

	applicationErrorModule.setError(createApplicationError(responseError.code));
};

let hooks: H5pEditorHooks | undefined;

if (props.parentType === H5PContentParentType.BOARD_ELEMENT) {
	hooks = useH5pEditorBoardHooks(props.parentId);
}

onMounted(async () => {
	if (hooks) {
		try {
			await hooks.onCreate();
		} catch (error: unknown) {
			loadError(error);
		}
	}
});

const save = async () => {
	if (editorRef.value) {
		try {
			const data: H5PSaveResponse = await editorRef.value.save();

			if (hooks) {
				await hooks.afterSave(data.contentId);
			}

			notifySuccess(t("pages.h5p.api.success.save"));

			notifyParent(
				new CustomEvent("save-content", {
					detail: {
						contentId: data.contentId,
						title: data.metadata.title,
						contentType: data.metadata.mainLibrary,
					},
				})
			);
		} catch {
			notifyError(t("common.validation.invalid"));
		}
	}
};
</script>

<style scoped>
.content {
	margin-top: 52px;
}

.editor {
	height: 100%;
	width: 100%;
	max-width: 960px;
	border: none;
	overflow: auto;
	display: block;
	margin: auto;
}

.column-layout {
	display: flex;
	flex-direction: column;
	align-items: center;
}
</style>
