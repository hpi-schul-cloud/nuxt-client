<template>
	<div>
		<div
			v-if="!playerInitialized"
			class="d-flex position-fixed justify-center align-center min-height-screen"
		>
			<v-progress-circular indeterminate size="115" />
		</div>
		<h5p-player
			ref="h5pPlayerRef"
			:content-id="contentId"
			@initialized="playerInitialized = true"
		/>
	</div>
</template>

<script lang="ts">
import {
	defineElements,
	H5PPlayerComponent,
} from "@lumieducation/h5p-webcomponents";

import { defineComponent, ref, watch } from "vue";
import { H5pEditorApiFactory, LanguageType } from "@/h5pEditorApi/v3";
import { $axios } from "@/utils/api";

defineElements("h5p-player");

export default defineComponent({
	name: "H5PPlayerComponent",
	props: {
		contentId: {
			type: String,
			default: undefined,
		},
	},
	emits: ["load-error"],
	setup(_props, { emit }) {
		const h5pPlayerRef = ref<H5PPlayerComponent>();
		const playerInitialized = ref(false);

		const h5pEditorApi = H5pEditorApiFactory(undefined, "v3", $axios);

		const loadContent = async (id: string) => {
			try {
				const { data } = await h5pEditorApi.h5PEditorControllerGetPlayer(
					LanguageType.DE,
					id
				);
				return data;
			} catch (err) {
				emit("load-error", err);
				throw err;
			}
		};

		watch(h5pPlayerRef, (editor) => {
			if (editor) {
				editor.loadContentCallback = loadContent;
			}
		});

		return {
			h5pPlayerRef,
			playerInitialized,
		};
	},
});
</script>

<style scoped>
.hidden {
	display: none;
}
</style>
