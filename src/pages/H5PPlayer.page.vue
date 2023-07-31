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
			<H5PPlayerComponent :contentId="contentId" @load-error="onLoadError" />
		</div>
	</section>
</template>

<script lang="ts">
import { useApplicationError } from "@/composables/application-error.composable";
import { applicationErrorModule } from "@/store";
import { mdiChevronLeft } from "@mdi/js";
import { AxiosError, HttpStatusCode } from "axios";
import { defineComponent } from "vue";
import { useRoute } from "vue-router/composables";

import H5PPlayerComponent from "@/components/h5p/H5PPlayer.vue";

export default defineComponent({
	name: "H5PPlayer",
	components: {
		H5PPlayerComponent,
	},
	setup() {
		const route = useRoute();
		const { createApplicationError } = useApplicationError();

		const contentId = route.params?.id;
		const isInline = !!route.query?.inline;

		function goBack() {
			window.close();
		}

		function onLoadError(err: AxiosError) {
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
			goBack,
			isInline,
			onLoadError,
			mdiChevronLeft,
		};
	},
});
</script>

<style scoped>
.content {
	margin: var(--space-xl-3);
}
</style>
