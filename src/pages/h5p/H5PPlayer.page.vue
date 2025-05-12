<template>
	<section>
		<v-btn
			variant="text"
			:ripple="false"
			data-testid="player-back-button"
			@click="goBack"
		>
			<v-icon>{{ mdiChevronLeft }}</v-icon>
			{{ $t(backMenuLabel) }}
		</v-btn>

		<div class="content">
			<H5PPlayerComponent :content-id="contentId" @load-error="loadError" />
		</div>
	</section>
</template>

<script setup lang="ts">
import H5PPlayerComponent from "@/components/h5p/H5PPlayer.vue";
import { useApplicationError } from "@/composables/application-error.composable";
import { H5PContentParentType } from "@/h5pEditorApi/v3";
import { MessageSchema } from "@/locales/schema";
import { applicationErrorModule } from "@/store";
import { mapAxiosErrorToResponseError } from "@/utils/api";
import { mdiChevronLeft } from "@icons/material";
import { computed } from "vue";

const props = defineProps<{
	parentType: H5PContentParentType;
	contentId: string;
}>();

const { createApplicationError } = useApplicationError();

function loadError(error: unknown) {
	const responseError = mapAxiosErrorToResponseError(error);

	applicationErrorModule.setError(createApplicationError(responseError.code));
}

function goBack() {
	window.close();
}

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
	margin: var(--space-xl-3);
}
</style>
