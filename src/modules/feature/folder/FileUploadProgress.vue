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
			<span>
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
import { defineProps, PropType, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

// Define props for the component
const props = defineProps({
	uploadProgress: {
		type: Object as PropType<{ uploaded: number; total: number }>,
		required: true,
	},
});

const areUploadStatsVisible = ref(false);

watch(
	() => props.uploadProgress.total,
	(newValue, oldValue) => {
		if (oldValue > 0 && newValue === 0) {
			setTimeout(() => {
				areUploadStatsVisible.value = false;
			}, 5000);
		} else if (newValue > 0) {
			areUploadStatsVisible.value = true;
		}
	}
);

const localUploadProgress = ref({ uploaded: 0, total: 0 });

watch(
	() => props.uploadProgress,
	(newStats) => {
		if (newStats.total > 0) {
			localUploadProgress.value = { ...newStats };
		}
	},
	{ deep: true }
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
