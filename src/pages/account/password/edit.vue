<template>
	<section>
		<base-modal :active="showModal" data-testid="confirmationModal">
			<template v-slot:body>
				<modal-body-info
					:title="$t('pages.account.password.edit.confirmation')"
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
		<h1 class="mb--md h3">{{ $t("pages.account.password.edit.title") }}</h1>
		<form-edit-user-data
			:submit-button="$t('pages.account.password.edit.title')"
			@onFormSubmit="submitHandler"
		>
			<template v-slot:inputs>
				<base-input
					v-model="formData.password"
					type="password"
					required="true"
					:label="$t('common.labels.password')"
					:placeholder="$t('common.placeholder.password.current')"
					class="mt--md"
					data-testid="password_current"
					autocomplete="off"
				>
					<template v-slot:icon>
						<base-icon
							source="material"
							icon="lock"
							fill="var(--color-tertiary)"
						/>
					</template>
				</base-input>
				<base-input
					v-model="formData.passwordNew"
					type="password"
					required="true"
					:label="$t('common.labels.password.new')"
					:placeholder="$t('common.placeholder.password.new')"
					class="mt--md"
					data-testid="password_new"
					autocomplete="off"
				>
					<template v-slot:icon>
						<base-icon
							source="material"
							icon="lock"
							fill="var(--color-tertiary)"
						/>
					</template>
				</base-input>
				<base-input
					v-model="formData.password_verification"
					type="password"
					required="true"
					:label="$t('common.labels.repeat')"
					:placeholder="$t('common.placeholder.password.new.confirmation')"
					class="mt--md"
					data-testid="password_control"
					autocomplete="off"
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
		<p class="info">
			<base-icon source="material" icon="info" fill="var(--color-info)" />
			{{ $t("pages.account.password.edit.password.info") }}
		</p>
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
	},
	data() {
		return {
			formData: {
				password: "",
				passwordNew: "",
				password_verification: "",
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
				await this.$store.dispatch("accounts/patch", [
					this.$user.accountId,
					{
						password: this.formData.passwordNew,
						password_verification: this.formData.password,
					},
				]);
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

.info {
	margin-top: calc(2 * (var(--space-lg)));
	font-size: var(--text-sm);
	font-weight: var(--font-weight-weight);
	color: var(--color-gray-dark);
}
</style>
