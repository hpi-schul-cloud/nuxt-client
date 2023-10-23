<template>
	<div>
		<v-row
			class="student-visibility-switch"
			v-if="isTeacherStudentVisibilityVisible"
		>
			<v-col>
				<v-custom-switch
					:disabled="!isTeacherStudentVisibilityConfigurable"
					:value="studentVisibility"
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
					class="ml-1 mt-0"
					@input-changed="
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
				<v-custom-switch
					:value="lernStoreVisibility"
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
					@input-changed="
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
		<v-row v-if="rocketChatEnabled" class="rocketchat-switch">
			<v-col>
				<v-custom-switch
					:value="features.rocketChat"
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
					class="ml-1 mt-0"
					data-testid="toggle_chat"
					@input-changed="
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
		<v-row v-if="videoConferenceEnabled" class="videoconference-switch">
			<v-col>
				<v-custom-switch
					:value="features.videoconference"
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
					class="ml-1 mt-0"
					data-testid="toggle_video_conference"
					@input-changed="
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
	</div>
</template>

<script>
import { envConfigModule } from "@/store";
import vCustomSwitch from "@/components/atoms/vCustomSwitch";

export default {
	components: {
		vCustomSwitch,
	},
	props: {
		permissions: {
			type: Object,
			required: true,
		},
		features: {
			type: Object,
			required: true,
		},
	},
	computed: {
		toggleStudentLernstoreViewEnabled: () =>
			envConfigModule.getAdminToggleStudentLernstoreViewEnabled,
		isTeacherStudentVisibilityConfigurable: () =>
			envConfigModule.getTeacherStudentVisibilityIsConfigurable,
		isTeacherStudentVisibilityVisible: () =>
			envConfigModule.getTeacherStudentVisibilityIsVisible,
		videoConferenceEnabled: () => envConfigModule.getVideoConferenceEnabled,
		rocketChatEnabled: () => envConfigModule.getRocketChatEnabled,
		theme: () => envConfigModule.getTheme,
		studentVisibility() {
			if (this.isTeacherStudentVisibilityConfigurable) {
				return this.permissions?.teacher
					? this.permissions.teacher.STUDENT_LIST
					: false;
			} else {
				return envConfigModule.getTeacherStudentVisibilityIsEnabledByDefault;
			}
		},
		studentVisibilityTextKey() {
			switch (this.theme) {
				case "n21":
					return "pages.administration.school.index.privacySettings.longText.studentVisibilityNiedersachsen";
				case "brb":
					return "pages.administration.school.index.privacySettings.longText.studentVisibilityBrandenburg";
				default:
					return "pages.administration.school.index.privacySettings.longText.studentVisibility";
			}
		},
		lernStoreVisibility() {
			return this.permissions.student
				? this.permissions.student.LERNSTORE_VIEW
				: true;
		},
	},
};
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
