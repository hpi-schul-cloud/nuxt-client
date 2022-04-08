<template>
	<section
		v-if="
			toggleStudentVisibilityEnabled ||
			toggleStudentLernstoreViewEnabled ||
			matrixMessengerIsEnabled ||
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
		<span v-if="matrixMessengerIsEnabled">
			<v-row class="matrix-messenger-switch">
				<v-col>
					<v-custom-switch
						:value="features.messenger"
						:label="
							$t(
								'pages.administration.school.index.privacySettings.labels.matrixMessenger'
							)
						"
						class="ml-1 mt-0"
						@input-changed="
							($event) => $emit('update-feature-settings', $event, 'messenger')
						"
					></v-custom-switch>
					<p class="body-2 mb-0">
						{{
							$t(
								"pages.administration.school.index.privacySettings.longText.matrixMessenger"
							)
						}}
						<a
							href="https://docs.dbildungscloud.de/pages/viewpage.action?pageId=113650243"
							target="_blank"
						>
							{{
								$t(
									"pages.administration.school.index.privacySettings.link.messengerHelpPage"
								)
							}}
						</a>
					</p>
				</v-col>
			</v-row>
			<v-row
				v-if="matrixMessengerConfig.schoolRoomEnabled"
				class="matrix-schoolroom-switch"
			>
				<v-col>
					<v-custom-switch
						:value="features.messengerSchoolRoom"
						:label="
							$t(
								'pages.administration.school.index.privacySettings.labels.messengerSchoolRoom'
							)
						"
						class="ml-1 mt-0"
						@input-changed="
							($event) =>
								$emit('update-feature-settings', $event, 'messengerSchoolRoom')
						"
					></v-custom-switch>
					<p class="body-2 mb-0">
						{{
							$t(
								"pages.administration.school.index.privacySettings.longText.messengerSchoolRoom"
							)
						}}
					</p>
				</v-col>
			</v-row>
			<v-row
				v-if="matrixMessengerConfig.studentRoomCreation"
				class="matrix-studentroom-switch"
			>
				<v-col>
					<v-custom-switch
						:value="features.messengerStudentRoomCreate"
						:label="
							$t(
								'pages.administration.school.index.privacySettings.labels.messengerStudentRooms'
							)
						"
						class="ml-1 mt-0"
						@input-changed="
							($event) =>
								$emit(
									'update-feature-settings',
									$event,
									'messengerStudentRoomCreate'
								)
						"
					></v-custom-switch>
					<p class="body-2 mb-0">
						{{
							$t(
								"pages.administration.school.index.privacySettings.longText.messengerStudentRooms"
							)
						}}
					</p>
				</v-col>
			</v-row>
		</span>
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
import EnvConfigModule from "@/store/env-config";
import vCustomSwitch from "@components/atoms/vCustomSwitch";

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
		matrixMessengerConfig: () => EnvConfigModule.getMatrixConfig,
		toggleStudentLernstoreViewEnabled: () =>
			EnvConfigModule.getAdminToggleStudentLernstoreViewEnabled,
		toggleStudentVisibilityEnabled: () =>
			EnvConfigModule.getAdminToggleStudentVisibilityEnabled,
		videoConferenceEnabled: () => EnvConfigModule.getVideoConferenceEnabled,
		rocketChatEnabled: () => EnvConfigModule.getRocketChatEnabled,
		matrixMessengerIsEnabled() {
			return (
				this.matrixMessengerConfig.enabled &&
				this.matrixMessengerConfig.schoolSettingsVisible
			);
		},
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
