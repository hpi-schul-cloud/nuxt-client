<template>
	<default-wireframe
		:headline="$t('pages.administration.migration.title')"
		:full-width="true"
		:breadcrumbs="breadcrumbs"
	>
		<div slot="header">
			<h1 class="text-h3">{{ $t("pages.administration.migration.title") }}</h1>
			<v-stepper v-model="progressStepper" flat>
				<v-stepper-header>
					<v-stepper-step editable step="1"> Anleitung </v-stepper-step>
					<v-divider></v-divider>
					<v-stepper-step editable step="2"> Kontenverknüpfung </v-stepper-step>
					<v-divider></v-divider>
					<v-stepper-step editable step="3"> Zusammenfassung </v-stepper-step>
					<v-divider></v-divider>
					<v-stepper-step step="4"> Ende </v-stepper-step>
				</v-stepper-header>
			</v-stepper>
		</div>
		<div>
			<v-stepper v-model="progressStepper" flat>
				<v-stepper-items>
					<v-stepper-content step="1">
						<v-card elevation="2" class="pa-5 mb-10" color="grey lighten-5">
							<p>
								In den folgenden Schritten besteht die Möglichkeit, die lokalen
								Benutzerkonten auf das <i>zentrale LDAP-System des Landes
                Brandenburg</i> zu migrieren. Dies bedeutet, dass Informationen zu
								Benutzerkonten wie Name, E-Mail-Adresse und Berechtigungsrolle
								nicht mehr lokal in der {{ this.$theme.short_name }}, sondern zentral in
								weBBschule gepflegt und von dort bezogen werden.
							</p>
							<p>
								Damit User ihre alten Unterrichtsinhalte mit den LDAP-Accounts
								weiterhin nutzen können, unterstützen wir die Migration mit
								einem Assistenten. Mit Abschluss der Migration können Nutzer
								sich mit den LDAP-Login-Namen in ihrem existierenden Account
								anmelden.
							</p>
							<p>
								Die Schule befindet sich derzeit in der Transferphase und im
								Migrationsmodus. Die Migration der Benutzerkonten wird auf Basis
								des letzten Schuljahres durchgeführt.
							</p>
							<br />
							<p>
								Im ersten Schritt werden die Benutzerkonteninformationen
								angezeigt, die wir für die Schule aus dem zentralen LDAP
								erhalten. Jedem LDAP-Benutzerkonto muss jeweils das lokale
								Benutzerkonto zugeordnet werden, sofern es existiert.
							</p>
							<br />
							<ol>
								<li>
									Die automatische Zuordnung sind zu prüfen, die wir vorgenommen
									haben, sofern die Kombination aus Vorname + Nachname zwischen
									LDAP- und lokalem Konto übereinstimmt und innerhalb der Schule
									eindeutig ist.
								</li>
								<li>
									Für LDAP-Konten, denen noch kein lokales Konto zugeordnet ist,
									kann dies per Stift-Symbol nachgeholt werden. Im sich
									öffnenden Dialog kann nach Namen gesucht und die Zuordnung
									manuell vorgenommen werden.
								</li>
								<li>
									LDAP-Konten ohne Zuordnung werden in der {{ this.$theme.short_name }} neu
									erstellt.
								</li>
								<li>
									Nicht mehr benötigte lokale Benutzerkonten, die keinem
									LDAP-Konto zugeordnet wurden, können im Verwaltungsbereich
									nach der Migration gelöscht werden.
								</li>
							</ol>
							<br />
							<p>
								Nach Bestätigung der Zuordnung wird im folgenden Schritt eine
								Zusammenfassung anzeigt, wie viele Konten zugeordnet werden, wie
								viele lokale Benutzerkonten ohne Zuordnung sind und wie viele
								Konten lokal neu anlegt werden. Diese Information muss bestätigt
								werden, um die Migration anzuwenden. Dabei werden die
								LDAP-Informationen an die lokalen Konten geschrieben und der
								Migrationsmodus für die Schule beendet.
							</p>
							<br />
							<p>
								Im letzten Schritt muss die Transferphase der Schule beendet
								werden. Der Login mit den neuen Login-Daten ist erst nach
								beenden der Transferphase und anschließendem
								Synchronisationslauf gegen LDAP möglich. Dieser erfolgt dann
								automatisch und einmal in der Stunde. Es kann also etwas dauern,
								bis die neuen Login-Daten genutzt werden können.
							</p>
						</v-card>
						<v-btn color="primary" @click="progressStepper = 2">Weiter</v-btn>
					</v-stepper-content>
					<v-stepper-content step="2">
						<import-users></import-users>
						<v-btn color="secondary" @click="progressStepper = 1">Zurück</v-btn>
						<v-btn color="primary" @click="progressStepper = 3">Weiter</v-btn>
					</v-stepper-content>
					<v-stepper-content v-if="canStartMigration" step="3">
						<v-card elevation="2" class="pa-5 mb-10" color="grey lighten-5">
							<p>Folgende Zuordnungen wurden vorgenommen:</p>
							<br />
							<p>
								<b>xxx</b> LDAP-Benutzerkonten haben ein {{ this.$theme.short_name }} Benutzerkonto
								zugeordnet. Die {{ this.$theme.short_name }} Benutzerkonten werden auf die
								LDAP-Konten migriert
							</p>
							<p>
								<b>yyy</b> LDAP-Benutzerkonten haben kein lokales Benutzerkonto
								zugeordnet. Die LDAP-Konten werden neu in der {{ this.$theme.short_name }}
								erstellt.
							</p>
							<p>
								<b>zzz</b> {{ this.$theme.short_name }} Benutzerkonten wurden keinem LDAP-Konto
								zugeordnet. Die {{ this.$theme.short_name }} Benutzerkonten bleiben erhalten und
								können über die Verwaltungsseite nachträglich gelöscht werden.
							</p>
							<br />
							<p>
								<v-checkbox
									v-model="migrationConfirm"
									label="Hiermit wird bestätigt, dass die Zuordnung der lokalen Benutzerkonten geprüft bzw. vorgenommen wurden und die Migration durchgeführt werden kann."
								></v-checkbox>
							</p>
						</v-card>
						<v-btn color="secondary" @click="progressStepper = 2">Zurück</v-btn>
						<v-btn
							color="primary"
							:disabled="!migrationConfirm"
							@click="progressStepper = 4"
							>Migration durchführen</v-btn
						>
					</v-stepper-content>
					<v-stepper-content v-if="canStartMigration && migrationConfirm /* && canFinishMigration */" step="4">
						<v-card elevation="2" class="pa-5 mb-10" color="grey lighten-5">
							<p>
								Die Migration der Benutzerkonten wurde erfolgreich durchgeführt.
							</p>
							<p>
								Ein Login mit den neuen Login-Daten ist erst nach einem
								Synchronisationslauf gegen LDAP möglich. Dafür muss die
								Transferphase beendet werden. Nach spätestens einer Stunde
								findet der nächste LDAP-Lauf automatisch statt.
							</p>
						</v-card>
					</v-stepper-content>
				</v-stepper-items>
			</v-stepper>
		</div>
	</default-wireframe>
</template>
<script>
import SchoolsModule from "@/store/schools";

import DefaultWireframe from "@components/templates/DefaultWireframe.vue";
import ImportUsers from "@components/organisms/administration/importUsers";
export default {
	components: { DefaultWireframe, ImportUsers },
	layout: "defaultVuetify",
	data() {
		return {
			progressStepper: 1,
			breadcrumbs: [
				{
					text: this.$t("pages.administration.index.title"),
					href: "/administration/",
				},
			],
			migrationConfirm: false,
		};
	},
  computed: {
    canStartMigration() {
      return this.school.inUserMigration && this.school.inMaintenance;
    },
    school() {
      return SchoolsModule.getSchool;
    },
  },
	head() {
		return {
			title: this.$t("pages.administration.migration.title"),
		};
	},
};
</script>
<style scoped>
.v-stepper__content {
	padding: 0;
}
</style>
