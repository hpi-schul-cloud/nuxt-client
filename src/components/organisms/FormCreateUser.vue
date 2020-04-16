<template>
	<form autocomplete="off" v-on="$listeners" @submit.prevent="submitHandler">
		<base-input
			v-model="userData.firstName"
			type="text"
			required="true"
			:label="$t('common.labels.firstName')"
			:placeholder="$t('common.placeholder.firstName')"
			class="mt--md"
			data-testid="input_create-user_firstname"
		>
		</base-input>
		<base-input
			v-model="userData.lastName"
			type="text"
			required="true"
			:label="$t('common.labels.lastName')"
			:placeholder="$t('common.placeholder.lastName')"
			class="mt--md"
			data-testid="input_create-user_lastname"
		>
		</base-input>
		<base-input
			v-model="userData.email"
			type="text"
			required="true"
			:label="$t('common.labels.email')"
			:placeholder="$t('common.placeholder.email')"
			class="mt--md"
			data-testid="input_create-user_email"
		>
		</base-input>
		<slot name="inputs" :userData="userData" />

		<base-button
			type="submit"
			class="w-100 mt--lg"
			design="secondary"
			data-testid="button_create-user_submit"
		>
			{{ $t("common.actions.add") }}
		</base-button>
		<base-button
			class="w-100 mt--lg"
			design="text"
			text
			data-testid="button_create-user_abort"
			@click.prevent="$router.go(-1)"
		>
			{{ $t("common.actions.back") }}
		</base-button>
	</form>
</template>

<script>
export default {
	props: {
		userId: {
			type: String,
			required: false,
			default: undefined,
		},
		roleName: {
			type: String,
			required: true,
		},
	},
	data() {
		return {
			userData: {
				firstName: "",
				lastName: "",
				email: "",
				sendRegistration: true,
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
			}
		},

		async create() {
			try {
				await this.$store.dispatch("users/create", {
					firstName: this.userData.firstName,
					lastName: this.userData.lastName,
					email: this.userData.email,
					roles: [this.roleName],
					schoolId: this.$user.schoolId,
					sendRegistration: this.userData.sendRegistration,
				});
				// TODO: remove the next registrationlink dispatch
				// https://ticketsystem.schul-cloud.org/browse/SC-4008
				await this.$store.dispatch("registrationlink/create", {
					role: this.roleName,
					save: true,
					patchUser: true,
					host: location.host,
					schoolId: this.$user.schoolId,
					toHash: this.userData.email,
				});

				this.$emit("success");
			} catch (e) {
				this.$emit("error");
				console.error(e);
			}
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";
</style>
