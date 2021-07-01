<template>
	<v-container>
		<vuetify-breadcrumbs :breadcrumbs="breadcrumbs"></vuetify-breadcrumbs>
		<v-container class="d-flex justify-center">
			<v-responsive>
				<v-row class="mt-0">
					<v-col>
						<h1 class="text-h3">
							{{ $t("pages.administration.school.index.title") }}
						</h1>
						<h2 class="text-h4">
							{{ $t("common.words.schoolYear") }}
							{{ school.currentYear.name }}
						</h2>
						<p>
							{{
								$t(
									"pages.administration.school.index.longText.provideStudentsAndTheirParents"
								)
							}}
						</p>
					</v-col>
				</v-row>
				<v-divider class="mt-13"></v-divider>
				<v-row>
					<v-col>
						<h2 class="text-h4 mt-10 mb-8">
							{{ $t("pages.administration.school.index.generalSettings") }}
						</h2>
						<v-form>
							<v-row>
								<v-col>
									<v-row>
										<v-col>
											<v-text-field
												v-model="localSchool.name"
												:label="
													$t(
														'pages.administration.school.index.generalSettings.labels.nameOfSchool'
													)
												"
												dense
											></v-text-field>
										</v-col>
									</v-row>
									<v-row>
										<v-col>
											<v-text-field
												v-model="localSchool.officialSchoolNumber"
												:label="
													$t(
														'pages.administration.school.index.generalSettings.labels.schoolNumber'
													)
												"
												dense
												:disabled="school.officialSchoolNumber ? true : false"
												:hint="
													$t(
														'pages.administration.school.index.generalSettings.changeSchoolValueWarning'
													)
												"
												persistent-hint
											></v-text-field>
										</v-col>
									</v-row>
									<v-row>
										<v-col>
											<v-select
												v-model="localSchool.county"
												:label="
													$t(
														'pages.administration.school.index.generalSettings.labels.chooseACounty'
													)
												"
												:items="federalState.counties"
												item-text="name"
												item-value="_id"
												return-object
												dense
												:disabled="localSchool.county ? true : false"
												:hint="
													$t(
														'pages.administration.school.index.generalSettings.changeSchoolValueWarning'
													)
												"
												persistent-hint
											></v-select>
										</v-col>
									</v-row>
									<v-row>
										<v-col class="d-flex">
											<v-file-input
												v-model="localSchool.logo"
												:label="
													$t(
														'pages.administration.school.index.generalSettings.labels.uploadSchoolLogo'
													)
												"
												dense
												prepend-icon=""
											></v-file-input>
											<input type="hidden" :value="localSchool.logo" />
										</v-col>
									</v-row>
									<v-row>
										<v-col>
											<v-text-field
												v-model="localSchool.timezone"
												:label="
													$t(
														'pages.administration.school.index.generalSettings.labels.timezone'
													)
												"
												dense
												disabled
												:hint="
													$t(
														'pages.administration.school.index.generalSettings.timezoneHint'
													)
												"
												persistent-hint
											></v-text-field>
										</v-col>
									</v-row>
									<v-row>
										<v-col>
											<v-select
												v-model="localSchool.language"
												:label="
													$t(
														'pages.administration.school.index.generalSettings.labels.language'
													)
												"
												:items="languages"
												item-text="name"
												item-value="abbreveation"
												dense
												:hint="
													$t(
														'pages.administration.school.index.generalSettings.languageHint'
													)
												"
												persistent-hint
											></v-select>
										</v-col>
									</v-row>
									<v-row>
										<v-col>
											<v-select
												v-model="localSchool.fileStorageType"
												:items="fileStorageTypes"
												item-text="name"
												item-value="type"
												dense
												label="Cloud-Storage-Anbieter"
											></v-select>
										</v-col>
									</v-row>
									<v-row>
										<v-col>
											<h4 class="subtitle-1 font-weight-bold my-0">
												{{
													$t(
														"pages.administration.school.index.usedFileStorage"
													)
												}}
											</h4>
											<p class="body-1">
												{{
													$t(
														"pages.administration.school.index.schoolIsCurrentlyDrawing"
													)
												}}
												{{ localSchool.fileStorageTotal }} B.
											</p>
										</v-col>
									</v-row>
								</v-col>
							</v-row>
							<v-row>
								<v-col>
									<h3 class="text-h6 mt-0">
										{{
											$t("pages.administration.school.index.privacySettings")
										}}
									</h3>
									<v-row v-if="toggleStudentVisibilityEnabled">
										<v-col>
											<v-switch
												v-model="localSchool.studentVisibility"
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
												v-model="localSchool.lernStore"
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
													v-model="localSchool.features.messenger"
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
													v-model="localSchool.features.messengerSchoolRoom"
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
													v-model="
														localSchool.features.messengerStudentRoomCreate
													"
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
												v-model="localSchool.features.rocketChat"
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
												v-model="localSchool.features.videoconference"
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
									<v-btn color="primary" depressed @click="save">
										{{
											$t(
												"pages.administration.school.index.generalSettings.save"
											)
										}}
									</v-btn>
								</v-col>
							</v-row>
						</v-form>
						<school-policies v-if="schoolPolicyEnabled"></school-policies>
						<!-- <h2 class="text-h4">Authentifizierung</h2>
						<v-simple-table>
							<template v-slot:default>
								<thead>
									<tr>
										<th class="text-left">Alias</th>
										<th class="text-left">Typ</th>
										<th class="text-left"></th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="item in dataProtectionPolicies" :key="item.name">
										<td>{{ item.title }}</td>
										<td>{{ item.description }}</td>
										<td>{{ item.consentDataId }}</td>
									</tr>
								</tbody>
							</template>
						</v-simple-table>
						<v-btn color="primary" depressed>System hinzufügen</v-btn> -->
						<rss-feeds></rss-feeds>
					</v-col>
				</v-row>
			</v-responsive>
		</v-container>
		{{ console.log(school, localSchool) }}
	</v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { printDate } from "@plugins/datetime";
import { toBase64, dataUrlToFile } from "@utils/fileHelper.ts";
import RssFeeds from "@components/organisms/administration/RssFeeds";
import SchoolPolicies from "@components/organisms/administration/SchoolPolicies";
import VuetifyBreadcrumbs from "@components/molecules/VuetifyBreadcrumbs";

export default {
	layout: "defaultVuetify",
	components: {
		RssFeeds,
		SchoolPolicies,
		VuetifyBreadcrumbs,
	},
	data() {
		return {
			localSchool: {
				name: "",
				officialSchoolNumber: "",
				logo: null,
				county: {},
				timezone: "",
				language: "",
				features: {
					rocketChat: false,
					messenger: false,
					messengerSchoolRoom: false,
					messengerStudentRoomCreate: false,
					videoconference: false,
				},
				permissions: [], // TODO - which route do I have to talk to here?
				studentVisibility: false,
				lernStore: false,
				fileStorageType: "",
				fileStorageTotal: 0,
				dataProtectionPolicies: [],
				rssFeeds: [],
			},
			languages: [
				{ name: "System-Default (Deutsch)", abbreveation: "sys" },
				{ name: "Deutsch", abbreveation: "de" },
				{ name: "Englisch", abbreveation: "en" },
				{ name: "Spanisch", abbreveation: "es" },
			],
			fileStorageTypes: [{ type: "awsS3", name: "HPI Schul-Cloud" }],
			breadcrumbs: [
				{
					text: this.$t("pages.administration.index.title"),
					href: "/administration/",
				},
				{
					text: this.$t("pages.administration.school.index.title"),
					disabled: true,
				},
			],
		};
	},
	computed: {
		...mapGetters("auth", {
			user: "getUser",
		}),
		...mapGetters("schools", {
			school: "getSchool",
			studentVisibility: "getStudentVisibility",
			lernStoreVisibility: "getLernStoreVisibility",
			fileStorageTotal: "getFileStorageTotal",
		}),
		...mapGetters("federal-states", {
			federalState: "getCurrentFederalState",
		}),
		...mapGetters("systems", {
			systems: "getSystems",
		}),
		...mapGetters("env-config", {
			matrixMessengerConfig: "getMatrixConfig",
			toggleStudentLernstoreViewEnabled:
				"getAdminToggleStudentLernstoreViewEnabled",
			toggleStudentVisibilityEnabled: "getAdminToggleStudentVisibilityEnabled",
			schoolPolicyEnabled: "getSchoolPolicyEnabled",
			videoConferenceEnabled: "getVideoConferenceEnabled",
			rocketChatEnabled: "getRocketChatEnabled",
		}),
		console: () => console, // TODO - delete when done
	},
	// TODO - watch for school changes
	/* watch: {
		school(updatedSchool) {
			console.log("hello");
			this.localSchool = updatedSchool;
		},
	}, */
	async created() {
		this.fetchCurrentFederalState(this.school.federalState);
		this.fetchStudentVisibility().then(() => {
			this.localSchool.studentVisibility = this.studentVisibility;
		});
		this.fetchLernStoreVisibility().then(() => {
			this.localSchool.lernStore = this.lernStoreVisibility;
		});

		this.fetchFileStorageTotal();

		/* this.fetchSetOfSystems(this.school.systems).then(() => {
			console.log("blub", JSON.parse(JSON.stringify(this.systems)));
		}); */

		this.localSchool.name = this.school.name;
		this.localSchool.officialSchoolNumber = this.school.officialSchoolNumber;
		this.localSchool.county = this.school.county;
		this.localSchool.logo = await dataUrlToFile(
			this.school.logo_dataUrl,
			"logo"
		);
		this.localSchool.timezone = this.school.timezone || "Europe/Berlin";
		this.localSchool.language = this.school.language;
		this.setFeatures();
		this.localSchool.fileStorageType = this.school.fileStorageType;
		this.localSchool.rssFeeds = this.school.rssFeeds;
	},
	methods: {
		printDate,
		toBase64,
		dataUrlToFile,
		...mapActions("federal-states", ["fetchCurrentFederalState"]),
		...mapActions("schools", [
			"fetchStudentVisibility",
			"fetchLernStoreVisibility",
			"fetchFileStorageTotal",
			"update",
		]),
		...mapActions("systems", ["fetchSetOfSystems"]),
		async save() {
			const updatedSchool = {
				id: this.school.id,
				name: this.localSchool.name,
				language: this.localSchool.language,
				fileStorageType: this.localSchool.fileStorageType,
				rssFeeds: this.localSchool.rssFeeds,
				features: this.createFeaturesArray(),
			};
			if (
				!this.school.officialSchoolNumber &&
				this.localSchool.officialSchoolNumber
			) {
				updatedSchool.officialSchoolNumber = this.localSchool.officialSchoolNumber;
			}
			if (!this.school.county && this.localSchool.county._id) {
				updatedSchool.county = this.localSchool.county._id;
			}
			if (this.localSchool.logo) {
				updatedSchool.logo_dataUrl = await toBase64(this.localSchool.logo);
			} else {
				updatedSchool.logo_dataUrl = "";
			}
			console.log("updated", updatedSchool);
			this.update(updatedSchool);
		},
		setFeatures() {
			if (this.school && this.school.features) {
				for (let i = 0; i < this.school.features.length; i++) {
					this.localSchool.features[this.school.features[i]] = true;
				}
			}
		},
		createFeaturesArray() {
			const features = [];
			for (const featureName in this.localSchool.features) {
				if (this.localSchool.features[featureName]) features.push(featureName);
			}
			return features;
		},
	},
	head() {
		return {
			title: `${this.$t("pages.administration.school.index.title")} - ${
				this.$theme.short_name
			}`,
		};
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";

.v-responsive {
	max-width: var(--size-content-width-max);
}

.relative {
	position: relative;
}
</style>
