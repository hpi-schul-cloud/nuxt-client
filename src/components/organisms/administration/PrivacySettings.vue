<template>
	<div>
		<v-row
			class="student-visibility-switch"
			v-if="isTeacherStudentVisibilityVisible"
		>
			<v-col>
				<v-switch
					:disabled="!isTeacherStudentVisibilityConfigurable"
					:model-value="studentVisibility"
					:label="
						$t(
							'pages.administration.school.index.privacySettings.labels.studentVisibility'
						)
					"
					:aria-label="
						$t(
							'pages.administration.school.index.privacySettings.labels.studentVisibility'
						)
					"
					:true-icon="mdiCheck"
					inset
					flat
					density="compact"
					color="primary"
					class="ml-1 mt-0"
					@update:modelValue="
						($event) =>
							$emit('update-privacy-settings', $event, 'teacher.STUDENT_LIST')
					"
				/>
				<p v-if="isTeacherStudentVisibilityConfigurable" class="switch-hint">
					{{ $t(studentVisibilityTextKey) }}
				</p>
				<p v-else class="switch-hint">
					{{
						$t(
							"pages.administration.school.index.privacySettings.longText.configurabilityInfoText"
						)
					}}
				</p>
			</v-col>
		</v-row>
		<v-row v-if="toggleStudentLernstoreViewEnabled" class="learnstore-switch">
			<v-col>
				<v-switch
					:model-value="lernStoreVisibility"
					:label="
						$t(
							'pages.administration.school.index.privacySettings.labels.lernStore'
						)
					"
					:aria-label="
						$t(
							'pages.administration.school.index.privacySettings.labels.lernStore'
						)
					"
					class="ml-1 mt-0"
					@update:model-value="
						($event) =>
							$emit('update-privacy-settings', $event, 'student.LERNSTORE_VIEW')
					"
					inset
					flat
					density="compact"
					color="primary"
					:true-icon="mdiCheck"
				/>
				<p class="switch-hint">
					{{
						$t(
							"pages.administration.school.index.privacySettings.longText.lernStore"
						)
					}}
				</p>
			</v-col>
		</v-row>
		<v-row v-if="rocketChatEnabled" class="rocketchat-switch">
			<v-col>
				<v-switch
					:model-value="features.rocketChat"
					:label="
						$t(
							'pages.administration.school.index.privacySettings.labels.chatFunction'
						)
					"
					:aria-label="
						$t(
							'pages.administration.school.index.privacySettings.labels.chatFunction'
						)
					"
					:true-icon="mdiCheck"
					class="ml-1 mt-0"
					data-testid="toggle_chat"
					@update:model-value="
						($event) => $emit('update-feature-settings', $event, 'rocketChat')
					"
					inset
					flat
					density="compact"
					color="primary"
				/>
				<p class="switch-hint">
					{{
						$t(
							"pages.administration.school.index.privacySettings.longText.chatFunction"
						)
					}}
				</p>
			</v-col>
		</v-row>
		<v-row v-if="videoConferenceEnabled" class="videoconference-switch">
			<v-col>
				<v-switch
					:model-value="features.videoconference"
					:label="
						$t(
							'pages.administration.school.index.privacySettings.labels.videoConference'
						)
					"
					:aria-label="
						$t(
							'pages.administration.school.index.privacySettings.labels.videoConference'
						)
					"
					:true-icon="mdiCheck"
					class="ml-1 mt-0"
					data-testid="toggle_video_conference"
					@update:model-value="
						($event) =>
							$emit('update-feature-settings', $event, 'videoconference')
					"
					inset
					flat
					density="compact"
					color="primary"
				/>
				<p class="switch-hint">
					{{
						$t(
							"pages.administration.school.index.privacySettings.longText.videoConference"
						)
					}}
				</p>
			</v-col>
		</v-row>
	</div>
</template>

<script setup lang="ts">
import { envConfigModule } from "@/store";
import { computed } from "vue";
import { mdiCheck } from "@mdi/js";

const props = defineProps({
	permissions: {
		type: Object,
		required: true,
	},
	features: {
		type: Object,
		required: true,
	},
});

const toggleStudentLernstoreViewEnabled = computed(
	() => envConfigModule.getAdminToggleStudentLernstoreViewEnabled
);

const isTeacherStudentVisibilityConfigurable = computed(
	() => envConfigModule.getTeacherStudentVisibilityIsConfigurable
);

const isTeacherStudentVisibilityVisible = computed(
	() => envConfigModule.getTeacherStudentVisibilityIsVisible
);

const videoConferenceEnabled = computed(
	() => envConfigModule.getVideoConferenceEnabled
);

const rocketChatEnabled = computed(() => envConfigModule.getRocketChatEnabled);

const theme = computed(() => envConfigModule.getTheme);

const studentVisibility = computed(() => {
	if (isTeacherStudentVisibilityConfigurable.value) {
		return props.permissions?.value.teacher
			? props.permissions.teacher.STUDENT_LIST
			: false;
	} else {
		return envConfigModule.getTeacherStudentVisibilityIsEnabledByDefault;
	}
});

const studentVisibilityTextKey = computed(() => {
	switch (theme.value) {
		case "n21":
			return "pages.administration.school.index.privacySettings.longText.studentVisibilityNiedersachsen";
		case "brb":
			return "pages.administration.school.index.privacySettings.longText.studentVisibilityBrandenburg";
		default:
			return "pages.administration.school.index.privacySettings.longText.studentVisibility";
	}
});

const lernStoreVisibility = computed(() => {
	return props.permissions.student
		? props.permissions.student.LERNSTORE_VIEW
		: true;
});
</script>

<style lang="scss" scoped>
.switch-hint {
	font-size: 12px !important;
	line-height: 18px !important;
	font-weight: 400 !important;
	margin-top: -8px !important;
	margin-left: 60px !important;
}
</style>
