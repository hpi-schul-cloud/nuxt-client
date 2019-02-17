<template>
	<div>
		<section class="section">
			<button
				class="button is-info"
				@click="$router.push({ name: 'courses-create' })"
				>Neues Kurs erstellen</button
			>
		</section>
		<section class="section">
			<div class="grid">
				<div
					v-for="(course, i) of courses"
					:key="i"
					class="tile"
				>
					<CourseCard :course="course"/>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
import CourseCard from "@components/CourseCard";

export default {
	head() {
		return {
			title: "Kurse",
		};
	},
	components: {
		CourseCard,
	},
	computed: {
		...mapGetters("courses", {
			courses: "list",
		}),
	},
	created(ctx) {
		this.find();
	},
	methods: {
		find() {
			this.$store.dispatch("courses/find");
		},
	},
};
</script>

<style lang="scss" scoped>
@import '@variables';

	.grid{
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		min-width: $size-content-width-min;
		max-width: $size-content-width-max;
		margin: 0 auto;
	}

	.tile{
		display: flex;
		margin: 10px;
	}
</style>
