<template>
	<div class="impressum-container">
		<div class="impressum-max-width">
			<h1 class="h2">{{ $t("pages.termsofuse.title") }}</h1>
			Liebe Besucher*innen, liebe Nutzer*innen, liebe Erziehungsberechtigte,
			Diese Datenschutzhinweise informieren über die Verarbeitung
			personenbezogener Daten, die beim Aufruf der Website
			<a href="https://niedersachsen.cloud/">https://niedersachsen.cloud/</a>
			von jedem Besucher automatisch durch das HPI erhoben werden (Buchstabe A)
			sowie über die Verarbeitung von Daten, die im Auftrag der teilnehmenden
			Schulen bei Nutzung der Niedersächsischen Bildungscloud werden (Buchstabe
			B).
			<br />
			<br />
			Die Niedersächsischen Bildungscloud schafft die technische Grundlage
			dafür, dass Lehrende und Schüler*innen in jedem Unterrichtsfach moderne
			digitale Lehr- und Lerninhalte nutzen können.
			<br /><br />
			Personenbezogene Daten sind Informationen, die sich auf eine
			identifizierte oder identifizierbare Person beziehen. Hierunter fallen vor
			allem Angaben, die Rückschlüsse auf die Identität ermöglichen,
			beispielsweise Name, Telefonnummer, Anschrift oder E-Mail-Adresse.
			Statistische Daten, die beispielsweise bei einem Besuch der Website
			erhoben werden und die nicht mit einer Person in Verbindung gebracht
			werden können, fallen nicht unter den Begriff des personenbezogenen
			Datums.
			<h2 class="h3">
				A. Datenverarbeitung durch das HPI beim Aufruf der Website
			</h2>

			Bei jedem Aufruf der Website
			<a href="https://niedersachsen.cloud/">https://niedersachsen.cloud/</a>
			werden durch den Browser automatisch Zugriffsdaten übermittelt, um den
			Besuch der Website zu ermöglichen. Die Zugriffsdaten umfassen insbesondere
			die IP-Adresse des anfragenden Geräts, das Datum und die Uhrzeit der
			Anfrage, die Adresse der aufgerufenen Website und der anfragenden Website
			sowie Angaben über den verwendeten Browser und das Betriebssystem. Die
			Verarbeitung dieser Zugriffsdaten ist erforderlich, um den Besuch der
			Website zu ermöglichen und die dauerhafte Funktionsfähigkeit und
			Sicherheit der Systeme des HPI zu gewährleisten. Diese Zugriffsdaten
			werden für 14 Tage gespeichert und nach anschließender Anonymisierung
			archiviert.
			<br /><br />
			Die Website nutzt zudem eigene Cookies, d.h. kleine Dateien, die auf den
			Geräten der Besucher*innen gespeichert werden und Informationen für den
			Austausch mit den Systemen des HPI enthalten. Die meisten Browser sind
			standardmäßig so eingestellt, dass sie Cookies akzeptieren. Besucher*innen
			können jedoch ihre Browsereinstellungen so anpassen, dass Cookies
			abgelehnt oder nur nach vorheriger Zustimmung gespeichert werden. Ohne
			Cookies können jedoch ggf. nicht alle Angebote und Funktionen der Website
			störungsfrei funktionieren. Die auf der Website eingesetzten Cookies
			dienen insbesondere zur Login-Authentifizierung, zur Lastverteilung und um
			zu vermerken, dass eine auf der Website platzierte Informationen angezeigt
			wurde, sodass diese beim nächsten Besuch der Website nicht erneut
			angezeigt werden muss. Wir wollen dadurch eine komfortablere und
			individuellere Nutzung der Website ermöglichen.
			<br /><br />
			Beim Aufruf der Website bevor eine Anmeldung durch registrierte Nutzer in
			die NBC stattfindet, ist die Landesinitiative n-21: Schulen in
			Niedersachsen online, ansässig im Schiffgraben 27, in 30159 Hannover,
			elektronisch erreichbar unter
			<a href="mailto:nbc-datenschutz@netz-21.de">nbc-datenschutz@netz-21.de</a>
			für die zuvor genannten Verarbeitungsvorgänge verantwortlich. Für alle
			Fragen zum Thema Datenschutz ist der Datenschutzbeauftragte der
			Landesinitiative n-21 unter den zuvor genannten Kontaktdaten erreichbar
			(Stichwort: "z. Hd. Datenschutzbeauftragter"). Die benannte Verarbeitung
			dient dem berechtigten Interessen der Landesinitiative n-21.
			<br /><br />
			Bei angemeldeten Nutzern*innen findet die zuvor genannte Datenverarbeitung
			unter der nachfolgend beschriebenen datenschutzrechtlichen
			Verantwortlichkeit der Schulen statt, die das HPI als technischen
			Dienstleister beauftragen.
			<h2 id="documents-header" class="h3">
				B. Datenverarbeitung durch die Schulen als verantwortliche Stellen bei
				Nutzung der Niedersächsischen Bildungscloud
			</h2>

			<div v-if="showSchoolTerms">
				Bei Nutzung der Niedersächsischen Bildungscloud ist Ansprechpartner und
				verantwortliche Stelle für die Verarbeitung personenbezogener Daten nach
				der EU-Datenschutzgrundverordnung (DSGVO) die Schulleitung der
				jeweiligen Schule, die Du besuchst / Ihr Kind besucht.
				<br /><br />
				Die Datenschutzerklärung deiner/ Ihrer Schule können Sie unter folgendem
				Link einsehen:
				<a href="#documents-header" @click="download"
					>Datenschutzerklärung der Schule</a
				>. Falls deine/ Ihre Schule keine spezifische Datenschutzerklärung
				erstellt hat, wird Ihnen eine Muster Datenschutzerklärung angezeigt.
				<br /><br />
				Die Nutzungsordnung der Niedersächsischen Bildungscloud kann unter
				folgendem Link eingesehen werden:
				<a :href="termsOfUseLink" target="_blank"
					>Nutzungsordnung der Niedersächsischen Bildungscloud</a
				>.
			</div>
			<div v-else>
				Bei Nutzung der Niedersächsischen Bildungscloud ist Ansprechpartner und
				verantwortliche Stelle für die Verarbeitung personenbezogener Daten nach
				der EU-Datenschutzgrundverordnung (DSGVO) die Schulleitung der
				jeweiligen Schule, der unsere Schüler:innen und Lehrkräfte angehören.
				<br /><br />
				Eine Muster Datenschutzerklärung für unsere Schulen können Sie unter
				folgendem Link einsehen:
				<a :href="privacyLink" target="_blank"
					>Datenschutzerklärung Muster Schule</a
				>. <br /><br />
				Die Nutzungsordnung der Niedersächsischen Bildungscloud kann unter
				folgendem Link eingesehen werden:<a
					:href="termsOfUseLink"
					target="_blank"
					>Nutzungsordnung der Niedersächsischen Bildungscloud</a
				>.
			</div>
		</div>
	</div>
</template>
<script>
import { filePathsModule } from "@/store";

export default {
	props: {
		showSchoolTerms: {
			type: Boolean,
			required: true,
		},
	},
	data() {
		return {
			privacyLink: "/datenschutz",
			termsOfUseLink: filePathsModule.getSpecificFiles.termsOfUseExemplary,
		};
	},
	methods: {
		download(event) {
			event.preventDefault();
			this.$emit("download");
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";

.impressum-container {
	display: flex;
	justify-content: center;
}

.impressum-max-width {
	max-width: 720px;
}
</style>
