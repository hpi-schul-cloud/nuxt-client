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
						<h2 v-if="schoolPolicyEnabled" class="text-h4">
							Datenschutzerklärung
						</h2>
						<template
							v-if="
								schoolPolicyEnabled &&
								localSchool.dataProtectionPolicies &&
								localSchool.dataProtectionPolicies.length
							"
						>
							<v-expansion-panels accordion flat>
								<v-expansion-panel class="py-2 panel">
									<v-expansion-panel-header>
										{{ localSchool.dataProtectionPolicies[0].title }} vom
										{{
											printDateTimeFromStringUTC(
												localSchool.dataProtectionPolicies[0].publishedAt
											)
										}}
									</v-expansion-panel-header>
									<v-expansion-panel-content>
										<v-row>
											<v-col>
												{{ localSchool.dataProtectionPolicies[0].consentText }}
											</v-col>
										</v-row>
										<v-row
											v-if="localSchool.dataProtectionPolicies[0].fileData"
										>
											<v-col>
												<v-btn
													depressed
													color="primary"
													outlined
													:href="
														localSchool.dataProtectionPolicies[0].fileData.data
													"
													:download="
														localSchool.dataProtectionPolicies[0].fileData
															.filename
													"
												>
													<v-icon class="mr-2">
														{{ iconMdiDownload }}
													</v-icon>
													PDF herunterladen
												</v-btn>
											</v-col>
										</v-row>
									</v-expansion-panel-content>
								</v-expansion-panel>
							</v-expansion-panels>
							<v-btn
								class="my-8"
								color="primary"
								depressed
								@click.stop="dialogs.policyDialogIsOpen = true"
								>Datenschutzerklärung hinzufügen</v-btn
							>
							<v-list-group class="ml-n4 pr-2">
								<template v-slot:activator>
									<v-list-item-title
										>Ältere Datenschutzerklärungen</v-list-item-title
									>
								</template>
								<v-expansion-panels accordion flat class="ml-4 pr-2">
									<v-list-item
										v-for="policy of localSchool.dataProtectionPolicies.slice(
											1
										)"
										:key="policy.consentDataId"
										class="px-0"
										:ripple="false"
									>
										<v-expansion-panel class="py-2 panel">
											<v-expansion-panel-header>
												{{ policy.title }} vom
												{{ printDateTimeFromStringUTC(policy.publishedAt) }}
											</v-expansion-panel-header>
											<v-expansion-panel-content>
												<v-row>
													<v-col>
														{{ policy.consentText }}
													</v-col>
												</v-row>
												<v-row v-if="policy.fileData">
													<v-col>
														<v-btn
															depressed
															color="primary"
															outlined
															:href="policy.fileData.data"
															:download="policy.fileData.filename"
														>
															<v-icon class="mr-2">
																{{ iconMdiDownload }}
															</v-icon>
															PDF herunterladen
														</v-btn>
													</v-col>
												</v-row>
											</v-expansion-panel-content>
										</v-expansion-panel>
									</v-list-item>
								</v-expansion-panels>
							</v-list-group>
						</template>

						<v-divider class="mt-13"></v-divider>
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
						<h2 class="text-h4 mt-13">RSS-Feeds</h2>
						<v-list v-if="localSchool.rssFeeds && localSchool.rssFeeds.length">
							<template v-for="(rssFeed, index) of localSchool.rssFeeds">
								<v-list-item :key="rssFeed.id" two-line>
									<v-list-item-icon>
										<v-icon>{{ iconMdiRss }}</v-icon>
									</v-list-item-icon>
									<v-list-item-content>
										<v-list-item-title
											class="text-wrap mb-1"
											v-text="rssFeed.url"
										></v-list-item-title>
										<v-list-item-subtitle class="text-wrap">
											{{ rssFeed.description }}
										</v-list-item-subtitle>
									</v-list-item-content>
									<v-list-item-action class="d-flex flex-row align-start">
										<v-chip
											small
											class="mr-2 mt-2"
											:color="rssFeedStatusColor(rssFeed.status)"
											text-color="black"
										>
											{{
												rssFeed.status === "pending"
													? $t(
															"pages.administration.school.index.rssFeeds.status.inQueue"
													  )
													: rssFeed.status === "success"
													? $t(
															"pages.administration.school.index.rssFeeds.status.active"
													  )
													: $t(
															"pages.administration.school.index.rssFeeds.status.error"
													  )
											}}
										</v-chip>
										<v-btn icon @click="openConfirmRssDelete(rssFeed.id)">
											<v-icon>{{ iconMdiTrashCanOutline }}</v-icon>
										</v-btn>
									</v-list-item-action>
								</v-list-item>
								<v-divider
									v-if="index < localSchool.rssFeeds.length - 1"
									:key="index"
								></v-divider>
							</template>
						</v-list>
						<p v-else>
							{{
								$t("pages.administration.school.index.rssFeeds.noRssFeedsYet")
							}}
						</p>
						<v-btn
							class="mt-2"
							color="primary"
							depressed
							@click.stop="dialogs.rssDialogIsOpen = true"
							>{{
								$t("pages.administration.school.index.rssFeeds.addRssFeed")
							}}</v-btn
						>
						{{ console.log(school, localSchool) }}
					</v-col>
				</v-row>
			</v-responsive>
		</v-container>
		<rss-form-dialog
			:is-open="dialogs.rssDialogIsOpen"
			@dialog-closed="dialogs.rssDialogIsOpen = false"
		></rss-form-dialog>
		<data-policy-form-dialog
			:is-open="dialogs.policyDialogIsOpen"
			@dialog-closed="dialogs.policyDialogIsOpen = false"
		></data-policy-form-dialog>
		<vuetify-dialog
			:is-open="dialogs.rssConfirmDeleteDialog.isOpen"
			:size="350"
			:submit="() => removeRssFeed(dialogs.rssConfirmDeleteDialog.rssFeedId)"
			@dialog-closed="dialogs.rssConfirmDeleteDialog.isOpen = false"
		>
			<h2 slot="title" class="text-h4 my-2">
				{{ $t("pages.administration.school.index.rssFeeds.deleteRssFeed") }}
			</h2>
			<template slot="dialogContent">
				<p class="body-1 mt-2">
					{{
						$t("pages.administration.school.index.rssFeeds.confirmDeleteText")
					}}
				</p>
			</template>
		</vuetify-dialog>
	</v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import {
	mdiChevronRight,
	mdiTrashCanOutline,
	mdiDownload,
	mdiRss,
	mdiFileDocumentOutline,
} from "@mdi/js";
import { printDate, printDateTimeFromStringUTC } from "@plugins/datetime";
import { toBase64, dataUrlToFile } from "@utils/fileHelper.ts";
import RssFormDialog from "@components/organisms/administration/RssFormDialog";
import DataPolicyFormDialog from "@components/organisms/administration/DataPolicyFormDialog";
import VuetifyDialog from "@components/vuetify/organisms/VuetifyDialog";

export default {
	components: {
		RssFormDialog,
		DataPolicyFormDialog,
		VuetifyDialog,
	},
	layout: "defaultVuetify",
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
			dialogs: {
				rssDialogIsOpen: false,
				policyDialogIsOpen: false,
				rssConfirmDeleteDialog: {
					isOpen: false,
					rssFeedId: undefined,
				},
			},
			iconMdiChevronRight: mdiChevronRight,
			iconMdiTrashCanOutline: mdiTrashCanOutline,
			iconMdiDownload: mdiDownload,
			iconMdiRss: mdiRss,
			iconMdiFileDocumentOutline: mdiFileDocumentOutline,
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
		...mapGetters("consent-versions", {
			dataProtectionPolicies: "getConsentVersions",
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
		this.fetchConsentVersions({
			schoolId: this.school.id,
			consentTypes: "privacy",
			withFile: true,
		}).then(() => {
			this.localSchool.dataProtectionPolicies = this.dataProtectionPolicies;
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
		printDateTimeFromStringUTC,
		toBase64,
		dataUrlToFile,
		...mapActions("federal-states", ["fetchCurrentFederalState"]),
		...mapActions("schools", [
			"fetchStudentVisibility",
			"fetchLernStoreVisibility",
			"fetchFileStorageTotal",
			"update",
		]),
		...mapActions("consent-versions", ["fetchConsentVersions"]),
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
				updatedSchool.officialSchoolNumber =
					this.localSchool.officialSchoolNumber;
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
		openConfirmRssDelete(rssFeedId) {
			this.dialogs.rssConfirmDeleteDialog = {
				isOpen: true,
				rssFeedId,
			};
		},
		removeRssFeed(rssFeedId) {
			const updatedRssFeedList = this.localSchool.rssFeeds.filter(
				(rssFeed) => rssFeed.id !== rssFeedId
			);
			this.update({
				id: this.school.id,
				rssFeeds: updatedRssFeedList,
			})
				.then(() => (this.dialogs.rssConfirmDeleteDialog.isOpen = false))
				.catch((err) => console.log(err)); // TODO - handle error
		},
		// TODO - should this be a computed property?
		rssFeedStatusColor(rssFeedStatus) {
			return rssFeedStatus === "pending"
				? "orange lighten-3"
				: rssFeedStatus === "success"
				? "green lighten-3"
				: "error lighten-5";
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

.panel {
	border-bottom: 1px solid rgba(0, 0, 0, 0.12); // TODO - find vuetify name for this
}

.relative {
	position: relative;
}
</style>
