<template>
	<section>
		<div class="content">
			<H5PPlayerComponent :content-id="contentId" @load-error="loadError" />
		</div>
	</section>
</template>

<script setup lang="ts">
import H5PPlayerComponent from "@/components/h5p/H5PPlayer.vue";
import { useApplicationError } from "@/composables/application-error.composable";
import { H5PContentParentType } from "@/h5pEditorApi/v3";
import type ApplicationErrorModule from "@/store/application-error";
import { mapAxiosErrorToResponseError } from "@/utils/api";
import { APPLICATION_ERROR_KEY, injectStrict } from "@/utils/inject";

defineProps<{
	parentType: H5PContentParentType;
	contentId: string;
}>();

const applicationErrorModule: ApplicationErrorModule = injectStrict(
	APPLICATION_ERROR_KEY
);

const { createApplicationError } = useApplicationError();

function loadError(error: unknown) {
	const responseError = mapAxiosErrorToResponseError(error);

	applicationErrorModule.setError(createApplicationError(responseError.code));
}
</script>

<style scoped>
.content {
	margin: var(--space-xl-3);
}
</style>
