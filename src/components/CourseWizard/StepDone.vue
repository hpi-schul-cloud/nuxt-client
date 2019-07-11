<template>
	<div class="final-step">
		<div class="image">
			<img alt="people" src="@assets/img/people.png" />
		</div>
		<div class="text-md">
			<h2 class="h3">Geschafft!</h2>
			<h3 class="h4">Was kann ich in einem Kurs machen?</h3>
			<h4 class="h5">Themen anlegen</h4>
			Themen sind in der Schul-Cloud der Container für dein Unterrichtsmaterial.
			<h4 class="h6">Aufgaben stellen</h4>
			Innerhalb eines Kurses/Themas kannst du Aufgaben an deine Teilnehmer
			stellen.
			<h4 class="h6">Tools hinzufügen</h4>
			In einem Kurs kannst du außerdem Tools zum interaktiven Unterricht
			hinzufügen.
		</div>
	</div>
</template>

<style lang="scss" scoped>
@import "@styles";

.final-step {
	display: flex;
	flex-direction: row;
	align-items: center;
	margin-bottom: var(space-lg);
	.image {
		padding: var(--space-lg);
	}
}
</style>
