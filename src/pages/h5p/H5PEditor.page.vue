<template>
	<section :class="{ inline: isInline }">
		<v-btn
			v-if="isInline"
			variant="text"
			:ripple="false"
			design="none"
			class="arrow__back"
			@click="goBack"
		>
			<v-icon>{{ mdiChevronLeft }}</v-icon>
			{{ $t("pages.content.index.backToCourse") }}
		</v-btn>

		<div class="content" :class="{ inline: isInline }">
			<div class="column-layout">
				<H5PEditorComponent
					ref="editorRef"
					class="editor"
					:content-id="contentId"
					:parent-type="parentType"
					:parent-id="parentId"
					@load-error="loadError"
				/>
				<v-btn role="button" class="save-button" color="primary" @click="save">
					{{ $t("common.actions.save") }}
				</v-btn>
			</div>
		</div>
	</section>
</template>

<script lang="ts">
import { useApplicationError } from "@/composables/application-error.composable";
import { applicationErrorModule, notifierModule } from "@/store";
import { mdiChevronLeft } from "@icons/material";
import { PropType, defineComponent, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";

import H5PEditorComponent from "@/components/h5p/H5PEditor.vue";
import { H5PContentParentType } from "@/h5pEditorApi/v3";
import { mapAxiosErrorToResponseError } from "@/utils/api";

export default defineComponent({
	name: "H5PEditor",
	components: {
		H5PEditorComponent,
	},
	props: {
		parentType: {
			type: String as PropType<H5PContentParentType>,
			required: true,
		},
		parentId: {
			type: String,
			required: true,
		},
	},
	setup() {
		const { createApplicationError } = useApplicationError();

		const { t } = useI18n();

		const route = useRoute();

		const editorRef = ref<typeof H5PEditorComponent>();

		const contentId = route.params?.id;
		const isInline = !!route.query?.inline;

		function notifyParent(event: CustomEvent) {
			window.dispatchEvent(event);
		}

		async function save() {
			if (editorRef.value) {
				try {
					const data = await editorRef.value.save();

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
		}

		function goBack() {
			window.close();
		}

		function loadError(error: unknown) {
			const responseError = mapAxiosErrorToResponseError(error);

			applicationErrorModule.setError(
				createApplicationError(responseError.code)
			);
		}

		return {
			contentId,
			mdiChevronLeft,
			isInline,
			loadError,
			goBack,
			save,
			editorRef,
		};
	},
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
