<template>
	<div class="impressum-container">
		<div class="impressum-max-width pa-4">
			<h1>Impressum</h1>
			<h2>
				NIEDERSÄCHSISCHE BILDUNGSCLOUD – <br />
				Niedersächsisches Landesinstitut für schulische Qualitätsentwicklung (NLQ), Körperschaft des öffentlichen Rechts
			</h2>
			<p>
				Keßlerstraße 52<br />
				31134 Hildesheim<br />
				E-Mail:
				<a href="mailto:poststelle@nlq.niedersachsen.de">poststelle@nlq.niedersachsen.de</a><br />
				Telefon: 05121 1695-0<br />
				Telefax: 05121 1695-297
			</p>
			<p>
				<b>Support-Anfragen</b> richten Sie bitte direkt an
				<a :href="mailtoSupportMail" data-testid="support-mail">{{ supportMail }}</a>
				.
			</p>
			<h2>Verantwortliche</h2>
			<p>Vertretungsberechtigte Verantwortliche gemäß § 5 DDG und § 18 MStV:</p>
			<p>
				Direktorin Dr. Elke Richlick<br />
				Keßlerstraße 52<br />
				31134 Hildesheim
			</p>
			<p class="xs-pt-2 sm-pt-2">Behördlicher Datenschutzbeauftragter des NLQ nach Art. 37 Abs. 1 Buchstabe a DSGVO:</p>
			<p>
				Datenschutzbeauftragter<br />
				Keßlerstraße 52<br />
				31134 Hildesheim<br />
				E-Mail:
				<a href="mailto:datenschutz@nlq.niedersachsen.de">datenschutz@nlq.niedersachsen.de</a><br />
				Tel.: 05121 1695-0
			</p>
			<h2>Rechtliche Hinweise</h2>
			<p>
				Die Niedersächsische Bildungscloud (Cloud) wird im Auftrag des Niedersächsischen Kultusministeriums durch das
				Niedersächsische Landesinstitut für schulische Qualitätsentwicklung (NLQ) betrieben. Die technische
				Bereitstellung erfolgt im Rahmen der landeseigenen Bildungsmedieninfrastruktur.
			</p>

			<p>
				Soweit innerhalb der Cloud Inhalte, Materialien, Beiträge oder Dateien von Lernbegleitenden, Lernenden oder
				weiteren Nutzenden veröffentlicht werden, sind für diese Inhalte ausschließlich die jeweiligen Autorinnen und
				Autoren verantwortlich.
			</p>

			<p>
				Die über die Plattform bereitgestellten Inhalte stellen nicht notwendigerweise die Auffassung der Schule, des
				NLQ, des Niedersächsischen Kultusministeriums oder der technischen Dienstleister dar.
			</p>

			<p>
				Es wird keine Gewähr übernommen für die jederzeitige Verfügbarkeit der bereitgestellten Dienste durch externe
				Anbieter oder integrierte Drittanwendungen. Für Inhalte verlinkter externer Internetseiten sind ausschließlich
				deren Betreiber verantwortlich.
			</p>

			<p>
				Bei Bekanntwerden von Rechtsverletzungen durch eingestellte Inhalte oder auf verlinkten Internetseiten werden
				diese umgehend entfernt.
			</p>

			<p>
				Für die Verarbeitung personenbezogener Daten innerhalb der Cloud gelten die jeweils aktuellen
				Nutzungsbedingungen der Plattform sowie die ergänzenden
				<a href="/privacypolicy">Datenschutzinformationen</a> und <a href="/termsofuse">Nutzungsordnungen</a> der
				Schule. Die Nutzung erfolgt auf Grundlage der datenschutzrechtlichen und schulrechtlichen Bestimmungen des
				Landes Niedersachsen.
			</p>

			<p>
				Weitere Informationen zur Niedersächsischen Bildungscloud finden Sie unter:
				<a
					href="https://bildungsportal-niedersachsen.de/digitale-welt/niedersaechsische-bildungscloud-und-moinschule"
					aria-label="Niedersächsische Bildungscloud und moin.schule"
					>https://bildungsportal-niedersachsen.de/digitale-welt/niedersaechsische-bildungscloud-und-moinschule</a
				>
			</p>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useEnvConfig } from "@data-env";
import { computed, ComputedRef } from "vue";

const supportMail: ComputedRef<string> = computed(() => {
	const email = useEnvConfig().value.SC_CONTACT_EMAIL;
	const isValidMailAddress = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+$/gm.test(email);
	const fallbackEmail = "support@dbildungscloud.de";

	return isValidMailAddress ? email : fallbackEmail;
});

const mailtoSupportMail: ComputedRef<string> = computed(() => `mailto:${supportMail.value}`);
</script>

<style scoped>
.impressum-container {
	display: flex;
	justify-content: center;
}

.impressum-max-width {
	max-width: 760px;
	margin-bottom: 10vh;
}
</style>
