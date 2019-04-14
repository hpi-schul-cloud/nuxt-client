<template>
	<div class="final-step">
		<div class="image">
			<img src="@assets/people.png" />
		</div>
		<div>
			<h3>Geschafft!</h3>
			<h4>Was kann ich in einem Kurs machen?</h4>
			<h6>Themen anlegen</h6>
			Themen sind in der Schul-Cloud der Container für dein Unterrichtsmaterial.
			<h6>Aufgaben stellen</h6>
			Innerhalb eines Kurses/Themas kannst du Aufgaben an deine Teilnehmer
			stellen.
			<h6>Tools hinzufügen</h6>
			In einem Kurs kannst du außerdem Tools zum interaktiven Unterricht
			hinzufügen.
		</div>
	</div>
</template>

<style lang="scss" scoped>
@import "@variables";

.final-step {
	display: flex;
	flex-direction: row;
	align-items: center;
	margin-bottom: 30px;
	.image {
		padding: 30px;
	}
}
</style>
