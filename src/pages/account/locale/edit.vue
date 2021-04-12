<template>
	<section>
		<base-modal :active="showModal" data-testid="confirmationModal">
			<template v-slot:body>
				<modal-body-info :title="$t('pages.account.locale.edit.confirmation')">
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
		<h1 class="mb--md h3">{{ $t("pages.account.locale.edit.title") }}</h1>
		<form-edit-user-data
			:submit-button="$t('pages.account.locale.edit.btn')"
			@onFormSubmit="submitHandler"
		>
			<template v-slot:inputs>
				<language-switcher :language="getLanguage()" />
			</template>
		</form-edit-user-data>
	</section>
</template>

<script>
import FormEditUserData from "@components/organisms/FormEditUserData";
import ModalBodyInfo from "@components/molecules/ModalBodyInfo";
import ModalFooterConfirm from "@components/molecules/ModalFooterConfirm";
import LanguageSwitcher from "@components/organisms/LanguageSwitcher";

export default {
	components: {
		FormEditUserData,
		ModalBodyInfo,
		ModalFooterConfirm,
		LanguageSwitcher,
	},
	meta: {
		userNotExternallyManaged: true,
	},
	data() {
		return {
			showModal: false,
		};
	},
	computed: {},
	methods: {
		getLanguage() {
			return this.$user.language;
		},
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
						language: this.$store.getters["auth/getLocale"],
					},
				]);
				this.$i18n.locale = this.$store.getters["auth/getLocale"];
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
