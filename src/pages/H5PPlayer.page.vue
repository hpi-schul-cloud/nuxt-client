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
			<H5PPlayerComponent
				ref="playerRef"
				:contentId="contentId"
				@load-error="loadError"
			/>
		</div>
	</section>
</template>

<script lang="ts">
import { mdiChevronLeft } from "@mdi/js";
import { defineComponent, ref } from "vue";
import { useRoute } from "vue-router/composables";

import H5PPlayerComponent from "@/components/h5p/H5PPlayer.vue";

export default defineComponent({
	name: "H5PPlayer",
	components: {
		H5PPlayerComponent,
	},
	setup() {
		const route = useRoute();

		const playerRef = ref<typeof H5PPlayerComponent>();

		const contentId = route.params?.id;
		const isInline = !!route.query?.inline;

		function goBack() {
			window.close();
		}

		function loadError() {
			console.error("TODO: Error handling when player fails to load");
		}

		return {
			contentId,
			goBack,
			isInline,
			loadError,
			mdiChevronLeft,
			playerRef,
		};
	},
});
</script>

<style scoped>
.content {
	margin: var(--space-xl-3);
}
</style>
