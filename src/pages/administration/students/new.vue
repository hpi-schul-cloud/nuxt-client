<template>
	<section class="section">
		<h1>student anlegen</h1>
		<base-button design="primary" @click="create">Speichern</base-button>
	</section>
</template>

<script>
export default {
	data() {
		return {
			user: {
				firstName: "Miau",
				lastName: "Katze",
				email: "miau.katze@sc.org",
			},
		};
	},
	computed: {},
	methods: {
		async create() {
			try {
				const studentsRole = (
					await this.$store.dispatch("roles/find", {
						query: {
							name: "student",
						},
					})
				).data[0];

				await this.$store.dispatch("users/create", {
					firstName: this.user.firstName,
					lastName: this.user.lastName,
					email: this.user.email,
					roles: [studentsRole.id],
					schoolId: this.$user.schoolId,
				});

				this.$toast.success("User erstellt");

				//this.$router.push({ name: "teams-id", params: { id: team._id } });
			} catch (e) {
				this.$toast.error("Fehler beim Erstellen des users");
			}
		},
	},
};
</script>
