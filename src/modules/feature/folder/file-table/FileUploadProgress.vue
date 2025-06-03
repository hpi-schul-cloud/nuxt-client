<template>
	<transition name="fade">
		<div v-if="areUploadStatsVisible">
			<v-progress-circular
				v-if="localUploadProgress.uploaded < localUploadProgress.total"
				indeterminate
				class="mr-2"
				size="20"
				width="2"
			/>
			<v-icon v-else color="green" class="mr-2"> {{ mdiCheckCircle }}</v-icon>
			<span data-testid="upload-progress">
				{{
					t("pages.folder.uploadstats", {
						uploaded: localUploadProgress.uploaded,
						total: localUploadProgress.total,
					})
				}}
			</span>
		</div>
	</transition>
</template>

<script setup lang="ts">
import { mdiCheckCircle } from "@icons/material";
import { PropType, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const props = defineProps({
	uploadProgress: {
		type: Object as PropType<{ uploaded: number; total: number }>,
		required: true,
	},
});

const areUploadStatsVisible = ref(false);

const localUploadProgress = ref({ uploaded: 0, total: 0 });

watch(
	() => props.uploadProgress,
	(newStats) => {
		if (newStats.total > 0) {
			localUploadProgress.value = { ...newStats };
			areUploadStatsVisible.value = true;
		} else if (localUploadProgress.value.total > 0 && newStats.total === 0) {
			setTimeout(() => {
				areUploadStatsVisible.value = false;
			}, 5000);
		}
	},
	{ deep: true, immediate: true }
);
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.5s ease-out;
}
.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
</style>
