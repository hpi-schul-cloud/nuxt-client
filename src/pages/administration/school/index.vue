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
							{{ $t("pages.administration.school.schoolYear") }}
							{{ school.years.activeYear.name }}
						</h2>
						<p>
							{{
								$t(
									"pages.administration.school.longText.provideStudentsAndTheirParents"
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
							<v-row>
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
									<v-row>
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
									<v-row>
										<v-col>
											<v-switch
												v-model="localSchool.matrixMessenger"
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
									<v-row>
										<v-col>
											<v-switch
												v-model="localSchool.chatFunction"
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
									<v-row>
										<v-col>
											<v-switch
												v-model="localSchool.videoConference"
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
						<h2 class="text-h4">Datenschutzerklärung</h2>
						<v-simple-table>
							<template v-slot:default>
								<thead>
									<tr>
										<th class="text-left">Titel</th>
										<th class="text-left">Beschreibung</th>
										<th class="text-left">Hochgeladen am</th>
										<th class="text-left">Link</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="item in dataProtectionPolicies" :key="item._id">
										<td>{{ item.title }}</td>
										<td>{{ item.consentText }}</td>
										<td>{{ printDate(item.publishedAt) }}</td>
										<td>{{ item.consentDataId }}</td>
									</tr>
								</tbody>
							</template>
						</v-simple-table>
						<v-btn color="primary" depressed
							>Datenschutzerklärung hinzufügen</v-btn
						>
						<v-divider class="mt-13"></v-divider>
						<h2 class="text-h4">Authentifizierung</h2>
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
										<td>{{ item.link }}</td>
									</tr>
								</tbody>
							</template>
						</v-simple-table>
						<v-btn color="primary" depressed>System hinzufügen</v-btn>
						<h2 class="text-h4 mt-13">RSS-Feeds</h2>
						<v-simple-table v-if="localSchool.rssFeeds">
							<template v-slot:default>
								<thead>
									<tr>
										<th class="text-left">URL</th>
										<th class="text-left">Kurzbeschreibung</th>
										<th class="text-left">Status</th>
										<th class="text-left"></th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="item in localSchool.rssFeeds" :key="item.name">
										<td>{{ item.url }}</td>
										<td>{{ item.description }}</td>
										<td>
											{{
												item.status === "pending"
													? "In der Warteschlange"
													: item.status === "success"
													? "Erfolgreich?"
													: "Fehler?"
											}}
										</td>
										<td>
											<v-btn icon block
												><v-icon> {{ iconMdiTrashCanOutline }} </v-icon></v-btn
											>
										</td>
									</tr>
								</tbody>
							</template>
						</v-simple-table>
						<p v-else>Es sind noch keine RSS-Feeds hinterlegt.</p>
						<v-btn color="primary" depressed>RSS-Feed hinzufügen</v-btn>
						{{ console.log(school, localSchool) }}
					</v-col>
				</v-row>
			</v-responsive>
		</v-container>
	</v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { mdiChevronRight, mdiTrashCanOutline } from "@mdi/js";
import { printDate } from "@plugins/datetime";
import { toBase64, dataUrlToFile } from "@utils/fileHelper.ts";

export default {
	components: {},
	layout: "defaultVuetify",
	data() {
		return {
			localSchool: {
				name: "",
				officialSchoolNumber: "",
				logo: "",
				county: {},
				timezone: "",
				language: "",
				studentVisibility: false,
				lernStore: false,
				matrixMessenger: false,
				chatFunction: false,
				videoConference: false,
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
			iconMdiTrashCanOutline: mdiTrashCanOutline,
		};
	},
	computed: {
		...mapState("auth", {
			school: "school",
			user: "user",
			// locale: "locale",
		}),
		...mapState("schools", {
			studentVisibility: "studentVisibility",
			lernStoreVisibility: "lernStoreVisibility",
			fileStorageTotal: "fileStorageTotal",
		}),
		...mapState("federal-states", {
			federalState: "currentFederalState",
		}),
		...mapState("consent-versions", {
			dataProtectionPolicies: "consentVersions",
		}),
		...mapState("systems", {
			systems: "systems",
		}),
		console: () => console, // delete when done
	},
	/* watch: {
		school(updatedSchool) {
			console.log("hello");
			this.localSchool = updatedSchool;
		},
	}, */
	created() {
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
		}).then(
			() =>
				(this.localSchool.dataProtectionPolicies = this.dataProtectionPolicies)
		);
		this.fetchFileStorageTotal();

		/* this.fetchSetOfSystems(this.school.systems).then(() => {
			console.log("blub", JSON.parse(JSON.stringify(this.systems)));
		}); */

		this.localSchool.name = this.school.name;
		this.localSchool.officialSchoolNumber = this.school.officialSchoolNumber;
		this.localSchool.county = this.school.county;
		this.localSchool.logo = dataUrlToFile(this.school.logo_dataUrl);
		this.localSchool.timezone = this.school.timezone || "Europe/Berlin";
		this.localSchool.language = this.school.language;
		this.localSchool.chatFunction = this.school.features.includes("rocketChat");
		this.localSchool.matrixMessenger = this.school.features.includes(
			"messenger"
		);
		this.localSchool.matrixMessenger = this.school.features.includes(
			"videoconference"
		);
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
		...mapActions("consent-versions", ["fetchConsentVersions"]),
		...mapActions("systems", ["fetchSetOfSystems"]),
		save() {
			const updatedSchool = {
				id: this.school.id,
				name: this.localSchool.name,
				language: this.localSchool.language,
				fileStorageType: this.localSchool.fileStorageType,
				rssFeeds: this.localSchool.rssFeeds,
				logo_dataUrl: toBase64(this.localSchool.logo),
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
			console.log("updated", updatedSchool);
			this.update(updatedSchool);
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
</style>
