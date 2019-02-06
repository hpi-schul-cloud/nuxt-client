<template>
	<div :style="background_style" class="card-main-content">
		{{ course.name }}
		<br />
		<!-- <div
      v-for="(time,i) of times_computed"
      :key="i"
    >
      {{ time.weekday }} at {{ time.startTime }}
		</div>-->
	</div>
</template>

<script>
export default {
	props: {
		course: {
			type: Object,
			default: () => ({
				color: "#555",
				name: "default name",
				times: [{ weekday: 1, startTime: 36000000 }],
			}),
		},
	},
	computed: {
		background_style() {
			return "background-color: " + this.course.color;
		},
		// times_computed() {
		//   let weekdays = [
		//     'Montag',
		//     'Dienstag',
		//     'Mittwoch',
		//     'Donnerstag',
		//     'Freitag',
		//     'Samstag',
		//     'Sonntag'
		//   ]
		//   console.log(this.course);
		//   return this.course.times.map(time => {
		//     time.weekday = weekdays[time.weekday]
		//     let startTime =
		//       time.startTime / 1000 / 60 / 60 +
		//       ':' +
		//       ((time.startTime / 1000 / 60 / 60) % 60)
		//     time.startTime = startTime
		//     return time
		//   });
		// }
	},
};
</script>

<style lang="scss" scoped>
@import "@variables";

.card-main-content {
	font-family: "Asul", sans-serif;
	color: $color-heading-text;
}
</style>
