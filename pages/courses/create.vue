<template>
	<div v-if="course">
		<section class="section">
			<h1>Kurs erstellen</h1>
			<b-field label="Name">
				<b-input
					v-model="course.name"
					type="text"
					placeholder="Dream Team"
					maxlength="30"
				></b-input>
			</b-field>
			<b-field label="Beschreibung">
				<b-input
					v-model="course.description"
					type="textarea"
					placeholder="Everything you have to know"
					maxlength="255"
				></b-input>
			</b-field>
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

				this.$toast.open({
					message: "Kurs erstellt",
					type: "is-success",
				});

				this.$router.push({ name: "courses" });
			} catch (e) {
				this.$toast.open({
					message: "Fehler beim Erstellen des Kurses",
					type: "is-danger",
				});
			}
		},
	},
};
</script>
