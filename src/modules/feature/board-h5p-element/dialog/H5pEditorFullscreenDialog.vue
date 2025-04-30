<template>
	<VDialog
		:model-value="isOpen"
		:fullscreen="true"
		scrollable
		@keydown.escape="onDialogClose"
	>
		<VCard>
			<div class="toolbar-fixed-offset">
				<VToolbar class="toolbar-position" color="white" elevation="2">
					<VBtn icon data-testid="h5p-editor-close" @click="onDialogClose">
						<VIcon>{{ mdiClose }}</VIcon>
					</VBtn>
					<span class="title">H5P Interaktives Lernelement</span>
					<VSpacer />
					<VBtn
						variant="flat"
						color="primary"
						class="mr-4"
						data-testid="h5p-editor-save"
						@click="onSave"
					>
						{{ t("common.actions.save") }}
					</VBtn>
				</VToolbar>
			</div>
			<VCardText>
				<H5PEditorComponent
					v-if="isOpen"
					ref="editorRef"
					data-testid="h5p-editor"
					class="editor"
					:content-id="contentId"
					:parent-type="parentType"
					:parent-id="parentId"
					@load-error="onLoadError"
				/>
			</VCardText>
		</VCard>
	</VDialog>
</template>

<script setup lang="ts">
import H5PEditorComponent from "@/components/h5p/H5PEditor.vue";
import { H5PContentParentType } from "@/h5pEditorApi/v3";
import type NotifierModule from "@/store/notifier";
import { injectStrict, NOTIFIER_MODULE_KEY } from "@/utils/inject";
import { mdiClose } from "@icons/material";
import { Ref, ref } from "vue";
import { useI18n } from "vue-i18n";
import { ModelRef } from "vue/dist/vue";

const isOpen: ModelRef<boolean> = defineModel("isOpen", {
	type: Boolean,
	required: true,
});

defineProps<{
	parentType: H5PContentParentType;
	parentId: string;
	contentId: string | undefined;
}>();

const emit = defineEmits<{
	(e: "save", contentId: string): void;
}>();

const { t } = useI18n();
const notifierModule: NotifierModule = injectStrict(NOTIFIER_MODULE_KEY);

const editorRef: Ref<typeof H5PEditorComponent | undefined> = ref();

const onLoadError = () => {
	notifierModule.show({
		text: t("error.load"),
		status: "error",
		timeout: 5000,
	});
};

const onDialogClose = () => {
	isOpen.value = false;
};

const onSave = async () => {
	if (!editorRef.value) {
		return;
	}

	try {
		const data = await editorRef.value.save();

		emit("save", data.contentId);

		notifierModule.show({
			text: t("pages.h5p.api.success.save"),
			status: "success",
			timeout: 5000,
		});

		isOpen.value = false;
	} catch {
		notifierModule.show({
			text: t("common.validation.invalid"),
			status: "error",
			timeout: 5000,
		});
	}
};
</script>

<style>
.editor {
	width: 100%;
	max-width: 960px;
	margin: 0 auto;
}

.title {
	font-family: var(--font-accent);
	font-size: 1rem;
	font-weight: 700;
}

.toolbar-position {
	position: absolute;
	width: 100%;
	z-index: 1000;
}

.toolbar-fixed-offset {
	margin-bottom: 64px;
}
</style>
