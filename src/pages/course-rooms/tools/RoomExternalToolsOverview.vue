<template>
	<div class="centered-container">
		<div
			v-if="tools.length === 0 && !isVideoConferenceAvailable && !loading"
			class="mt-16 text-center"
			data-testid="tools-empty-state"
		>
			<v-custom-empty-state
				ref="tools-empty-state"
				image="tools-empty-state"
				:title="t('pages.rooms.tools.emptyState')"
				class="mt-16"
				img-height="200px"
			/>
		</div>
		<v-alert
			v-if="error && error.message"
			type="error"
			data-testId="context-tool-error"
			:icon="mdiAlertCircle"
			:text="error.message"
		/>

		<v-progress-linear
			:active="loading"
			data-testId="progress-bar"
			indeterminate
		/>

		<room-video-conference-section
			v-if="isVideoConferenceAvailable"
			class="mb-4"
			:room-id="roomId"
		/>

		<room-external-tools-section
			:tools="tools"
			:room-id="roomId"
			data-testid="room-external-tool-section"
			@delete="onDeleteTool"
			@refresh="() => fetchDisplayData(props.roomId, ToolContextType.Course)"
		/>
	</div>
</template>

<script setup lang="ts">
import { mdiAlertCircle } from "@icons/material";
import VCustomEmptyState from "@/components/molecules/vCustomEmptyState.vue";
import { ToolContextType } from "@/serverApi/v3";
import CourseRoomDetailsModule from "@/store/course-room-details";
import { Course, CourseFeatures } from "@/store/types/room";
import {
	ENV_CONFIG_MODULE_KEY,
	injectStrict,
	COURSE_ROOM_DETAILS_MODULE_KEY,
} from "@/utils/inject";
import {
	ExternalToolDisplayData,
	useExternalToolDisplayListState,
} from "@data-external-tool";
import { computed, ComputedRef, onMounted, onUnmounted, ref, Ref } from "vue";
import { useI18n } from "vue-i18n";
import RoomExternalToolsSection from "./RoomExternalToolsSection.vue";
import RoomVideoConferenceSection from "./RoomVideoConferenceSection.vue";

const props = defineProps({
	roomId: {
		type: String,
		required: true,
	},
});

const { t } = useI18n();
const courseRoomDetailsModule: CourseRoomDetailsModule = injectStrict(
	COURSE_ROOM_DETAILS_MODULE_KEY
);
const envConfigModule = injectStrict(ENV_CONFIG_MODULE_KEY);

const {
	fetchDisplayData,
	deleteContextExternalTool,
	displayData: tools,
	error,
	isLoading: isDisplayDataLoading,
} = useExternalToolDisplayListState();

const course: Ref<Course | null> = ref(null);

const isVideoConferenceAvailable: ComputedRef<boolean> = computed(() => {
	return (
		course.value?.features?.includes(CourseFeatures.VIDEOCONFERENCE) ?? false
	);
});

onMounted(async () => {
	await fetchDisplayData(props.roomId, ToolContextType.Course);

	course.value = await courseRoomDetailsModule.fetchCourse(props.roomId);
});

const refreshTimeInMs = envConfigModule.getEnv.CTL_TOOLS_RELOAD_TIME_MS;

const timer = setInterval(async () => {
	await fetchDisplayData(props.roomId, ToolContextType.Course);
}, refreshTimeInMs);

onUnmounted(() => {
	clearInterval(timer);
});

const loading: ComputedRef<boolean> = computed(
	() => isDisplayDataLoading.value || courseRoomDetailsModule.getLoading
);

const onDeleteTool = async (displayData: ExternalToolDisplayData) => {
	await deleteContextExternalTool(displayData.contextExternalToolId);
};
</script>

<style lang="scss" scoped>
.centered-container {
	max-width: var(--size-content-width-max);
	margin: 0 auto;
}
</style>
