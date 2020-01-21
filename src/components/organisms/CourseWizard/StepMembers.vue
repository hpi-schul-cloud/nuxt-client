<template>
	<div>
		<p>
			Fast geschafft! Jetzt noch die Kursmitglieder hinzufügen und dann kann es
			losgehen. Du kannst diesen Schritt auch überspringen und später
			Kursmitglieder hinzufügen.
		</p>

		<base-select
			v-model="classModel"
			close-on-select
			:options="classOptions"
			:multiple="true"
			label="Klasse auswählen"
			placeholder="Klasse 6b"
		></base-select>

		<base-select
			v-model="studentModel"
			close-on-select
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
		studentModel: {
			get() {
				return (this.course.userIds || []).map((userId) =>
					this.studentOptions.find((student) => student.value === userId)
				);
			},
			set(students) {
				this.course.userIds = students.map((student) => student.value);
			},
		},
		classModel: {
			get() {
				return (this.course.classIds || []).map((classId) =>
					this.classOptions.find((_class) => _class.value === classId)
				);
			},
			set(classes) {
				this.course.classIds = classes.map((_class) => _class.value);
			},
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
