<template>
	<section
		v-if="
			toggleStudentVisibilityEnabled ||
			toggleStudentLernstoreViewEnabled ||
			rocketChatEnabled ||
			videoConferenceEnabled
		"
	>
		<h3 class="text-h6">
			{{ $t("pages.administration.school.index.privacySettings") }}
		</h3>
		<v-row
			v-if="toggleStudentVisibilityEnabled"
			class="student-visibility-switch"
		>
			<v-col>
				<v-custom-switch
					:value="studentVisibility"
					:label="
						$t(
							'pages.administration.school.index.privacySettings.labels.studentVisibility'
						)
					"
					class="ml-1 mt-0"
					@input-changed="
						($event) =>
							$emit('update-privacy-settings', $event, 'teacher.STUDENT_LIST')
					"
				></v-custom-switch>
				<p class="body-2 mb-0">
					{{
						$t(
							"pages.administration.school.index.privacySettings.longText.studentVisibility"
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
					class="ml-1 mt-0"
					@input-changed="
						($event) =>
							$emit('update-privacy-settings', $event, 'student.LERNSTORE_VIEW')
					"
				></v-custom-switch>
				<p class="body-2 mb-0">
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
					class="ml-1 mt-0"
					data-testid="toggle_chat"
					@input-changed="
						($event) => $emit('update-feature-settings', $event, 'rocketChat')
					"
				></v-custom-switch>
				<p class="body-2 mb-0">
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
					class="ml-1 mt-0"
					data-testid="toggle_video_conference"
					@input-changed="
						($event) =>
							$emit('update-feature-settings', $event, 'videoconference')
					"
				></v-custom-switch>
				<p class="body-2 mb-0">
					{{
						$t(
							"pages.administration.school.index.privacySettings.longText.videoConference"
						)
					}}
				</p>
			</v-col>
		</v-row>
	</section>
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
		toggleStudentVisibilityEnabled: () =>
			envConfigModule.getTeacherStudentVisibilityIsConfigurable,
		videoConferenceEnabled: () => envConfigModule.getVideoConferenceEnabled,
		rocketChatEnabled: () => envConfigModule.getRocketChatEnabled,
		studentVisibility() {
			return this.permissions.teacher
				? this.permissions.teacher.STUDENT_LIST
				: false;
		},
		lernStoreVisibility() {
			return this.permissions.student
				? this.permissions.student.LERNSTORE_VIEW
				: true;
		},
	},
};
</script>
