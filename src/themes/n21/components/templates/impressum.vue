<template>
	<div class="impressum-container">
		<div class="impressum-max-width">
			<h1 class="h2">Impressum</h1>
			<h2 class="h4">
				NIEDERSÄCHSISCHE BILDUNGSCLOUD – Landesinitiative n-21 Schulen in
				Niedersachsen online e.V.
			</h2>
			<p>
				Schiffgraben 27
				<br />
				30159 Hannover
				<br />
				E-Mail:
				<base-link href="mailto:info@n-21.de">info@n-21.de</base-link>
				<br />
				Internet:
				<base-link to="/">https://niedersachsen.cloud </base-link><br />
				Telefon: +49 (0)511 3536621-0
				<br />
				Telefax: +49 (0)511 3536621-99
			</p>
			<p>
				<b>Support-Anfragen</b> richten Sie bitte direkt an
				<base-link :href="mailtoSupportMail" data-testid="support-mail">{{
					supportMail
				}}</base-link
				>.
			</p>
			<h2 class="h4">Vertretungsberechtigter Geschäftsführer</h2>
			<p>
				OStD Michael Sternberg
				<br />
				Inhaltlich Verantwortlich gemäß § 6 MDStV: OStD Michael Sternberg
			</p>
			<h2 class="h4">Redaktion</h2>
			<p>Landesinitiative n-21 Schulen in Niedersachsen online e.V.</p>
			<h2 class="h4">Rechtliche Hinweise</h2>
			<p>
				Die Niedersächsische Bildungscloud ist ein Landespilotprojekt, welches
				durch die Landesinitiative n-21 im Auftrag des Niedersächsischen
				Kultusministerium und in technisch-organisatorischer Kooperation mit der
				Dataport AöR (<base-link href="https://www.dataport.de" target="_blank"
					>https://www.dataport.de</base-link
				>) durchgeführt wird.
			</p>
			<p>
				Die Inhalte der Niedersächsischen Bildungscloud stellen keine
				offiziellen Verlautbarungen des niedersächsischen Kultusministeriums
				oder Dataports dar. Für die veröffentlichten Inhalte sind die jeweiligen
				Autor/innen selbst verantwortlich. Ohne vorherige schriftliche
				Genehmigung ist eine kommerzielle Verbreitung der über die
				Niedersächsische Bildungscloud verfügbaren Inhalte ausdrücklich
				untersagt, außer diese sind ausdrücklich gekennzeichnet. Die
				redaktionelle Verantwortung für den Inhalt verlinkter Webseiten anderer
				Anbieter (einschließlich der dort verankerten Links zu Dritten),
				insbesondere die Verantwortung für die Beachtung der Bestimmungen des
				Jugendschutz- und Datenschutzrechts, trägt in jeder Hinsicht der
				jeweilige Anbieter allein.
			</p>
			<p>
				Die Landesinitiative n-21 überprüft und aktualisiert regelmäßig die
				Inhalte seiner Websites. Trotz größtmöglicher Sorgfalt kann nicht
				ausgeschlossen werden, dass einzelne Informationen auf den öffentlich
				zugänglichen Seiten veraltet oder nicht mehr zutreffend sind. Daher wird
				keine Haftung für Aktualität, Genauigkeit und Vollständigkeit der
				publizierten Informationen übernommen. Das Gleiche gilt für alle
				Websites, die von den n-21-Seiten über Hyperlinks erreichbar sind. Für
				alle diese Links gilt: Wir erklären ausdrücklich, dass wir keinen
				Einfluss auf die Gestaltung und die Inhalte der verlinkten Seite haben.
				Deshalb distanziert sich die Landesinitiative n-21 hiermit von allen
				Inhalten aller verlinkten Seiten und macht sich diese Inhalte nicht zu
				Eigen. Diese Erklärung gilt für alle auf den Seiten angebrachten Links
				zu fremden Seiten. Für den Inhalt dieser verlinkten Seiten ist die
				Landesinitiative n-21 nicht verantwortlich. Weiterhin behält sich die
				Landesinitiative n-21 jederzeit Änderungen und Ergänzungen der
				angezeigten Informationen vor. Inhalt und Struktur der NBC-Website sind
				durch das Copyright geschützt. Die Weiterverwendung von Informationen
				und Daten ist nur nach Zustimmung durch die Landesinitiative n-21
				zulässig.
			</p>
			<p>
				<b
					>Wir wünschen Ihnen einen informativen Aufenthalt auf unseren Websites
					und freuen uns über Vorschläge, Wünsche oder Kritik zur
					Niedersächsischen Bildungscloud.</b
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
	max-width: 720px;
}
</style>
