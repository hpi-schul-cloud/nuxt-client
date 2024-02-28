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
				imgHeight="200px"
			/>
		</div>
		<v-alert
			v-if="apiError && apiError.message"
			type="error"
			data-testId="context-tool-error"
			:icon="mdiAlertCircle"
			:text="apiError.message"
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
		/>
	</div>
</template>

<script lang="ts">
import { mdiAlertCircle } from "@/components/icons/material";
import VCustomEmptyState from "@/components/molecules/vCustomEmptyState.vue";
import { ToolContextType } from "@/serverApi/v3";
import ContextExternalToolsModule from "@/store/context-external-tools";
import { ExternalToolDisplayData } from "@/store/external-tool/external-tool-display-data";
import RoomModule from "@/store/room";
import { BusinessError } from "@/store/types/commons";
import { Course, CourseFeatures } from "@/store/types/room";
import {
	CONTEXT_EXTERNAL_TOOLS_MODULE_KEY,
	ENV_CONFIG_MODULE_KEY,
	injectStrict,
	ROOM_MODULE_KEY,
} from "@/utils/inject";
import {
	computed,
	ComputedRef,
	defineComponent,
	onMounted,
	onUnmounted,
	ref,
	Ref,
} from "vue";
import { useI18n } from "vue-i18n";
import RoomExternalToolsSection from "./RoomExternalToolsSection.vue";
import RoomVideoConferenceSection from "./RoomVideoConferenceSection.vue";

export default defineComponent({
	components: {
		RoomExternalToolsSection,
		RoomVideoConferenceSection,
		VCustomEmptyState,
	},
	props: {
		roomId: {
			type: String,
			required: true,
		},
	},
	setup(props) {
		const contextExternalToolsModule: ContextExternalToolsModule = injectStrict(
			CONTEXT_EXTERNAL_TOOLS_MODULE_KEY
		);
		const { t } = useI18n();
		const roomModule: RoomModule = injectStrict(ROOM_MODULE_KEY);
		const envConfigModule = injectStrict(ENV_CONFIG_MODULE_KEY);

		const course: Ref<Course | null> = ref(null);

		const isVideoConferenceAvailable: ComputedRef<boolean> = computed(() => {
			return (
				course.value?.features?.includes(CourseFeatures.VIDEOCONFERENCE) ??
				false
			);
		});

		const tools: ComputedRef<ExternalToolDisplayData[]> = computed(
			() => contextExternalToolsModule.getExternalToolDisplayDataList
		);

		onMounted(async () => {
			await contextExternalToolsModule.loadExternalToolDisplayData({
				contextId: props.roomId,
				contextType: ToolContextType.Course,
			});

			course.value = await roomModule.fetchCourse(props.roomId);
		});

		const refreshTimeInMs = envConfigModule.getEnv.CTL_TOOLS_RELOAD_TIME_MS;

		const timer = setInterval(async () => {
			await contextExternalToolsModule.loadExternalToolDisplayData({
				contextId: props.roomId,
				contextType: ToolContextType.Course,
			});
		}, refreshTimeInMs);

		const apiError: ComputedRef<BusinessError> = computed(
			() => contextExternalToolsModule.getBusinessError
		);

		const loading: ComputedRef<boolean> = computed(
			() => contextExternalToolsModule.getLoading || roomModule.getLoading
		);

		onUnmounted(() => {
			clearInterval(timer);
		});

		return {
			loading,
			t,
			tools,
			apiError,
			isVideoConferenceAvailable,
			mdiAlertCircle,
		};
	},
});
</script>

<style lang="scss" scoped>
.centered-container {
	max-width: var(--size-content-width-max);
	margin: 0 auto;
}
</style>
