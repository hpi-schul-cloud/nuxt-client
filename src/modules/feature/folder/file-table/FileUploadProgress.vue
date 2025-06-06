<template>
	<transition name="fade">
		<div v-if="areUploadStatsVisible">
			<v-progress-circular
				v-if="uploadProgress.uploaded < uploadProgress.total"
				indeterminate
				class="mr-2"
				size="20"
				width="2"
			/>
			<v-icon v-else color="green" class="mr-2"> {{ mdiCheckCircle }}</v-icon>
			<span data-testid="upload-progress">
				{{
					t("pages.folder.uploadstats", {
						uploaded: uploadProgress.uploaded,
						total: uploadProgress.total,
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

const emit = defineEmits(["reset-upload-progress"]);

const areUploadStatsVisible = ref(false);
let timeout: NodeJS.Timeout | null = null;

watch(
	() => props.uploadProgress,
	(newStats) => {
		if (timeout) {
			clearTimeout(timeout);
			timeout = null;
		}

		if (newStats.total > 0 && newStats.total === newStats.uploaded) {
			timeout = setTimeout(() => {
				areUploadStatsVisible.value = false;
				emit("reset-upload-progress");
				timeout = null;
			}, 5000);
		} else if (newStats.total > 0) {
			areUploadStatsVisible.value = true;
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
