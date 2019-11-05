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

		<base-select
			v-model="course.teacherIds"
			:options="teacherOptions"
			:multiple="true"
			label="Unterrichtender Lehrer"
			placeholder="Vorname Nachname"
		/>

		<base-select
			v-model="course.substitutionIds"
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

		<course-times v-model="courseTimes" />
	</div>
</template>

<script>
import CourseTimes from "@components/molecules/CourseTimes";

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
				[
					"name",
					"description",
					"startDate",
					"untilDate",
					"times",
					"substitutionIds",
					"teacherIds",
				].every((key) => {
					if (course[key] === undefined) {
					}
					return course[key] !== undefined;
				}),
		},
	},
	data() {
		return {
			reactiveArray: [],
		};
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
		courseTimes: {
			// TODO adapt server Apiv2 to avoid recalculations
			get() {
				const result = this.course.times.map((time) => {
					const startTime = parseInt(time.startTime, 10) / (60 * 1000);
					const startHours = Math.floor(startTime / 60);
					const startMinutes = startTime - startHours * 60;
					return {
						startTime: `${startHours
							.toString()
							.padStart(2, "0")}:${startMinutes.toString().padStart(2, "0")}`,
						duration: parseInt(time.duration, 10) / (60 * 1000),
						weekday: time.weekday,
						room: time.room,
					};
				});
				// this is a hack to make the result reactive. Never do this again!
				this.$set(this, "reactiveArray", result);
				return this.reactiveArray;
			},
			set(v) {
				const times = v.map((time) => {
					let [startHours, startMinutes] = time.startTime.split(":");
					startMinutes = parseInt(startMinutes, 10) * 60 * 1000;
					startHours = parseInt(startHours, 10) * 60 * 60 * 1000;
					time.startTime = (startHours + startMinutes).toString();
					time.duration = (time.duration * 60 * 1000).toString();

					return time;
				});
				this.$set(this.course, "times", times);
				this.$emit("update:course", this.course);
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

.date-wrapper {
	display: flex;
	justify-content: space-between;
}

.date {
	flex: 1;
	&:not(:first-of-type) {
		margin-left: var(--space-sm);
	}
}
</style>
