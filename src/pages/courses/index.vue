<template>
	<div>
		<section class="section">
			<courses-grid :courses="courses" />
		</section>
		<section class="section">
			<base-button @click="$router.push({ name: 'courses-create' })"
				>Neuen Kurs erstellen
			</base-button>
		</section>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
import CoursesGrid from "@components/CoursesGrid";

export default {
	head() {
		return {
			title: "Kurse",
		};
	},
	components: {
		CoursesGrid,
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
