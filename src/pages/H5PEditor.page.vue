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
			<v-btn role="button" color="primary" @click="validateParams">Save</v-btn>
			<iframe
				v-if="!loading"
				v-h5pResize="{ heightCalculationMethod: 'taggedElement' }"
				ref="iframe"
				:src="iframeSrc"
				class="editor-iframe"
				allowfullscreen
				title="H5PEditor"
				v-on:valid-params="onValidParams"
				v-on:invalid-params="onInvalidParams"
			></iframe>
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
import { defineComponent, ref } from "vue";
import { useRoute, useRouter } from "vue-router/composables";

type IFrameResizerElement = { iFrameResizer?: { removeListeners: () => void } };

type ParamsValidEvent = CustomEvent;
type ParamsInvalidEvent = CustomEvent<string>;

export default defineComponent({
	name: "H5PEditor",
	setup() {
		const iframe = ref<HTMLIFrameElement>();

		const route = useRoute();

		const router = useRouter();

		const contentId = route.params?.id ?? "";
		const isInline = !!route.query?.inline;

		const iframeSrc = `${window.location.origin}/api/v3/h5p-editor/edit/${contentId}`;

		function notifyParent(event: CustomEvent) {
			window.dispatchEvent(event);
		}

		function onInvalidParams(event: ParamsInvalidEvent) {
			console.error(event.detail);

			notifierModule.show({
				text: "Invalid",
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
					text: "Could not save?",
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
			goBack: () => console.log("BACK"),
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
</style>
