<template>
	<div>
		<v-row v-if="isTeacherStudentVisibilityVisible">
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
					class="ml-1 mt-0"
					data-testid="admin-school-toggle-student-visibility"
					@update:model-value="
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
		<v-row v-if="toggleStudentLernstoreViewEnabled">
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
					data-testid="admin-school-toggle-learning-store"
					:true-icon="mdiCheck"
					@update:model-value="
						($event) =>
							$emit('update-privacy-settings', $event, 'student.LERNSTORE_VIEW')
					"
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
		<v-row v-if="rocketChatEnabled">
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
		<v-row v-if="videoConferenceEnabled">
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
		<v-row v-if="aiTutorEnabled">
			<v-col>
				<v-switch
					:model-value="features.aiTutor"
					:label="
						$t(
							'pages.administration.school.index.privacySettings.labels.aiTutor'
						)
					"
					:aria-label="
						$t(
							'pages.administration.school.index.privacySettings.labels.aiTutor'
						)
					"
					:true-icon="mdiCheck"
					class="ml-1 mt-0"
					data-testid="toggle_ai_tutor"
					@update:model-value="
						($event) => $emit('update-feature-settings', $event, 'aiTutor')
					"
				/>
				<p class="switch-hint">
					{{
						$t(
							"pages.administration.school.index.privacySettings.longText.aiTutor"
						)
					}}
				</p>
			</v-col>
		</v-row>
	</div>
</template>

<script setup lang="ts">
import { SchulcloudTheme } from "@/serverApi/v3";
import { mdiCheck } from "@icons/material";
import { computed } from "vue";
import { useEnvConfig } from "@data-env";

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

defineEmits(["update-privacy-settings", "update-feature-settings"]);

const envConfig = useEnvConfig();

const toggleStudentLernstoreViewEnabled = computed(
	() => envConfig.value.FEATURE_ADMIN_TOGGLE_STUDENT_LERNSTORE_VIEW_ENABLED
);

const isTeacherStudentVisibilityConfigurable = computed(
	() => envConfig.value.TEACHER_STUDENT_VISIBILITY__IS_CONFIGURABLE
);

const isTeacherStudentVisibilityVisible = computed(
	() => envConfig.value.TEACHER_STUDENT_VISIBILITY__IS_VISIBLE
);

const videoConferenceEnabled = computed(
	() => envConfig.value.FEATURE_VIDEOCONFERENCE_ENABLED
);

const aiTutorEnabled = computed(() => envConfig.value.FEATURE_AI_TUTOR_ENABLED);

const rocketChatEnabled = computed(
	() => envConfig.value.ROCKETCHAT_SERVICE_ENABLED
);

const theme = computed(() => envConfig.value.SC_THEME);

const studentVisibility = computed(() => {
	if (isTeacherStudentVisibilityConfigurable.value) {
		return props.permissions?.teacher
			? props.permissions.teacher.STUDENT_LIST
			: false;
	} else {
		return envConfig.value.TEACHER_STUDENT_VISIBILITY__IS_ENABLED_BY_DEFAULT;
	}
});

const studentVisibilityTextKey = computed(() => {
	switch (theme.value) {
		case SchulcloudTheme.N21:
			return "pages.administration.school.index.privacySettings.longText.studentVisibilityNiedersachsen";
		case SchulcloudTheme.Brb:
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
