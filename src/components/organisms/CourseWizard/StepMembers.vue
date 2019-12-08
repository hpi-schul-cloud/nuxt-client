<template>
	<div>
		<p>
			Fast geschafft! Jetzt noch die Kursmitglieder hinzufügen und dann kann es
			losgehen. Du kannst diesen Schritt auch überspringen und später
			Kursmitglieder hinzufügen.
		</p>

		<base-select
			v-model="course.classIds"
			:options="availableClasses"
			:multiple="true"
			track-by="_id"
			option-label="displayName"
			label="Klasse auswählen"
			placeholder="Klasse 6b"
		></base-select>

		<base-select
			v-model="course.userIds"
			:options="availableStudents"
			:multiple="true"
			:show-on-select="false"
			option-label="displayName"
			label="Schüler auswählen"
			placeholder="Vorname Nachname"
		></base-select>
	</div>
</template>

<script>
export default {
	props: {
		course: {
			type: Object,
			required: true,
		},
		availableClasses: {
			type: Array,
			default: () => [],
		},
		availableStudents: {
			type: Array,
			default: () => [],
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";

.wrapper {
	padding: var(--space-md) 0;
}
</style>
