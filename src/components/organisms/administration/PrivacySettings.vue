<template>
	<section>
		<h3 class="text-h6">
			{{ $t("pages.administration.school.index.privacySettings") }}
		</h3>
		<v-row v-if="toggleStudentVisibilityEnabled">
			<v-col>
				<v-custom-switch
					:value="studentVisibility"
					:label="
						$t(
							'pages.administration.school.index.privacySettings.labels.studentVisibility'
						)
					"
					styles="ml-1 mt-0"
					@input-changed="
						($event) =>
							$emit(
								'update-privacy-settings',
								$event,
								'permissions.teacher.STUDENT_LIST'
							)
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
		<v-row v-if="toggleStudentLernstoreViewEnabled">
			<v-col>
				<v-custom-switch
					:value="lernStoreVisibility"
					:label="
						$t(
							'pages.administration.school.index.privacySettings.labels.lernStore'
						)
					"
					styles="ml-1 mt-0"
					@input-changed="
						($event) =>
							$emit(
								'update-privacy-settings',
								$event,
								'permissions.student.LERNSTORE_VIEW'
							)
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
			<v-row>
				<v-col>
					<v-custom-switch
						:value="messenger"
						:label="
							$t(
								'pages.administration.school.index.privacySettings.labels.matrixMessenger'
							)
						"
						styles="ml-1 mt-0"
						@input-changed="
							($event) =>
								$emit('update-privacy-settings', $event, 'features.messenger')
						"
					></v-custom-switch>
					<p class="body-2 mb-0">
						{{
							$t(
								"pages.administration.school.index.privacySettings.longText.matrixMessenger"
							)
						}}
						<a
							href="https://docs.hpi-schul-cloud.org/pages/viewpage.action?pageId=113650243"
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
			<v-row v-if="matrixMessengerConfig.schoolRoomEnabled">
				<v-col>
					<v-custom-switch
						:value="messengerSchoolRoom"
						:label="
							$t(
								'pages.administration.school.index.privacySettings.labels.messengerSchoolRoom'
							)
						"
						styles="ml-1 mt-0"
						@input-changed="
							($event) =>
								$emit(
									'update-privacy-settings',
									$event,
									'features.messengerSchoolRoom'
								)
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
			<v-row v-if="matrixMessengerConfig.studentRoomCreation">
				<v-col>
					<v-custom-switch
						:value="messengerStudentRoomCreate"
						:label="
							$t(
								'pages.administration.school.index.privacySettings.labels.messengerStudentRooms'
							)
						"
						styles="ml-1 mt-0"
						@input-changed="
							($event) =>
								$emit(
									'update-privacy-settings',
									$event,
									'features.messengerStudentRoomCreate'
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
		<v-row v-if="rocketChatEnabled">
			<v-col>
				<v-custom-switch
					:value="rocketChat"
					:label="
						$t(
							'pages.administration.school.index.privacySettings.labels.chatFunction'
						)
					"
					styles="ml-1 mt-0"
					@input-changed="
						($event) =>
							$emit('update-privacy-settings', $event, 'features.rocketChat')
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
		<v-row v-if="videoConferenceEnabled">
			<v-col>
				<v-custom-switch
					:value="videoConference"
					:label="
						$t(
							'pages.administration.school.index.privacySettings.labels.videoConference'
						)
					"
					styles="ml-1 mt-0"
					@input-changed="
						($event) =>
							$emit(
								'update-privacy-settings',
								$event,
								'features.videoconference'
							)
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
import { mapGetters } from "vuex";
import vCustomSwitch from "@components/atoms/vCustomSwitch";

export default {
	components: {
		vCustomSwitch,
	},
	props: {
		privacySettings: {
			type: Object,
			required: true,
		},
	},
	data() {
		return {
			studentVisibility: this.privacySettings.permissions.teacher
				? this.privacySettings.permissions.teacher.STUDENT_LIST
				: false,
			lernStoreVisibility: this.privacySettings.permissions.student
				? this.privacySettings.permissions.student.LERNSTORE_VIEW
				: false,
			messenger: this.privacySettings.features.includes("messenger"),
			messengerSchoolRoom: this.privacySettings.features.includes(
				"messengerSchoolRoom"
			),
			messengerStudentRoomCreate: this.privacySettings.features.includes(
				"messengerStudentRoomCreate"
			),
			rocketChat: this.privacySettings.features.includes("rocketChat"),
			videoConference:
				this.privacySettings.features.includes("videoconference"),
		};
	},
	computed: {
		...mapGetters("env-config", {
			matrixMessengerConfig: "getMatrixConfig",
			toggleStudentLernstoreViewEnabled:
				"getAdminToggleStudentLernstoreViewEnabled",
			toggleStudentVisibilityEnabled: "getAdminToggleStudentVisibilityEnabled",
			videoConferenceEnabled: "getVideoConferenceEnabled",
			rocketChatEnabled: "getRocketChatEnabled",
		}),
		matrixMessengerIsEnabled() {
			return (
				this.matrixMessengerConfig.enabled &&
				this.matrixMessengerConfig.schoolSettingsVisible
			);
		},
	},
};
</script>
