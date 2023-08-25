<template>
	<section :class="{ inline: isInline }">
		<v-btn
			v-if="isInline"
			text
			plain
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
					:contentId="contentId"
					:parentType="parentType"
					:parentId="parentId"
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
import { mdiChevronLeft } from "@mdi/js";
import { AxiosError, HttpStatusCode } from "axios";
import { defineComponent, ref } from "vue";
import VueI18n from "vue-i18n";
import { useRoute } from "vue-router/composables";

import H5PEditorComponent from "@/components/h5p/H5PEditor.vue";
import { I18N_KEY, injectStrict } from "@/utils/inject";

export default defineComponent({
	name: "H5PEditor",
	components: {
		H5PEditorComponent,
	},
	props: {
		parentType: {
			type: String,
			required: true,
		},
		parentId: {
			type: String,
			required: true,
		},
	},
	setup() {
		const { createApplicationError } = useApplicationError();

		const i18n = injectStrict(I18N_KEY);

		if (!i18n) {
			throw new Error("Injection of dependencies failed");
		}

		// TODO: https://ticketsystem.dbildungscloud.de/browse/BC-443
		const t = (key: string, values?: VueI18n.Values | undefined): string => {
			const translateResult = i18n.t(key, values);
			if (typeof translateResult === "string") {
				return translateResult;
			}
			return "unknown translation-key:" + key;
		};

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
						timeout: 10000,
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
				} catch (err) {
					notifierModule.show({
						text: t("common.validation.invalid"),
						status: "error",
						timeout: 10000,
					});
				}
			}
		}

		function goBack() {
			window.close();
		}

		function loadError(err: AxiosError) {
			const statusCode =
				err.response?.status ?? HttpStatusCode.InternalServerError;

			applicationErrorModule.setError(
				createApplicationError(
					statusCode in HttpStatusCode
						? statusCode
						: HttpStatusCode.InternalServerError
				)
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
