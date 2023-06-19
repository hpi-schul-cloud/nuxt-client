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
			<div v-if="!loading" class="column-layout">
				<iframe
					v-h5pResize="{ heightCalculationMethod: 'taggedElement' }"
					ref="iframe"
					:src="iframeSrc"
					class="editor-iframe"
					allowfullscreen
					title="H5PEditor"
					v-on:valid-params="onValidParams"
					v-on:invalid-params="onInvalidParams"
				></iframe>
				<v-btn
					role="button"
					class="save-button"
					color="primary"
					@click="validateParams"
				>
					{{ $t("common.actions.save") }}
				</v-btn>
			</div>
			<div v-else class="d-flex justify-center align-center min-height-screen">
				<v-progress-circular indeterminate color="secondary" size="115" />
			</div>
		</div>
	</section>
</template>

<script lang="ts">
import { notifierModule } from "@/store";
import { $axios } from "@/utils/api";
import { mdiChevronLeft } from "@mdi/js";
import { iframeResizer } from "iframe-resizer";
import { defineComponent, inject, ref } from "vue";
import VueI18n from "vue-i18n";
import { useRoute, useRouter } from "vue-router/composables";

type IFrameResizerElement = { iFrameResizer?: { removeListeners: () => void } };

type ParamsValidEvent = CustomEvent;
type ParamsInvalidEvent = CustomEvent<string>;

export default defineComponent({
	name: "H5PEditor",
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
		const router = useRouter();

		const iframe = ref<HTMLIFrameElement>();

		const contentId = route.params?.id ?? "";
		const isInline = !!route.query?.inline;

		const iframeSrc = `${window.location.origin}/api/v3/h5p-editor/edit/${contentId}`;

		function notifyParent(event: CustomEvent) {
			window.dispatchEvent(event);
		}

		function onInvalidParams(event: ParamsInvalidEvent) {
			notifierModule.show({
				text: t("common.validation.invalid"),
				status: "error",
				timeout: 10000,
			});
		}

		async function onValidParams(event: ParamsValidEvent) {
			try {
				const response = await $axios.post<{
					id: string;
					metadata: { title: string; mainLibrary: string };
				}>(`/v3/h5p-editor/edit/${contentId}`, event.detail);

				const {
					id,
					metadata: { title, mainLibrary },
				} = response.data;

				notifyParent(
					new CustomEvent("save-content", {
						detail: { contentId: id, title, contentType: mainLibrary },
					})
				);

				router.replace({
					path: `/h5p/editor/${id}`,
					query: route.query,
				});
			} catch (err) {
				notifierModule.show({
					text: t("common.validation.invalid"),
					status: "error",
					timeout: 10000,
				});
			}
		}

		function validateParams() {
			if (iframe.value) {
				iframe.value.contentWindow?.postMessage("validate-params");
			}
		}

		function goBack() {
			window.close();
		}

		return {
			iframe,
			loading: false,
			iframeSrc,
			scriptSrc: "#",
			mdiChevronLeft,
			isInline,
			onValidParams,
			onInvalidParams,
			validateParams,
			goBack,
		};
	},
	directives: {
		h5pResize: {
			bind: function (el: HTMLElement, { value = {} }) {
				el.addEventListener("load", () => iframeResizer(value, el));
			},
			unbind: function (el) {
				(el as IFrameResizerElement).iFrameResizer?.removeListeners();
			},
		},
	},
});
</script>

<style scoped>
.editor-iframe {
	height: 100%;
	width: 100%;
	max-width: 960px;
	border: none;
	overflow: auto;
	display: block;
	margin: auto;
}

.inline {
	min-height: calc(100vh - calc(64 * var(--border-width-bold)));
}

.column-layout {
	display: flex;
	flex-direction: column;
	align-items: center;
}
</style>
