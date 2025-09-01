<template>
	<div class="impressum-container">
		<div class="impressum-max-width pa-4">
			<h1 class="text-h2">Impressum</h1>
			<h2 class="text-h4">
				NIEDERSÄCHSISCHE BILDUNGSCLOUD – <br />
				Niedersächsisches Landesinstitut für schulische Qualitätsentwicklung
				(NLQ), Körperschaft des öffentlichen Rechts
			</h2>
			<p>
				Keßlerstraße 52<br />
				31134 Hildesheim<br />
				E-Mail:
				<base-link href="mailto:poststelle@nlq.niedersachsen.de"
					>poststelle@nlq.niedersachsen.de</base-link
				><br />
				Telefon: 05121 1695-0<br />
				Telefax: 05121 1695-297
			</p>
			<p>
				<b>Support-Anfragen</b> richten Sie bitte direkt an
				<base-link :href="mailtoSupportMail" data-testid="support-mail">{{
					supportMail
				}}</base-link
				>.
			</p>
			<h2 class="text-h4">Verantwortliche</h2>
			<p>Vertretungsberechtigte Verantwortliche gemäß § 5 DDG und § 18 MStV:</p>
			<p>
				Direktorin Dr. Elke Richlick<br />
				Keßlerstraße 52<br />
				31134 Hildesheim
			</p>
			<p class="xs-pt-2 sm-pt-2">
				Behördlicher Datenschutzbeauftragter des NLQ nach Art. 37 Abs. 1
				Buchstabe a DSGVO:
			</p>
			<p>
				Datenschutzbeauftragter<br />
				Keßlerstraße 52<br />
				31134 Hildesheim<br />
				E-Mail:
				<base-link href="mailto:datenschutz@nlq.niedersachsen.de"
					>datenschutz@nlq.niedersachsen.de</base-link
				><br />
				Tel.: 05121 1695-0
			</p>
			<h2 class="text-h4">Rechtliche Hinweise</h2>
			<p>
				Das Landesprojekt Niedersächsische Bildungscloud wird durchgeführt durch
				das Niedersächsische Landesinstitut für schulische Qualitätsentwicklung
				(NLQ), im Auftrag des Niedersächsischen Kultusministerium und in
				technisch-organisatorischer Kooperation mit der Dataport AöR
				(https://www.dataport.de).
			</p>
			<p>
				Die Inhalte der Niedersächsischen Bildungscloud stellen keine
				offiziellen Verlautbarungen des niedersächsischen Kultusministeriums,
				des NLQ oder Dataports dar. Für die veröffentlichten Inhalte sind die
				jeweiligen Autorinnen oder Autoren selbst verantwortlich. Für
				angemeldete Nutzende können Bildungseinrichtungen weitergehende
				Datenschutzhinweise und Nutzungsordnungen bereitstellen.
			</p>
			<p>
				Als Diensteanbieter sind wir für eigene Inhalte auf diesen Seiten nach
				den allgemeinen Gesetzen verantwortlich. Wir sind als Diensteanbieter
				jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
				Informationen zu überwachen oder nach Umständen zu forschen, die auf
				eine rechtswidrige Tätigkeit hinweisen.
			</p>
			<p>
				Verpflichtungen zur Entfernung oder Sperrung der Nutzung von
				Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt.
				Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der
				Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von
				entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend
				entfernen
			</p>
			<p>
				Unser Angebot enthält Links zu externen Websites Dritter, auf deren
				Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden
				Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten
				Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten
				verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der
				Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte
				waren zum Zeitpunkt der Verlinkung nicht erkennbar.
			</p>
			<p>
				Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch
				ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei
				Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend
				entfernen.
			</p>
			<p>
				<b
					>Wir wünschen Ihnen viel Freude und Erfolg beim Lernen und Arbeiten
					mit der Niedersächsischen Bildungscloud! Ihre Ideen, Wünsche und Ihr
					Feedback sind uns wichtig – gemeinsam gestalten wir eine noch bessere
					Lernumgebung.</b
				>
			</p>
		</div>
	</div>
</template>

<script setup lang="ts">
import { envConfigModule } from "@/store";
import { computed, ComputedRef } from "vue";

const supportMail: ComputedRef<string> = computed(() => {
	const email = envConfigModule.getContactEmail;
	const isValidMailAddress = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+$/gm.test(
		email
	);
	const fallbackEmail = "support@dbildungscloud.de";

	return isValidMailAddress ? email : fallbackEmail;
});

const mailtoSupportMail: ComputedRef<string> = computed(() => {
	return `mailto:${supportMail.value}`;
});
</script>

<style lang="scss" scoped>
.impressum-container {
	display: flex;
	justify-content: center;
}

.impressum-max-width {
	max-width: 760px;
	margin-bottom: 10vh;
}
</style>
