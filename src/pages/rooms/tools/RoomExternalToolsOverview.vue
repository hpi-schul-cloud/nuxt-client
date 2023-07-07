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
			light
			prominent
			text
			type="error"
			data-testId="context-tool-error"
		>
			{{ apiError.message }}
		</v-alert>

		<v-progress-linear
			:active="loading"
			data-testId="progress-bar"
			indeterminate
		></v-progress-linear>

		<room-video-conference-section
			v-if="isVideoConferenceAvailable"
			class="mb-4"
			:room-id="roomId"
		></room-video-conference-section>

		<room-external-tools-section :tools="tools"></room-external-tools-section>
	</div>
</template>

<script lang="ts">
import VCustomEmptyState from "@/components/molecules/vCustomEmptyState.vue";
import { ExternalToolDisplayData } from "@/store/external-tool/external-tool-display-data";
import { ToolContextType } from "@/store/external-tool/tool-context-type.enum";
import { BusinessError } from "@/store/types/commons";
import { Course, CourseFeatures } from "@/store/types/room";
import {
	CONTEXT_EXTERNAL_TOOLS_MODULE_KEY,
	I18N_KEY,
	injectStrict,
	ROOM_MODULE_KEY,
} from "@/utils/inject";
import {
	computed,
	ComputedRef,
	defineComponent,
	onMounted,
	ref,
	Ref,
} from "vue";
import VueI18n from "vue-i18n";
import RoomModule from "@/store/room";
import ContextExternalToolsModule from "@/store/context-external-tools";
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
		const i18n: VueI18n = injectStrict(I18N_KEY);
		const roomModule: RoomModule = injectStrict(ROOM_MODULE_KEY);

		const course: Ref<Course | null> = ref(null);

		// TODO: https://ticketsystem.dbildungscloud.de/browse/BC-443
		const t = (key: string, values?: VueI18n.Values): string =>
			i18n.tc(key, 0, values);

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
				contextType: ToolContextType.COURSE,
			});

			course.value = await roomModule.fetchCourse(props.roomId);
		});

		const apiError: ComputedRef<BusinessError> = computed(
			() => contextExternalToolsModule.getBusinessError
		);

		const loading: ComputedRef<boolean> = computed(
			() => contextExternalToolsModule.getLoading || roomModule.getLoading
		);

		return {
			loading,
			t,
			tools,
			apiError,
			isVideoConferenceAvailable,
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
