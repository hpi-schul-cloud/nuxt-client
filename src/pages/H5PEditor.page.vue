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
import { notifierModule } from "@/store";
import { mdiChevronLeft } from "@mdi/js";
import { defineComponent, inject, ref } from "vue";
import VueI18n from "vue-i18n";
import { useRoute } from "vue-router/composables";

import H5PEditorComponent from "@/components/h5p/H5PEditor.vue";

export default defineComponent({
	name: "H5PEditor",
	components: {
		H5PEditorComponent,
	},
	setup() {
		const i18n = inject<VueI18n | undefined>("i18n");

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
						// TODO: Success message
						text: t("common.validation.invalid"),
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

		function loadError() {
			console.error("TODO: Error handling when player fails to load");
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
