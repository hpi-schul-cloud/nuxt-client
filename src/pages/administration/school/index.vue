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
							{{ $t("pages.administration.school.schoolYear") }} {{ school.years.activeYear.name }}
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
						<h2 class="text-h4 mt-10 mb-8">
							Allgemeine Einstellungen
						</h2>
						<v-form>
							<v-row>
								<v-col>
									<v-row>
										<v-col>
											<v-text-field
												v-model="school.name"
												label="Name der Schule"
												dense
											></v-text-field>
										</v-col>
									</v-row>
									<v-row>
										<v-col>
											<v-text-field
												v-model="schoolNumber"
												label="Schulnummer"
												dense
												hint="Kann nur einmal gesetzt werden und wird danach deaktiviert!"
												persistent-hint
											></v-text-field>
										</v-col>
									</v-row>
									<v-row>
										<v-col>
											<v-select
												v-model="schoolCounty"
												:items="counties"
												dense
												label="Bitte wählen Sie den Kreis, zu dem die Schule gehört"
												hint="Kann nur einmal gesetzt werden und wird danach deaktiviert!"
												persistent-hint
											></v-select>
										</v-col>
									</v-row>
									<v-row>
										<v-col class="d-flex">
											<v-file-input
												v-model="schoolLogo"
												label="Schullogo hochladen"
												dense
												prepend-icon=""
											></v-file-input>
										</v-col>
									</v-row>
									<v-row>
										<v-col>
											<v-text-field
												v-model="schoolTimezone"
												label="Zeitzone"
												dense
												readonly
											></v-text-field>
										</v-col>
									</v-row>
									<v-row>
										<v-col>
											<v-select
												v-model="schoolLanguage"
												:items="languages"
												dense
												label="Sprache"
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
												v-model="schoolStudentVisibility"
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
												v-model="schoolLernStore"
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
												v-model="schoolMatrixMessenger"
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
												v-model="schoolChatFunction"
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
												v-model="schoolVideoConference"
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
													v-model="schoolCloudStorage"
													:items="cloudStorages"
													dense
													label="Cloud-Storage-Anbieter"
												></v-select>
											</v-responsive>
										</v-col>
									</v-row>
									<v-btn color="primary" depressed>
										Allgemeine Einstellungen speichern
									</v-btn>
									<h2 class="text-h6 mb-0">
										Genutzter Datei-Speicherplatz in der Cloud
									</h2>
									<p class="body-1">Derzeit bezieht Ihre Schule 0 B.</p>
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
									<tr v-for="item in dataProtectionPolicies" :key="item.name">
										<td>{{ item.title }}</td>
										<td>{{ item.description }}</td>
										<td>{{ item.uploaded_on }}</td>
										<td>{{ item.link }}</td>
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
						<v-btn color="primary" depressed>RSS-Feed hinzufügen</v-btn>
					</v-col>
				</v-row>
			</v-responsive>
		</v-container>
	</v-container>
</template>

<script>
import { mapState } from "vuex";
import { mdiAccount, mdiChevronRight } from "@mdi/js";

export default {
	components: {},
	layout: "defaultVuetify",
	data() {
		return {
			localSchool: {
				name: "",
				schoolNumber: "",
				schoolLogo: "",
				schoolCounty: "",
				schoolTimezone: `${this.$cookies.get("USER_TIMEZONE")}`, // doesn't work in chrome??
				schoolLanguage: "",
				schoolStudentVisibility: false,
				schoolLernStore: false,
				schoolMatrixMessenger: false,
				schoolChatFunction: true,
				schoolVideoConference: true,
			},
			counties: ["Mainz", "Speyer", "Berlin"],
			languages: ["Deutsch", "Englisch", "Spanisch"],
			cloudStorages: ["HPI Schul-Cloud"],
			dataProtectionPolicies: [
				{
					title: "Datenschutzerklärung 1",
					description: "bla bla bla",
					uploaded_on: new Date(),
					link: "asdasdasd",
				},
				{
					title: "Datenschutzerklärung 2",
					description: "bla bla bla",
					uploaded_on: new Date(),
					link: "asdasdasd",
				},
			],
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
			iconMdiAccount: mdiAccount,
			iconMdiChevronRight: mdiChevronRight,
		};
	},
	computed: {
		...mapState("auth", {
			school: "school",
			user: "user",
		}),
	},
	watch: {
		school(updatedSchool) {
			this.localSchool = updatedSchool;
		},
	},
	methods: {
		save() {
			this.$store.dispatch("schools/patch", this.localSchool);
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
