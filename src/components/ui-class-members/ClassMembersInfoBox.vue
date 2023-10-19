<template>
	<div data-testid="class-members-info-box">
		<v-alert light text type="info" class="mb-0">
			<div class="alert-text">
				Daten der Klasse werden mit moin.schule synchronisiert. Die Klassenliste
				kann vorübergehend veraltet sein, bis sie dem neusten Stand in
				moin.schule abgeglichen wird. Die Daten werden nach jeder Anmeldung
				eines Klassenmitglieds in der Niedersächsischen Bildungscloud
				aktualisiert.
			</div>
		</v-alert>
		<h2 class="text-h4">
			Schüler:innen sind noch nicht in der Niedersächsischen Bildungscloud?
		</h2>
		<p>
			Eine Einverständniserklärung bei der Registrierung von Schüler:innen muss
			nicht eingeholt werden. Die Nutzung der Niedersächsischen Bildungscloud
			ist im niedersächsischen Schulgesetz (§ 31 Abs. 5 NSchG) geregelt.
		</p>
		<p>
			Falls die Schule die Daten der Nutzenden über ein externes System bezieht
			bzw. übermittelt bekommt, sind keine weiteren Schritte in der Cloud
			notwendig. Die Registrierung erfolgt über das externe System.
		</p>
		<p>
			Anderenfalls können über den Verwaltungsbereich der Cloud Einladungen zur
			Registrierung per Link versendet werden:
		</p>
		<ul>
			<li>
				Versand von Registrierungslinks an die hinterlegten E-Mail-Adressen
				(auch direkt beim Importieren/Anlegen möglich)
			</li>
			<li>
				Registrierungslinks als QR-Druckbogen drucken, ausschneiden und
				QR-Zettel an Schüler:innen verteilen
			</li>
			<li>
				Einen oder mehrere Nutzer:innen auswählen, z.B. alle Schüler:innen einer
				Klasse, und dann die gewünschte Aktion durchführen
			</li>
			<li>
				Alternativ möglich: Wechseln in den Bearbeiten-Modus des Nutzerprofils
				und den individuellen Registrierungslink direkt abrufen, um ihn händisch
				zu versenden
			</li>
		</ul>
	</div>
</template>
<script setup lang="ts"></script>
