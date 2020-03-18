<template>
	<form autocomplete="off" v-on="$listeners" @submit.prevent="submitHandler">
		<base-input
			v-model="userData.firstName"
			type="text"
			required="true"
			label="Name"
			:placeholder="'Karli'"
			class="mt--md"
		>
		</base-input>
		<base-input
			v-model="userData.lastName"
			type="text"
			required="true"
			label="Nachname"
			:placeholder="'Nachname'"
			class="mt--md"
		>
		</base-input>
		<base-input
			v-model="userData.email"
			type="text"
			required="true"
			label="Email"
			:placeholder="'Karli.Nachname@mail.de'"
			class="mt--md"
		>
		</base-input>
		<slot name="inputs" :userData="userData" />

		<base-button type="submit" class="w-100 mt--lg" design="secondary" text>
			Hinzufügen
		</base-button>
		<base-button type="" class="w-100 mt--lg" design="text" text>
			Abbrechen
		</base-button>
	</form>
</template>

<script>
export default {
	props: {
		studentId: {
			type: String,
			required: false,
			default: undefined,
		},
	},
	data() {
		return {
			userData: {
				firstName: "",
				lastName: "",
				email: "",
			},
		};
	},
	computed: {
		actionType() {
			return "create";
		},
	},
	methods: {
		submitHandler() {
			switch (this.actionType) {
				case "create": {
					this.create();
					break;
				}
				case "patch": {
					this.patch();
					break;
				}
			}
		},
		async create() {
			// const errors = Object.values(this.errors).filter((a) => a);
			// if (errors.length) {
			// 	return this.$toast.error(errors[0]);
			// }
			try {
				const studentsRole = (
					await this.$store.dispatch("roles/find", {
						query: {
							name: "student",
						},
					})
				).data[0];

				await this.$store.dispatch("users/create", {
					firstName: this.userData.firstName,
					lastName: this.userData.lastName,
					email: this.userData.email,
					roles: [studentsRole.id],
					schoolId: this.$user.schoolId,
				});

				this.$toast.success("User erstellt");
				this.$router.push({
					path: "/administration/students",
				});
			} catch (e) {
				console.error(e);
				this.$toast.error("Fehler beim Erstellen des users");
			}
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";
</style>
