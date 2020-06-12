<template>
	<section>
		<h1 class="mb--md h3">Name ändern</h1>
		<strong>Deine aktueller Name lautet:</strong>
		<p>{{ this.$user.fullName }}</p>
		<form-edit-user-data
			submit-button="Nutzerdaten ändern"
			@onFormSubmit="submitHandler"
		>
			<template v-slot:inputs>
				<base-input
					v-model="formData.firstName"
					type="text"
					label="Vorname"
					placeholder="Vorname"
					class="mt--md"
					data-testid="jjjjjjj"
				>
					<template v-slot:icon>
						<base-icon
							source="material"
							icon="mail"
							fill="var(--color-tertiary)"
						/>
					</template>
				</base-input>
				<base-input
					v-model="formData.lastName"
					type="text"
					label="Nachname"
					placeholder="Nachname"
					class="mt--md"
					data-testid="jjjjjjj"
				>
					<template v-slot:icon>
						<base-icon
							source="material"
							icon="mail"
							fill="var(--color-tertiary)"
						/>
					</template>
				</base-input>
			</template>
		</form-edit-user-data>
	</section>
</template>

<script>
import FormEditUserData from "@components/organisms/FormEditUserData";
export default {
	components: {
		FormEditUserData,
	},
	meta: {
		userNotExternallyManaged: true,
	},
	data() {
		return {
			formData: {
				firstName: "",
				lastName: "",
			},
		};
	},
	methods: {
		error() {
			this.$toast.error("Leider ist etwas schief gegangen");
		},
		success() {
			this.$router.push({
				path: `/account/`,
			});
		},
		async submitHandler() {
			try {
				await this.$store.dispatch("users/patch", [
					this.$user._id,
					{
						firstName: this.formData.firstName,
						lastName: this.formData.lastName,
					},
				]);
				this.success();
			} catch (e) {
				console.log(e);
				this.error();
			}
		},
	},
	layout: "loggedout",
};
</script>
<style lang="scss" scoped>
@import "@styles";

section {
	min-width: var(--size-content-width-min);
	max-width: var(--size-content-width-max);
	margin: 0 auto;
}
</style>
