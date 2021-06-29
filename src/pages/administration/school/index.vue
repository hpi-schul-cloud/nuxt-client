<template>
	<v-container>
		<v-breadcrumbs :items="breadcrumbItems" :nuxt="true" class="ml-4 px-0 py-0">
			<template v-slot:item="{ item }">
				<v-breadcrumbs-item
					:href="item.href"
					:disabled="item.disabled"
					class="text-h6 font-weight-bold"
				>
					{{ item.text }}
				</v-breadcrumbs-item>
			</template>
			<template v-slot:divider>
				<v-icon> {{ iconMdiChevronRight }} </v-icon>
			</template>
		</v-breadcrumbs>
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
						<h2 class="text-h4 mt-10 mb-8">Allgemeine Einstellungen</h2>
						<v-form>
							<v-row>
								<v-col>
									<v-row>
										<v-col>
											<v-text-field
												v-model="localSchool.name"
												label="Name der Schule"
												dense
											></v-text-field>
										</v-col>
									</v-row>
									<v-row>
										<v-col>
											<v-text-field
												v-model="localSchool.officialSchoolNumber"
												label="Schulnummer"
												dense
												:disabled="school.officialSchoolNumber ? true : false"
												hint="Kann nur einmal gesetzt werden und wird danach deaktiviert!"
												persistent-hint
											></v-text-field>
										</v-col>
									</v-row>
									<v-row>
										<v-col>
											<v-select
												v-model="localSchool.county"
												label="Bitte wählen Sie den Kreis, zu dem die Schule gehört"
												:items="federalState.counties"
												item-text="name"
												item-value="_id"
												return-object
												dense
												:disabled="localSchool.county ? true : false"
												hint="Kann nur einmal gesetzt werden und wird danach deaktiviert!"
												persistent-hint
											></v-select>
										</v-col>
									</v-row>
									<v-row>
										<v-col class="d-flex">
											<v-file-input
												v-model="localSchool.logo"
												label="Schullogo hochladen"
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
												label="Zeitzone"
												dense
												disabled
												hint="Um die Zeitzone für die Schule zu ändern, wenden Sie sich bitte an einen Admin."
												persistent-hint
											></v-text-field>
										</v-col>
									</v-row>
									<v-row>
										<v-col>
											<v-select
												v-model="localSchool.language"
												label="Sprache"
												:items="languages"
												item-text="name"
												item-value="abbreveation"
												dense
												hint="Ist keine Sprache für die Schule gesetzt, wird die Sprache der Instanz (Deutsch) angewandt."
												persistent-hint
											></v-select>
										</v-col>
									</v-row>
								</v-col>
							</v-row>
							<v-row v-if="toggleStudentVisibilityEnabled">
								<v-col>
									<h3 class="text-h6 mt-0">Datenschutzeinstellungen</h3>
									<v-row>
										<v-col>
											<v-switch
												v-model="localSchool.studentVisibility"
												label="Sichtbarkeit von Schüler:innen für Lehrkräfte aktivieren"
												inset
												flat
												dense
												:ripple="false"
												class="ml-1"
											></v-switch>
											<p class="body-2 mb-0">
												Die Aktivierung dieser Option hat datenschutzrechtlich
												eine hohe Schwelle. Um die Sichtbarkeit aller
												Schüler:innen der Schule für jede Lehrkraft zu
												aktivieren, ist es erforderlich, dass jede/r Schüler:in
												wirksam in diese Datenverarbeitung eingewilligt hat.
											</p>
										</v-col>
									</v-row>
									<v-row v-if="toggleStudentLernstoreViewEnabled">
										<v-col>
											<v-switch
												v-model="localSchool.lernStore"
												label="Lern-Store für Schüler:innen"
												inset
												flat
												dense
												:ripple="false"
												class="ml-1 mt-0"
											></v-switch>
											<p class="body-2 mb-0">
												Wenn diese Option nicht aktiviert ist, können die
												Schüler:innen nicht auf den Lern-Store zugreifen.
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
													label="Matrix Messenger aktivieren"
													inset
													flat
													dense
													:ripple="false"
													class="ml-1 mt-0"
												></v-switch>
												<p class="body-2 mb-0">
													Ist der Matrix Messenger aktiviert, können alle
													Lehrkräfte dieser Schule Chaträume, private
													Unterhaltungen oder kurs- und teaminterne
													Gruppendiskussionen starten. Schüler:innen haben dort
													anfangs nur Leserechte, können aber über die Kurs- und
													Teameinstellungen auch Schreibrechte zugewiesen
													bekommen. Mehr Informationen dazu findest du im
													<a
														href="https://docs.hpi-schul-cloud.org/pages/viewpage.action?pageId=113650243"
														target="_blank"
													>
														Hilfeartikel zum Messenger
													</a>
												</p>
											</v-col>
										</v-row>
										<v-row v-if="matrixMessengerConfig.schoolRoomEnabled">
											<v-col>
												<v-switch
													v-model="localSchool.features.messengerSchoolRoom"
													label="Chatraum für Ankündigungen an die gesamte Schule anlegen"
													inset
													flat
													dense
													:ripple="false"
													class="ml-1 mt-0"
												></v-switch>
												<p class="body-2 mb-0">
													Der Ankündigungs-Chatraum ermöglicht Schul-Admins,
													Nachrichten an die gesamte Schule zu senden.
													Schüler:innen haben in diesem Raum nur Lesezugriff,
													sehen sich aber gegenseitig und können so private
													Chats starten.
												</p>
											</v-col>
										</v-row>
										<v-row v-if="matrixMessengerConfig.studentRoomCreation">
											<v-col>
												<v-switch
													v-model="
														localSchool.features.messengerStudentRoomCreate
													"
													label="Schüler:innen dürfen eigene Chat-Räume anlegen"
													inset
													flat
													dense
													:ripple="false"
													class="ml-1 mt-0"
												></v-switch>
												<p class="body-2 mb-0">
													Ist diese Funktion aktiviert, dürfen Schüler:innen
													Chaträume, private Unterhaltungen und kurs- und
													teaminterne Gruppendiskussionen starten. Diese Räume
													sind für Lehrkräfte nicht einzusehen, wenn diese nicht
													explizit eingeladen werden.
												</p>
											</v-col>
										</v-row>
									</span>
									<v-row>
										<v-col>
											<v-switch
												v-model="localSchool.features.rocketChat"
												label="Chatfunktion aktivieren"
												inset
												flat
												dense
												:ripple="false"
												class="ml-1 mt-0"
											></v-switch>
											<p class="body-2 mb-0">
												Sind Chats an deiner Schule aktiviert, können
												Team-Admins im jeweiligen Team sowie Lehrkräfte in ihren
												Kursen die Chatfunktion gezielt freischalten.
											</p>
										</v-col>
									</v-row>
									<v-row v-if="videoConferenceEnabled">
										<v-col>
											<v-switch
												v-model="localSchool.features.videoconference"
												label="Videokonferenzen für Kurse und Teams aktivieren"
												inset
												flat
												dense
												:ripple="false"
												class="ml-1 mt-0"
											></v-switch>
											<p class="body-2 mb-0">
												Sind Videokonferenzen an deiner Schule aktiviert, können
												Lehrkräfte ihrem Kurs im Bereich Tools das
												Videokonferenz-Tool hinzufügen und dann von dort aus
												Videokonferenzen für alle Kursteilnehmer:innen starten.
												Team-Admins können die Videokonferenzfunktion im
												jeweiligen Team aktivieren. Team-Leiter:innen und
												Team-Admins können dann Videokonferenzen zu Terminen
												hinzufügen und starten.
											</p>
										</v-col>
									</v-row>
									<v-row>
										<v-col>
											<v-responsive width="74%" class="my-8">
												<v-select
													v-model="localSchool.fileStorageType"
													:items="fileStorageTypes"
													item-text="name"
													item-value="type"
													dense
													label="Cloud-Storage-Anbieter"
												></v-select>
											</v-responsive>
										</v-col>
									</v-row>
									<v-btn color="primary" depressed @click="save">
										Allgemeine Einstellungen speichern
									</v-btn>
									<h2 class="text-h6 mb-0">
										Genutzter Datei-Speicherplatz in der Cloud
									</h2>
									<p class="body-1">
										Derzeit bezieht Ihre Schule
										{{ localSchool.fileStorageTotal }} B.
									</p>
								</v-col>
							</v-row>
						</v-form>
						<v-divider class="mt-13"></v-divider>
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
import { mdiChevronRight } from "@mdi/js";
import { printDate } from "@plugins/datetime";
import { toBase64, dataUrlToFile } from "@utils/fileHelper.ts";
import RssFeeds from "@components/organisms/administration/RssFeeds";
import SchoolPolicies from "@components/organisms/administration/SchoolPolicies";

export default {
	layout: "defaultVuetify",
	components: {
		RssFeeds,
		SchoolPolicies,
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
			breadcrumbItems: [
				{
					text: this.$t("pages.administration.index.title"),
					href: "/administration/",
				},
				{
					text: this.$t("pages.administration.school.index.title"),
					disabled: true,
				},
			],
			iconMdiChevronRight: mdiChevronRight,
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
