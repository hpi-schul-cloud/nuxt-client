<template>
	<div>
		<base-input
			v-model="course.name"
			name="name"
			label="Kursname"
			type="text"
			placeholder="z.B. 10a"
			maxlength="30"
		/>

		<base-textarea
			v-model="course.description"
			name="description"
			label="Kursbeschreibung"
			placeholder=""
			maxlength="255"
		/>

		<base-select
			v-model="course.teachers"
			:options="teacherOptions"
			:multiple="true"
			label="Unterrichtender Lehrer"
			placeholder="Vorname Nachname"
		/>

		<base-select
			v-model="course.substitutions"
			:options="teacherOptions"
			:multiple="true"
			label="Vertretungs-Lehrer"
			placeholder="Vorname Nachname"
		/>

		<div class="date-wrapper">
			<base-input
				v-model="course.startDate"
				name="startDate"
				label="Startdatum"
				type="date"
				class="date"
				placeholder=""
				maxlength="30"
			/>
			<base-input
				v-model="course.untilDate"
				name="untilDate"
				label="Enddatum"
				type="date"
				class="date"
				placeholder=""
				maxlength="30"
			/>
		</div>

		<course-times v-model="course.times" />
	</div>
</template>

<script>
import CourseTimes from "@components/CourseTimes";

export default {
	components: {
		CourseTimes,
	},
	props: {
		availableTeachers: {
			type: Array,
			default: () => [],
		},
		course: {
			type: Object,
			required: true,
			validator: (course) =>
				["name", "description", "startDate", "untilDate", "times"].every(
					(key) => {
						if (course[key] === undefined) {
							console.error("key", key, "of course is undefined");
						}
						return course[key] !== undefined;
					}
				),
		},
	},
	computed: {
		teacherOptions() {
			return this.availableTeachers.map((teacher) => {
				return {
					label: `${teacher.firstName} ${teacher.lastName}`,
					value: teacher._id,
				};
			});
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";

.date-wrapper {
	display: flex;
	justify-content: space-between;
}

.date {
	width: 49%;
}
</style>
