<template>
	<section>
		<h3 class="text-h6">
			{{ $t("pages.administration.school.index.privacySettings") }}
		</h3>
		<v-row v-if="toggleStudentVisibilityEnabled">
			<v-col>
				<v-switch
					v-model="studentVisibility"
					:label="
						$t(
							'pages.administration.school.index.privacySettings.labels.studentVisibility'
						)
					"
					inset
					flat
					dense
					:ripple="false"
					class="ml-1"
					@change="
						$emit(
							'update-privacy-settings',
							$event,
							'permissions.teacher.STUDENT_LIST'
						)
					"
				></v-switch>
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
				<v-switch
					v-model="lernStoreVisibility"
					:label="
						$t(
							'pages.administration.school.index.privacySettings.labels.lernStore'
						)
					"
					inset
					flat
					dense
					:ripple="false"
					class="ml-1 mt-0"
					@change="
						$emit(
							'update-privacy-settings',
							$event,
							'permissions.student.LERNSTORE_VIEW'
						)
					"
				></v-switch>
				<p class="body-2 mb-0">
					{{
						$t(
							"pages.administration.school.index.privacySettings.longText.lernStore"
						)
					}}
				</p>
			</v-col>
		</v-row>
		<span
			v-if="
				matrixMessengerConfig.enabled &&
				matrixMessengerConfig.schoolSettingsVisible
			"
		>
			<v-row>
				<v-col>
					<v-switch
						v-model="messenger"
						:label="
							$t(
								'pages.administration.school.index.privacySettings.labels.matrixMessenger'
							)
						"
						inset
						flat
						dense
						:ripple="false"
						class="ml-1 mt-0"
						@change="
							$emit('update-privacy-settings', $event, 'features.messenger')
						"
					></v-switch>
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
					<v-switch
						v-model="messengerSchoolRoom"
						:label="
							$t(
								'pages.administration.school.index.privacySettings.labels.messengerSchoolRoom'
							)
						"
						inset
						flat
						dense
						:ripple="false"
						class="ml-1 mt-0"
						@change="
							$emit(
								'update-privacy-settings',
								$event,
								'features.messengerSchoolRoom'
							)
						"
					></v-switch>
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
					<v-switch
						v-model="messengerStudentRoomCreate"
						:label="
							$t(
								'pages.administration.school.index.privacySettings.labels.messengerStudentRooms'
							)
						"
						inset
						flat
						dense
						:ripple="false"
						class="ml-1 mt-0"
						@change="
							$emit(
								'update-privacy-settings',
								$event,
								'features.messengerStudentRoomCreate'
							)
						"
					></v-switch>
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
				<v-switch
					v-model="rocketChat"
					:label="
						$t(
							'pages.administration.school.index.privacySettings.labels.chatFunction'
						)
					"
					inset
					flat
					dense
					:ripple="false"
					class="ml-1 mt-0"
					@change="
						$emit('update-privacy-settings', $event, 'features.rocketChat')
					"
				></v-switch>
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
				<v-switch
					v-model="videoConference"
					:label="
						$t(
							'pages.administration.school.index.privacySettings.labels.videoConference'
						)
					"
					inset
					flat
					dense
					:ripple="false"
					class="ml-1 mt-0"
					@change="
						$emit('update-privacy-settings', $event, 'features.videoconference')
					"
				></v-switch>
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

export default {
	props: {
		privacySettings: {
			type: Object,
			required: true,
		},
	},
	data() {
		return {
			studentVisibility: this.privacySettings.permissions.teacher.STUDENT_LIST,
			lernStoreVisibility:
				this.privacySettings.permissions.student.LERNSTORE_VIEW,
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
	},
};
</script>
