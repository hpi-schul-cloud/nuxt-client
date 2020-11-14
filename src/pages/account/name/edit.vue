<template>
	<section>
		<base-modal :active="showModal" data-testid="confirmationModal">
			<template v-slot:body>
				<modal-body-info :title="$t('pages.account.name.edit.confirmation')">
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
		<h1 class="mb--md h3">{{ $t("pages.account.name.edit.title") }}</h1>
		<strong>{{ $t("pages.account.name.edit.current.name") }}</strong>
		<p>{{ this.$user.fullName }}</p>
		<form-edit-user-data
			:submit-button="$t('pages.account.name.edit.btn')"
			@onFormSubmit="submitHandler"
		>
			<template v-slot:inputs>
				<base-input
					v-model="formData.firstName"
					type="text"
					:label="$t('common.labels.firstName.new')"
					:placeholder="$t('common.labels.firstName.new')"
					class="mt--md"
					data-testid="name_firstName"
					required="true"
				>
					<template v-slot:icon>
						<base-icon
							source="material"
							icon="person"
							fill="var(--color-tertiary)"
						/>
					</template>
				</base-input>
				<base-input
					v-model="formData.lastName"
					type="text"
					:label="$t('common.labels.lastName.new')"
					:placeholder="$t('common.labels.lastName.new')"
					class="mt--md"
					data-testid="name_lastName"
					required="true"
				>
					<template v-slot:icon>
						<base-icon
							source="material"
							icon="person"
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
	},
	data() {
		return {
			formData: {
				firstName: "",
				lastName: "",
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
				await this.$store.dispatch("users/patch", [
					this.$user._id,
					{
						firstName: this.formData.firstName,
						lastName: this.formData.lastName,
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
</style>
