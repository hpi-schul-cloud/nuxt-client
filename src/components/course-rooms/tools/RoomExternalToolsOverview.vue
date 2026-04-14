<template>
	<div class="centered-container">
		<div
			v-if="tools.length === 0 && !isVideoConferenceAvailable && !loadingTemplate"
			class="mt-16 text-center"
			data-testid="tools-empty-state"
		>
			<EmptyState :title="t('pages.rooms.tools.emptyState')">
				<template #media>
					<ToolsEmptyStateSvg />
				</template>
			</EmptyState>
		</div>
		<v-alert
			v-if="error && error.message"
			type="error"
			data-testId="context-tool-error"
			:icon="mdiAlertCircle"
			:text="error.message"
		/>

		<v-progress-linear :active="loadingTemplate" data-testId="progress-bar" indeterminate />

		<room-video-conference-section v-if="isVideoConferenceAvailable" class="mb-4" :room-id="roomId" />

		<room-external-tools-section
			:tools="tools"
			:room-id="roomId"
			data-testid="room-external-tool-section"
			@delete="onDeleteTool"
			@refresh="() => fetchDisplayData(props.roomId, ToolContextType.COURSE)"
		/>
	</div>
</template>

<script setup lang="ts">
import RoomExternalToolsSection from "./RoomExternalToolsSection.vue";
import RoomVideoConferenceSection from "./RoomVideoConferenceSection.vue";
import { Course, CourseFeatures } from "@/store/types/room";
import { ToolContextType } from "@api-server";
import { useCourseRoomDetailsStore } from "@data-course-rooms";
import { useEnvConfig } from "@data-env";
import { ExternalToolDisplayData, useExternalToolDisplayListState } from "@data-external-tool";
import { mdiAlertCircle } from "@icons/material";
import { EmptyState, ToolsEmptyStateSvg } from "@ui-empty-state";
import { storeToRefs } from "pinia";
import { computed, ComputedRef, onMounted, onUnmounted, Ref, ref } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps({
	roomId: {
		type: String,
		required: true,
	},
});

const { t } = useI18n();

const { fetchCourse } = useCourseRoomDetailsStore();
const { loading } = storeToRefs(useCourseRoomDetailsStore());

const {
	fetchDisplayData,
	deleteContextExternalTool,
	displayData: tools,
	error,
	isLoading: isDisplayDataLoading,
} = useExternalToolDisplayListState();

const course: Ref<Course | null> = ref(null);

const isVideoConferenceAvailable: ComputedRef<boolean> = computed(
	() => course.value?.features?.includes(CourseFeatures.VIDEOCONFERENCE) ?? false
);

onMounted(async () => {
	await fetchDisplayData(props.roomId, ToolContextType.COURSE);

	course.value = await fetchCourse(props.roomId);
});

const refreshTimeInMs = useEnvConfig().value.CTL_TOOLS_RELOAD_TIME_MS;

const timer = setInterval(async () => {
	await fetchDisplayData(props.roomId, ToolContextType.COURSE);
}, refreshTimeInMs);

onUnmounted(() => {
	clearInterval(timer);
});

const loadingTemplate: ComputedRef<boolean> = computed(() => isDisplayDataLoading.value || loading.value);

const onDeleteTool = async (displayData: ExternalToolDisplayData) => {
	await deleteContextExternalTool(displayData.contextExternalToolId);
};
</script>

<style lang="scss" scoped>
.centered-container {
	max-width: var(--content-max-width);
	margin: 0 auto;
}
</style>
