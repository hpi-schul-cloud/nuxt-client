<template>
	<section>
		<base-modal :active="showModal" data-testid="confirmationModal">
			<template v-slot:header></template>
			<template v-slot:body>
				<modal-body-info
					:title="$t('pages.account.email.edit.confirmation.mail')"
				>
					<template v-slot:icon>
						<base-icon
							source="material"
							icon="info"
							style="color: var(--color-success)"
						/>
					</template>
				</modal-body-info>
			</template>
			<template v-slot:footer>
				<modal-footer-confirm
					:text="$t('common.actions.ok')"
					@click="success"
				/>
			</template>
		</base-modal>
		<h1 class="mb--md h3">{{ $t("pages.account.email.edit.title") }}</h1>
		<strong>{{ $t("pages.account.email.edit.current.mail") }}</strong>
		<p>{{ this.$user.email }}</p>
		<form-edit-user-data
			:submit-button="$t('pages.account.email.edit.btn')"
			@onFormSubmit="submitHandler"
		>
			<template v-slot:inputs>
				<base-input
					v-model="userData.email"
					type="email"
					:label="$t('common.labels.repeat.email')"
					:placeholder="$t('common.placeholder.email.update')"
					class="mt--md"
					data-testid="email_new"
					autocomplete="off"
					required="true"
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
					v-model="userData.repeatEmail"
					type="email"
					:label="$t('common.labels.repeat')"
					:placeholder="$t('common.placeholder.repeat.email')"
					class="mt--md"
					data-testid="email_new_repeat"
					autocomplete="off"
					required="true"
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
					v-model="userData.password"
					type="password"
					required="true"
					:label="$t('common.labels.password')"
					:placeholder="$t('common.placeholder.password.confirmation')"
					class="mt--md"
					data-testid="email_password"
					autocomplete="new-password"
				>
					<template v-slot:icon>
						<base-icon
							source="material"
							icon="lock"
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
import ModalBodyInfo from "@components/molecules/ModalBodyInfo";
import ModalFooterConfirm from "@components/molecules/ModalFooterConfirm";

export default {
	components: {
		FormEditUserData,
		ModalBodyInfo,
		ModalFooterConfirm,
	},
	meta: {
		userNotExternallyManaged: true,
		requiredPermissions: ["PASSWORD_EDIT"],
	},
	data() {
		return {
			userData: {
				email: "",
				repeatEmail: "",
				password: "",
			},
			showModal: false,
		};
	},
	methods: {
		error() {
			this.$toast.error(this.$t("pages.account.error.edit"));
		},
		success() {
			this.showModal = false;
			this.$router.push({
				path: `/account/`,
			});
		},

		async submitHandler() {
			try {
				await this.$store.dispatch("activation/emailReset", {
					email: this.userData.email,
					repeatEmail: this.userData.repeatEmail,
					password: this.userData.password,
				});
				this.showModal = true;
			} catch (e) {
				console.log(e);
				this.error();
			}
		},
	},
	layout: "loggedoutNavbarLogo",
};
</script>
<style lang="scss" scoped>
@import "@styles";

section {
	max-width: calc(0.5 * var(--size-content-width-max));
	margin: 0 auto;
}
</style>
