<template>
	<v-container class="py-0 px-13">
		<v-row>
			<v-col>
				<v-breadcrumbs
					:items="breadcrumbItems"
					:large="true"
					:nuxt="true"
					class="px-0 py-0"
				>
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
			</v-col>
		</v-row>
		<v-row class="mt-0">
			<v-col>
				<h1 class="text-h3">
					{{ $t("pages.administration.school.index.title") }}
				</h1>
				<h2 class="text-h4">
					{{ $t("pages.administration.school.schoolYear") }} 2020/21
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
										v-model="schoolName"
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
							<v-checkbox v-model="checkbox" hide-details="auto" class="mb-2">
								<template v-slot:label>
									<div>
										Sichtbarkeit von Schüler:innen für Lehrkräfte aktivieren
									</div>
								</template>
							</v-checkbox>
							<p class="body-2">
								Die Aktivierung dieser Option hat datenschutzrechtlich eine hohe
								Schwelle. Um die Sichtbarkeit aller Schüler:innen der Schule für
								jede Lehrkraft zu aktivieren, ist es erforderlich, dass jede/r
								Schüler:in wirksam in diese Datenverarbeitung eingewilligt hat.
							</p>
							<v-checkbox v-model="checkbox" hide-details="auto">
								<template v-slot:label>
									<div>Lern-Store für Schüler:innen</div>
								</template>
							</v-checkbox>
							<p class="body-2">
								Wenn diese Option nicht aktiviert ist, können die Schüler:innen
								nicht auf den Lern-Store zugreifen.
							</p>
							<v-checkbox v-model="checkbox" hide-details="auto">
								<template v-slot:label>
									<div>Matrix Messenger aktivieren</div>
								</template>
							</v-checkbox>
							<p class="body-2">
								Ist der Matrix Messenger aktiviert, können alle Lehrkräfte
								dieser Schule Chaträume, private Unterhaltungen oder kurs- und
								teaminterne Gruppendiskussionen starten. Schüler:innen haben
								dort anfangs nur Leserechte, können aber über die Kurs- und
								Teameinstellungen auch Schreibrechte zugewiesen bekommen. Mehr
								Informationen dazu findest du im
								<a
									href="https://docs.hpi-schul-cloud.org/pages/viewpage.action?pageId=113650243"
									target="_blank"
									>Hilfeartikel zum Messenger</a
								>
							</p>
							<v-checkbox v-model="checkbox" hide-details="auto">
								<template v-slot:label>
									<div>Chatfunktion aktivieren</div>
								</template>
							</v-checkbox>
							<p class="body-2">
								Sind Chats an deiner Schule aktiviert, können Team-Admins im
								jeweiligen Team sowie Lehrkräfte in ihren Kursen die
								Chatfunktion gezielt freischalten.
							</p>
							<v-checkbox v-model="checkbox" hide-details="auto">
								<template v-slot:label>
									<div>Videokonferenzen fzur Kurse und Teams aktivieren</div>
								</template>
							</v-checkbox>
							<p class="body-2">
								Sind Videokonferenzen an deiner Schule aktiviert, können
								Lehrkräfte ihrem Kurs im Bereich Tools das Videokonferenz-Tool
								hinzufügen und dann von dort aus Videokonferenzen für alle
								Kursteilnehmer:innen starten. Team-Admins können die
								Videokonferenzfunktion im jeweiligen Team aktivieren.
								Team-Leiter:innen und Team-Admins können dann Videokonferenzen
								zu Terminen hinzufügen und starten.
							</p>
							<v-responsive width="74%" class="mt-8">
								<v-select
									v-model="schoolCloudStorage"
									:items="cloudStorages"
									outlined
									dense
									label="Cloud-Storage-Anbieter"
								></v-select>
							</v-responsive>
							<v-btn color="primary" depressed
								>Allgemeine Einstellungen speichern</v-btn
							>
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
				<v-btn color="primary" depressed>Datenschutzerklärung hinzufügen</v-btn>
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
	</v-container>
</template>

<script>
import { mapGetters } from "vuex";
import { mdiAccount, mdiChevronRight } from "@mdi/js";

export default {
	components: {},
	layout: "defaultVuetify",
	data() {
		return {
			schoolName: "",
			schoolNumber: "",
			schoolCounty: "",
			schoolTimezone: `${this.$cookies.get("USER_TIMEZONE")}`,
			schoolStudentVisibility: false,
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
		...mapGetters("news", {
			news: "list",
		}),
	},
	created(ctx) {
		this.find();
	},
	methods: {
		find() {
			this.$store.dispatch("news/find", {
				query: {
					$sort: {
						createdAt: -1,
					},
				},
			});
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
