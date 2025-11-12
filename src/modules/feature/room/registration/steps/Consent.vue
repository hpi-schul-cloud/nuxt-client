<template>
	<div class="d-flex flex-column pa-2 ga-4">
		<span> Bitte die folgenden Einwilligungserklärung bestätigen, damit die dBildungscloud genutzt werden kann. </span>
		<span>Ich, Teresa Tischlerin, erkläre Folgendes:</span>
		<VCheckbox class="">
			<template #label>
				<div class="d-flex flex-column ga-2 mt-16">
					<span>
						Ich erkläre mich damit einverstanden, dass meine personenbezogenen Daten zum Zwecke der Registrierung und
						Nutzung der dBildungscloud verarbeitet und gespeichert werden. Ich habe die Datenschutzerklärung und die
						Nutzungsbedingungen gelesen und akzeptiere diese.
					</span>

					<span>
						Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim
						justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer
						tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula,
						porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a,
						tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies
						nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus..
					</span>
				</div>
			</template>
		</VCheckbox>
		<VCheckbox>
			<template #label>
				<span>Ich habe die Nutzungsordnung der dBildungscloud gelesen und stimme ihr zu.</span>
			</template>
		</VCheckbox>
	</div>
</template>
<script setup lang="ts"></script>
