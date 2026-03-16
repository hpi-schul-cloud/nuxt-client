<template>
	<section>
		<div class="content">
			<H5PPlayerComponent :content-id="contentId" @load-error="loadError" />
		</div>
	</section>
</template>

<script setup lang="ts">
import H5PPlayerComponent from "@/components/h5p/H5PPlayer.vue";
import { mapAxiosErrorToResponseError } from "@/utils/api";
import { H5PContentParentType } from "@api-h5p";
import { useAppStore } from "@data-app";

defineProps<{
	parentType: H5PContentParentType;
	contentId: string;
}>();

const loadError = (error: unknown) => {
	const responseError = mapAxiosErrorToResponseError(error);
	useAppStore().handleApplicationError(responseError.code);
};
</script>

<style scoped>
.content {
	margin: 52px;
}
</style>
