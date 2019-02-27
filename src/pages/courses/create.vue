<template>
	<div v-if="course">
		<section class="section">
			<h1>Kurs erstellen</h1>
			<BaseInput
				v-model="course.name"
				label="Name"
				type="text"
				placeholder="Dream Team"
				maxlength="30"
			></BaseInput>
			<BaseInput
				v-model="course.description"
				label="Beschreibung"
				type="textarea"
				placeholder="Everything you have to know"
				maxlength="255"
			></BaseInput>
			<button class="button is-primary" @click="create()">Speichern</button>
			<h1>{{ course.name }}</h1>
			<p>{{ course.description }}</p>
		</section>
	</div>
</template>

<script>
import { mapState } from "vuex";

export default {
	data() {
		return {
			course: {
				name: "",
				description: "",
			},
		};
	},
	computed: {
		...mapState("auth", {
			user: "user",
		}),
	},
	methods: {
		async create(id) {
			try {
				/* const course = await this.$store.dispatch('courses/create', {
					schoolId: this.user.schoolId,
					name: this.course.name,
					description: this.course.description,
				}); */

				this.$toast.success("Kurs erstellt");

				this.$router.push({ name: "courses" });
			} catch (e) {
				this.$toast.error("Fehler beim Erstellen");
			}
		},
	},
};
</script>
