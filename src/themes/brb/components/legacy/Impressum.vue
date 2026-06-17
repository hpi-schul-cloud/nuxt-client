<template>
	<div class="impressum-container">
		<div class="impressum-max-width">
			<h1>Impressum</h1>
			<h2>I. Anbieter</h2>
			<p>
				Ministerium für Bildung, Jugend und Sport des Landes Brandenburg<br />
				Vertreten durch den Minister für Bildung, Jugend und Sport<br />
				Heinrich-Mann-Allee 107, 14473 Potsdam
			</p>
			<p>Inhaltlich verantwortlich:</p>
			<p>
				Alexander Engels, Referatsleitung Presse- und Öffentlichkeitsarbeit<br />
				Anschrift: wie oben
			</p>
			<p>
				<strong>Allgemeine Anfragen und Support:</strong><br />
				<v-icon size="20" class="mr-1">{{ mdiPhone }}</v-icon>
				03378 209 185 (Mo. 13–15 Uhr; Di./Mi./Do. 14–15 Uhr; Fr. 12–13 Uhr)<br />
				<v-icon size="20" class="mr-1">{{ mdiEmailOutline }}</v-icon>
				<a
					href="mailto:schul-cloud@support.meinlibra.de"
					target="_blank"
					rel="noopener"
					:aria-label="$t('components.legacy.footer.ariaLabel', { itemName: 'Mail' })"
					>schul-cloud@support.meinlibra.de</a
				>
			</p>
			<p>
				<strong>Wichtige Hinweise:</strong>
				<br />
				Die genannten E-Mail-Adressen dienen nur für den Empfang einfacher Mitteilungen ohne Signatur und/oder
				Verschlüsselung.
			</p>

			<h2>II. Haftungsausschluss</h2>
			<h3>1. Inhalt des Onlineangebotes</h3>
			<p>
				Der Anbieter ist bemüht, auf dieser Website richtige und vollständige Informationen zur Verfügung zu stellen.
				Der Anbieter übernimmt keinerlei Gewähr für die Aktualität, Korrektheit, Vollständigkeit oder Qualität der
				bereitgestellten Informationen. Ein Vertragsverhältnis mit den Nutzenden des Internetangebots kommt nicht
				zustande.
			</p>
			<p>
				Haftungsansprüche, welche sich auf Schäden materieller oder ideeller Art beziehen, die durch die Nutzung oder
				Nichtnutzung der dargebotenen Informationen bzw. durch die Nutzung fehlerhafter und unvollständiger
				Informationen verursacht wurden, sind ausgeschlossen, sofern seitens des Anbieters kein nachweislich
				vorsätzliches oder grob fahrlässiges Verschulden nachgewiesen werden kann.
			</p>
			<p>
				Der Anbieter behält es sich ausdrücklich vor, Teile der Seiten oder das gesamte Angebot ohne gesonderte
				Ankündigung zu verändern, zu ergänzen, zu löschen oder die Veröffentlichung zeitweise oder endgültig
				einzustellen.
			</p>

			<h3>2. Verweise und Links</h3>
			<p>
				Von unseren eigenen Inhalten sind Querverweise („Links") auf die Webseiten anderer Anbieter zu unterscheiden.
				Durch diese Links ermöglichen wir lediglich den Zugang zur Nutzung fremder Inhalte. Bei der erstmaligen
				Verknüpfung mit diesen Internetangeboten wurden diese fremden Inhalte daraufhin überprüft, ob durch sie eine
				mögliche zivilrechtliche oder strafrechtliche Verantwortlichkeit ausgelöst wird. Allerdings können diese fremden
				Inhalte nicht fortlaufend auf Veränderungen überprüft werden, sodass daher auch keine Verantwortung dafür
				übernommen werden kann. Für illegale, fehlerhafte oder unvollständige Inhalte und insbesondere für Schäden, die
				aus der Nutzung oder Nichtnutzung von Informationen Dritter entstehen, haftet allein der jeweilige Anbieter der
				Seite.
			</p>

			<h3>3. Urheber- und Kennzeichenrecht, Copyright</h3>
			<p>
				Das Ministerium für Bildung, Jugend und Sport des Landes Brandenburg (MBJS) ist alleiniger Inhaber des
				Domainnamens "brandenburg.cloud". Alle Rechte an den Seiten liegen beim MBJS. Eine Nachnutzung der
				Internetangebote des Anbieters, gleich welcher Art und auch auszugsweise bzw. per Verlinkung auf anderen
				Websites, bedarf der Genehmigung der Redaktion.
			</p>
			<p>
				Die Inhalte der Schul-Cloud Brandenburg stellen keine offiziellen Verlautbarungen des MBJS dar. Für die Inhalte
				sind die jeweiligen Autorinnen und Autoren selbst verantwortlich. Ohne vorherige schriftliche Genehmigung ist
				eine kommerzielle Verbreitung der über die Schul-Cloud Brandenburg verfügbaren Inhalte ausdrücklich untersagt,
				außer diese sind ausdrücklich gekennzeichnet.
			</p>
			<p>
				Sollte sich auf den jeweiligen Seiten eine ungekennzeichnete, aber durch fremdes Copyright geschützte Grafik,
				ein Sound oder Text befinden, so konnte das Copyright nicht festgestellt werden. Im Falle einer solchen
				unbeabsichtigten Copyrightverletzung wird der Anbieter nach Benachrichtigung das entsprechende Objekt aus seiner
				Publikation entfernen bzw. mit dem entsprechenden Copyright kenntlich machen. Das Copyright für veröffentlichte,
				vom Anbieter selbst erstellte Objekte bleibt allein bei den Autorinnen und Autoren der Websites. Eine
				Vervielfältigung oder Verwendung solcher Grafiken, Sound oder Texte in anderen elektronischen oder gedruckten
				Publikationen ist ohne ausdrückliche Zustimmung des Anbieters nicht gestattet.
			</p>
			<p>
				Das Copyright für veröffentlichte, vom Anbieter selbst erstellte Objekte bleibt allein beim Verfasser der
				Seiten. Eine Vervielfältigung oder Verwendung solcher Grafiken, Tondokumente, Videosequenzen und Texte in
				anderen elektronischen oder gedruckten Publikationen ist ohne ausdrückliche Zustimmung des Anbieters nicht
				gestattet.
			</p>

			<h3>4. Rechtswirksamkeit dieses Haftungsausschlusses</h3>
			<p>
				Dieser Haftungsausschluss ist als Teil des Internetangebotes zu betrachten, von dem aus auf diese Seite
				verwiesen wurde. Sofern Teile oder einzelne Formulierungen dieses Textes der geltenden Rechtslage nicht, nicht
				mehr oder nicht vollständig entsprechen sollten, bleiben die übrigen Teile des Dokumentes in ihrem Inhalt und
				ihrer Gültigkeit davon unberührt.
			</p>
		</div>
	</div>
</template>

<script setup lang="ts">
import { mdiEmailOutline, mdiPhone } from "@icons/material";
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
