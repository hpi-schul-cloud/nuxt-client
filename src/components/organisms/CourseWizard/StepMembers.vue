<template>
	<div>
		<p>
			Fast geschafft! Jetzt noch die Kursmitglieder hinzufügen und dann kann es
			losgehen. Du kannst diesen Schritt auch überspringen und später
			Kursmitglieder hinzufügen.
		</p>

		<base-select
			v-model="course.classIds"
			:options="classOptions"
			:multiple="true"
			label="Klasse auswählen"
			placeholder="Klasse 6b"
		></base-select>

		<base-select
			v-model="course.userIds"
			:options="studentOptions"
			:multiple="true"
			:show-on-select="false"
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
	computed: {
		studentOptions() {
			return this.availableStudents.map((student) => ({
				label: `${student.firstName} ${student.lastName}`,
				value: student._id,
			}));
		},
		classOptions() {
			return this.availableClasses.map((_class) => ({
				label: _class.displayName,
				value: _class._id,
			}));
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
