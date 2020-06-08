<template>
	<section>
		<h1 class="mb--md h3">Name ändern</h1>
		<strong>Deine aktueller Name lautet:</strong>
		<p>{{ fullName }}</p>
		<form autocomplete="off" v-on="$listeners" @submit.prevent="submitHandler">
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
			<div class="action">
				<base-button
					class="mt--lg mr--md"
					design="text"
					text
					data-testid=""
					@click.prevent="$router.go(-1)"
				>
					{{ $t("common.actions.cancel") }}
				</base-button>
				<base-button
					type="submit"
					class="mt--lg"
					design="secondary"
					data-testid=""
				>
					Email ändern
				</base-button>
			</div>
		</form>
	</section>
</template>

<script>
export default {
	data() {
		return {
			formData: {
				firstName: "",
				lastName: "",
			},
		};
	},
	computed: {
		fullName() {
			return `${this.$user?.firstName} ${this.$user?.lastName}`;
		},
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
