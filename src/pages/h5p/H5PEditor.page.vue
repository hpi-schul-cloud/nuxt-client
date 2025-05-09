<template>
	<section>
		<v-btn
			variant="text"
			:ripple="false"
			design="none"
			data-testid="editor-back-button"
			@click="goBack"
		>
			<v-icon>{{ mdiChevronLeft }}</v-icon>
			{{ t(backMenuLabel) }}
		</v-btn>

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
				<v-btn
					class="mt-4"
					color="primary"
					data-testid="editor-save-button"
					@click="save"
				>
					{{ t("common.actions.save") }}
				</v-btn>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import H5PEditorComponent from "@/components/h5p/H5PEditor.vue";
import { useApplicationError } from "@/composables/application-error.composable";
import { H5PContentParentType, H5PSaveResponse } from "@/h5pEditorApi/v3";
import { MessageSchema } from "@/locales/schema";
import type ApplicationErrorModule from "@/store/application-error";
import type NotifierModule from "@/store/notifier";
import { mapAxiosErrorToResponseError } from "@/utils/api";
import {
	APPLICATION_ERROR_KEY,
	injectStrict,
	NOTIFIER_MODULE_KEY,
} from "@/utils/inject";
import { mdiChevronLeft } from "@icons/material";
import { computed, onMounted, Ref, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useH5pEditorBoardHooks } from "./h5pEditorBoardHooks.composable";
import { H5pEditorHooks } from "./h5pEditorHooks";

const props = defineProps<{
	parentType: H5PContentParentType;
	parentId: string;
	contentId?: string;
}>();

const notifierModule: NotifierModule = injectStrict(NOTIFIER_MODULE_KEY);
const applicationErrorModule: ApplicationErrorModule = injectStrict(
	APPLICATION_ERROR_KEY
);

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

			notifierModule.show({
				text: t("pages.h5p.api.success.save"),
				status: "success",
				timeout: 5000,
			});

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
			notifierModule.show({
				text: t("common.validation.invalid"),
				status: "error",
				timeout: 5000,
			});
		}
	}
};

const goBack = () => {
	window.close();
};

const backLabelForScope: Record<H5PContentParentType, keyof MessageSchema> = {
	[H5PContentParentType.LESSONS]: "pages.content.index.backToCourse",
	[H5PContentParentType.BOARD_ELEMENT]: "pages.content.index.backToBoard",
};

const backMenuLabel = computed(() => {
	return backLabelForScope[props.parentType];
});
</script>

<style scoped>
.content {
	margin-top: var(--space-xl-3);
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
